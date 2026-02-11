import { sanityFetch } from '@/sanity/live'
import { homePageQuery } from '@/sanity/queries/home'
import { siteSettingsQuery } from '@/sanity/queries/settings'
import { renderSection } from '@/lib/renderSection'
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
