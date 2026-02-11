import { sanityFetch } from '@/sanity/live'
import { companyPageQuery, allTeamMembersQuery } from '@/sanity/queries/company'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { PageHeader } from '@/components/shared/PageHeader'
import { PortableTextRenderer } from '@/components/shared/PortableTextRenderer'
import { SanityImage } from '@/components/shared/SanityImage'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Timeline } from '@/components/company/Timeline'
import { ValuesGrid } from '@/components/company/ValuesGrid'
import { TeamMemberCard } from '@/components/company/TeamMemberCard'
import { CtaBanner } from '@/components/home/CtaBanner'
import type { Metadata } from 'next'
import { urlFor } from '@/sanity/image'

export async function generateMetadata(): Promise<Metadata> {
  const [pageResult, settingsResult] = await Promise.all([
    sanityFetch({ query: companyPageQuery }),
    sanityFetch({ query: siteSettingsQuery }),
  ])
  const seo = pageResult.data?.seo
  const defaultSeo = settingsResult.data?.defaultSeo

  return {
    title: seo?.metaTitle || 'Azienda',
    description: seo?.metaDescription || defaultSeo?.metaDescription,
    openGraph: {
      title: seo?.metaTitle || 'Azienda | Pavicat',
      description: seo?.metaDescription || defaultSeo?.metaDescription,
      images: seo?.ogImage ? [urlFor(seo.ogImage).width(1200).height(630).url()] : [],
      locale: 'it_IT',
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function AziendaPage() {
  const [pageResult, teamResult] = await Promise.all([
    sanityFetch({ query: companyPageQuery }),
    sanityFetch({ query: allTeamMembersQuery }),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = pageResult.data as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const teamMembers = (teamResult.data || []) as any[]

  return (
    <>
      <PageHeader
        title={page?.hero?.title || 'La Nostra Azienda'}
        subtitle={page?.hero?.subtitle}
        image={page?.hero?.image}
      />

      {page?.storySection && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {page.storySection.heading && (
              <SectionHeading title={page.storySection.heading} />
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                {page.storySection.body && (
                  <PortableTextRenderer value={page.storySection.body} />
                )}
              </div>
              {page.storySection.image && (
                <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
                  <SanityImage image={page.storySection.image} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              )}
            </div>
            {page.storySection.timeline && page.storySection.timeline.length > 0 && (
              <Timeline items={page.storySection.timeline} />
            )}
          </div>
        </section>
      )}

      {page?.valuesSection && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            {page.valuesSection.heading && (
              <SectionHeading title={page.valuesSection.heading} />
            )}
            <ValuesGrid values={page.valuesSection.values} />
          </div>
        </section>
      )}

      {(page?.teamSection || teamMembers.length > 0) && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeading
              title={page?.teamSection?.heading || 'Il Nostro Team'}
              subtitle={page?.teamSection?.subheading}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <TeamMemberCard
                  key={member._id}
                  name={member.name}
                  role={member.role}
                  photo={member.photo}
                  bio={member.bio}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {page?.ctaBanner && (
        <CtaBanner
          heading={page.ctaBanner.heading}
          text={page.ctaBanner.text}
          buttonText={page.ctaBanner.buttonText}
          buttonLink={page.ctaBanner.buttonLink}
        />
      )}
    </>
  )
}
