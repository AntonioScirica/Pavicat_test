import { type SchemaTypeDefinition } from 'sanity'

// Objects
import { seo } from './objects/seo'
import { imageWithAlt } from './objects/imageWithAlt'
import { link } from './objects/link'
import { heroSection } from './objects/heroSection'
import { ctaBlock } from './objects/ctaBlock'
import { storySectionBlock } from './objects/storySectionBlock'
import { partnersSectionBlock } from './objects/partnersSectionBlock'
import { servicesSectionBlock } from './objects/servicesSectionBlock'
import { projectsSectionBlock } from './objects/projectsSectionBlock'
import { whyUsSectionBlock } from './objects/whyUsSectionBlock'
import { dividerBlock } from './objects/dividerBlock'
import { socialLink } from './objects/socialLink'
import { contactInfo } from './objects/contactInfo'
import { blockContent } from './objects/blockContent'

// Documents
import { siteSettings } from './documents/siteSettings'
import { navigation } from './documents/navigation'
import { footerSettings } from './documents/footerSettings'
import { homePage } from './documents/homePage'
import { servicesPage } from './documents/servicesPage'
import { companyPage } from './documents/companyPage'
import { contactsPage } from './documents/contactsPage'
import { ctaPage } from './documents/ctaPage'
import { service } from './documents/service'
import { teamMember } from './documents/teamMember'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  seo,
  imageWithAlt,
  link,
  heroSection,
  ctaBlock,
  storySectionBlock,
  partnersSectionBlock,
  servicesSectionBlock,
  projectsSectionBlock,
  whyUsSectionBlock,
  dividerBlock,
  socialLink,
  contactInfo,
  blockContent,

  // Singleton Documents
  siteSettings,
  navigation,
  footerSettings,
  homePage,
  servicesPage,
  companyPage,
  contactsPage,
  ctaPage,

  // Collection Documents
  service,
  teamMember,
]

// Singleton types that should not be creatable/deletable
export const singletonTypes = new Set([
  'siteSettings',
  'navigation',
  'footerSettings',
  'homePage',
  'servicesPage',
  'companyPage',
  'contactsPage',
  'ctaPage',
])
