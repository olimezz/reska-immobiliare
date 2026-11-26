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

  function escapeHTML(str) {
    return String(str || '').replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
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
      gallery: [
        'images/palazzina-strada-parco.jpg',
        'images/palazzina-vista-frontale.jpg',
        'images/palazzina-dettaglio-piani.jpg'
      ],
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
      gallery: [
        'images/casa2.webp',
        'images/casa2-render-notte.jpg',
        'images/casa2-planimetria-3d.jpg'
      ],
      badge: 'Nuova Costruzione'
    }
  };

  function isVideoMedia(src) {
    return /\.(mp4|mov|webm|m4v)(\?.*)?$/i.test(String(src || '')) || /^data:video\//i.test(String(src || ''));
  }

  // 4. Property Modal Handler & Dynamic Hover Auto-Slideshow
  const propertyModal = document.getElementById('propertyModal');
  const propertyModalClose = document.getElementById('propertyModalClose');

  function showModalMedia(src, title) {
    const mainImgEl = document.getElementById('modalPropImg');
    const mainVidEl = document.getElementById('modalPropVideo');
    if (isVideoMedia(src)) {
      if (mainImgEl) mainImgEl.style.display = 'none';
      if (mainVidEl) {
        mainVidEl.style.display = 'block';
        mainVidEl.src = src;
        mainVidEl.currentTime = 0;
        mainVidEl.play().catch(() => {});
      }
    } else {
      if (mainVidEl) {
        mainVidEl.pause();
        mainVidEl.removeAttribute('src');
        mainVidEl.style.display = 'none';
      }
      if (mainImgEl) {
        mainImgEl.style.display = 'block';
        mainImgEl.src = src;
        mainImgEl.alt = title || 'Immobile';
      }
    }
  }

  // 4. Dynamic Property Media Sliders (Mobile-First Touch Swipe, Viewport Auto-Cycle & Desktop Hover)
  let propertyIntersectionObserver = null;

  function initPropertyHoverSliders() {
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia('(pointer: coarse)').matches;

    if (!propertyIntersectionObserver && 'IntersectionObserver' in window) {
      propertyIntersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const card = entry.target;
          const handler = card._sliderHandler;
          if (!handler) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            handler.onInView(true);
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
            handler.onInView(false);
          }
        });
      }, {
        threshold: [0.15, 0.35, 0.6]
      });
    }

    document.querySelectorAll('.property-card').forEach(card => {
      if (card.dataset.hoverSliderBound === '1') return;
      card.dataset.hoverSliderBound = '1';

      const imgWrapper = card.querySelector('.property-img-wrapper');
      const slides = Array.from(card.querySelectorAll('.property-media-slide'));
      const dots = Array.from(card.querySelectorAll('.property-slide-dot'));
      const progressBar = card.querySelector('.property-hover-progress-bar');
      if (slides.length <= 1) return;

      let currentIdx = 0;
      let timerId = null;
      let isHovered = false;
      let isInView = false;
      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;

      function activateSlide(nextIdx) {
        currentIdx = (nextIdx + slides.length) % slides.length;
        slides.forEach((sl, idx) => {
          const isActive = idx === currentIdx;
          sl.classList.toggle('active', isActive);
          if (sl.tagName === 'VIDEO') {
            if (isActive && (isHovered || isInView)) {
              sl.currentTime = 0;
              sl.play().catch(() => {});
            } else {
              sl.pause();
            }
          }
        });
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIdx);
        });
      }

      function scheduleNextSlide(customDelayMs) {
        clearTimeout(timerId);
        const shouldRun = isHovered || (isTouchDevice && isInView);
        if (!shouldRun) return;

        const activeSlide = slides[currentIdx];
        const isVideo = activeSlide && activeSlide.tagName === 'VIDEO';
        const duration = customDelayMs || (isVideo ? 5200 : (isTouchDevice ? 2700 : 1900));

        if (progressBar) {
          progressBar.style.transition = 'none';
          progressBar.style.width = '0%';
          void progressBar.offsetWidth;
          progressBar.style.transition = `width ${duration}ms linear`;
          progressBar.style.width = '100%';
        }

        timerId = setTimeout(() => {
          const stillRunning = isHovered || (isTouchDevice && isInView);
          if (!stillRunning) return;
          activateSlide(currentIdx + 1);
          scheduleNextSlide();
        }, duration);
      }

      function stopSliding() {
        clearTimeout(timerId);
        card.classList.remove('is-sliding');
        if (progressBar) {
          progressBar.style.transition = 'none';
          progressBar.style.width = '0%';
        }
        const activeSlide = slides[currentIdx];
        if (activeSlide && activeSlide.tagName === 'VIDEO') {
          activeSlide.pause();
        }
      }

      card._sliderHandler = {
        onInView: function (visible) {
          isInView = visible;
          if (visible) {
            card.classList.add('is-sliding');
            scheduleNextSlide(isTouchDevice ? 1500 : 2200);
          } else {
            if (!isHovered) {
              stopSliding();
            }
          }
        }
      };

      if (propertyIntersectionObserver) {
        propertyIntersectionObserver.observe(card);
      }

      // Desktop Hover
      card.addEventListener('mouseenter', () => {
        isHovered = true;
        card.classList.add('is-sliding');
        scheduleNextSlide(550);
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        if (!isInView || !isTouchDevice) {
          stopSliding();
          activateSlide(0);
        }
      });

      // Mobile Touch Gestures (Swipe Left / Swipe Right)
      if (imgWrapper) {
        imgWrapper.addEventListener('touchstart', (e) => {
          if (!e.touches || e.touches.length !== 1) return;
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchStartTime = Date.now();
        }, { passive: true });

        imgWrapper.addEventListener('touchend', (e) => {
          if (!e.changedTouches || e.changedTouches.length !== 1) return;
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const deltaX = touchEndX - touchStartX;
          const deltaY = touchEndY - touchStartY;
          const elapsed = Date.now() - touchStartTime;

          // Se lo swipe orizzontale è netto
          if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) && elapsed < 650) {
            if (deltaX < 0) {
              // Swipe a sinistra -> Prossima foto
              activateSlide(currentIdx + 1);
            } else {
              // Swipe a destra -> Foto precedente
              activateSlide(currentIdx - 1);
            }
            card.classList.add('is-sliding');
            scheduleNextSlide(3200);
          }
        }, { passive: true });
      }

      // Dots Click & Touch
      dots.forEach((dot, idx) => {
        const handleDotSelect = (e) => {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          activateSlide(idx);
          card.classList.add('is-sliding');
          scheduleNextSlide(3200);
        };

        dot.addEventListener('click', handleDotSelect);
        dot.addEventListener('touchend', handleDotSelect, { passive: false });
        dot.addEventListener('mouseenter', (e) => {
          e.stopPropagation();
          activateSlide(idx);
          scheduleNextSlide(1800);
        });
      });
    });
  }

  function bindPropertyDetailButtons() {
    document.querySelectorAll('.btn-property-detail').forEach(btn => {
      btn.onclick = function (e) {
        e.preventDefault();
        const propId = this.getAttribute('data-property-id');
        const prop = propertiesData[propId];
        if (!prop) return;

        document.getElementById('modalPropTitle').textContent = prop.title;
        document.getElementById('modalPropLocation').textContent = prop.location;
        document.getElementById('modalPropPrice').textContent = prop.price;
        document.getElementById('modalPropSpecs').textContent = prop.specs;
        document.getElementById('modalPropDesc').innerHTML = prop.description;
        document.getElementById('modalPropBadge').textContent = prop.badge;

        const galleryList = Array.isArray(prop.gallery) && prop.gallery.length > 0 ? prop.gallery : [prop.image];
        showModalMedia(galleryList[0], prop.title);

        // Render gallery thumbnails (foto + video)
        const galContainer = document.getElementById('modalPropGallery');
        if (galContainer) {
          if (galleryList.length > 1) {
            galContainer.style.display = 'flex';
            galContainer.innerHTML = galleryList.map((mediaSrc, i) => {
              const isVid = isVideoMedia(mediaSrc);
              return `
                <button type="button" data-gal-src="${escapeHTML(mediaSrc)}" style="position: relative; border: 2px solid ${i === 0 ? '#FF6600' : 'transparent'}; border-radius: 8px; overflow: hidden; width: 78px; height: 54px; flex-shrink: 0; padding: 0; cursor: pointer; background: #0F172A;">
                  ${isVid
                    ? `<video src="${escapeHTML(mediaSrc)}" muted playsinline preload="metadata" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.75;"></video><span style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #FFF; font-size: 0.68rem; font-weight: 800; background: rgba(15,23,42,0.45);">▶ Video</span>`
                    : `<img src="${escapeHTML(mediaSrc)}" alt="Miniatura ${i + 1}" style="width: 100%; height: 100%; object-fit: cover;">`
                  }
                </button>
              `;
            }).join('');
            galContainer.querySelectorAll('[data-gal-src]').forEach(thumbBtn => {
              thumbBtn.addEventListener('click', function () {
                const src = this.getAttribute('data-gal-src');
                showModalMedia(src, prop.title);
                galContainer.querySelectorAll('[data-gal-src]').forEach(b => (b.style.borderColor = 'transparent'));
                this.style.borderColor = '#FF6600';
              });
            });
          } else {
            galContainer.style.display = 'none';
            galContainer.innerHTML = '';
          }
        }

        // Hidden form fields
        document.getElementById('modalPropFormName').value = prop.title;
        document.getElementById('modalPropFormId').value = prop.id;

        propertyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      };
    });
  }

  bindPropertyDetailButtons();
  initPropertyHoverSliders();
  initPreviewReel();

  // 5. Exclusive Preview Reel (Video 9:16 + Immagine Dinamica senza click)
  function initPreviewReel() {
    const video = document.getElementById('previewReelVideo');
    const img = document.getElementById('previewReelImg');
    const bar0 = document.getElementById('previewBarFill0');
    const bar1 = document.getElementById('previewBarFill1');
    const badgeText = document.getElementById('previewReelBadgeText');
    const card = document.getElementById('previewMediaCard');
    if (!video || !img || !bar0 || !bar1) return;

    let currentSlide = 0; // 0 = Video, 1 = Immagine
    let imgTimer = null;
    let isInView = false;

    function showSlide(index) {
      currentSlide = index;
      clearTimeout(imgTimer);

      if (currentSlide === 0) {
        // Mostra Video
        img.classList.remove('active');
        video.classList.add('active');
        if (badgeText) badgeText.textContent = 'Nuova Costruzione • In Cantiere';

        bar0.style.transition = 'none';
        bar1.style.transition = 'none';
        bar1.style.width = '0%';

        video.currentTime = 0;
        if (isInView) {
          video.play().catch(() => {});
        }
      } else {
        // Mostra Immagine di disclaimer orientativa
        video.pause();
        video.classList.remove('active');
        img.classList.add('active');
        if (badgeText) badgeText.textContent = 'Visualizzazione Progettuale';

        bar0.style.transition = 'none';
        bar0.style.width = '100%';

        bar1.style.transition = 'none';
        bar1.style.width = '0%';
        void bar1.offsetWidth;
        bar1.style.transition = 'width 6000ms linear';
        bar1.style.width = '100%';

        imgTimer = setTimeout(() => {
          showSlide(0);
        }, 6000);
      }
    }

    // Aggiornamento fluido progress bar video in tempo reale
    video.addEventListener('timeupdate', () => {
      if (currentSlide === 0 && video.duration) {
        const pct = Math.min(100, Math.max(0, (video.currentTime / video.duration) * 100));
        bar0.style.width = `${pct}%`;
      }
    });

    // Quando il video finisce -> passa all'immagine automaticamente
    video.addEventListener('ended', () => {
      showSlide(1);
    });

    // Se il video dura oltre il previsto, passa all'immagine
    let videoSafetyTimeout = null;
    video.addEventListener('play', () => {
      clearTimeout(videoSafetyTimeout);
      const safetyTime = (video.duration ? video.duration + 1 : 23) * 1000;
      videoSafetyTimeout = setTimeout(() => {
        if (currentSlide === 0) showSlide(1);
      }, safetyTime);
    });

    // Controllo visibilità nello schermo (IntersectionObserver)
    if ('IntersectionObserver' in window && card) {
      const reelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isInView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
          if (isInView) {
            if (currentSlide === 0) {
              video.play().catch(() => {});
            }
          } else {
            video.pause();
            clearTimeout(imgTimer);
          }
        });
      }, { threshold: [0.1, 0.25, 0.6] });

      reelObserver.observe(card);
    }

    // Story bars cliccabili / touch per navigare manualmente se l'utente vuole
    const barWrap0 = document.querySelector('[data-preview-bar="0"]');
    const barWrap1 = document.querySelector('[data-preview-bar="1"]');
    if (barWrap0) {
      barWrap0.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(0);
      });
    }
    if (barWrap1) {
      barWrap1.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(1);
      });
    }
  }

  // Dynamic CMS Loader (aggiorna immobili e testi statici dal CMS No-Code)
  function applyCmsDataToPage(cmsData) {
    if (!cmsData) return;

    // A. Aggiorna griglia immobili
    if (Array.isArray(cmsData.properties) && cmsData.properties.length > 0) {
      const grid = document.querySelector('.properties-grid');
      if (grid) {
        grid.innerHTML = cmsData.properties.filter(p => p.visible !== false).map(p => {
          const idKey = String(p.id);
          const apeClass = p.ape_class || 'G';
          const isGreenApe = apeClass.startsWith('A') || apeClass === 'B';
          const specsParts = [
            p.surface,
            p.rooms,
            p.bathrooms,
            p.floor,
            `Classe Energetica: ${apeClass}${p.ape_epgl ? ` (${p.ape_epgl})` : ''}`
          ].filter(Boolean);

          let galleryArr = Array.isArray(p.gallery) && p.gallery.length > 0
            ? [...p.gallery].filter(x => !String(x).includes('trilocale-a4-video.mp4'))
            : [p.main_image || 'images/palazzina-strada-parco.jpg'];

          // Assicura la galleria multimediale completa per gli immobili 1 e 2 se il DB aveva ancora la versione a 1-2 foto
          if (Number(p.id) === 1 && galleryArr.length < 3) {
            galleryArr = [
              'images/palazzina-strada-parco.jpg',
              'images/palazzina-vista-frontale.jpg',
              'images/palazzina-dettaglio-piani.jpg'
            ];
          } else if (Number(p.id) === 2 && galleryArr.length < 3) {
            galleryArr = [
              'images/casa2.webp',
              'images/casa2-render-notte.jpg',
              'images/casa2-planimetria-3d.jpg'
            ];
          }

          propertiesData[idKey] = {
            id: p.code || `PROP-0${p.id}`,
            title: p.modal_title || p.title,
            location: p.location,
            price: p.price || 'Trattativa Riservata',
            specs: specsParts.join(' • '),
            description: `${p.description || ''}<div class="ape-legal-spec" style="margin-top: 12px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${isGreenApe ? '#059669' : '#DC2626'}" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span><strong>Attestato di Prestazione Energetica (D.Lgs. 192/2005):</strong> Classe ${escapeHTML(apeClass)} ${p.ape_epgl ? `• Indice EPgl,nren: ${escapeHTML(p.ape_epgl)}` : ''}</span></div>`,
            image: galleryArr[0] || p.main_image || 'images/palazzina-strada-parco.jpg',
            gallery: galleryArr,
            badge: p.category || 'In Evidenza'
          };

          const hasVideo = galleryArr.some(isVideoMedia);
          const photoCount = galleryArr.filter(x => !isVideoMedia(x)).length;
          const liveBadgeText = hasVideo
            ? `▶ Video + ${photoCount} Foto • Scorri sopra`
            : `${galleryArr.length} Foto • Scorri sopra`;

          const slidesHtml = galleryArr.map((src, idx) => {
            if (isVideoMedia(src)) {
              return `<video src="${escapeHTML(src)}" class="property-media-slide${idx === 0 ? ' active' : ''}" muted loop playsinline preload="metadata"></video>`;
            }
            return `<img src="${escapeHTML(src)}" alt="${escapeHTML(p.title)} - ${idx + 1}" class="property-media-slide${idx === 0 ? ' active' : ''}" loading="lazy" width="600" height="400">`;
          }).join('');

          const dotsHtml = galleryArr.length > 1
            ? `<div class="property-slide-dots">${galleryArr.map((src, idx) => {
                const isVid = isVideoMedia(src);
                return `<button type="button" class="property-slide-dot${idx === 0 ? ' active' : ''}${isVid ? ' is-video-dot' : ''}" data-slide-idx="${idx}" aria-label="Slide ${idx + 1}">${isVid ? '▶ Video' : ''}</button>`;
              }).join('')}</div>`
            : '';

          return `
            <article class="property-card" data-card-prop-id="${escapeHTML(idKey)}">
              <div class="property-img-wrapper">
                <div class="property-hover-progress"><div class="property-hover-progress-bar"></div></div>
                <div class="property-media-stage">
                  ${slidesHtml}
                </div>
                <span class="property-badge-status">${escapeHTML(p.category || 'In Evidenza')}</span>
                <span class="property-badge-energy ${isGreenApe ? 'badge-ape-a4' : 'badge-ape-g'}">APE: Classe ${escapeHTML(apeClass)}${p.ape_epgl ? ` • ${escapeHTML(p.ape_epgl.split(' ')[0])} kWh/m²a` : ''}</span>
                ${galleryArr.length > 1 ? `<span class="property-badge-media-live"><span class="live-dot"></span><span>${escapeHTML(liveBadgeText)}</span></span>` : ''}
                <div class="property-price-overlay">
                  <span class="property-price">${escapeHTML(p.price || 'Trattativa Riservata')}</span>
                  ${dotsHtml}
                </div>
              </div>
              <div class="property-body">
                <div class="property-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>${escapeHTML(p.location)}</span>
                </div>
                <h3 class="property-title">${escapeHTML(p.title)}</h3>
                <div class="property-specs">
                  <div class="spec-item">
                    <span class="spec-icon-row">Sup.</span>
                    <span class="spec-value">${escapeHTML(p.surface || '-')}</span>
                  </div>
                  <div class="spec-item">
                    <span class="spec-icon-row">Camere/Liv.</span>
                    <span class="spec-value">${escapeHTML(p.rooms || p.floor || '-')}</span>
                  </div>
                  <div class="spec-item">
                    <span class="spec-icon-row">Bagni/Info</span>
                    <span class="spec-value">${escapeHTML(p.bathrooms || p.floor || '-')}</span>
                  </div>
                </div>
                <div class="ape-legal-spec">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="${isGreenApe ? '#059669' : '#DC2626'}" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  <span><strong>APE di Legge:</strong> Classe ${escapeHTML(apeClass)} ${p.ape_epgl ? `• EPgl,nren: ${escapeHTML(p.ape_epgl)}` : ''}</span>
                </div>
                <div class="property-footer">
                  <button class="btn btn-primary btn-block btn-property-detail" data-property-id="${escapeHTML(idKey)}">
                    <span>Scopri di più</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </div>
            </article>
          `;
        }).join('');

        bindPropertyDetailButtons();
        initPropertyHoverSliders();
      }
    }

    // B. Aggiorna testi statici se personalizzati nel CMS
    const s = cmsData.settings;
    if (s) {
      if (s.hero) {
        const heroBadge = document.querySelector('.hero-badge-partner span');
        if (heroBadge && s.hero.badge) heroBadge.textContent = s.hero.badge;

        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && (s.hero.title_before || s.hero.title_highlight)) {
          heroTitle.innerHTML = `${escapeHTML(s.hero.title_before)}<span class="hero-title-highlight">${escapeHTML(s.hero.title_highlight)}</span>${escapeHTML(s.hero.title_after)}`;
        }

        const heroDesc = document.querySelector('.hero-description');
        if (heroDesc && s.hero.description) heroDesc.textContent = s.hero.description;

        const heroImg = document.querySelector('.hero-backdrop img');
        if (heroImg && s.hero.hero_image) heroImg.src = s.hero.hero_image;

        const benefitItems = document.querySelectorAll('.hero-benefit-item span:last-child');
        if (benefitItems.length >= 3) {
          if (s.hero.benefit1) benefitItems[0].textContent = s.hero.benefit1;
          if (s.hero.benefit2) benefitItems[1].textContent = s.hero.benefit2;
          if (s.hero.benefit3) benefitItems[2].textContent = s.hero.benefit3;
        }
      }

      if (s.about) {
        const advSec = document.getElementById('perche-sceglierci');
        if (advSec) {
          const badge = advSec.querySelector('.badge-tag');
          const title = advSec.querySelector('.section-title');
          const sub = advSec.querySelector('.section-subtitle');
          if (badge && s.about.badge) badge.textContent = s.about.badge;
          if (title && s.about.title) title.textContent = s.about.title;
          if (sub && s.about.subtitle) sub.textContent = s.about.subtitle;

          const cards = advSec.querySelectorAll('.feature-card');
          [1, 2, 3, 4].forEach((n, idx) => {
            if (cards[idx]) {
              const t = cards[idx].querySelector('.feature-title');
              const d = cards[idx].querySelector('.feature-desc');
              if (t && s.about[`feat${n}_title`]) t.textContent = s.about[`feat${n}_title`];
              if (d && s.about[`feat${n}_desc`]) d.textContent = s.about[`feat${n}_desc`];
            }
          });
        }
      }

      if (s.contacts) {
        const footerDesc = document.querySelector('.footer-desc');
        if (footerDesc && s.contacts.footer_about) {
          footerDesc.textContent = s.contacts.footer_about;
        }
        const contactItems = document.querySelectorAll('.footer-contact-item div');
        if (contactItems[0] && s.contacts.address) {
          contactItems[0].innerHTML = `<strong>Sede Legale ed Operativa:</strong><br>${escapeHTML(s.contacts.address)}`;
        }
        if (contactItems[1] && s.contacts.phone_display) {
          const rawPhone = s.contacts.phone_raw || s.contacts.phone_display.replace(/\s+/g, '');
          contactItems[1].innerHTML = `<strong>Centralino Assistenza:</strong><br><a href="tel:${escapeHTML(rawPhone)}" style="color: #FFA366; font-weight: 700; font-size: 1.0625rem;">${escapeHTML(s.contacts.phone_display)}</a>`;
        }
        if (contactItems[2] && (s.contacts.email || s.contacts.pec)) {
          const mail = s.contacts.email || 'info@reska-immobiliare.it';
          const pec = s.contacts.pec || 'reskaimmobiliare@pec.it';
          contactItems[2].innerHTML = `<strong>Email &amp; Canali Ufficiali:</strong><br><a href="mailto:${escapeHTML(mail)}" style="color: #CBD5E1;">${escapeHTML(mail)}</a><br><span style="font-size: 0.8125rem; color: #94A3B8;">PEC: ${escapeHTML(pec)}</span>`;
        }
      }

      if (s.social) {
        const igCard = document.querySelector('.social-card-instagram');
        if (igCard) {
          if (s.social.instagram_handle) igCard.querySelector('.social-handle span').textContent = s.social.instagram_handle;
          if (s.social.instagram_url) igCard.querySelector('a.social-btn').href = s.social.instagram_url;
        }
        const fbCard = document.querySelector('.social-card-facebook');
        if (fbCard) {
          if (s.social.facebook_name) fbCard.querySelector('.social-handle span').textContent = s.social.facebook_name;
          if (s.social.facebook_url) fbCard.querySelector('a.social-btn').href = s.social.facebook_url;
        }
        const ttCard = document.querySelector('.social-card-tiktok');
        if (ttCard) {
          if (s.social.tiktok_handle) ttCard.querySelector('.social-handle span').textContent = s.social.tiktok_handle;
          if (s.social.tiktok_url) ttCard.querySelector('a.social-btn').href = s.social.tiktok_url;
        }
      }
    }
  }

  // Endpoint Cloud condiviso (funziona sia sul dominio online sia aprendo i file locali sul Mac/PC)
  const CMS_API_BASE = (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'https://reska-immobiliare.vercel.app'
    : '';

  function syncFromCloudCms() {
    fetch(`${CMS_API_BASE}/api/cms?t=${Date.now()}`, { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data && data.success && Array.isArray(data.properties)) {
          applyCmsDataToPage(data);
          try {
            localStorage.setItem('reska_cms_state_v1', JSON.stringify({
              properties: data.properties,
              settings: data.settings,
              media: data.media
            }));
          } catch (_e) {}
        }
      })
      .catch(() => {
        try {
          const localCmsRaw = localStorage.getItem('reska_cms_state_v1');
          if (localCmsRaw) {
            applyCmsDataToPage(JSON.parse(localCmsRaw));
          }
        } catch (_e) {}
      });
  }

  syncFromCloudCms();

  // Ricarica automaticamente i dati dal Cloud quando si torna sulla scheda del sito
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      syncFromCloudCms();
    }
  });

  if (propertyModalClose) {
    propertyModalClose.addEventListener('click', () => {
      propertyModal.classList.remove('active');
      document.getElementById('modalPropVideo')?.pause();
      document.body.style.overflow = '';
    });
  }

  // Close modals clicking on backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.getElementById('modalPropVideo')?.pause();
        document.body.style.overflow = '';
      }
    });
  });

  // 6. Toast Notification UI (con sanitizzazione anti-XSS)
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
        <div class="toast-title">${escapeHTML(title)}</div>
        <div class="toast-message">${escapeHTML(message)}</div>
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
  const contactForms = document.querySelectorAll('#heroLeadForm, #propInquiryForm');
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
