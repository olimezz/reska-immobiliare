import { sql } from '@vercel/postgres';
import {
  hashPassword,
  verifyPassword,
  signJwt,
  verifyAdminAuth,
  setSecurityHeaders
} from './_lib/security.js';

const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@reska-immobiliare.it').toLowerCase().trim();
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ReskaAdmin2026!';

// Rate limiter in-memory per prevenire brute-force sul login
const loginAttempts = new Map();
const MAX_ATTEMPTS = 6;
const WINDOW_MS = 15 * 60 * 1000; // 15 minuti

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) {
    return false;
  }
  entry.count += 1;
  return true;
}

function resetRateLimit(ip) {
  loginAttempts.delete(ip);
}

async function ensureAdminTableAndSeed() {
  if (!process.env.POSTGRES_URL) return false;

  await sql`
    CREATE TABLE IF NOT EXISTS cms_admins (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name VARCHAR(255) DEFAULT 'Amministratore RESKA',
      role VARCHAR(50) DEFAULT 'admin',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP WITH TIME ZONE
    );
  `;

  const { rows } = await sql`SELECT COUNT(*)::int AS cnt FROM cms_admins;`;
  if (!rows[0] || rows[0].cnt === 0) {
    const initialHash = hashPassword(DEFAULT_ADMIN_PASSWORD);
    await sql`
      INSERT INTO cms_admins (email, password_hash, name, role)
      VALUES (${DEFAULT_ADMIN_EMAIL}, ${initialHash}, 'Amministratore RESKA', 'admin')
      ON CONFLICT (email) DO NOTHING;
    `;
  }
  return true;
}

export default async function handler(req, res) {
  setSecurityHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. Verifica sessione corrente (GET /api/auth)
  if (req.method === 'GET') {
    const admin = verifyAdminAuth(req);
    if (!admin) {
      return res.status(401).json({ authenticated: false, error: 'Sessione non valida o scaduta.' });
    }
    return res.status(200).json({
      authenticated: true,
      admin: {
        id: admin.sub,
        email: admin.email,
        name: admin.name || 'Amministratore RESKA',
        role: admin.role
      }
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Metodo non consentito.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const action = body.action || 'login';

    // 2. LOGOUT
    if (action === 'logout') {
      res.setHeader(
        'Set-Cookie',
        'reska_admin_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
      );
      return res.status(200).json({ success: true, message: 'Logout effettuato con successo.' });
    }

    // 3. CAMBIO CREDENZIALI ADMIN (Protetto da JWT)
    if (action === 'change-password') {
      const currentAdmin = verifyAdminAuth(req);
      if (!currentAdmin) {
        return res.status(401).json({ success: false, error: 'Non autorizzato.' });
      }

      const { currentPassword, newEmail, newPassword } = body;
      if (!currentPassword || !newPassword || String(newPassword).length < 8) {
        return res.status(400).json({
          success: false,
          error: 'La nuova password deve contenere almeno 8 caratteri.'
        });
      }

      const targetEmail = (newEmail || currentAdmin.email).toLowerCase().trim();
      const dbReady = await ensureAdminTableAndSeed();

      if (dbReady) {
        const { rows } = await sql`SELECT * FROM cms_admins WHERE id = ${currentAdmin.sub} LIMIT 1;`;
        const userRow = rows[0];
        if (!userRow || !verifyPassword(currentPassword, userRow.password_hash)) {
          return res.status(403).json({ success: false, error: 'La password attuale non è corretta.' });
        }

        const newHash = hashPassword(newPassword);
        await sql`
          UPDATE cms_admins
          SET email = ${targetEmail}, password_hash = ${newHash}
          WHERE id = ${userRow.id};
        `;

        const newToken = signJwt({
          sub: userRow.id,
          email: targetEmail,
          name: userRow.name,
          role: 'admin'
        });

        res.setHeader(
          'Set-Cookie',
          `reska_admin_token=${encodeURIComponent(newToken)}; HttpOnly; Path=/; Max-Age=43200; SameSite=Strict`
        );

        return res.status(200).json({
          success: true,
          message: 'Credenziali amministratore aggiornate nel database.',
          token: newToken,
          admin: { id: userRow.id, email: targetEmail, name: userRow.name, role: 'admin' }
        });
      } else {
        return res.status(200).json({
          success: true,
          localMode: true,
          message: 'Credenziali aggiornate nella sessione locale.'
        });
      }
    }

    // 4. LOGIN AMMINISTRATORE
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'Troppi tentativi di accesso falliti. Riprova tra 15 minuti.'
      });
    }

    const email = (body.email || '').toLowerCase().trim();
    const password = String(body.password || '');

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Inserisci sia l\'indirizzo email che la password.'
      });
    }

    let authenticatedAdmin = null;
    let dbConnected = false;

    try {
      dbConnected = await ensureAdminTableAndSeed();
      if (dbConnected) {
        const { rows } = await sql`SELECT * FROM cms_admins WHERE LOWER(email) = ${email} LIMIT 1;`;
        const userRow = rows[0];
        if (userRow && verifyPassword(password, userRow.password_hash)) {
          await sql`UPDATE cms_admins SET last_login = CURRENT_TIMESTAMP WHERE id = ${userRow.id};`;
          authenticatedAdmin = {
            id: userRow.id,
            email: userRow.email,
            name: userRow.name,
            role: userRow.role || 'admin'
          };
        }
      }
    } catch (dbErr) {
      console.warn('[CMS Auth DB Fallback]:', dbErr.message);
      dbConnected = false;
    }

    // Fallback se il DB Postgres non è ancora configurato (verifica su credenziali env/default con hash timing-safe)
    if (!dbConnected) {
      const defaultHash = hashPassword(DEFAULT_ADMIN_PASSWORD);
      if (email === DEFAULT_ADMIN_EMAIL && verifyPassword(password, defaultHash)) {
        authenticatedAdmin = {
          id: 1,
          email: DEFAULT_ADMIN_EMAIL,
          name: 'Amministratore RESKA',
          role: 'admin'
        };
      }
    }

    if (!authenticatedAdmin) {
      return res.status(401).json({
        success: false,
        error: 'Credenziali non valide. Verifica email e password.'
      });
    }

    resetRateLimit(clientIp);

    const token = signJwt({
      sub: authenticatedAdmin.id,
      email: authenticatedAdmin.email,
      name: authenticatedAdmin.name,
      role: authenticatedAdmin.role
    });

    const isSecure = req.headers['x-forwarded-proto'] === 'https' || process.env.NODE_ENV === 'production';
    res.setHeader(
      'Set-Cookie',
      `reska_admin_token=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=43200; SameSite=Strict${isSecure ? '; Secure' : ''}`
    );

    return res.status(200).json({
      success: true,
      token,
      admin: authenticatedAdmin,
      dbConnected
    });
  } catch (err) {
    console.error('[Auth API Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Errore interno del server durante l\'autenticazione.'
    });
  }
}
