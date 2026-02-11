import { defineQuery } from 'next-sanity'

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    logo,
    logoWhite,
    siteName,
    defaultSeo
  }
`)

export const navigationQuery = defineQuery(`
  *[_type == "navigation"][0] {
    mainNav[] {
      label,
      href,
      hasDropdown,
      dropdownType,
      subItems[] {
        label,
        href,
        description
      }
    },
    ctaButton
  }
`)

export const footerQuery = defineQuery(`
  *[_type == "footerSettings"][0] {
    logo,
    columns[] {
      title,
      columnType,
      links[] { label, href, "fileUrl": file.asset->url },
      contactItems[] { itemType, label, value }
    },
    socialLinks[] {
      platform,
      label,
      url
    },
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
