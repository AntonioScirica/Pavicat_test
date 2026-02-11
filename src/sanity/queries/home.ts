import { defineQuery } from 'next-sanity'

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    sections[] {
      _type,
      _key,
      _type == "heroSection" => {
        badge,
        title,
        subtitle,
        image,
        ctaText,
        ctaLink
      },
      _type == "storySectionBlock" => {
        heading,
        text,
        backgroundColor
      },
      _type == "partnersSectionBlock" => {
        backgroundColor,
        logos[] {
          image,
          alt
        }
      },
      _type == "servicesSectionBlock" => {
        heading,
        subheading,
        backgroundColor,
        featuredServices[]-> {
          _id,
          title,
          "slug": slug.current,
          shortDescription,
          icon,
          featuredImage
        }
      },
      _type == "projectsSectionBlock" => {
        heading,
        subheading,
        backgroundColor,
        stats[] {
          value,
          label
        },
        categories[] {
          title,
          image,
          href
        },
        ctaText,
        ctaHref
      },
      _type == "whyUsSectionBlock" => {
        heading,
        subheading,
        backgroundColor,
        values[] {
          icon,
          title,
          description
        }
      },
      _type == "ctaBlock" => {
        heading,
        text,
        backgroundColor,
        buttonText,
        buttonLink,
        bgImage
      }
    },
    seo
  }
`)
