import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({ apiVersion: '2024-07-11' })

async function run() {
  // Levigato e lucidato
  const levigato = await client.create({
    _type: 'service',
    title: 'Pavimenti in cemento levigato e lucidato',
    slug: { _type: 'slug', current: 'pavimenti-cemento-levigato-lucidato' },
    pillLabel: 'Cemento levigato',
    category: 'Cemento levigato',
    shortDescription: "Processo di nobilitazione del pavimento con silicati di litio che aumentano durezza e densità del cemento fino al 500%.",
    order: 5,
    contentBlocks: [
      {
        _type: 'object',
        _key: 'cb1',
        text: "Processo di nobilitazione del pavimento nuovo o esistente, molto utilizzato in America, la superficie viene trattata e lavorata con appositi macchinari per la levigazione e con particolari silicati di litio che aumentano la durezza e la densità del cemento fino al 500%.",
      },
      {
        _type: 'object',
        _key: 'cb2',
        text: "Il risultato sarà un pavimento con una resistenza all'abrasione elevatissima, traspirabile e con una superficie lucida come il vetro di facile pulizia con macchine lava asciuga.",
      },
      {
        _type: 'object',
        _key: 'cb3',
        text: "Ideale per autosaloni, depositi, officine ma anche per il settore alimentare, della ristorazione e elettronica.",
      },
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Pavimenti in Cemento Levigato e Lucidato | Pavicat',
      metaDescription: "Pavimenti in cemento levigato e lucidato con silicati di litio. Resistenza all'abrasione elevatissima, superficie lucida. Pavicat, dal 1980 a Torino.",
    },
  })
  console.log(`✓ ${levigato.title} (${levigato._id})`)

  // Sasso lavato
  const sasso = await client.create({
    _type: 'service',
    title: 'Pavimenti in cemento sasso lavato',
    slug: { _type: 'slug', current: 'pavimenti-cemento-sasso-lavato' },
    pillLabel: 'Sasso lavato',
    category: 'Sasso lavato',
    shortDescription: "Pavimentazione ottenuta mescolando al cemento sassi di fiume, pietra naturale e graniglia di marmi. Pratica, sicura e antisdrucciolo.",
    order: 6,
    contentBlocks: [
      {
        _type: 'object',
        _key: 'cb1',
        text: "Particolare pavimentazione ottenuta mescolando al cemento: sassi di fiume o pietra naturale, graniglia di marmi e una miscela fibrorinforzata colorata e additivata.",
      },
      {
        _type: 'object',
        _key: 'cb2',
      },
      {
        _type: 'object',
        _key: 'cb3',
        text: "Consigliamo questa soluzione per piazze, marciapiedi, aree pedonali, piscine, terrazze e viali in parchi e giardini. Le principali caratteristiche sono: praticità, sicurezza, resistenza e antisdrucciolo.",
      },
      {
        _type: 'object',
        _key: 'cb4',
        text: "Abbiamo la possibilità di realizzare diverse configurazioni con tipologie e colorazioni a scelta del cliente. E' la migliore alternativa alla ghiaia per manutenzione e costi ridotti, elimina il problema delle erbe infestanti e la necessità di ricomporre i ciottoli che presentano problematiche col tempo",
      },
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Pavimenti in Cemento Sasso Lavato | Pavicat',
      metaDescription: "Pavimenti in cemento sasso lavato con sassi di fiume e pietra naturale. Ideali per piazze, marciapiedi, piscine e giardini. Pavicat, dal 1980 a Torino.",
    },
  })
  console.log(`✓ ${sasso.title} (${sasso._id})`)

  // Acidificato
  const acido = await client.create({
    _type: 'service',
    title: 'Pavimenti in cemento acidificato',
    slug: { _type: 'slug', current: 'pavimenti-cemento-acidificato' },
    pillLabel: 'Cemento acidificato',
    category: 'Cemento acidificato',
    shortDescription: "Il calcestruzzo trasformato in una bellezza ricca e naturale. Effetto scenico, aspetto moderno, praticità di pulizia e manutenzione.",
    order: 7,
    contentBlocks: [
      {
        _type: 'object',
        _key: 'cb1',
        text: "Il lavoro finito trasforma il calcestruzzo in una bellezza ricca e naturale. Effetto scenico, aspetto moderno, praticità di pulizia e manutenzione sono le caratteristiche principali di questa pavimentazione.",
      },
      {
        _type: 'object',
        _key: 'cb2',
      },
      {
        _type: 'object',
        _key: 'cb3',
        text: "Ideale per chi vuole realizzare una superficie di tendenza, molto bella e resistente; perfetto per show room, centri commerciali e anche abitazioni private.",
      },
      {
        _type: 'object',
        _key: 'cb4',
        text: "Viene realizzato mediante l'utilizzo di particolari acidi a base di sali metallici che penetrano nel calcestruzzo e ne cambiano chimicamente la tonalità per produrre effetti di colore unici, permanenti, variegati e traslucidi.",
      },
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Pavimenti in Cemento Acidificato | Pavicat',
      metaDescription: "Pavimenti in cemento acidificato con effetti di colore unici e permanenti. Ideale per show room, centri commerciali e abitazioni. Pavicat, dal 1980 a Torino.",
    },
  })
  console.log(`✓ ${acido.title} (${acido._id})`)
}

run().catch(console.error)
