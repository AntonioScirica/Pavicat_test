import { sanityFetch } from '@/sanity/live'
import { careersPageQuery } from '@/sanity/queries/careers'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { PageHeader } from '@/components/shared/PageHeader'
import { renderSection } from '@/lib/renderSection'
import type { Metadata } from 'next'
import { urlFor } from '@/sanity/image'

export async function generateMetadata(): Promise<Metadata> {
  const [pageResult, settingsResult] = await Promise.all([
    sanityFetch({ query: careersPageQuery }),
    sanityFetch({ query: siteSettingsQuery }),
  ])
  const seo = pageResult.data?.seo
  const defaultSeo = settingsResult.data?.defaultSeo

  return {
    title: seo?.metaTitle || 'Lavora con Noi',
    description: seo?.metaDescription || defaultSeo?.metaDescription,
    openGraph: {
      title: seo?.metaTitle || 'Lavora con Noi | Pavicat',
      description: seo?.metaDescription || defaultSeo?.metaDescription,
      images: seo?.ogImage ? [urlFor(seo.ogImage).width(1200).height(630).url()] : [],
      locale: 'it_IT',
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function LavoraConNoiPage() {
  const pageResult = await sanityFetch({ query: careersPageQuery })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = pageResult.data as any

  return (
    <>
      <PageHeader
        title={page?.hero?.title || 'Lavora con Noi'}
        subtitle={page?.hero?.subtitle}
        image={page?.hero?.image}
        grayscale={page?.hero?.grayscale ?? true}
      />

      {page?.sections?.map(renderSection)}
    </>
  )
}
