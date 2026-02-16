import Link from 'next/link'
import { SanityImage } from '@/components/shared/SanityImage'
import { MapPin, Calendar } from 'lucide-react'

interface Stat {
  value?: string
  label?: string
}

interface Work {
  _id: string
  title?: string
  slug?: string
  category?: string
  location?: string
  date?: string
  shortDescription?: string
  featuredImage?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
}

interface Category {
  title?: string
  image?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
  href?: string
}

interface ProjectsShowcaseProps {
  heading?: string
  subheading?: string
  stats?: Stat[]
  featuredWorks?: Work[]
  categories?: Category[]
  ctaText?: string
  ctaHref?: string
  backgroundColor?: string
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })
}

export function ProjectsShowcase({ heading, subheading, stats, featuredWorks, categories, ctaText, ctaHref, backgroundColor }: ProjectsShowcaseProps) {
  if (!heading) return null

  const hasWorks = featuredWorks && featuredWorks.length > 0
  const hasCategories = categories && categories.length > 0

  return (
    <>
      <section className={backgroundColor === 'white' ? 'bg-white' : 'bg-[#FAFAFA]'}>
        {/* Top: Title + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="pt-16 md:pt-14 pb-14 md:pb-18 px-6 lg:px-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] flex items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight leading-tight mb-2">
                {heading}
              </h2>
              {subheading && (
                <p className="text-gray-500 leading-relaxed text-base max-w-md">
                  {subheading}
                </p>
              )}
            </div>
          </div>
          {stats && stats.length > 0 && (
            <div className="bg-white flex flex-col items-center justify-center gap-14 md:gap-16 py-10 md:py-18 px-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-6xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-none">{stat.value}</div>
                  <p className="text-xs text-gray-400 uppercase tracking-[0.2em] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <hr className="border-0 h-px bg-[#EBEBEB]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 md:pt-20 pb-14 md:pb-20">

          {/* Featured works grid */}
          {hasWorks && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredWorks.map((work) => (
                <Link
                  key={work._id}
                  href={work.slug ? `/lavori/${work.slug}` : '#'}
                  className="group"
                >
                  {/* Image */}
                  <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-gray-200">
                    {work.featuredImage?.image?.asset?._ref ? (
                      <>
                        <SanityImage
                          image={work.featuredImage}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-t from-gray-400 to-gray-200" />
                    )}
                    {work.category && (
                      <span className="absolute top-3 left-3 bg-white text-gray-900 text-[11px] font-semibold px-3 py-1.5 rounded-md uppercase tracking-wider border border-gray-200">
                        {work.category}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mt-4">
                    {work.title && (
                      <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-gray-700 transition-colors">
                        {work.title}
                      </h3>
                    )}

                    {/* Location & Date */}
                    {(work.location || work.date) && (
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                        {work.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {work.location}
                          </span>
                        )}
                        {work.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(work.date)}
                          </span>
                        )}
                      </div>
                    )}

                    {work.shortDescription && (
                      <p className="text-sm text-gray-500 leading-relaxed mt-2 line-clamp-3">
                        {work.shortDescription}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Fallback: legacy category cards */}
          {!hasWorks && hasCategories && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-3 md:gap-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl overflow-hidden aspect-4/3 sm:aspect-3/4 bg-gray-200"
                >
                  {category.image?.image?.asset?._ref ? (
                    <>
                      <SanityImage
                        image={category.image}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-t from-gray-400 to-gray-200" />
                  )}
                  {category.title && (
                    <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                      <span className="bg-white text-gray-900 text-[13px] font-semibold px-4 py-2 rounded-lg border border-gray-200 uppercase tracking-wider">
                        {category.title}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          {ctaText && ctaHref && (
            <div className="text-center pt-14 md:pt-20">
              <Link
                href={ctaHref}
                className="inline-block bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors"
              >
                {ctaText}
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
