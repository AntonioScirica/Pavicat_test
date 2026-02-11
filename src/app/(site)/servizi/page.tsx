import { sanityFetch } from '@/sanity/live'
import { servicesPageQuery, allServicesQuery } from '@/sanity/queries/services'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { PageHeader } from '@/components/shared/PageHeader'
import { PortableTextRenderer } from '@/components/shared/PortableTextRenderer'
import { ServiceCard } from '@/components/services/ServiceCard'
import { CtaBanner } from '@/components/home/CtaBanner'
import type { Metadata } from 'next'
import { urlFor } from '@/sanity/image'

export async function generateMetadata(): Promise<Metadata> {
  const [pageResult, settingsResult] = await Promise.all([
    sanityFetch({ query: servicesPageQuery }),
    sanityFetch({ query: siteSettingsQuery }),
  ])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (pageResult.data as any)?.seo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultSeo = (settingsResult.data as any)?.defaultSeo

  return {
    title: seo?.metaTitle || 'Servizi',
    description: seo?.metaDescription || defaultSeo?.metaDescription,
    openGraph: {
      title: seo?.metaTitle || 'Servizi | Pavicat',
      description: seo?.metaDescription || defaultSeo?.metaDescription,
      images: seo?.ogImage ? [urlFor(seo.ogImage).width(1200).height(630).url()] : [],
      locale: 'it_IT',
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function ServiziPage() {
  const [pageResult, servicesResult] = await Promise.all([
    sanityFetch({ query: servicesPageQuery }),
    sanityFetch({ query: allServicesQuery }),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = pageResult.data as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const services = (servicesResult.data as any[]) || []

  return (
    <>
      <PageHeader
        title={page?.hero?.title || 'I Nostri Servizi'}
        subtitle={page?.hero?.subtitle}
        image={page?.hero?.image}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {page?.introText && (
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <PortableTextRenderer value={page.introText} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any) => (
              <ServiceCard
                key={service._id}
                title={service.title}
                slug={service.slug}
                shortDescription={service.shortDescription}
                featuredImage={service.featuredImage}
              />
            ))}
          </div>

          {services.length === 0 && (
            <p className="text-center text-gray-500">Nessun servizio disponibile al momento.</p>
          )}
        </div>
      </section>

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
