import {
  defineDocuments,
  type DocumentLocationResolver,
} from 'sanity/presentation'

export const resolve = {
  mainDocuments: defineDocuments([
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
      route: '/chi-siamo',
      filter: '_type == "contactsPage"',
    },
    {
      route: '/contattaci',
      filter: '_type == "ctaPage"',
    },
    {
      route: '/lavora-con-noi',
      filter: '_type == "careersPage"',
    },
    {
      route: '/',
      filter: '_type == "siteSettings" || _type == "navigation"',
    },
  ]),
}
