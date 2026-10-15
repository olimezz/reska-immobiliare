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

  // 3. Property Data for "Scopri di più" Modals
  const propertiesData = {
    '1': {
      id: 'PROP-01',
      title: 'Intera Palazzina sulla Strada Parco',
      location: 'Montesilvano (PE) • Prospiciente Strada Parco',
      price: 'Trattativa Riservata',
      specs: '~480 mq totali (120 mq per piano) • 4 Livelli • Mansarda con tetto nuovo • A pochi passi dalla Spiaggia',
      description: `
        <p>Montesilvano, in posizione privilegiata e altamente strategica prospiciente la rinomata isola ciclo-pedonale della <strong>Strada Parco</strong>, a brevissima distanza dalla spiaggia e da tutti i principali servizi cittadini.</p>
        <p>Proponiamo prestigioso stabile cielo-terra anni '80 in ottime condizioni generali di manutenzione, disponibile per l'acquisto sia in blocco che con possibilità di frazionamento. La proprietà si articola su un livello seminterrato con comoda taverna e 3 ampi livelli fuori terra di circa 120 mq a piano, ideali per eleganti appartamenti indipendenti, studi professionali o attività ricettiva.</p>
        <p>A coronare la palazzina, splendida mansarda con tetto in legno massello appena rifatto a nuovo (allo stato grezzo, pronta per finiture su misura). Straordinaria opportunità d'investimento ad altissimo potenziale di rivalutazione.</p>
      `,
      image: 'images/palazzina-strada-parco.jpg',
      badge: 'In Evidenza'
    },
    '2': {
      id: 'PROP-02',
      title: 'Nuova Costruzione: Trilocale A4 con Doppi Terrazzi',
      location: 'Montesilvano (PE) • Via Marinelli',
      price: 'Trattativa Riservata',
      specs: '100 mq commerciali • 3° Piano • Classe A4 • Doppi Terrazzi • 2 Bagni • 100% Gas-Free',
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

        <p>Una proposta immobiliare introvabile sul mercato di Montesilvano, che unisce il privilegio di vivere a piedi ogni servizio, il comfort impagabile degli sfoghi esterni vivibili e la certezza della classe energetica A4, a tutela del valore del proprio investimento nel tempo.</p>
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
