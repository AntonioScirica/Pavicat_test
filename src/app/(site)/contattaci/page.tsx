import { sanityFetch } from '@/sanity/live'
import { ctaPageQuery } from '@/sanity/queries/cta'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { PageHeader } from '@/components/shared/PageHeader'
import { PortableTextRenderer } from '@/components/shared/PortableTextRenderer'
import { SanityImage } from '@/components/shared/SanityImage'
import { ContactForm } from '@/components/contact/ContactForm'
import type { Metadata } from 'next'
import { urlFor } from '@/sanity/image'

export async function generateMetadata(): Promise<Metadata> {
  const [pageResult, settingsResult] = await Promise.all([
    sanityFetch({ query: ctaPageQuery }),
    sanityFetch({ query: siteSettingsQuery }),
  ])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (pageResult.data as any)?.seo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultSeo = (settingsResult.data as any)?.defaultSeo

  return {
    title: seo?.metaTitle || 'Contattaci',
    description: seo?.metaDescription || defaultSeo?.metaDescription,
    openGraph: {
      title: seo?.metaTitle || 'Contattaci | Pavicat',
      description: seo?.metaDescription || defaultSeo?.metaDescription,
      images: seo?.ogImage ? [urlFor(seo.ogImage).width(1200).height(630).url()] : [],
      locale: 'it_IT',
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function ContattaciPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: page } = await sanityFetch({ query: ctaPageQuery }) as { data: any }

  return (
    <>
      <PageHeader
        title={page?.hero?.title || 'Contattaci'}
        subtitle={page?.hero?.subtitle}
        image={page?.hero?.image}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {page?.benefits && page.benefits.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {page.benefits.map((benefit: any, index: number) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                  {benefit.icon && (
                    <div className="w-14 h-14 mx-auto mb-4">
                      <SanityImage image={benefit.icon} width={56} height={56} className="w-full h-full object-contain" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  {benefit.description && (
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              {page?.body && <PortableTextRenderer value={page.body} />}
            </div>
            <div>
              {page?.formHeading && (
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {page.formHeading}
                </h2>
              )}
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
