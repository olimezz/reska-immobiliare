import { sql } from '@vercel/postgres';
import { verifyAdminAuth, setSecurityHeaders } from './_lib/security.js';
import { DEFAULT_PROPERTIES, DEFAULT_SETTINGS, DEFAULT_MEDIA } from './_lib/defaults.js';

async function initCmsDatabase() {
  if (!process.env.POSTGRES_URL) return false;

  await sql`
    CREATE TABLE IF NOT EXISTS cms_properties (
      id SERIAL PRIMARY KEY,
      code VARCHAR(50),
      title VARCHAR(255) NOT NULL,
      modal_title VARCHAR(255),
      category VARCHAR(100) DEFAULT 'In Evidenza',
      location VARCHAR(255) NOT NULL,
      price VARCHAR(100) DEFAULT 'Trattativa Riservata',
      surface VARCHAR(100) DEFAULT '',
      rooms VARCHAR(100) DEFAULT '',
      bathrooms VARCHAR(100) DEFAULT '',
      floor VARCHAR(100) DEFAULT '',
      ape_class VARCHAR(20) DEFAULT 'G',
      ape_epgl VARCHAR(100) DEFAULT '',
      main_image TEXT NOT NULL,
      gallery JSONB DEFAULT '[]'::jsonb,
      description TEXT DEFAULT '',
      visible BOOLEAN DEFAULT TRUE,
      sort_order INTEGER DEFAULT 0,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS cms_settings (
      key VARCHAR(100) PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS cms_media (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) DEFAULT 'Upload',
      mime_type VARCHAR(100) DEFAULT 'image/webp',
      size_bytes INTEGER DEFAULT 0,
      url TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Seed default properties if empty
  const { rows: propCount } = await sql`SELECT COUNT(*)::int AS cnt FROM cms_properties;`;
  if (!propCount[0] || propCount[0].cnt === 0) {
    for (const p of DEFAULT_PROPERTIES) {
      await sql`
        INSERT INTO cms_properties (
          code, title, modal_title, category, location, price,
          surface, rooms, bathrooms, floor, ape_class, ape_epgl,
          main_image, gallery, description, visible, sort_order
        ) VALUES (
          ${p.code}, ${p.title}, ${p.modal_title || p.title}, ${p.category},
          ${p.location}, ${p.price}, ${p.surface}, ${p.rooms}, ${p.bathrooms},
          ${p.floor}, ${p.ape_class}, ${p.ape_epgl}, ${p.main_image},
          ${JSON.stringify(p.gallery || [p.main_image])}::jsonb,
          ${p.description}, ${p.visible !== false}, ${p.sort_order || 1}
        );
      `;
    }
  }

  // Seed default settings if empty
  const { rows: setCount } = await sql`SELECT COUNT(*)::int AS cnt FROM cms_settings;`;
  if (!setCount[0] || setCount[0].cnt === 0) {
    for (const [k, v] of Object.entries(DEFAULT_SETTINGS)) {
      await sql`
        INSERT INTO cms_settings (key, value)
        VALUES (${k}, ${JSON.stringify(v)}::jsonb)
        ON CONFLICT (key) DO NOTHING;
      `;
    }
  }

  // Seed default media if empty
  const { rows: mediaCount } = await sql`SELECT COUNT(*)::int AS cnt FROM cms_media;`;
  if (!mediaCount[0] || mediaCount[0].cnt === 0) {
    for (const m of DEFAULT_MEDIA) {
      await sql`
        INSERT INTO cms_media (name, category, url)
        VALUES (${m.name}, ${m.category || 'Immobili'}, ${m.url});
      `;
    }
  }

  return true;
}

export default async function handler(req, res) {
  setSecurityHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // =========================================================================
  // GET /api/cms — Lettura pubblica di immobili, contenuti statici e media
  // =========================================================================
  if (req.method === 'GET') {
    try {
      const dbReady = await initCmsDatabase();
      if (!dbReady) {
        return res.status(200).json({
          success: true,
          dbConnected: false,
          properties: DEFAULT_PROPERTIES,
          settings: DEFAULT_SETTINGS,
          media: DEFAULT_MEDIA
        });
      }

      const { rows: properties } = await sql`
        SELECT * FROM cms_properties
        ORDER BY sort_order ASC, id ASC;
      `;

      const { rows: settingsRows } = await sql`SELECT key, value FROM cms_settings;`;
      const settings = { ...DEFAULT_SETTINGS };
      for (const row of settingsRows) {
        settings[row.key] = { ...(DEFAULT_SETTINGS[row.key] || {}), ...(row.value || {}) };
      }

      const { rows: media } = await sql`
        SELECT id, name, category, mime_type, size_bytes, url, created_at
        FROM cms_media
        ORDER BY id DESC;
      `;

      return res.status(200).json({
        success: true,
        dbConnected: true,
        properties,
        settings,
        media
      });
    } catch (err) {
      console.warn('[CMS GET Fallback]:', err.message);
      return res.status(200).json({
        success: true,
        dbConnected: false,
        properties: DEFAULT_PROPERTIES,
        settings: DEFAULT_SETTINGS,
        media: DEFAULT_MEDIA
      });
    }
  }

  // =========================================================================
  // ROTTE PROTETTE (POST, PUT, DELETE) — Richiedono Token JWT Amministratore
  // =========================================================================
  const admin = verifyAdminAuth(req);
  if (!admin) {
    return res.status(401).json({
      success: false,
      error: 'Accesso negato. Effettua il login come amministratore.'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const resource = body.resource || req.query?.resource || 'property';
    const dbReady = await initCmsDatabase();

    if (!dbReady) {
      return res.status(200).json({
        success: true,
        localMode: true,
        message: 'Operazione eseguita in modalità locale (POSTGRES_URL non configurato).'
      });
    }

    // -----------------------------------------------------------------------
    // 1. GESTIONE IMMOBILI (CRUD)
    // -----------------------------------------------------------------------
    if (resource === 'property') {
      if (req.method === 'POST') {
        const p = body.property || body;
        if (!p.title || !p.location) {
          return res.status(400).json({ success: false, error: 'Titolo e località sono obbligatori.' });
        }

        const galleryArr = Array.isArray(p.gallery) && p.gallery.length > 0
          ? p.gallery
          : [p.main_image || 'images/palazzina-strada-parco.jpg'];

        const { rows } = await sql`
          INSERT INTO cms_properties (
            code, title, modal_title, category, location, price,
            surface, rooms, bathrooms, floor, ape_class, ape_epgl,
            main_image, gallery, description, visible, sort_order
          ) VALUES (
            ${p.code || `PROP-${Date.now().toString().slice(-4)}`},
            ${p.title},
            ${p.modal_title || p.title},
            ${p.category || 'In Evidenza'},
            ${p.location},
            ${p.price || 'Trattativa Riservata'},
            ${p.surface || ''},
            ${p.rooms || ''},
            ${p.bathrooms || ''},
            ${p.floor || ''},
            ${p.ape_class || 'G'},
            ${p.ape_epgl || ''},
            ${p.main_image || galleryArr[0]},
            ${JSON.stringify(galleryArr)}::jsonb,
            ${p.description || ''},
            ${p.visible !== false},
            ${Number(p.sort_order) || 10}
          )
          RETURNING *;
        `;

        return res.status(201).json({
          success: true,
          message: 'Immobile aggiunto con successo.',
          property: rows[0]
        });
      }

      if (req.method === 'PUT') {
        const p = body.property || body;
        const propId = Number(p.id);
        if (!propId) {
          return res.status(400).json({ success: false, error: 'ID immobile mancante.' });
        }

        const galleryArr = Array.isArray(p.gallery) && p.gallery.length > 0
          ? p.gallery
          : [p.main_image || 'images/palazzina-strada-parco.jpg'];

        const { rows } = await sql`
          UPDATE cms_properties
          SET
            code = ${p.code || `PROP-0${propId}`},
            title = ${p.title},
            modal_title = ${p.modal_title || p.title},
            category = ${p.category || 'In Evidenza'},
            location = ${p.location},
            price = ${p.price || 'Trattativa Riservata'},
            surface = ${p.surface || ''},
            rooms = ${p.rooms || ''},
            bathrooms = ${p.bathrooms || ''},
            floor = ${p.floor || ''},
            ape_class = ${p.ape_class || 'G'},
            ape_epgl = ${p.ape_epgl || ''},
            main_image = ${p.main_image || galleryArr[0]},
            gallery = ${JSON.stringify(galleryArr)}::jsonb,
            description = ${p.description || ''},
            visible = ${p.visible !== false},
            sort_order = ${Number(p.sort_order) || 1},
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ${propId}
          RETURNING *;
        `;

        return res.status(200).json({
          success: true,
          message: 'Immobile aggiornato con successo.',
          property: rows[0]
        });
      }

      if (req.method === 'DELETE') {
        const propId = Number(body.id || req.query?.id);
        if (!propId) {
          return res.status(400).json({ success: false, error: 'ID immobile non specificato.' });
        }
        await sql`DELETE FROM cms_properties WHERE id = ${propId};`;
        return res.status(200).json({
          success: true,
          message: 'Immobile eliminato definitivamente.'
        });
      }
    }

    // -----------------------------------------------------------------------
    // 2. GESTIONE CONTENUTI STATICI DEL SITO (Hero, Chi Siamo, Contatti, Social)
    // -----------------------------------------------------------------------
    if (resource === 'settings') {
      if (req.method === 'POST' || req.method === 'PUT') {
        const settingsPayload = body.settings || {};
        for (const [sectionKey, sectionVal] of Object.entries(settingsPayload)) {
          await sql`
            INSERT INTO cms_settings (key, value, updated_at)
            VALUES (${sectionKey}, ${JSON.stringify(sectionVal)}::jsonb, CURRENT_TIMESTAMP)
            ON CONFLICT (key)
            DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP;
          `;
        }
        return res.status(200).json({
          success: true,
          message: 'Contenuti del sito salvati e pubblicati.'
        });
      }
    }

    // -----------------------------------------------------------------------
    // 3. GESTIONE IMMAGINI & MEDIA LIBRARY (Upload Ottimizzato & Eliminazione)
    // -----------------------------------------------------------------------
    if (resource === 'media') {
      if (req.method === 'POST') {
        const { name, category = 'Upload', mime_type = 'image/webp', size_bytes = 0, url } = body;
        if (!url || !name) {
          return res.status(400).json({ success: false, error: 'Nome file e dati immagine richiesti.' });
        }

        const { rows } = await sql`
          INSERT INTO cms_media (name, category, mime_type, size_bytes, url)
          VALUES (${name}, ${category}, ${mime_type}, ${Number(size_bytes) || 0}, ${url})
          RETURNING *;
        `;

        return res.status(201).json({
          success: true,
          message: 'Immagine caricata nella libreria.',
          media: rows[0]
        });
      }

      if (req.method === 'DELETE') {
        const mediaId = Number(body.id || req.query?.id);
        if (!mediaId) {
          return res.status(400).json({ success: false, error: 'ID immagine mancante.' });
        }
        await sql`DELETE FROM cms_media WHERE id = ${mediaId};`;
        return res.status(200).json({
          success: true,
          message: 'Immagine rimossa dalla libreria.'
        });
      }
    }

    return res.status(400).json({ success: false, error: 'Operazione o risorsa non riconosciuta.' });
  } catch (err) {
    console.error('[CMS API Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Errore interno durante il salvataggio nel CMS.'
    });
  }
}
