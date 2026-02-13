export const sectionsProjection = `
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
      buttonText,
      buttonLink,
      buttonIcon,
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
        pillLabel,
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
    },
    _type == "contactSectionBlock" => {
      phone,
      email,
      address,
      mapUrl,
      hours,
      formHeading,
      successMessage
    },
    _type == "downloadSectionBlock" => {
      text,
      buttonText,
      "fileUrl": file.asset->url,
      backgroundColor
    },
    _type == "allServicesGridBlock" => {
      backgroundColor,
      "services": *[_type == "service"] | order(order asc) {
        _id,
        title,
        category,
        "slug": slug.current,
        shortDescription,
        featuredImage,
        contentBlocks[] {
          _key,
          text,
          image
        }
      }
    },
    _type == "allWorksGridBlock" => {
      backgroundColor,
      "services": *[_type == "work"] | order(order asc) {
        _id,
        title,
        category,
        "slug": slug.current,
        shortDescription,
        featuredImage,
        contentBlocks[] {
          _key,
          text,
          image
        }
      }
    }
  }
`
