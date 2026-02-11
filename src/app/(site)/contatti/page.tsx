import { sanityFetch } from '@/sanity/live'
import { contactsPageQuery } from '@/sanity/queries/contacts'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { PageHeader } from '@/components/shared/PageHeader'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import type { Metadata } from 'next'
import { urlFor } from '@/sanity/image'

export async function generateMetadata(): Promise<Metadata> {
  const [pageResult, settingsResult] = await Promise.all([
    sanityFetch({ query: contactsPageQuery }),
    sanityFetch({ query: siteSettingsQuery }),
  ])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (pageResult.data as any)?.seo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultSeo = (settingsResult.data as any)?.defaultSeo

  return {
    title: seo?.metaTitle || 'Contatti',
    description: seo?.metaDescription || defaultSeo?.metaDescription,
    openGraph: {
      title: seo?.metaTitle || 'Contatti | Pavicat',
      description: seo?.metaDescription || defaultSeo?.metaDescription,
      images: seo?.ogImage ? [urlFor(seo.ogImage).width(1200).height(630).url()] : [],
      locale: 'it_IT',
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function ContattiPage() {
  const [pageResult, settingsResult] = await Promise.all([
    sanityFetch({ query: contactsPageQuery }),
    sanityFetch({ query: siteSettingsQuery }),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = pageResult.data as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings = settingsResult.data as any

  return (
    <>
      <PageHeader
        title={page?.hero?.title || 'Contattaci'}
        subtitle={page?.hero?.subtitle}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              {page?.formHeading && (
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {page.formHeading}
                </h2>
              )}
              {page?.formDescription && (
                <p className="text-gray-600 mb-6">{page.formDescription}</p>
              )}
              <ContactForm successMessage={page?.successMessage} />
            </div>
            <div>
              <ContactInfo
                contactInfo={settings?.contactInfo}
                showMap={page?.showMap}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
