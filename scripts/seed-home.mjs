import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '24ap8lkp',
  dataset: 'production',
  apiVersion: '2024-07-11',
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
})

const homePageDoc = {
  _id: 'homePage',
  _type: 'homePage',

  // 1. Hero
  hero: {
    _type: 'heroSection',
    badge: 'Pavimentazioni Catalano',
    title: 'Pavimenti in cemento e resina senza compromessi.',
    subtitle:
      'Realizziamo pavimenti industriali e civili in cemento e in resina. Rampe veicolari in cemento.',
  },

  // 2. La Nostra Storia
  storySection: {
    heading: 'LA NOSTRA STORIA',
    text: 'Fin dal 1980 operiamo in Torino, provincia e nel resto del nord Italia. Siamo specializzati nella realizzazione di pavimentazioni in calcestruzzo e trattamenti in resina. Ci applichiamo con la massima dedizione e impegno su ogni cantiere dal momento del sopralluogo fino alla consegna dei lavori.',
  },

  // 3. Partner (senza immagini per ora)
  partnersSection: {
    logos: [],
  },

  // 4. I Nostri Servizi
  servicesSection: {
    heading: 'I NOSTRI SERVIZI',
    subheading:
      'Progettiamo e realizziamo pavimentazioni in cemento e resina per ambienti industriali, commerciali e residenziali.',
    featuredServices: [],
  },

  // 5. Progetti Realizzati
  projectsSection: {
    heading: 'PROGETTI REALIZZATI',
    subheading:
      'Ogni progetto racconta il nostro modo di lavorare: attenzione ai dettagli, materiali giusti e risultati concreti.',
    stats: [
      { _key: 'stat1', value: '500+', label: 'PROGETTI' },
      { _key: 'stat2', value: '5M+', label: 'M POSATI' },
    ],
    categories: [
      { _key: 'cat1', title: 'CEMENTO ELICOTTERATO', href: '/servizi' },
      { _key: 'cat2', title: 'CEMENTO ACIDIFICATO', href: '/servizi' },
      { _key: 'cat3', title: 'CEMENTO SASSO LAVATO', href: '/servizi' },
      { _key: 'cat4', title: 'CEMENTO STAMPATO', href: '/servizi' },
    ],
    ctaText: 'VEDI TUTTI I PROGETTI',
    ctaHref: '/servizi',
  },

  // 6. Perchè Scegliere Noi
  whyUsSection: {
    heading: 'PERCHÈ SCEGLIERE NOI?',
    subheading:
      'Competenza tecnica e attenzione ai dettagli, dalla prima analisi alla posa finale.',
    values: [
      {
        _key: 'val1',
        icon: 'clock',
        title: 'Esperienza',
        description:
          'Oltre 30 anni alla guida delle pavimentazioni industriali possono bastare per dire che sappiamo quello che facciamo.',
      },
      {
        _key: 'val2',
        icon: 'temple',
        title: 'Onestà',
        description:
          'Il miglior risultato al giusto prezzo, questo è il feedback dei nostri clienti alla conclusione lavori.',
      },
      {
        _key: 'val3',
        icon: 'target',
        title: 'Affidabilità',
        description:
          'Facciamo quello che diciamo. Puntualità, precisione, ordine e pulizia sono i principi cardine su cui si basa il nostro operato.',
      },
      {
        _key: 'val4',
        icon: 'shield',
        title: 'Garanzia',
        description:
          'Il nostro obiettivo è la massima soddisfazione del cliente. Terminati i lavori saremo a disposizione per problematiche.',
      },
    ],
  },

  // 7. CTA Banner
  ctaBanner: {
    _type: 'ctaBlock',
    heading: 'HAI UN PROGETTO IN MENTE?',
    text: 'Contattaci per un sopralluogo e una valutazione tecnica.\nParliamo del tuo pavimento. Senza compromessi.',
    buttonText: 'VEDI TUTTI I PROGETTI',
    buttonLink: {
      _type: 'link',
      linkType: 'external',
      external: '/contattaci',
    },
  },

  // SEO
  seo: {
    _type: 'seo',
    metaTitle: 'Pavicat | Pavimenti in Cemento e Resina - Torino',
    metaDescription:
      'Dal 1980 realizziamo pavimenti industriali e civili in cemento e resina a Torino e nel nord Italia. Sopralluogo gratuito. Chiama ora.',
  },
}

async function seed() {
  console.log('Seeding homepage...')

  try {
    const result = await client.createOrReplace(homePageDoc)
    console.log(`Homepage creata/aggiornata: ${result._id}`)
    console.log('\nSezioni precompilate:')
    console.log('  1. Hero — badge, titolo, sottotitolo')
    console.log('  2. La Nostra Storia — heading, testo')
    console.log('  3. Partner Logos — (vuoto, aggiungi immagini da Studio)')
    console.log('  4. I Nostri Servizi — heading, sottotitolo (collega i servizi da Studio)')
    console.log('  5. Progetti Realizzati — heading, stats (500+, 5M+), 4 categorie')
    console.log('  6. Perchè Scegliere Noi — 4 valori con descrizioni')
    console.log('  7. CTA Banner — heading, testo, pulsante')
    console.log('  8. SEO — meta title e description')
    console.log('\nDone! Vai su /studio per aggiungere le immagini.')
  } catch (err) {
    console.error('Errore:', err)
    process.exit(1)
  }
}

seed()
