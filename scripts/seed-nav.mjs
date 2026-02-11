import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '24ap8lkp',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token:
    'sk3OPyvYqqsTJjIu5B4HbPsQqXZ9BIfGaqVg3BKWgdx84TlCFnxxXEbx6UmmV8YA1xR1ItkHRnuyE6luD',
});

const navigationDoc = {
  _id: 'navigation',
  _type: 'navigation',
  mainNav: [
    { _key: 'nav1', label: 'Home', href: '/', hasDropdown: false },
    { _key: 'nav2', label: 'Azienda', href: '/azienda', hasDropdown: false },
    { _key: 'nav3', label: 'Servizi', href: '/servizi', hasDropdown: true },
    { _key: 'nav4', label: 'Contatti', href: '/contattaci', hasDropdown: false },
  ],
  ctaButton: {
    label: 'Preventivo Gratuito',
    href: '/contattaci',
  },
};

async function seed() {
  console.log('Seeding navigation document...');
  const result = await client.createOrReplace(navigationDoc);
  console.log('Navigation document created/replaced:', result._id);
  console.log(JSON.stringify(result, null, 2));
}

seed().catch((err) => {
  console.error('Failed to seed navigation:', err.message);
  process.exit(1);
});
