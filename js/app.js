/**
 * RESKA IMMOBILIARE - Core Application Logic
 * Interactive Property Modals, Valuation Step Estimator & UI
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile menu toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileMenuDrawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });

    // Close when clicking links
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // 3. Property Data for "Scopri di più" Modals (Conformità APE ex D.Lgs. 192/2005)
  const propertiesData = {
    '1': {
      id: 'PROP-01',
      title: 'Intera Palazzina sulla Strada Parco',
      location: 'Montesilvano (PE) • Prospiciente Strada Parco',
      price: 'Trattativa Riservata',
      specs: '~480 mq totali (120 mq per piano) • 4 Livelli • Classe Energetica: G (EPgl,nren 215,40 kWh/m²a) • Vicino Mare',
      description: `
        <p>Montesilvano, in posizione privilegiata e altamente strategica prospiciente la rinomata isola ciclo-pedonale della <strong>Strada Parco</strong>, a brevissima distanza dalla spiaggia e da tutti i principali servizi cittadini.</p>
        <p>Proponiamo prestigioso stabile cielo-terra anni '80 in ottime condizioni generali di manutenzione, disponibile per l'acquisto sia in blocco che con possibilità di frazionamento. La proprietà si articola su un livello seminterrato con comoda taverna e 3 ampi livelli fuori terra di circa 120 mq a piano, ideali per eleganti appartamenti indipendenti, studi professionali o attività ricettiva.</p>
        <p>A coronare la palazzina, splendida mansarda con tetto in legno massello appena rifatto a nuovo (allo stato grezzo, pronta per finiture su misura). Straordinaria opportunità d'investimento ad altissimo potenziale di rivalutazione.</p>
        <div class="ape-legal-spec">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          <span><strong>Attestato di Prestazione Energetica (D.Lgs. 192/2005):</strong> Classe G • Indice EPgl,nren: 215,40 kWh/m² anno.</span>
        </div>
      `,
      image: 'images/palazzina-strada-parco.jpg',
      badge: 'In Evidenza'
    },
    '2': {
      id: 'PROP-02',
      title: 'Nuova Costruzione: Trilocale A4 con Doppi Terrazzi',
      location: 'Montesilvano (PE) • Via Marinelli',
      price: 'Trattativa Riservata',
      specs: '100 mq commerciali • 3° Piano • Classe Energetica: A4 (EPgl,nren 18,20 kWh/m²a - NZEB) • Doppi Terrazzi • 2 Bagni • 100% Gas-Free',
      description: `
        <p>Nel cuore più servito e strategico di <strong>Montesilvano</strong>, in <strong>Via Marinelli</strong> — con accesso immediato a piedi a ogni servizio primario (supermercati, scuole, farmacie, fermate dei trasporti e a brevissima distanza dal mare e dalla Strada Parco) — proponiamo in vendita esclusivo <strong>appartamento trilocale in Classe Energetica A4</strong>, posizionato al terzo piano di un prestigioso edificio di nuova costruzione con linee architettoniche moderne e curate nei minimi dettagli.</p>
        
        <p><strong>Spazi Luminosi & Spettacolari Terrazzi Vivibili:</strong><br>
        L'appartamento sviluppa una superficie di <strong>100 mq commerciali</strong> ed è caratterizzato da una distribuzione degli ambienti impeccabile, studiata per massimizzare luminosità e vivibilità:</p>
        <ul>
          <li><strong>Zona Giorno:</strong> Ingresso accogliente che si apre su un luminoso soggiorno open space con angolo cottura a vista, incorniciato da ampie vetrate che conducono a uno splendido <em>doppio terrazzo abitabile</em> — ideale per cene all'aperto, aperitivi e momenti di relax in totale privacy — a cui si aggiunge un ulteriore balcone di servizio.</li>
          <li><strong>Zona Notte:</strong> Comodo disimpegno che conduce alla <em>suite matrimoniale con elegante bagno padronale privato en-suite</em>, a una luminosa seconda camera ideale per figli o smart working, e al secondo raffinato bagno completo.</li>
        </ul>

        <p><strong>Efficienza Energetica A4 & Tecnologia 100% Gas-Free:</strong><br>
        Una vera casa del futuro concepita per annullare gli sprechi, proteggere l'ambiente e azzerare i costi di gestione:</p>
        <ul>
          <li><strong>100% Gas-Free:</strong> Impianto autonomo a pompa di calore di ultima generazione per riscaldamento e raffrescamento a zero emissioni dirette.</li>
          <li><strong>Solare Termico Autonomo Dedicato:</strong> 2 pannelli solari con 2 serbatoi di accumulo esclusivi per la produzione dell'acqua calda sanitaria del singolo appartamento.</li>
          <li><strong>Impianto Fotovoltaico Condominiale:</strong> Per l'abbattimento drastico delle spese mensili di gestione delle parti comuni.</li>
          <li><strong>Isolamento Termo-Acustico Totale:</strong> Cappotto termico ad alte prestazioni e infissi all'avanguardia con vetrocamera a <em>gas Argon</em>, capaci di garantire silenzio assoluto e comfort climatico ideale 365 giorni l'anno.</li>
          <li><strong>Comfort Smart:</strong> Tapparelle elettriche motorizzate e coibentate.</li>
          <li><strong>Finiture di Alto Pregio:</strong> Pavimenti e rivestimenti di design, dettagli contemporanei e capitolato di qualità superiore.</li>
        </ul>

        <div class="ape-legal-spec">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          <span><strong>Attestato di Prestazione Energetica (D.Lgs. 192/2005):</strong> Classe A4 • Indice EPgl,nren: 18,20 kWh/m² anno (Edificio a Energia Quasi Zero - NZEB).</span>
        </div>
      `,
      image: 'images/casa2.webp',
      badge: 'Nuova Costruzione'
    }
  };

  // 4. Property Modal Handler
  const propertyModal = document.getElementById('propertyModal');
  const propertyModalClose = document.getElementById('propertyModalClose');
  const learnMoreButtons = document.querySelectorAll('.btn-property-detail');

  learnMoreButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const propId = this.getAttribute('data-property-id');
      const prop = propertiesData[propId];
      if (!prop) return;

      document.getElementById('modalPropTitle').textContent = prop.title;
      document.getElementById('modalPropLocation').textContent = prop.location;
      document.getElementById('modalPropPrice').textContent = prop.price;
      document.getElementById('modalPropSpecs').textContent = prop.specs;
      document.getElementById('modalPropDesc').innerHTML = prop.description;
      document.getElementById('modalPropImg').src = prop.image;
      document.getElementById('modalPropBadge').textContent = prop.badge;

      // Hidden form fields
      document.getElementById('modalPropFormName').value = prop.title;
      document.getElementById('modalPropFormId').value = prop.id;

      propertyModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (propertyModalClose) {
    propertyModalClose.addEventListener('click', () => {
      propertyModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close modals clicking on backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // 5. Seller Valuation Interactive Estimator (Calibrato su Pescara e Area Metropolitana)
  const mqSlider = document.getElementById('valMqSlider');
  const mqDisplay = document.getElementById('valMqDisplay');
  const valType = document.getElementById('valPropertyType');
  const valZone = document.getElementById('valZone');
  const valCondition = document.getElementById('valCondition');
  const valFloor = document.getElementById('valFloor');
  const valGarage = document.getElementById('valGarage');
  const valEstMin = document.getElementById('valEstMin');
  const valEstMax = document.getElementById('valEstMax');

  // Quotazioni medie al m² basate sui dati OMI per l'area metropolitana di Pescara e Chieti
  const zonePricingMap = {
    'pescara_centro': 2350,
    'pescara_riviera': 2550,
    'pescara_portanuova': 1750,
    'pescara_colli': 1550,
    'montesilvano_spiaggia': 1850,
    'montesilvano_centro': 1500,
    'francavilla': 1750,
    'spoltore': 1500,
    'citta_santangelo': 1450,
    'silvi': 1600,
    'sambuceto': 1450,
    'altro': 1650
  };

  function calculateEstimate() {
    if (!mqSlider) return;
    const mq = parseInt(mqSlider.value, 10);
    if (mqDisplay) mqDisplay.textContent = mq + ' m²';

    // Base price per sqm by selected zone
    const selectedZone = valZone ? valZone.value : 'pescara_centro';
    let pricePerSqm = zonePricingMap[selectedZone] || 2000;

    // Typology coefficient
    if (valType) {
      if (valType.value === 'attico') pricePerSqm *= 1.25;
      else if (valType.value === 'villa') pricePerSqm *= 1.15;
      else if (valType.value === 'indipendente') pricePerSqm *= 1.10;
      else if (valType.value === 'commerciale') pricePerSqm *= 0.90;
    }

    // Condition coefficient
    if (valCondition) {
      if (valCondition.value === 'nuova_costruzione') pricePerSqm *= 1.18;
      else if (valCondition.value === 'ottimo_ristrutturato') pricePerSqm *= 1.10;
      else if (valCondition.value === 'da_ristrutturare') pricePerSqm *= 0.82;
    }

    // Floor & Exposure coefficient
    if (valFloor) {
      if (valFloor.value === 'ultimo_piano_attico') pricePerSqm *= 1.08;
      else if (valFloor.value === 'piano_terra_giardino') pricePerSqm *= 1.05;
      else if (valFloor.value === 'piano_senza_ascensore') pricePerSqm *= 0.88;
    }

    let baseVal = mq * pricePerSqm;

    // Garage add-on value typical of Pescara area
    if (valGarage) {
      if (valGarage.value === 'garage_privato') baseVal += 22000;
      else if (valGarage.value === 'garage_doppio') baseVal += 35000;
      else if (valGarage.value === 'posto_auto_condominiale') baseVal += 8000;
    }

    const minVal = Math.round((baseVal * 0.92) / 1000) * 1000;
    const maxVal = Math.round((baseVal * 1.10) / 1000) * 1000;

    const formatter = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
    if (valEstMin) valEstMin.textContent = formatter.format(minVal);
    if (valEstMax) valEstMax.textContent = formatter.format(maxVal);

    // Save into hidden field for lead payload
    const hiddenEstimatedRange = document.getElementById('valHiddenEstimate');
    if (hiddenEstimatedRange) {
      hiddenEstimatedRange.value = `${formatter.format(minVal)} - ${formatter.format(maxVal)}`;
    }
  }

  [mqSlider, valType, valZone, valCondition, valFloor, valGarage].forEach(el => {
    if (el) {
      el.addEventListener('input', calculateEstimate);
      el.addEventListener('change', calculateEstimate);
    }
  });
  calculateEstimate();

  // Valuation Steps Navigation
  const valStep1 = document.getElementById('valStep1');
  const valStep2 = document.getElementById('valStep2');
  const valInd1 = document.getElementById('valInd1');
  const valInd2 = document.getElementById('valInd2');
  const btnNextVal = document.getElementById('btnNextVal');
  const btnBackVal = document.getElementById('btnBackVal');

  if (btnNextVal) {
    btnNextVal.addEventListener('click', () => {
      // Validate Step 1
      const cityInput = document.getElementById('valCity');
      if (cityInput && !cityInput.value.trim()) {
        cityInput.focus();
        cityInput.style.borderColor = '#EF4444';
        return;
      }
      if (cityInput) cityInput.style.borderColor = '';

      valStep1.classList.remove('active');
      valStep2.classList.add('active');
      valInd1.classList.remove('active');
      valInd2.classList.add('active');
    });
  }

  if (btnBackVal) {
    btnBackVal.addEventListener('click', () => {
      valStep2.classList.remove('active');
      valStep1.classList.add('active');
      valInd2.classList.remove('active');
      valInd1.classList.add('active');
    });
  }

  // 6. Toast Notification UI
  function showToast(title, message, isError = false) {
    let toast = document.getElementById('reska-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'reska-toast';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="toast-icon" style="${isError ? 'background: #EF4444;' : 'background: #FF6600;'}">
        ${isError ? '✕' : '✓'}
      </div>
      <div>
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 6000);
  }

  // Expose global helpers
  window.ReskaApp = { showToast };
  window.ReskaTracker = { showToast };

  // ==========================================================================
  // 6. LEGAL MODALS MANAGER (GDPR Artt. 13-14, D.Lgs. 70/2003, D.Lgs. 206/2005)
  // ==========================================================================
  function openLegalModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLegalModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    // Verifica se ci sono altre modali aperte prima di ripristinare lo scroll
    const openModals = document.querySelectorAll('.modal-overlay.active');
    if (openModals.length === 0) {
      document.body.style.overflow = '';
    }
  }

  // Event listener per tutti i trigger legali
  document.querySelectorAll('.legal-modal-trigger, [data-modal]').forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-modal') || this.getAttribute('href')?.replace('#', '');
      if (targetId) {
        openLegalModal(targetId);
      }
    });
  });

  // Chiusura tramite pulsanti con data-close-modal
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', function () {
      const modalId = this.getAttribute('data-close-modal');
      const targetModal = document.getElementById(modalId) || this.closest('.modal-overlay');
      closeLegalModal(targetModal);
    });
  });

  // Chiusura con tasto ESC (Accessibilità WCAG 2.1 AA / European Accessibility Act)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const activeModals = document.querySelectorAll('.modal-overlay.active');
      activeModals.forEach(m => closeLegalModal(m));
    }
  });

  // ==========================================================================
  // 7. COOKIE CONSENT MANAGEMENT SYSTEM (Linee Guida Garante Privacy 10/06/2021)
  // ==========================================================================
  const COOKIE_CONSENT_KEY = 'reska_cookie_consent_v1';
  const CONSENT_VALIDITY_DAYS = 180; // 6 Mesi (come prescritto dal Garante)

  const cookieBanner = document.getElementById('cookieBanner');
  const cookieBadge = document.getElementById('cookieConsentBadge');
  const btnAcceptAll = document.getElementById('btnAcceptAllCookies');
  const btnRejectAll = document.getElementById('btnRejectCookies');
  const btnCloseX = document.getElementById('cookieBannerCloseX');
  const btnManage = document.getElementById('btnManageCookies');
  const footerManageLink = document.getElementById('footerManageCookiesLink');

  // Modale preferenze
  const prefAnalytics = document.getElementById('cookiePrefAnalytics');
  const prefMarketing = document.getElementById('cookiePrefMarketing');
  const btnSavePrefs = document.getElementById('btnSaveCookiePreferences');
  const btnModalReject = document.getElementById('btnRejectAllInModal');
  const btnModalAccept = document.getElementById('btnAcceptAllInModal');

  function getStoredConsent() {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      if (!parsed.timestamp) return null;

      const consentDate = new Date(parsed.timestamp);
      const now = new Date();
      const diffDays = (now - consentDate) / (1000 * 60 * 60 * 24);

      if (diffDays > CONSENT_VALIDITY_DAYS) {
        // Consenso scaduto, riproporre scelta
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        return null;
      }
      return parsed;
    } catch (_e) {
      return null;
    }
  }

  function saveConsent(analyticsAllowed, marketingAllowed) {
    const consentObj = {
      necessary: true,
      analytics: Boolean(analyticsAllowed),
      marketing: Boolean(marketingAllowed),
      timestamp: new Date().toISOString(),
      policyVersion: '2026.1'
    };

    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentObj));
    } catch (_e) {
      // Storage fallback
    }

    if (cookieBanner) {
      cookieBanner.style.display = 'none';
    }

    // Aggiorna checkbox nella modale impostazioni
    if (prefAnalytics) prefAnalytics.checked = consentObj.analytics;
    if (prefMarketing) prefMarketing.checked = consentObj.marketing;

    // Chiudi modale impostazioni se aperta
    const modalSettings = document.getElementById('modalCookieSettings');
    if (modalSettings && modalSettings.classList.contains('active')) {
      closeLegalModal(modalSettings);
    }

    const message = (consentObj.analytics || consentObj.marketing)
      ? 'Preferenze cookie salvate con successo.'
      : 'Hai scelto di proseguire utilizzando solo i cookie tecnici essenziali.';
    showToast('Preferenze Privacy Aggiornate', message);
  }

  // Inizializzazione Cookie Banner
  const currentConsent = getStoredConsent();
  if (!currentConsent) {
    // Nessun consenso valido: mostra il banner
    if (cookieBanner) {
      cookieBanner.style.display = 'block';
    }
  } else {
    // Sincronizza checkbox
    if (prefAnalytics) prefAnalytics.checked = currentConsent.analytics;
    if (prefMarketing) prefMarketing.checked = currentConsent.marketing;
  }

  // Gestione pulsanti banner
  if (btnAcceptAll) {
    btnAcceptAll.addEventListener('click', () => saveConsent(true, true));
  }
  if (btnRejectAll) {
    btnRejectAll.addEventListener('click', () => saveConsent(false, false));
  }
  if (btnCloseX) {
    // La chiusura tramite 'X' equivale a mantenere le impostazioni predefinite (solo tecnici)
    btnCloseX.addEventListener('click', () => saveConsent(false, false));
  }
  if (btnManage) {
    btnManage.addEventListener('click', () => {
      openLegalModal('modalCookieSettings');
    });
  }

  // Floating badge e link footer per riaprire le preferenze cookie in ogni momento
  if (cookieBadge) {
    cookieBadge.addEventListener('click', () => {
      openLegalModal('modalCookieSettings');
    });
  }
  if (footerManageLink) {
    footerManageLink.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('modalCookieSettings');
    });
  }

  // Pulsanti modale preferenze
  if (btnSavePrefs) {
    btnSavePrefs.addEventListener('click', () => {
      const a = prefAnalytics ? prefAnalytics.checked : false;
      const m = prefMarketing ? prefMarketing.checked : false;
      saveConsent(a, m);
    });
  }
  if (btnModalReject) {
    btnModalReject.addEventListener('click', () => saveConsent(false, false));
  }
  if (btnModalAccept) {
    btnModalAccept.addEventListener('click', () => saveConsent(true, true));
  }

  // ==========================================================================
  // 8. CONTACT & LEAD FORMS SUBMISSION (Vercel Postgres & GDPR Validation)
  // ==========================================================================
  const contactForms = document.querySelectorAll('#heroLeadForm, #valuationLeadForm, #propInquiryForm');
  contactForms.forEach(form => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Validazione Consenso Privacy (GDPR UE 2016/679)
      const privacyCheck = form.querySelector('input[name="privacy_consent"]');
      if (privacyCheck && !privacyCheck.checked) {
        showToast('Consenso Obbligatorio', 'Per inviare la richiesta è necessario accettare l\'Informativa sulla Privacy.', true);
        privacyCheck.focus();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

      // UI Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite; margin-right: 6px; vertical-align: middle;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          Salvataggio richiesta in corso...
        `;
      }

      const formData = new FormData(form);
      const leadName = formData.get('nome') || formData.get('name') || 'Gentile Cliente';
      const payload = {};
      formData.forEach((value, key) => {
        payload[key] = value;
      });

      // Assicurati che i campi di consenso GDPR siano valorizzati
      if (!payload.privacy_consent) {
        payload.privacy_consent = 'on';
      }

      try {
        // Endpoint API: punta al backend Vercel anche quando visitato da GitHub Pages o locale
        const apiEndpoint = window.location.origin.includes('vercel.app')
          ? '/api/submit-lead'
          : 'https://reska-immobiliare.vercel.app/api/submit-lead';

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showToast(
            'Richiesta Registrata!',
            `Grazie ${leadName}, la tua richiesta è stata salvata con successo. Ti ricontatteremo entro 24 ore.`
          );

          // Close modal if form is inside one
          const parentModal = form.closest('.modal-overlay');
          if (parentModal) {
            setTimeout(() => {
              closeLegalModal(parentModal);
            }, 1200);
          }

          form.reset();
        } else {
          console.error('[Vercel Database Error]:', result);
          showToast(
            'Attenzione: Database Non Connesso',
            result.error || 'La variabile POSTGRES_URL non è ancora collegata al progetto su Vercel.',
            true
          );
        }
      } catch (err) {
        console.error('[Network Error]:', err);
        showToast(
          'Errore di Connessione',
          'Impossibile raggiungere il server. Verifica la connessione di rete.',
          true
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  });
});
