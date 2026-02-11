import { defineQuery } from 'next-sanity'

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    logo,
    logoWhite,
    siteName,
    siteTagline,
    contactInfo,
    socialLinks,
    footerText,
    footerColumns[] {
      title,
      links[] { label, href }
    },
    copyrightText,
    defaultSeo
  }
`)

export const navigationQuery = defineQuery(`
  *[_type == "navigation"][0] {
    mainNav[] {
      label,
      href,
      hasDropdown
    },
    ctaButton
  }
`)

export const footerQuery = defineQuery(`
  *[_type == "footerSettings"][0] {
    logo,
    description,
    columns[] {
      title,
      links[] { label, href }
    },
    contactInfo,
    socialLinks,
    copyrightText
  }
`)

export const allServicesNavQuery = defineQuery(`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription
  }
`)
