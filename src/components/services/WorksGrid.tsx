'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SanityImage } from '@/components/shared/SanityImage'
import { MapPin, Calendar } from 'lucide-react'

interface Work {
  _id: string
  title: string
  category?: string
  location?: string
  date?: string
  slug: string
  shortDescription?: string
  featuredImage?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
}

interface WorksGridProps {
  works: Work[]
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })
}

const PAGE_SIZE = 12

export function WorksGrid({ works }: WorksGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const categories = useMemo(() => {
    const cats = works
      .map((w) => w.category)
      .filter((c): c is string => !!c)
    return [...new Set(cats)]
  }, [works])

  const filtered = activeCategory
    ? works.filter((w) => w.category === activeCategory)
    : works

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <>
      {categories.length > 0 && (
        <div className="flex overflow-x-auto gap-3 mb-12 pb-2 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:max-w-4xl sm:mx-auto">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`shrink-0 px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeCategory === null
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-900'
            }`}
          >
            Tutti i lavori
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(activeCategory === category ? null : category)}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {visible.map((work) => (
          <Link
            key={work._id}
            href={`/lavori/${work.slug}`}
            className="group"
          >
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-gray-200">
              {work.featuredImage?.image?.asset?._ref ? (
                <>
                  <SanityImage
                    image={work.featuredImage}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-400" />
              )}
              {work.category && (
                <span className="absolute top-3 left-3 bg-white text-gray-900 text-[11px] font-semibold px-3 py-1.5 rounded-md uppercase tracking-wider border border-gray-200">
                  {work.category}
                </span>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-gray-700 transition-colors">
                {work.title}
              </h3>

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

            </div>
          </Link>
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
