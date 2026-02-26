import Link from 'next/link'
import { SanityImage } from '@/components/shared/SanityImage'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

interface Service {
  _id: string
  title: string
  pillLabel?: string
  slug: string
  shortDescription?: string
  featuredImage?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
}

interface ServicesOverviewProps {
  heading?: string
  subheading?: string
  services?: Service[]
  backgroundColor?: string
}

export function ServicesOverview({ heading, subheading, services, backgroundColor }: ServicesOverviewProps) {
  const maxVisible = 8
  const displayServices = services?.slice(0, maxVisible)
  const hasServices = displayServices && displayServices.length > 0
  const showFiller = hasServices && displayServices.length % 4 !== 0
  const showCta = services && services.length > maxVisible

  if (!heading && !hasServices) return null

  return (
    <section className={`py-16 md:py-24 ${backgroundColor === 'gray' ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          {heading && (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight leading-tight mb-2">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-gray-500 leading-relaxed text-base">
              {subheading}
            </p>
          )}
        </div>

        {/* Services grid */}
        {hasServices && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayServices.map((service) => (
              <Link
                key={service._id}
                href={`/servizi/${service.slug}`}
                className="group relative"
              >
                <div className="relative aspect-square sm:aspect-3/4 overflow-hidden rounded-lg rounded-tr-none bg-gray-200">
                  {service.featuredImage ? (
                    <SanityImage
                      image={service.featuredImage}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-300" />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

                  {/* Pill label */}
                  <span className="absolute top-4 left-4 bg-white text-[#676767] text-xs font-semibold px-3 py-1.5 rounded-md uppercase tracking-wide">
                    {service.pillLabel || service.title}
                  </span>
                  {/* Arrow */}
                  <span className="absolute top-0 right-0 w-14 h-14 bg-gray-900 border-b-[5px] border-l-[5px] border-white flex items-center justify-center">
                    <ArrowUpRight className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </span>

                  {/* Description */}
                  {service.shortDescription && (
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-white/90 text-sm font-medium leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}

            {/* Vedi tutti card - only when services don't fill the last row on desktop */}
            {showFiller && (
              <Link
                href="/servizi"
                className="group relative hidden lg:block"
              >
                <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-gray-200">
                  {displayServices[0]?.featuredImage ? (
                    <SanityImage
                      image={displayServices[0].featuredImage}
                      fill
                      className="object-cover blur-sm scale-105"
                      sizes="25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-300" />
                  )}
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <span className="text-white text-sm font-semibold uppercase tracking-wider">Vedi tutti</span>
                    <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </div>
                </div>
              </Link>
            )}
          </div>
        )}

        {/* CTA when there are more than 8 services */}
        {showCta && (
          <div className="text-center pt-14 md:pt-16">
            <Link
              href="/servizi"
              className="inline-block bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors"
            >
              Vedi tutti i servizi
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}
