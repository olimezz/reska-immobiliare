import { sql } from '@vercel/postgres';
import { verifyAdminAuth, setSecurityHeaders } from './_lib/security.js';

export default async function handler(req, res) {
  setSecurityHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Protezione rotta: solo gli amministratori autenticati via JWT possono leggere o eliminare i lead
  const admin = verifyAdminAuth(req);
  if (!admin) {
    return res.status(401).json({
      success: false,
      error: 'Accesso riservato agli amministratori autenticati.'
    });
  }

  if (!process.env.POSTGRES_URL) {
    return res.status(200).json({
      success: true,
      dbConnected: false,
      total: 0,
      leads: []
    });
  }

  try {
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT 200;`;
      return res.status(200).json({
        success: true,
        dbConnected: true,
        total: rows.length,
        leads: rows
      });
    }

    if (req.method === 'DELETE') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const leadId = Number(body.id || req.query?.id);
      if (!leadId) {
        return res.status(400).json({ success: false, error: 'ID lead mancante.' });
      }
      await sql`DELETE FROM leads WHERE id = ${leadId};`;
      return res.status(200).json({
        success: true,
        message: 'Richiesta contatto eliminata.'
      });
    }

    return res.status(405).json({ success: false, error: 'Metodo non consentito.' });
  } catch (error) {
    console.error('[Get Leads Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'Impossibile recuperare i contatti dal database.'
    });
  }
}
