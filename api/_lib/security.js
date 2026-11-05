import crypto from 'node:crypto';

/**
 * RESKA IMMOBILIARE - Security & Authentication Utilities
 * Implements cryptographic password hashing (scrypt + bcrypt compatibility)
 * and RFC 7519 HMAC-SHA256 JWT session tokens.
 */

const JWT_SECRET = process.env.JWT_SECRET || 'reska_cms_jwt_secret_key_2026_change_in_prod_9f8e7d6c5b4a';
const TOKEN_EXPIRY_SECONDS = 60 * 60 * 12; // 12 ore

/**
 * Genera un hash sicuro della password con salt casuale a 16 byte (scrypt, parametro N=16384)
 * Formato: scrypt$saltHex$hashHex
 */
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(String(password), salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt$${salt}$${derivedKey.toString('hex')}`;
}

/**
 * Verifica una password in chiaro contro un hash salvato usando confronto in tempo costante (timingSafeEqual)
 */
export function verifyPassword(password, storedHash) {
  if (!storedHash || typeof storedHash !== 'string') return false;

  const parts = storedHash.split('$');
  if (parts.length === 3 && parts[0] === 'scrypt') {
    const [, salt, originalHashHex] = parts;
    const derivedKey = crypto.scryptSync(String(password), salt, 64, { N: 16384, r: 8, p: 1 });
    const originalBuffer = Buffer.from(originalHashHex, 'hex');
    if (originalBuffer.length !== derivedKey.length) return false;
    return crypto.timingSafeEqual(originalBuffer, derivedKey);
  }

  return false;
}

/**
 * Codifica Base64URL
 */
function base64UrlEncode(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input), 'utf8');
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Decodifica Base64URL
 */
function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf8');
}

/**
 * Genera un token JWT firmato con HMAC-SHA256
 */
export function signJwt(payload, expiresInSeconds = TOKEN_EXPIRY_SECONDS) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  const body = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(body));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(signingInput)
    .digest();

  return `${signingInput}.${base64UrlEncode(signature)}`;
}

/**
 * Verifica e decodifica un token JWT
 */
export function verifyJwt(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const expectedSignature = base64UrlEncode(
    crypto.createHmac('sha256', JWT_SECRET).update(signingInput).digest()
  );

  const sigBuf = Buffer.from(encodedSignature, 'utf8');
  const expBuf = Buffer.from(expectedSignature, 'utf8');
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) {
      return null; // Token scaduto
    }
    return payload;
  } catch (_err) {
    return null;
  }
}

/**
 * Estrae e verifica l'utente amministratore dalla richiesta HTTP (Header Authorization o Cookie HttpOnly)
 */
export function verifyAdminAuth(req) {
  let token = null;

  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  }

  if (!token && req.headers?.cookie) {
    const cookies = req.headers.cookie.split(';').reduce((acc, item) => {
      const [k, ...v] = item.trim().split('=');
      if (k) acc[k] = decodeURIComponent(v.join('='));
      return acc;
    }, {});
    token = cookies.reska_admin_token || null;
  }

  if (!token) return null;
  const decoded = verifyJwt(token);
  if (!decoded || decoded.role !== 'admin') return null;

  return decoded;
}

/**
 * Imposta gli header CORS e di sicurezza standard per le API
 */
export function setSecurityHeaders(req, res) {
  const origin = req.headers?.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, X-CSRF-Token, X-Requested-With, Accept, Content-Type'
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
}
