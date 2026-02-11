import { defineQuery } from 'next-sanity'

export const companyPageQuery = defineQuery(`
  *[_type == "companyPage"][0] {
    hero,
    storySection {
      heading,
      body,
      image,
      timeline[] {
        year,
        title,
        description
      }
    },
    valuesSection {
      heading,
      values[] {
        title,
        description,
        icon
      }
    },
    teamSection {
      heading,
      subheading
    },
    ctaBanner,
    seo
  }
`)

export const allTeamMembersQuery = defineQuery(`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    photo,
    bio,
    email,
    phone
  }
`)
