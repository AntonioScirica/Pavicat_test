'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { SanityImage } from '@/components/shared/SanityImage'
import { ArrowUpRight } from 'lucide-react'

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
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollPos, setScrollPos] = useState(0)
  const [scrollLimit, setScrollLimit] = useState(Infinity)
  const hasServices = services && services.length > 0

  useEffect(() => {
    const updateLimit = () => {
      if (!trackRef.current) return
      const track = trackRef.current
      const container = track.parentElement
      if (!container) return
      setScrollLimit(Math.max(0, track.scrollWidth - container.clientWidth))
    }
    updateLimit()
    window.addEventListener('resize', updateLimit)
    return () => window.removeEventListener('resize', updateLimit)
  }, [services])

  const getStep = useCallback(() => {
    if (!trackRef.current) return 170
    const firstCard = trackRef.current.querySelector('a') as HTMLElement
    if (!firstCard) return 170
    return firstCard.offsetWidth + 20
  }, [])

  if (!heading && !hasServices) return null

  return (
    <section className={`py-16 md:py-24 overflow-x-clip ${backgroundColor === 'gray' ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
      <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
        {/* Left: Title + description - aligned with site container */}
        <div className="px-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-0 lg:max-w-150 shrink-0">
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

        {/* Right: Cards - extend to right edge of screen */}
        <div className="flex-1 min-w-0 lg:pl-24 pr-0 relative">
          {/* Vertical divider - clipped by section overflow-clip */}
          <div className="hidden lg:block absolute left-0 w-px bg-[#DBDBDB] -top-16 md:-top-24 -bottom-16 md:-bottom-24" />
          {hasServices && (
            <>
              {/* Navigation arrows (desktop: above cards) */}
              <div className="hidden lg:flex justify-end gap-2 mb-4 pr-8">
                <button
                  onClick={() => setScrollPos((prev) => Math.max(0, prev - getStep()))}
                  disabled={scrollPos <= 0}
                  className="w-11 h-11 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-800 hover:border-gray-900 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                  aria-label="Precedente"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={() => setScrollPos((prev) => Math.min(scrollLimit, prev + getStep()))}
                  disabled={scrollPos >= scrollLimit}
                  className="w-11 h-11 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-800 hover:border-gray-900 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                  aria-label="Successivo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              {/* Cards */}
              <div className="overflow-hidden relative">
                {scrollPos > 0 && (
                  <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
                )}
              <div
                ref={trackRef}
                className="flex gap-5 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${scrollPos}px)` }}
              >
                <div className="shrink-0 w-6 lg:hidden" aria-hidden="true" />
                {services.map((service) => (
                  <Link
                    key={service._id}
                    href={`/servizi/${service.slug}`}
                    className="group relative shrink-0 w-[calc(100vw-4rem)] md:w-80"
                  >
                    <div className="relative h-112 overflow-hidden rounded-lg rounded-tr-none bg-gray-200">
                      {service.featuredImage ? (
                        <SanityImage
                          image={service.featuredImage}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(min-width: 1024px) 33vw, 256px"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-300" />
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

                      {/* Title */}
                      <span className="absolute top-4 left-4 bg-white text-[#676767] text-xs font-semibold px-3 py-1.5 rounded-md uppercase tracking-wide">
                        {service.pillLabel || service.title}
                      </span>
                      {/* Arrow */}
                      <span className="absolute top-0 right-0 w-16 h-16 bg-gray-900 border-b-[6px] border-l-[6px] border-white flex items-center justify-center">
                        <ArrowUpRight className="w-9 h-9 text-white" strokeWidth={1.5} />
                      </span>

                      {/* Description */}
                      {service.shortDescription && (
                        <div className="absolute bottom-5 left-5 right-5">
                          <p className="text-white/90 text-base font-medium leading-relaxed line-clamp-4">
                            {service.shortDescription}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}

                {/* "Vedi tutti" card */}
                <Link
                  href="/servizi"
                  className="group relative shrink-0 w-[calc(100vw-4rem)] md:w-80"
                >
                  <div className="relative h-112 overflow-hidden rounded-lg bg-gray-200">
                    {services[services.length - 1]?.featuredImage ? (
                      <SanityImage
                        image={services[services.length - 1].featuredImage!}
                        fill
                        className="object-cover blur-sm scale-105"
                        sizes="(min-width: 1024px) 33vw, 256px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-400" />
                    )}
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <span className="text-white text-lg font-bold uppercase tracking-wider">
                        Vedi tutti
                      </span>
                      <ArrowUpRight className="w-8 h-8 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
                    </div>
                  </div>
                </Link>

                <div className="shrink-0 w-6 lg:w-8" aria-hidden="true" />
              </div>
              </div>

              {/* Navigation arrows (mobile: below cards) */}
              <div className="flex lg:hidden justify-center gap-2 mt-10">
                <button
                  onClick={() => setScrollPos((prev) => Math.max(0, prev - getStep()))}
                  disabled={scrollPos <= 0}
                  className="w-11 h-11 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-800 hover:border-gray-900 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                  aria-label="Precedente"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={() => setScrollPos((prev) => Math.min(scrollLimit, prev + getStep()))}
                  disabled={scrollPos >= scrollLimit}
                  className="w-11 h-11 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-800 hover:border-gray-900 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                  aria-label="Successivo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
