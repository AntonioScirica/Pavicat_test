import { sanityFetch } from '@/sanity/live'
import { homePageQuery } from '@/sanity/queries/home'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { Hero } from '@/components/home/Hero'
import { StorySection } from '@/components/home/StorySection'
import { PartnersLogos } from '@/components/home/PartnersLogos'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { ProjectsShowcase } from '@/components/home/ProjectsShowcase'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { CtaBanner } from '@/components/home/CtaBanner'
import { Divider } from '@/components/home/Divider'
import type { Metadata } from 'next'
import { urlFor } from '@/sanity/image'

export async function generateMetadata(): Promise<Metadata> {
  const [pageResult, settingsResult] = await Promise.all([
    sanityFetch({ query: homePageQuery }),
    sanityFetch({ query: siteSettingsQuery }),
  ])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (pageResult.data as any)?.seo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultSeo = (settingsResult.data as any)?.defaultSeo

  return {
    title: seo?.metaTitle || defaultSeo?.metaTitle || 'Pavicat | Pavimenti e Edilizia',
    description: seo?.metaDescription || defaultSeo?.metaDescription,
    openGraph: {
      title: seo?.metaTitle || defaultSeo?.metaTitle,
      description: seo?.metaDescription || defaultSeo?.metaDescription,
      images: seo?.ogImage ? [urlFor(seo.ogImage).width(1200).height(630).url()] : [],
      locale: 'it_IT',
      type: 'website',
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderSection(section: any) {
  switch (section._type) {
    case 'heroSection':
      return (
        <Hero
          key={section._key}
          badge={section.badge}
          title={section.title}
          subtitle={section.subtitle}
          image={section.image}
        />
      )
    case 'storySectionBlock':
      return (
        <StorySection
          key={section._key}
          heading={section.heading}
          text={section.text}
          backgroundColor={section.backgroundColor}
        />
      )
    case 'partnersSectionBlock':
      return (
        <PartnersLogos
          key={section._key}
          logos={section.logos}
          backgroundColor={section.backgroundColor}
        />
      )
    case 'servicesSectionBlock':
      return (
        <ServicesOverview
          key={section._key}
          heading={section.heading}
          subheading={section.subheading}
          services={section.featuredServices}
          backgroundColor={section.backgroundColor}
        />
      )
    case 'projectsSectionBlock':
      return (
        <ProjectsShowcase
          key={section._key}
          heading={section.heading}
          subheading={section.subheading}
          stats={section.stats}
          categories={section.categories}
          ctaText={section.ctaText}
          ctaHref={section.ctaHref}
          backgroundColor={section.backgroundColor}
        />
      )
    case 'whyUsSectionBlock':
      return (
        <WhyChooseUs
          key={section._key}
          heading={section.heading}
          subheading={section.subheading}
          values={section.values}
          backgroundColor={section.backgroundColor}
        />
      )
    case 'ctaBlock':
      return (
        <CtaBanner
          key={section._key}
          heading={section.heading}
          text={section.text}
          buttonText={section.buttonText}
          buttonLink={section.buttonLink}
          backgroundColor={section.backgroundColor}
        />
      )
    case 'dividerBlock':
      return <Divider key={section._key} />
    default:
      return null
  }
}

export default async function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: page } = await sanityFetch({ query: homePageQuery }) as { data: any }

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Benvenuto su Pavicat</h1>
        <p className="text-gray-600 mt-4">Configura i contenuti dal pannello CMS.</p>
      </div>
    )
  }

  return (
    <>
      {page.sections?.map(renderSection)}
    </>
  )
}
