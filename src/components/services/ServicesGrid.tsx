'use client'

import { useState, useMemo } from 'react'
import { ServiceCard } from './ServiceCard'

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
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-5 py-2.5 rounded-sm text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
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
              className={`px-5 py-2.5 rounded-sm text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
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

      <div className="flex flex-wrap justify-center gap-5">
        {filtered.map((service) => (
          <div key={service._id} className="w-full md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]">
            <ServiceCard
              title={service.title}
              category={service.category}
              slug={service.slug}
              shortDescription={service.shortDescription}
              featuredImage={service.featuredImage}
            />
          </div>
        ))}
      </div>
    </>
  )
}
