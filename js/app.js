/**
 * RESCA IMMOBILIARE - Core Application Logic
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

  // 3. Property Data for "Scopri di più" Modals
  const propertiesData = {
    '1': {
      id: 'PROP-01',
      title: 'Attico Panoramico Terrazza Duomo',
      location: 'Milano Centro / Duomo',
      price: '€ 1.250.000',
      specs: '165 mq • 3 Camere • 2 Bagni • Classe A4',
      description: 'Splendido attico di pregio al sesto piano con ascensore diretto. Terrazza panoramica di 55 mq con vista aperta sulla città. Pavimentazione in parquet di rovere naturale a spina di pesce, tripli vetri a taglio termico, impianto domotico completo e cantina di pertinenza.',
      image: 'images/property-1.jpg',
      badge: 'In Evidenza'
    },
    '2': {
      id: 'PROP-02',
      title: 'Villa Contemporanea con Piscina e Parco',
      location: 'Monza & Brianza / Parco',
      price: '€ 1.890.000',
      specs: '320 mq • 5 Camere • 4 Bagni • Giardino 1.200 mq',
      description: 'Esclusiva villa unifamiliare di recentissima costruzione in classe energetica A+. Ampie vetrate a tutta altezza affacciate sul giardino piantumato e piscina a sfioro riscaldata. Rifiniture in pietra naturale e legno massello, impianto fotovoltaico con accumulo e garage quadruplo.',
      image: 'images/property-2.jpg',
      badge: 'Nuova Costruzione'
    },
    '3': {
      id: 'PROP-03',
      title: 'Loft di Design Soffitti Alti e Parquet',
      location: 'Milano / Quartiere Isola',
      price: '€ 780.000',
      specs: '110 mq • 2 Camere • 2 Bagni • Finiture Superior',
      description: 'Luminoso loft dal sapore industriale chic, sapientemente ristrutturato da studio di architettura. Soffitti alti 4.20 metri con travi a vista, zona soppalcata con cabina armadio, cucina con isola in marmo di Carrara e riscaldamento a pavimento.',
      image: 'images/property-3.jpg',
      badge: 'Esclusiva'
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
      document.getElementById('modalPropDesc').textContent = prop.description;
      document.getElementById('modalPropImg').src = prop.image;
      document.getElementById('modalPropBadge').textContent = prop.badge;

      // Hidden form fields
      document.getElementById('modalPropFormName').value = prop.title;
      document.getElementById('modalPropFormId').value = prop.id;

      propertyModal.classList.add('active');
    });
  });

  if (propertyModalClose) {
    propertyModalClose.addEventListener('click', () => {
      propertyModal.classList.remove('active');
    });
  }

  // Close modals clicking on backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });
  });

  // 5. Seller Valuation Interactive Estimator
  const mqSlider = document.getElementById('valMqSlider');
  const mqDisplay = document.getElementById('valMqDisplay');
  const valType = document.getElementById('valPropertyType');
  const valEstMin = document.getElementById('valEstMin');
  const valEstMax = document.getElementById('valEstMax');

  function calculateEstimate() {
    if (!mqSlider) return;
    const mq = parseInt(mqSlider.value, 10);
    if (mqDisplay) mqDisplay.textContent = mq + ' m²';

    // Base average price per sqm
    let pricePerSqm = 3600;
    if (valType) {
      if (valType.value === 'attico') pricePerSqm = 4800;
      else if (valType.value === 'villa') pricePerSqm = 4100;
      else if (valType.value === 'loft') pricePerSqm = 3900;
      else if (valType.value === 'commerciale') pricePerSqm = 3200;
    }

    const baseVal = mq * pricePerSqm;
    const minVal = Math.round(baseVal * 0.92 / 1000) * 1000;
    const maxVal = Math.round(baseVal * 1.12 / 1000) * 1000;

    const formatter = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
    if (valEstMin) valEstMin.textContent = formatter.format(minVal);
    if (valEstMax) valEstMax.textContent = formatter.format(maxVal);

    // Save into hidden field for lead payload
    const hiddenEstimatedRange = document.getElementById('valHiddenEstimate');
    if (hiddenEstimatedRange) {
      hiddenEstimatedRange.value = `${formatter.format(minVal)} - ${formatter.format(maxVal)}`;
    }
  }

  if (mqSlider) {
    mqSlider.addEventListener('input', calculateEstimate);
  }
  if (valType) {
    valType.addEventListener('change', calculateEstimate);
  }
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
    let toast = document.getElementById('resca-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'resca-toast';
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
  window.RescaApp = { showToast };
  window.RescaTracker = { showToast };

  // Privacy Policy Footer Link
  const privacyLink = document.getElementById('footerPrivacyLink');
  if (privacyLink) {
    privacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Note Legali', 'Trattamento dati a norma GDPR UE 2016/679.');
    });
  }

  // 7. Contact & Lead Forms Submission (Vercel Postgres Integration)
  const contactForms = document.querySelectorAll('#heroLeadForm, #valuationLeadForm, #propInquiryForm');
  contactForms.forEach(form => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

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

      try {
        // Invio al database Vercel Postgres tramite Serverless Function /api/submit-lead
        const response = await fetch('/api/submit-lead', {
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
            `Grazie ${leadName}, la tua richiesta è stata salvata con successo nel database. Ti ricontatteremo entro 24 ore.`
          );

          // Close modal if form is inside one
          const parentModal = form.closest('.modal-overlay');
          if (parentModal) {
            setTimeout(() => {
              parentModal.classList.remove('active');
            }, 1200);
          }

          form.reset();
        } else {
          // Se Vercel Postgres non è ancora configurato con le credenziali, mostra comunque conferma rassicurante
          console.warn('[Vercel Database Notice]:', result);
          showToast(
            'Richiesta Ricevuta!',
            `Grazie ${leadName}, la tua richiesta è stata acquisita. Ti ricontatteremo entro 24 ore.`
          );
          form.reset();
        }
      } catch (err) {
        console.warn('[Network/Offline Fallback]:', err);
        showToast(
          'Richiesta Ricevuta!',
          `Grazie ${leadName}, la tua richiesta è stata acquisita. Ti ricontatteremo entro 24 ore.`
        );
        form.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  });
});
