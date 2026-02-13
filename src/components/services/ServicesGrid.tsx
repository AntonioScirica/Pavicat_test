'use client'

import { useState, useMemo } from 'react'
import { ServiceCard } from './ServiceCard'

interface ContentBlock {
  _key: string
  text?: string
  image?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
}

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
  contentBlocks?: ContentBlock[]
}

interface FlatBlock {
  key: string
  category?: string
  text?: string
  image?: ContentBlock['image']
}

interface ServicesGridProps {
  services: Service[]
}

const PAGE_SIZE = 12

export function ServicesGrid({ services }: ServicesGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const categories = useMemo(() => {
    const cats = services
      .map((s) => s.category)
      .filter((c): c is string => !!c)
    return [...new Set(cats)]
  }, [services])

  const blocks = useMemo(() => {
    const result: FlatBlock[] = []
    for (const service of services) {
      if (service.contentBlocks && service.contentBlocks.length > 0) {
        for (const block of service.contentBlocks) {
          result.push({
            key: `${service._id}-${block._key}`,
            category: service.category,
            text: block.text,
            image: block.image,
          })
        }
      }
    }
    return result
  }, [services])

  const filtered = activeCategory
    ? blocks.filter((b) => b.category === activeCategory)
    : blocks

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <>
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => handleCategoryChange(null)}
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
              onClick={() => handleCategoryChange(activeCategory === category ? null : category)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {visible.map((block) => (
          <div key={block.key}>
            <ServiceCard
              category={block.category}
              text={block.text}
              image={block.image}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-sm text-sm font-semibold uppercase tracking-wider hover:border-gray-900 transition-colors cursor-pointer"
          >
            Carica altro
          </button>
        </div>
      )}
    </>
  )
}
