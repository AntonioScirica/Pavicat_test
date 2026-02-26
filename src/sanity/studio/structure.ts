import type { StructureResolver } from 'sanity/structure'
import { CogIcon, MenuIcon, HomeIcon, ComponentIcon, UsersIcon, RocketIcon, BlockElementIcon, UserIcon, ImagesIcon } from '@sanity/icons'

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
        .title('Chi Siamo')
        .icon(UsersIcon)
        .child(S.document().schemaType('contactsPage').documentId('contactsPage')),

      S.listItem()
        .title('Pagina Contattaci (CTA)')
        .icon(RocketIcon)
        .child(S.document().schemaType('ctaPage').documentId('ctaPage')),

      S.listItem()
        .title('Lavora con Noi')
        .icon(UserIcon)
        .child(S.document().schemaType('careersPage').documentId('careersPage')),

      S.listItem()
        .title('Pagina Progetti (Galleria)')
        .icon(ImagesIcon)
        .child(S.document().schemaType('projectsGalleryPage').documentId('projectsGalleryPage')),

      S.divider(),

      // Collections
      S.documentTypeListItem('service').title('Servizi'),
      S.documentTypeListItem('work').title('Progetti'),
    ])
