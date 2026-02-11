import {
  defineDocuments,
  defineLocations,
  type DocumentLocationResolver,
} from 'sanity/presentation'

const homeLocation = {
  title: 'Home',
  href: '/',
} as const

export const resolve: DocumentLocationResolver = defineDocuments([
  {
    route: '/',
    filter: '_type == "homePage"',
  },
  {
    route: '/servizi',
    filter: '_type == "servicesPage"',
  },
  {
    route: '/servizi/:slug',
    filter: '_type == "service" && slug.current == $slug',
  },
  {
    route: '/azienda',
    filter: '_type == "companyPage"',
  },
  {
    route: '/contatti',
    filter: '_type == "contactsPage"',
  },
  {
    route: '/contattaci',
    filter: '_type == "ctaPage"',
  },
  {
    route: '/',
    filter: '_type == "siteSettings" || _type == "navigation"',
  },
])
