import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // CORS Headers per consentire chiamate da qualsiasi origine (incluso GitHub Pages e locale)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Gestione pre-flight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Metodo non consentito. Utilizzare POST.' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const {
      form_type = 'generico',
      nome = '',
      email = '',
      telefono = '',
      cosa_cerchi = '',
      tipologia = '',
      metratura = '',
      condizione = '',
      citta = '',
      citta_zona = '',
      stima_indicativa_calcolata = '',
      stima_indicativa = '',
      immobile_nome = '',
      immobile_id = '',
      note = '',
      privacy_consent = '',
      marketing_consent = ''
    } = data || {};

    // Validazione base
    if (!nome || !telefono) {
      return res.status(400).json({
        success: false,
        error: 'Nome e numero di telefono sono campi obbligatori.'
      });
    }

    // Validazione GDPR (Art. 6 e 7 Regolamento UE 2016/679)
    const isPrivacyAccepted = privacy_consent === 'on' || privacy_consent === true || privacy_consent === 'true' || privacy_consent === '1';
    if (!isPrivacyAccepted) {
      return res.status(400).json({
        success: false,
        error: 'Conformità GDPR: È obbligatorio dichiarare di aver preso visione dell\'Informativa sulla Privacy per poter inviare la richiesta.'
      });
    }

    const marketingConsentValue = (marketing_consent === 'on' || marketing_consent === true || marketing_consent === 'true' || marketing_consent === '1') ? 'acconsentito' : 'non_acconsentito';

    // Creazione automatica tabella se non esiste
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        form_type VARCHAR(100),
        nome VARCHAR(255),
        email VARCHAR(255),
        telefono VARCHAR(50),
        cosa_cerchi VARCHAR(255),
        tipologia VARCHAR(100),
        metratura VARCHAR(50),
        condizione VARCHAR(100),
        citta_zona VARCHAR(255),
        stima_indicativa VARCHAR(100),
        immobile_nome VARCHAR(255),
        immobile_id VARCHAR(50),
        note TEXT,
        privacy_consent VARCHAR(50) DEFAULT 'acconsentito',
        marketing_consent VARCHAR(50) DEFAULT 'non_acconsentito'
      );
    `;

    // Aggiunta colonne retrocompatibile per tabelle già esistenti
    try {
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS privacy_consent VARCHAR(50) DEFAULT 'acconsentito';`;
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS marketing_consent VARCHAR(50) DEFAULT 'non_acconsentito';`;
    } catch (_alterErr) {
      // Ignora se già presenti
    }

    // Inserimento lead in Vercel Postgres con tracciamento del consenso GDPR
    const result = await sql`
      INSERT INTO leads (
        form_type,
        nome,
        email,
        telefono,
        cosa_cerchi,
        tipologia,
        metratura,
        condizione,
        citta_zona,
        stima_indicativa,
        immobile_nome,
        immobile_id,
        note,
        privacy_consent,
        marketing_consent
      ) VALUES (
        ${form_type},
        ${nome},
        ${email},
        ${telefono},
        ${cosa_cerchi},
        ${tipologia},
        ${metratura},
        ${condizione},
        ${citta_zona || citta},
        ${stima_indicativa || stima_indicativa_calcolata},
        ${immobile_nome},
        ${immobile_id},
        ${note},
        ${'acconsentito'},
        ${marketingConsentValue}
      ) RETURNING id, created_at;
    `;

    const newRecord = result.rows[0];

    return res.status(200).json({
      success: true,
      message: 'Richiesta memorizzata con successo nel database Vercel Postgres (Conformità GDPR attestata)',
      leadId: newRecord.id,
      timestamp: newRecord.created_at
    });
  } catch (error) {
    console.error('[Vercel Postgres Error]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Errore durante la scrittura sul database Vercel Postgres.'
    });
  }
}
