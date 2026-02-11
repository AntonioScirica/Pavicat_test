import type { StructureResolver } from 'sanity/structure'
import { CogIcon, MenuIcon, HomeIcon, ComponentIcon, CaseIcon, EnvelopeIcon, RocketIcon, BlockElementIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenuti')
    .items([
      // Settings singleton
      S.listItem()
        .title('Impostazioni Sito')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      // Navigation singleton
      S.listItem()
        .title('Navigazione')
        .icon(MenuIcon)
        .child(S.document().schemaType('navigation').documentId('navigation')),

      // Footer singleton
      S.listItem()
        .title('Footer')
        .icon(BlockElementIcon)
        .child(S.document().schemaType('footerSettings').documentId('footerSettings')),

      S.divider(),

      // Page singletons
      S.listItem()
        .title('Pagina Home')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.listItem()
        .title('Pagina Servizi')
        .icon(ComponentIcon)
        .child(S.document().schemaType('servicesPage').documentId('servicesPage')),

      S.listItem()
        .title('Pagina Azienda')
        .icon(CaseIcon)
        .child(S.document().schemaType('companyPage').documentId('companyPage')),

      S.listItem()
        .title('Pagina Contatti')
        .icon(EnvelopeIcon)
        .child(S.document().schemaType('contactsPage').documentId('contactsPage')),

      S.listItem()
        .title('Pagina Contattaci (CTA)')
        .icon(RocketIcon)
        .child(S.document().schemaType('ctaPage').documentId('ctaPage')),

      S.divider(),

      // Collections
      S.documentTypeListItem('service').title('Servizi'),
      S.documentTypeListItem('teamMember').title('Team'),
    ])
