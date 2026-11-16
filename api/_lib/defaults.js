/**
 * RESKA IMMOBILIARE - Default CMS Seed Data
 * Contiene gli immobili e i testi statici iniziali del portale.
 */

export const DEFAULT_PROPERTIES = [
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
    gallery: [
      'images/palazzina-strada-parco.jpg'
    ],
    description: `<p>Montesilvano, in posizione privilegiata e altamente strategica prospiciente la rinomata isola ciclo-pedonale della <strong>Strada Parco</strong>, a brevissima distanza dalla spiaggia e da tutti i principali servizi cittadini.</p>
<p>Proponiamo prestigioso stabile cielo-terra anni '80 in ottime condizioni generali di manutenzione, disponibile per l'acquisto sia in blocco che con possibilità di frazionamento. La proprietà si articola su un livello seminterrato con comoda taverna e 3 ampi livelli fuori terra di circa 120 mq a piano, ideali per eleganti appartamenti indipendenti, studi professionali o attività ricettiva.</p>
<p>A coronare la palazzina, splendida mansarda con tetto in legno massello appena rifatto a nuovo (allo stato grezzo, pronta per finiture su misura). Straordinaria opportunità d'investimento ad altissimo potenziale di rivalutazione.</p>`,
    visible: true,
    sort_order: 1
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
    gallery: [
      'images/casa2.webp',
      'images/casa2.jpg'
    ],
    description: `<p>Nel cuore più servito e strategico di <strong>Montesilvano</strong>, in <strong>Via Marinelli</strong> — con accesso immediato a piedi a ogni servizio primario (supermercati, scuole, farmacie, fermate dei trasporti e a brevissima distanza dal mare e dalla Strada Parco) — proponiamo in vendita esclusivo <strong>appartamento trilocale in Classe Energetica A4</strong>, posizionato al terzo piano di un prestigioso edificio di nuova costruzione con linee architettoniche moderne e curate nei minimi dettagli.</p>
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
</ul>`,
    visible: true,
    sort_order: 2
  }
];

export const DEFAULT_SETTINGS = {
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
  properties_section: {
    badge: 'Selezione Esclusiva',
    title: 'Immobili di Pregio in Evidenza',
    subtitle: 'Proposte immobiliari accuratamente verificate sotto il profilo catastale, urbanistico e finanziario. Richiedi la scheda tecnica completa o prenota una visita privata.'
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
    feat4_desc: 'I nostri immobili trovano un compratore in una media di soli 48 giorni, con un margine di trattativa inferiore al 3,5% rispetto al prezzo concordato in fase di perizia iniziale.',
    callout_text: 'Tutti i contatti e le richieste di valutazione vengono trattati con la massima riservatezza e gestiti direttamente dai consulenti e mediatori accreditati di RESKA IMMOBILIARE.'
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

export const DEFAULT_MEDIA = [
  { id: 1, name: 'Palazzina Strada Parco', url: 'images/palazzina-strada-parco.jpg', category: 'Immobili' },
  { id: 2, name: 'Trilocale Classe A4 (WebP)', url: 'images/casa2.webp', category: 'Immobili' },
  { id: 3, name: 'Hero Villa Tramonto', url: 'images/hero.jpg', category: 'Banner' },
  { id: 4, name: 'Immobile Residenziale 1', url: 'images/property-1.jpg', category: 'Archivio' },
  { id: 5, name: 'Immobile Residenziale 2', url: 'images/property-2.jpg', category: 'Archivio' },
  { id: 6, name: 'Immobile Residenziale 3', url: 'images/property-3.jpg', category: 'Archivio' },
  { id: 7, name: 'Logo RESKA Ufficiale', url: 'images/logo.webp', category: 'Brand' },
  { id: 8, name: 'Logo RESKA Bianco', url: 'images/logo-white.webp', category: 'Brand' }
];
