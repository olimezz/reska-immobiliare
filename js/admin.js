/**
 * RESKA IMMOBILIARE - CMS No-Code Dashboard Controller
 * Gestisce Autenticazione JWT, CRUD Immobili, Editor Contenuti Statici,
 * Compressione/Upload Immagini WebP e Visualizzazione Lead Protetta.
 */

(function () {
  'use strict';

  const STORAGE_CMS_KEY = 'reska_cms_state_v1';
  const STORAGE_AUTH_TOKEN = 'reska_cms_jwt_token';
  const STORAGE_LOCAL_ADMIN = 'reska_cms_admin_creds';

  const INITIAL_PROPERTIES = [
    {
      id: 1,
      code: 'PROP-01',
      title: 'Intera Palazzina Cielo-Terra sulla Strada Parco',
      modal_title: 'Intera Palazzina sulla Strada Parco',
      category: 'In Evidenza',
      location: 'Montesilvano (PE) • Strada Parco',
      price: 'Trattativa Riservata',
      surface: '~480 m²',
      rooms: '4 Piani',
      bathrooms: '4 Bagni',
      floor: 'Vicino Mare',
      ape_class: 'G',
      ape_epgl: '215,40 kWh/m² anno',
      main_image: 'images/palazzina-strada-parco.jpg',
      gallery: ['images/palazzina-strada-parco.jpg'],
      description: `<p>Montesilvano, in posizione privilegiata e altamente strategica prospiciente la rinomata isola ciclo-pedonale della <strong>Strada Parco</strong>, a brevissima distanza dalla spiaggia e da tutti i principali servizi cittadini.</p>
<p>Proponiamo prestigioso stabile cielo-terra anni '80 in ottime condizioni generali di manutenzione, disponibile per l'acquisto sia in blocco che con possibilità di frazionamento. La proprietà si articola su un livello seminterrato con comoda taverna e 3 ampi livelli fuori terra di circa 120 mq a piano, ideali per eleganti appartamenti indipendenti, studi professionali o attività ricettiva.</p>
<p>A coronare la palazzina, splendida mansarda con tetto in legno massello appena rifatto a nuovo (allo stato grezzo, pronta per finiture su misura). Straordinaria opportunità d'investimento ad altissimo potenziale di rivalutazione.</p>`,
      visible: true
    },
    {
      id: 2,
      code: 'PROP-02',
      title: 'Trilocale di Pregio in Classe A4 con Doppi Terrazzi',
      modal_title: 'Nuova Costruzione: Trilocale A4 con Doppi Terrazzi',
      category: 'Nuova Costruzione',
      location: 'Montesilvano (PE) • Via Marinelli',
      price: 'Trattativa Riservata',
      surface: '100 m²',
      rooms: '3 Locali (2 Camere)',
      bathrooms: '2 Bagni',
      floor: '3° Piano',
      ape_class: 'A4',
      ape_epgl: '18,20 kWh/m² anno (NZEB)',
      main_image: 'images/casa2.webp',
      gallery: ['images/casa2.webp', 'images/casa2.jpg'],
      description: `<p>Nel cuore più servito e strategico di <strong>Montesilvano</strong>, in <strong>Via Marinelli</strong> — con accesso immediato a piedi a ogni servizio primario — proponiamo in vendita esclusivo <strong>appartamento trilocale in Classe Energetica A4</strong>, posizionato al terzo piano di un prestigioso edificio di nuova costruzione.</p>
<p><strong>Spazi Luminosi & Spettacolari Terrazzi Vivibili:</strong><br>
L'appartamento sviluppa una superficie di <strong>100 mq commerciali</strong> ed è caratterizzato da soggiorno open space con angolo cottura, doppio terrazzo abitabile, camera matrimoniale con bagno privato en-suite, seconda camera e secondo bagno completo.</p>
<ul>
  <li><strong>100% Gas-Free:</strong> Pompa di calore autonoma per riscaldamento e raffrescamento.</li>
  <li><strong>Solare Termico Dedicato & Fotovoltaico Condominiale.</strong></li>
  <li><strong>Isolamento Termo-Acustico Totale:</strong> Infissi con vetrocamera a gas Argon e tapparelle elettriche motorizzate.</li>
</ul>`,
      visible: true
    }
  ];

  // Endpoint Cloud condiviso: usa automaticamente il backend live anche se admin.html viene aperto in locale sul Mac/PC
  const API_BASE = (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'https://reska-immobiliare.vercel.app'
    : '';

  const INITIAL_SETTINGS = {
    hero: {
      badge: 'Rete Partner Certificata • Qualità Garantita',
      title_before: 'Trova la Casa dei Tuoi Sogni o Vendi al ',
      title_highlight: 'Massimo Valore',
      title_after: ' di Mercato.',
      description: 'Con RESKA IMMOBILIARE accedi a perizie certificate in 24h, una rete di acquirenti pre-qualificati e le migliori soluzioni immobiliari selezionate dai nostri esperti.',
      benefit1: 'Valutazione gratuita e riservata del tuo immobile in 24 ore',
      benefit2: 'Accesso prioritario a immobili fuori mercato e off-market',
      benefit3: 'Assistenza legale, fiscale e notarile fino al rogito',
      hero_image: 'images/hero.jpg'
    },
    about: {
      badge: 'Il Metodo RESKA',
      title: 'Perché Scegliere RESKA IMMOBILIARE',
      subtitle: 'Un approccio dinamico, basato su strategie di marketing digitale avanzate e un database proprietario di acquirenti qualificati per massimizzare il valore del tuo immobile.',
      feat1_title: 'Servizi Fotografici & Virtual Tour 3D',
      feat1_desc: "Valorizziamo la tua proprietà con home staging virtuale, riprese aeree drone e virtual tour interattivi ad altissima definizione per catturare l'attenzione dei migliori acquirenti.",
      feat2_title: 'Clientela Pre-qualificata dal Network',
      feat2_desc: 'Grazie alla nostra rete partner affiliata, incrociamo istantaneamente la tua casa con oltre 4.000 profili acquirenti con budget verificato e delibera redditizia già approvata.',
      feat3_title: 'Conformità Urbanistica & Catastale',
      feat3_desc: "Eseguiamo un check preventivo su planimetrie, provenienze e certificazioni energetiche per garantire una trattativa limpida, solida e senza brutte sorprese all'atto notarile.",
      feat4_title: 'Tempi di Vendita Record al Miglior Prezzo',
      feat4_desc: 'I nostri immobili trovano un compratore in una media di soli 48 giorni, con un margine di trattativa inferiore al 3,5% rispetto al prezzo concordato in fase di perizia iniziale.'
    },
    contacts: {
      phone_display: '+39 328 291 2552',
      phone_raw: '+393282912552',
      whatsapp_number: '393282912552',
      email: 'info@reska-immobiliare.it',
      pec: 'reskaimmobiliare@pec.it',
      address: 'Via Napoli, 23',
      footer_about: "RESKA IMMOBILIARE è il punto di riferimento per l'intermediazione, la stima e la compravendita di immobili residenziali e commerciali di pregio. Assistenza d'eccellenza, conformità urbanistico-catastale e trasparenza in ogni fase del percorso immobiliare."
    },
    social: {
      instagram_handle: '@reska_immobiliare',
      instagram_url: 'https://www.instagram.com/reska_immobiliare/',
      facebook_name: 'Reska Immobiliare',
      facebook_url: 'https://www.facebook.com/reskaimmobiliare',
      tiktok_handle: '@reskaimmobiliare',
      tiktok_url: 'https://www.tiktok.com/@reskaimmobiliare'
    }
  };

  const INITIAL_MEDIA = [
    { id: 1, name: 'Palazzina Strada Parco', url: 'images/palazzina-strada-parco.jpg', category: 'Immobili' },
    { id: 2, name: 'Trilocale Classe A4 (WebP)', url: 'images/casa2.webp', category: 'Immobili' },
    { id: 3, name: 'Hero Villa Tramonto', url: 'images/hero.jpg', category: 'Banner' },
    { id: 4, name: 'Immobile Residenziale 1', url: 'images/property-1.jpg', category: 'Archivio' },
    { id: 5, name: 'Immobile Residenziale 2', url: 'images/property-2.jpg', category: 'Archivio' },
    { id: 6, name: 'Immobile Residenziale 3', url: 'images/property-3.jpg', category: 'Archivio' }
  ];

  let cmsState = {
    properties: [...INITIAL_PROPERTIES],
    settings: JSON.parse(JSON.stringify(INITIAL_SETTINGS)),
    media: [...INITIAL_MEDIA]
  };

  let currentEditingGallery = [];

  function escapeHTML(str) {
    return String(str || '').replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  function showToast(msg, isError = false) {
    const toast = document.getElementById('cmsToast');
    const text = document.getElementById('cmsToastText');
    if (!toast || !text) return;
    text.textContent = msg;
    toast.style.borderLeft = isError ? '4px solid #EF4444' : '4px solid #10B981';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  function getAuthToken() {
    return sessionStorage.getItem(STORAGE_AUTH_TOKEN) || localStorage.getItem(STORAGE_AUTH_TOKEN) || '';
  }

  function setAuthToken(token) {
    if (token) {
      sessionStorage.setItem(STORAGE_AUTH_TOKEN, token);
      try { localStorage.setItem(STORAGE_AUTH_TOKEN, token); } catch (_e) {}
    } else {
      sessionStorage.removeItem(STORAGE_AUTH_TOKEN);
      try { localStorage.removeItem(STORAGE_AUTH_TOKEN); } catch (_e) {}
    }
  }

  function loadLocalCmsState() {
    try {
      const raw = localStorage.getItem(STORAGE_CMS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.properties)) cmsState.properties = parsed.properties;
        if (parsed.settings) cmsState.settings = { ...INITIAL_SETTINGS, ...parsed.settings };
        if (Array.isArray(parsed.media)) cmsState.media = parsed.media;
      }
    } catch (_e) {
      // Ignore storage errors
    }
  }

  function saveLocalCmsState() {
    try {
      localStorage.setItem(STORAGE_CMS_KEY, JSON.stringify(cmsState));
    } catch (_e) {
      // Se localStorage è pieno (es. troppe foto ad alta risoluzione), non blocca il salvataggio Cloud
    }
  }

  // Web Crypto SHA-256 helper per verifica password quando eseguito in locale senza backend Node attivo
  async function sha256Hex(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function verifyLocalCredentials(email, password) {
    const storedRaw = localStorage.getItem(STORAGE_LOCAL_ADMIN);
    const defaultEmail = 'admin@reska-immobiliare.it';
    // SHA-256 di "ReskaAdmin2026!" con salt "reska_salt_v1:"
    const defaultHash = await sha256Hex('reska_salt_v1:ReskaAdmin2026!');

    let expectedEmail = defaultEmail;
    let expectedHash = defaultHash;

    if (storedRaw) {
      try {
        const parsed = JSON.parse(storedRaw);
        if (parsed.email && parsed.passwordHash) {
          expectedEmail = parsed.email.toLowerCase().trim();
          expectedHash = parsed.passwordHash;
        }
      } catch (_e) {}
    }

    const inputHash = await sha256Hex('reska_salt_v1:' + password);
    return email.toLowerCase().trim() === expectedEmail && inputHash === expectedHash;
  }

  // Compressione & conversione automatica immagine (WebP + fallback JPEG per iPhone/iOS Safari)
  function compressAndOptimizeImage(file, maxWidth = 1000, quality = 0.75) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (ev) {
        const img = new Image();
        img.onload = function () {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth || height > maxWidth) {
            if (width >= height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxWidth) / height);
              height = maxWidth;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          // Su iOS Safari toDataURL('image/webp') non è supportato e restituirebbe un PNG enorme non compresso:
          // verifichiamo il mime effettivo e usiamo image/jpeg compresso come fallback universale mobile/desktop
          let dataUrl = canvas.toDataURL('image/webp', quality);
          let mimeType = 'image/webp';
          let ext = '.webp';
          if (!dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
            mimeType = 'image/jpeg';
            ext = '.jpg';
          }

          resolve({
            name: file.name.replace(/\.[^.]+$/, '') + ext,
            mime_type: mimeType,
            size_bytes: Math.round((dataUrl.length * 3) / 4),
            url: dataUrl
          });
        };
        img.onerror = reject;
        img.src = ev.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // =========================================================================
  // INIZIALIZZAZIONE E AUTENTICAZIONE
  // =========================================================================
  document.addEventListener('DOMContentLoaded', async function () {
    loadLocalCmsState();

    const loginView = document.getElementById('loginView');
    const dashboardView = document.getElementById('dashboardView');
    const loginForm = document.getElementById('loginForm');
    const loginAlert = document.getElementById('loginAlert');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const loginPasswordInput = document.getElementById('loginPassword');

    if (togglePasswordBtn && loginPasswordInput) {
      togglePasswordBtn.addEventListener('click', () => {
        const isPwd = loginPasswordInput.type === 'password';
        loginPasswordInput.type = isPwd ? 'text' : 'password';
        togglePasswordBtn.textContent = isPwd ? 'Nascondi' : 'Mostra';
      });
    }

    async function enterDashboard(adminObj) {
      loginView.style.display = 'none';
      dashboardView.classList.add('active');
      const emailLbl = document.getElementById('adminEmailLabel');
      const secEmail = document.getElementById('secNewEmail');
      if (emailLbl && adminObj?.email) emailLbl.textContent = adminObj.email;
      if (secEmail && adminObj?.email) secEmail.value = adminObj.email;

      await fetchCmsDataFromServer();
      renderPropertiesGrid();
      populateSettingsForm();
      renderMediaLibrary();
      fetchLeads();
    }

    // Controlla se esiste già una sessione valida sul server Cloud
    const existingToken = getAuthToken();
    if (existingToken && !existingToken.startsWith('local_jwt_')) {
      try {
        const res = await fetch(`${API_BASE}/api/auth`, {
          headers: { Authorization: `Bearer ${existingToken}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            await enterDashboard(data.admin);
            return;
          }
        }
        setAuthToken('');
      } catch (_err) {}
    } else if (existingToken && existingToken.startsWith('local_jwt_')) {
      setAuthToken('');
    }

    // Login Form Submit
    if (loginForm) {
      loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        loginAlert.classList.remove('show');
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const submitBtn = document.getElementById('loginSubmitBtn');
        submitBtn.disabled = true;

        try {
          const response = await fetch(`${API_BASE}/api/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login', email, password })
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.token) {
              setAuthToken(data.token);
              sessionStorage.setItem('reska_cms_admin_email', data.admin.email);
              await enterDashboard(data.admin);
              showToast('Accesso amministratore effettuato con successo!');
              submitBtn.disabled = false;
              return;
            }
          } else if (response.status === 401 || response.status === 429) {
            const errData = await response.json().catch(() => ({}));
            loginAlert.textContent = errData.error || 'Email o password non validi.';
            loginAlert.classList.add('show');
            submitBtn.disabled = false;
            return;
          }
        } catch (_networkErr) {
          // Fallback offline solo se non c'è connessione internet
        }

        const validLocal = await verifyLocalCredentials(email, password);
        if (validLocal) {
          const localToken = 'local_jwt_' + Date.now();
          setAuthToken(localToken);
          sessionStorage.setItem('reska_cms_admin_email', email);
          await enterDashboard({ email });
          showToast('Accesso effettuato (Modalità Offline).');
        } else {
          loginAlert.textContent = 'Credenziali non valide. Verifica email e password.';
          loginAlert.classList.add('show');
        }
        submitBtn.disabled = false;
      });
    }

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', async () => {
      try {
        await fetch(`${API_BASE}/api/auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'logout' })
        });
      } catch (_e) {}
      setAuthToken('');
      sessionStorage.removeItem('reska_cms_admin_email');
      dashboardView.classList.remove('active');
      loginView.style.display = 'flex';
      showToast('Sessione chiusa correttamente.');
    });

    // Navigazione Tab Sidebar
    const tabTitles = {
      tabProperties: 'Gestione Immobili in Vetrina',
      tabContent: 'Modifica Testi & Contenuti Statici del Sito',
      tabMedia: 'Sistema di Gestione Immagini & Media',
      tabLeads: 'Richieste Clienti & Lead Ricevuti',
      tabSecurity: 'Sicurezza & Credenziali Amministratore'
    };

    document.querySelectorAll('.sidebar-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        document.querySelectorAll('.sidebar-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.cms-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(targetId)?.classList.add('active');
        const titleEl = document.getElementById('topbarTitle');
        if (titleEl && tabTitles[targetId]) titleEl.textContent = tabTitles[targetId];
      });
    });

    // =======================================================================
    // SINCRONIZZAZIONE CON SERVER / DATABASE CLOUD
    // =======================================================================
    async function fetchCmsDataFromServer() {
      const syncStatus = document.getElementById('cmsSyncStatus');
      const dbNotice = document.getElementById('dbSyncNotice');

      try {
        const res = await fetch(`${API_BASE}/api/cms?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.dbConnected) {
            cmsState.properties = data.properties || INITIAL_PROPERTIES;
            cmsState.settings = { ...INITIAL_SETTINGS, ...(data.settings || {}) };
            cmsState.media = data.media || INITIAL_MEDIA;
            saveLocalCmsState();

            if (syncStatus) {
              syncStatus.style.background = '#ECFDF5';
              syncStatus.style.borderColor = '#A7F3D0';
              syncStatus.style.color = '#047857';
              syncStatus.innerHTML = '<span class="status-pill-dot" style="background:#10B981;"></span><span>Database Cloud Connesso (Telefono + PC)</span>';
            }
            if (dbNotice) dbNotice.style.display = 'none';
          } else {
            if (syncStatus) {
              syncStatus.style.background = '#FFFBEB';
              syncStatus.style.borderColor = '#FCD34D';
              syncStatus.style.color = '#B45309';
              syncStatus.innerHTML = '<span class="status-pill-dot" style="background:#F59E0B;"></span><span>Modalità Locale (Solo questo dispositivo)</span>';
            }
            if (dbNotice) dbNotice.style.display = 'block';
          }
        }
      } catch (_e) {
        if (syncStatus) {
          syncStatus.style.background = '#FFFBEB';
          syncStatus.style.borderColor = '#FCD34D';
          syncStatus.style.color = '#B45309';
          syncStatus.innerHTML = '<span class="status-pill-dot" style="background:#F59E0B;"></span><span>Modalità Offline</span>';
        }
        if (dbNotice) dbNotice.style.display = 'block';
      }
    }

    // =======================================================================
    // 1. GESTIONE IMMOBILI (CRUD + GALLERIA + WYSIWYG)
    // =======================================================================
    function renderPropertiesGrid() {
      const grid = document.getElementById('adminPropertiesGrid');
      const countBadge = document.getElementById('propCountBadge');
      if (!grid) return;

      const list = cmsState.properties || [];
      if (countBadge) countBadge.textContent = String(list.length);

      if (list.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 36px; color: var(--text-muted);">Nessun immobile presente. Clicca su "+ Aggiungi Nuovo Immobile" per iniziare.</div>`;
        return;
      }

      grid.innerHTML = list.map(p => `
        <article class="admin-prop-card">
          <div class="admin-prop-thumb">
            <img src="${escapeHTML(p.main_image || 'images/palazzina-strada-parco.jpg')}" alt="${escapeHTML(p.title)}">
            <span class="admin-prop-badge">${escapeHTML(p.category || 'In Evidenza')}</span>
            <span class="admin-prop-ape">APE: ${escapeHTML(p.ape_class || 'G')}</span>
            <span class="admin-prop-price">${escapeHTML(p.price || 'Trattativa Riservata')}</span>
          </div>
          <div class="admin-prop-body">
            <div class="admin-prop-loc">${escapeHTML(p.location)}</div>
            <h3 class="admin-prop-title">${escapeHTML(p.title)}</h3>
            <div class="admin-prop-meta">
              ${p.surface ? `<span>📐 ${escapeHTML(p.surface)}</span>` : ''}
              ${p.rooms ? `<span>🛏️ ${escapeHTML(p.rooms)}</span>` : ''}
              ${p.bathrooms ? `<span>🚿 ${escapeHTML(p.bathrooms)}</span>` : ''}
              <span>🖼️ ${(Array.isArray(p.gallery) ? p.gallery.length : 1)} foto</span>
            </div>
            <div class="admin-prop-actions">
              <button type="button" class="btn btn-outline btn-sm" style="flex:1;" data-edit-prop="${p.id}">
                ✏️ Modifica
              </button>
              <button type="button" class="btn btn-danger btn-sm" data-delete-prop="${p.id}">
                🗑️ Elimina
              </button>
            </div>
          </div>
        </article>
      `).join('');

      grid.querySelectorAll('[data-edit-prop]').forEach(btn => {
        btn.addEventListener('click', () => openPropertyEditor(Number(btn.getAttribute('data-edit-prop'))));
      });

      grid.querySelectorAll('[data-delete-prop]').forEach(btn => {
        btn.addEventListener('click', () => deleteProperty(Number(btn.getAttribute('data-delete-prop'))));
      });
    }

    function renderGalleryThumbsInModal() {
      const container = document.getElementById('propGalleryPreviewList');
      if (!container) return;

      if (currentEditingGallery.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; font-size: 0.8rem; color: var(--text-muted);">Nessuna foto selezionata. Carica almeno un'immagine.</div>`;
        return;
      }

      container.innerHTML = currentEditingGallery.map((imgUrl, idx) => `
        <div class="gallery-thumb-item ${idx === 0 ? 'is-main' : ''}" title="${idx === 0 ? 'Immagine Principale di Copertina' : 'Clicca sulla stella per impostare come principale'}">
          <img src="${escapeHTML(imgUrl)}" alt="Foto ${idx + 1}">
          ${idx === 0 ? '<span class="gallery-thumb-main-tag">Copertina</span>' : `<button type="button" class="gallery-thumb-main-tag" style="background: rgba(15,23,42,0.8); border:none; cursor:pointer;" data-make-main="${idx}">★ Copertina</button>`}
          <button type="button" class="gallery-thumb-remove" data-remove-gal="${idx}" title="Rimuovi foto">✕</button>
        </div>
      `).join('');

      container.querySelectorAll('[data-remove-gal]').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = Number(btn.getAttribute('data-remove-gal'));
          currentEditingGallery.splice(i, 1);
          renderGalleryThumbsInModal();
        });
      });

      container.querySelectorAll('[data-make-main]').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = Number(btn.getAttribute('data-make-main'));
          const [picked] = currentEditingGallery.splice(i, 1);
          currentEditingGallery.unshift(picked);
          renderGalleryThumbsInModal();
        });
      });
    }

    function openPropertyEditor(propId = null) {
      const modal = document.getElementById('propertyEditorModal');
      const modalTitle = document.getElementById('propEditorModalTitle');
      const editor = document.getElementById('editPropDescriptionEditor');

      if (propId) {
        const prop = cmsState.properties.find(p => Number(p.id) === Number(propId));
        if (!prop) return;
        modalTitle.textContent = `Modifica Immobile: ${prop.title}`;
        document.getElementById('editPropId').value = prop.id;
        document.getElementById('editPropTitle').value = prop.title || '';
        document.getElementById('editPropCategory').value = prop.category || 'In Evidenza';
        document.getElementById('editPropLocation').value = prop.location || '';
        document.getElementById('editPropPrice').value = prop.price || 'Trattativa Riservata';
        document.getElementById('editPropSurface').value = prop.surface || '';
        document.getElementById('editPropRooms').value = prop.rooms || '';
        document.getElementById('editPropBathrooms').value = prop.bathrooms || '';
        document.getElementById('editPropFloor').value = prop.floor || '';
        document.getElementById('editPropApeClass').value = prop.ape_class || 'G';
        document.getElementById('editPropApeEpgl').value = prop.ape_epgl || '';
        if (editor) editor.innerHTML = prop.description || '';
        currentEditingGallery = Array.isArray(prop.gallery) && prop.gallery.length > 0
          ? [...prop.gallery]
          : (prop.main_image ? [prop.main_image] : []);
      } else {
        modalTitle.textContent = 'Aggiungi Nuovo Immobile';
        document.getElementById('propertyEditorForm').reset();
        document.getElementById('editPropId').value = '';
        document.getElementById('editPropPrice').value = 'Trattativa Riservata';
        document.getElementById('editPropApeClass').value = 'A4';
        if (editor) {
          editor.innerHTML = '<p>Inserisci qui la descrizione dettagliata dell\'immobile, le caratteristiche interne e i punti di forza della zona...</p>';
        }
        currentEditingGallery = ['images/property-1.jpg'];
      }

      renderGalleryThumbsInModal();
      modal.classList.add('active');
    }

    function closePropertyEditor() {
      document.getElementById('propertyEditorModal')?.classList.remove('active');
    }

    document.getElementById('btnAddProperty')?.addEventListener('click', () => openPropertyEditor(null));
    document.getElementById('btnQuickNewProperty')?.addEventListener('click', () => openPropertyEditor(null));
    document.getElementById('closePropEditorBtn')?.addEventListener('click', closePropertyEditor);
    document.getElementById('cancelPropEditorBtn')?.addEventListener('click', closePropertyEditor);

    // Upload immagini nella galleria dell'immobile
    document.getElementById('propGalleryUploadInput')?.addEventListener('change', async function (e) {
      const files = Array.from(e.target.files || []);
      for (const file of files) {
        try {
          const optimized = await compressAndOptimizeImage(file);
          currentEditingGallery.push(optimized.url);
          cmsState.media.unshift({
            id: Date.now() + Math.floor(Math.random() * 1000),
            name: optimized.name,
            category: 'Immobili',
            url: optimized.url
          });
        } catch (_err) {
          showToast('Impossibile elaborare una delle immagini selezionate.', true);
        }
      }
      renderGalleryThumbsInModal();
      renderMediaLibrary();
      e.target.value = '';
    });

    document.getElementById('btnAddManualImageUrl')?.addEventListener('click', () => {
      const inp = document.getElementById('propManualImageUrl');
      const val = inp?.value.trim();
      if (val) {
        currentEditingGallery.push(val);
        inp.value = '';
        renderGalleryThumbsInModal();
      }
    });

    // Toolbar Editor WYSIWYG
    document.querySelectorAll('.wysiwyg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        const val = btn.getAttribute('data-val') || null;
        document.execCommand(cmd, false, val);
        document.getElementById('editPropDescriptionEditor')?.focus();
      });
    });

    // Salvataggio Immobile (Add / Edit)
    document.getElementById('propertyEditorForm')?.addEventListener('submit', async function (e) {
      e.preventDefault();
      const editId = document.getElementById('editPropId').value;
      const gallery = currentEditingGallery.length > 0 ? [...currentEditingGallery] : ['images/property-1.jpg'];

      const propertyObj = {
        id: editId ? Number(editId) : undefined,
        code: editId ? `PROP-0${editId}` : `PROP-${Date.now().toString().slice(-3)}`,
        title: document.getElementById('editPropTitle').value.trim(),
        modal_title: document.getElementById('editPropTitle').value.trim(),
        category: document.getElementById('editPropCategory').value,
        location: document.getElementById('editPropLocation').value.trim(),
        price: document.getElementById('editPropPrice').value.trim() || 'Trattativa Riservata',
        surface: document.getElementById('editPropSurface').value.trim(),
        rooms: document.getElementById('editPropRooms').value.trim(),
        bathrooms: document.getElementById('editPropBathrooms').value.trim(),
        floor: document.getElementById('editPropFloor').value.trim(),
        ape_class: document.getElementById('editPropApeClass').value,
        ape_epgl: document.getElementById('editPropApeEpgl').value.trim() || 'In fase di rilascio',
        main_image: gallery[0],
        gallery,
        description: document.getElementById('editPropDescriptionEditor').innerHTML,
        visible: true
      };

      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const res = await fetch(`${API_BASE}/api/cms`, {
          method: editId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`
          },
          body: JSON.stringify({ resource: 'property', property: propertyObj })
        });

        if (res.status === 401) {
          showToast('Sessione scaduta: effettua nuovamente il login.', true);
          setAuthToken('');
          dashboardView.classList.remove('active');
          loginView.style.display = 'flex';
          if (submitBtn) submitBtn.disabled = false;
          return;
        }

        if (!res.ok) {
          const errJson = await res.json().catch(() => ({}));
          showToast(errJson.error || `Errore salvataggio Cloud (HTTP ${res.status}). Riprova con meno foto.`, true);
          if (submitBtn) submitBtn.disabled = false;
          return;
        }

        await fetchCmsDataFromServer();
        renderPropertiesGrid();
        closePropertyEditor();
        showToast(editId ? 'Immobile aggiornato sul Cloud (visibile su Telefono e PC)!' : 'Nuovo immobile pubblicato sul Cloud (visibile su Telefono e PC)!');
      } catch (_err) {
        showToast('Errore di rete durante la sincronizzazione con il server Cloud.', true);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });

    async function deleteProperty(propId) {
      const target = cmsState.properties.find(p => Number(p.id) === Number(propId));
      if (!target) return;
      if (!window.confirm(`Vuoi davvero eliminare l'immobile "${target.title}" dalla vetrina?`)) return;

      try {
        const res = await fetch(`${API_BASE}/api/cms?resource=property&id=${propId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`
          },
          body: JSON.stringify({ resource: 'property', id: propId })
        });

        if (res.status === 401) {
          showToast('Sessione scaduta: effettua nuovamente il login.', true);
          setAuthToken('');
          dashboardView.classList.remove('active');
          loginView.style.display = 'flex';
          return;
        }

        await fetchCmsDataFromServer();
        renderPropertiesGrid();
        showToast('Immobile rimosso dal Cloud (aggiornato su Telefono e PC).');
      } catch (_e) {
        showToast('Errore di rete durante l\'eliminazione.', true);
      }
    }

    // =======================================================================
    // 2. GESTIONE CONTENUTI STATICI DEL SITO (HOME, CHI SIAMO, CONTATTI, SOCIAL)
    // =======================================================================
    function populateSettingsForm() {
      const s = cmsState.settings || INITIAL_SETTINGS;
      const hero = s.hero || {};
      const about = s.about || {};
      const contacts = s.contacts || {};
      const social = s.social || {};

      const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || '';
      };

      setVal('set_hero_badge', hero.badge);
      setVal('set_hero_image', hero.hero_image);
      setVal('set_hero_title_before', hero.title_before);
      setVal('set_hero_title_highlight', hero.title_highlight);
      setVal('set_hero_title_after', hero.title_after);
      setVal('set_hero_description', hero.description);
      setVal('set_hero_benefit1', hero.benefit1);
      setVal('set_hero_benefit2', hero.benefit2);
      setVal('set_hero_benefit3', hero.benefit3);

      setVal('set_about_badge', about.badge);
      setVal('set_about_title', about.title);
      setVal('set_about_subtitle', about.subtitle);
      setVal('set_about_feat1_title', about.feat1_title);
      setVal('set_about_feat1_desc', about.feat1_desc);
      setVal('set_about_feat2_title', about.feat2_title);
      setVal('set_about_feat2_desc', about.feat2_desc);
      setVal('set_about_feat3_title', about.feat3_title);
      setVal('set_about_feat3_desc', about.feat3_desc);
      setVal('set_about_feat4_title', about.feat4_title);
      setVal('set_about_feat4_desc', about.feat4_desc);

      setVal('set_contacts_phone_display', contacts.phone_display);
      setVal('set_contacts_whatsapp', contacts.whatsapp_number);
      setVal('set_contacts_email', contacts.email);
      setVal('set_contacts_pec', contacts.pec);
      setVal('set_contacts_address', contacts.address);
      setVal('set_contacts_footer_about', contacts.footer_about);

      setVal('set_social_ig_handle', social.instagram_handle);
      setVal('set_social_ig_url', social.instagram_url);
      setVal('set_social_fb_name', social.facebook_name);
      setVal('set_social_fb_url', social.facebook_url);
      setVal('set_social_tt_handle', social.tiktok_handle);
      setVal('set_social_tt_url', social.tiktok_url);
    }

    document.getElementById('staticContentForm')?.addEventListener('submit', async function (e) {
      e.preventDefault();
      const getVal = id => document.getElementById(id)?.value.trim() || '';
      const phoneDisplay = getVal('set_contacts_phone_display') || '+39 328 291 2552';

      cmsState.settings = {
        hero: {
          badge: getVal('set_hero_badge'),
          hero_image: getVal('set_hero_image') || 'images/hero.jpg',
          title_before: document.getElementById('set_hero_title_before')?.value || '',
          title_highlight: getVal('set_hero_title_highlight'),
          title_after: document.getElementById('set_hero_title_after')?.value || '',
          description: getVal('set_hero_description'),
          benefit1: getVal('set_hero_benefit1'),
          benefit2: getVal('set_hero_benefit2'),
          benefit3: getVal('set_hero_benefit3')
        },
        about: {
          badge: getVal('set_about_badge'),
          title: getVal('set_about_title'),
          subtitle: getVal('set_about_subtitle'),
          feat1_title: getVal('set_about_feat1_title'),
          feat1_desc: getVal('set_about_feat1_desc'),
          feat2_title: getVal('set_about_feat2_title'),
          feat2_desc: getVal('set_about_feat2_desc'),
          feat3_title: getVal('set_about_feat3_title'),
          feat3_desc: getVal('set_about_feat3_desc'),
          feat4_title: getVal('set_about_feat4_title'),
          feat4_desc: getVal('set_about_feat4_desc')
        },
        contacts: {
          phone_display: phoneDisplay,
          phone_raw: phoneDisplay.replace(/\s+/g, ''),
          whatsapp_number: getVal('set_contacts_whatsapp').replace(/\D/g, ''),
          email: getVal('set_contacts_email'),
          pec: getVal('set_contacts_pec'),
          address: getVal('set_contacts_address'),
          footer_about: getVal('set_contacts_footer_about')
        },
        social: {
          instagram_handle: getVal('set_social_ig_handle'),
          instagram_url: getVal('set_social_ig_url'),
          facebook_name: getVal('set_social_fb_name'),
          facebook_url: getVal('set_social_fb_url'),
          tiktok_handle: getVal('set_social_tt_handle'),
          tiktok_url: getVal('set_social_tt_url')
        }
      };

      saveLocalCmsState();

      try {
        const res = await fetch(`${API_BASE}/api/cms`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`
          },
          body: JSON.stringify({ resource: 'settings', settings: cmsState.settings })
        });

        if (res.status === 401) {
          showToast('Sessione scaduta: effettua nuovamente il login.', true);
          setAuthToken('');
          dashboardView.classList.remove('active');
          loginView.style.display = 'flex';
          return;
        }

        if (!res.ok) {
          showToast('Errore durante il salvataggio dei contenuti sul server.', true);
          return;
        }

        await fetchCmsDataFromServer();
        populateSettingsForm();
        showToast('Contenuti salvati sul Cloud (aggiornati su Telefono e PC)!');
      } catch (_err) {
        showToast('Errore di rete durante il salvataggio dei contenuti.', true);
      }
    });

    document.getElementById('btnResetDefaultContent')?.addEventListener('click', () => {
      if (!window.confirm('Ripristinare tutti i testi statici ai valori originali?')) return;
      cmsState.settings = JSON.parse(JSON.stringify(INITIAL_SETTINGS));
      saveLocalCmsState();
      populateSettingsForm();
      showToast('Testi predefiniti ripristinati nel form (clicca Salva per pubblicare).');
    });

    // =======================================================================
    // 3. LIBRERIA IMMAGINI & UPLOAD OTTIMIZZATO
    // =======================================================================
    const dropzone = document.getElementById('mediaUploadDropzone');
    const fileInput = document.getElementById('mediaFileInput');

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());
      dropzone.addEventListener('dragover', e => {
        e.preventDefault();
        dropzone.style.borderColor = '#FF6600';
      });
      dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = '#CBD5E1';
      });
      dropzone.addEventListener('drop', async e => {
        e.preventDefault();
        dropzone.style.borderColor = '#CBD5E1';
        const files = Array.from(e.dataTransfer?.files || []);
        await handleMediaUploadFiles(files);
      });
      fileInput.addEventListener('change', async e => {
        const files = Array.from(e.target.files || []);
        await handleMediaUploadFiles(files);
        e.target.value = '';
      });
    }

    async function handleMediaUploadFiles(files) {
      for (const file of files) {
        try {
          const optimized = await compressAndOptimizeImage(file);
          const newItem = {
            name: optimized.name,
            category: 'Upload',
            mime_type: optimized.mime_type,
            size_bytes: optimized.size_bytes,
            url: optimized.url
          };

          const res = await fetch(`${API_BASE}/api/cms`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify({ resource: 'media', ...newItem })
          });

          if (!res.ok) {
            showToast(`Errore salvataggio Cloud per ${file.name}`, true);
          }
        } catch (_err) {
          showToast(`Errore durante l'ottimizzazione di ${file.name}`, true);
        }
      }
      await fetchCmsDataFromServer();
      renderMediaLibrary();
      showToast('Immagini ottimizzate e salvate nella libreria Cloud!');
    }

    function renderMediaLibrary() {
      const grid = document.getElementById('mediaLibraryGrid');
      const badge = document.getElementById('mediaCountBadge');
      if (!grid) return;

      const list = cmsState.media || [];
      if (badge) badge.textContent = String(list.length);

      grid.innerHTML = list.map(m => `
        <div class="media-card">
          <div class="media-card-img">
            <img src="${escapeHTML(m.url)}" alt="${escapeHTML(m.name)}" loading="lazy">
          </div>
          <div class="media-card-body">
            <div class="media-card-name" title="${escapeHTML(m.name)}">${escapeHTML(m.name)}</div>
            <div style="display: flex; gap: 6px;">
              <button type="button" class="btn btn-outline btn-sm" style="flex:1; padding: 5px 8px; font-size: 0.72rem;" data-copy-media="${escapeHTML(m.url)}">
                Copia URL
              </button>
              <button type="button" class="btn btn-danger btn-sm" style="padding: 5px 8px; font-size: 0.72rem;" data-del-media="${m.id}">
                ✕
              </button>
            </div>
          </div>
        </div>
      `).join('');

      grid.querySelectorAll('[data-copy-media]').forEach(btn => {
        btn.addEventListener('click', () => {
          const url = btn.getAttribute('data-copy-media');
          navigator.clipboard?.writeText(url);
          showToast('Percorso/URL immagine copiato negli appunti!');
        });
      });

      grid.querySelectorAll('[data-del-media]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = Number(btn.getAttribute('data-del-media'));
          if (!window.confirm('Eliminare questa immagine dalla libreria?')) return;

          try {
            await fetch(`${API_BASE}/api/cms?resource=media&id=${id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${getAuthToken()}` }
            });
            await fetchCmsDataFromServer();
            renderMediaLibrary();
            showToast('Immagine rimossa dalla libreria Cloud.');
          } catch (_e) {
            showToast('Errore durante la rimozione dell\'immagine.', true);
          }
        });
      });
    }

    // =======================================================================
    // 4. VISUALIZZAZIONE LEAD CLIENTI
    // =======================================================================
    async function fetchLeads() {
      const tbody = document.getElementById('leadsTableBody');
      if (!tbody) return;

      try {
        const res = await fetch(`${API_BASE}/api/get-leads?t=${Date.now()}`, {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
          cache: 'no-store'
        });
        if (res.ok) {
          const data = await res.json();
          const leads = data.leads || [];
          if (leads.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--text-muted);">Nessuna richiesta contatto presente nel database.</td></tr>`;
            return;
          }
          tbody.innerHTML = leads.map(l => `
            <tr>
              <td style="white-space:nowrap;">${new Date(l.created_at).toLocaleDateString('it-IT')}</td>
              <td><strong>${escapeHTML(l.nome)}</strong></td>
              <td>
                <a href="tel:${escapeHTML(l.telefono)}" style="color: var(--primary); font-weight:700; text-decoration:none;">${escapeHTML(l.telefono)}</a><br>
                <span style="font-size: 0.78rem; color: var(--text-muted);">${escapeHTML(l.email || '')}</span>
              </td>
              <td>${escapeHTML(l.immobile_nome || l.cosa_cerchi || l.form_type || 'Consulenza')}</td>
              <td><span class="status-pill">GDPR OK</span></td>
              <td>
                <a href="https://wa.me/${String(l.telefono || '').replace(/\D/g, '')}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">WhatsApp</a>
              </td>
            </tr>
          `).join('');
          return;
        }
      } catch (_e) {}

      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--text-muted);">Impossibile caricare le richieste contatto in questo momento.</td></tr>`;
    }

    document.getElementById('btnRefreshLeads')?.addEventListener('click', fetchLeads);

    // =======================================================================
    // 5. AGGIORNAMENTO CREDENZIALI ADMIN
    // =======================================================================
    document.getElementById('changePasswordForm')?.addEventListener('submit', async function (e) {
      e.preventDefault();
      const newEmail = document.getElementById('secNewEmail').value.trim().toLowerCase();
      const currentPassword = document.getElementById('secCurrentPassword').value;
      const newPassword = document.getElementById('secNewPassword').value;

      if (newPassword.length < 8) {
        showToast('La nuova password deve avere almeno 8 caratteri.', true);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`
          },
          body: JSON.stringify({
            action: 'change-password',
            currentPassword,
            newEmail,
            newPassword
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.token) setAuthToken(data.token);
        } else if (res.status === 403) {
          showToast('La password attuale inserita non è corretta.', true);
          return;
        }
      } catch (_err) {
        const validLocal = await verifyLocalCredentials(
          sessionStorage.getItem('reska_cms_admin_email') || 'admin@reska-immobiliare.it',
          currentPassword
        );
        if (!validLocal) {
          showToast('La password attuale non è corretta.', true);
          return;
        }
      }

      const newHash = await sha256Hex('reska_salt_v1:' + newPassword);
      localStorage.setItem(STORAGE_LOCAL_ADMIN, JSON.stringify({
        email: newEmail,
        passwordHash: newHash
      }));
      sessionStorage.setItem('reska_cms_admin_email', newEmail);
      document.getElementById('adminEmailLabel').textContent = newEmail;
      document.getElementById('secCurrentPassword').value = '';
      document.getElementById('secNewPassword').value = '';
      showToast('Credenziali amministratore aggiornate con successo!');
    });
  });
})();
