'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SanityImage } from '@/components/shared/SanityImage'

interface Service {
  _id: string
  title: string
  category?: string
  slug: string
  shortDescription?: string
  featuredImage?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
}

interface ServicesGridProps {
  services: Service[]
}

export function ServicesGrid({ services }: ServicesGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    const cats = services
      .map((s) => s.category)
      .filter((c): c is string => !!c)
    return [...new Set(cats)]
  }, [services])

  const filtered = activeCategory
    ? services.filter((s) => s.category === activeCategory)
    : services

  return (
    <>
      {categories.length > 0 && (
        <div className="flex overflow-x-auto gap-3 mb-12 pb-2 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:max-w-4xl sm:mx-auto">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeCategory === null
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-900'
            }`}
          >
            Tutti i servizi
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(activeCategory === category ? null : category)}
              className={`shrink-0 px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activeCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((service) => (
          <Link
            key={service._id}
            href={`/servizi/${service.slug}`}
            className="group relative block aspect-video rounded-lg overflow-hidden bg-gray-200"
          >
            {service.featuredImage?.image?.asset ? (
              <SanityImage
                image={service.featuredImage}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-400" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

            {service.category && (
              <span className="absolute top-4 left-4 bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-md uppercase tracking-wide">
                {service.category}
              </span>
            )}
          </Link>
        ))}
      </div>
    </>
  )
}
