'use client'

import { useState, useEffect, useCallback } from 'react'
import { SanityImage } from '@/components/shared/SanityImage'

interface ImageType {
  image?: { asset?: { _ref?: string } }
  alt?: string
}

interface HeroProps {
  badge?: string
  title?: string
  subtitle?: string
  image?: ImageType
  images?: ImageType[]
}

export function Hero({ badge, title, subtitle, image, images }: HeroProps) {
  const slides = images && images.length > 0 ? images : image ? [image] : []
  const hasMultiple = slides.length > 1
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (!hasMultiple) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [hasMultiple, next])

  return (
    <section className="relative bg-white text-white min-h-screen p-3 md:p-4">
      <div className="relative w-full h-full min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-2rem)] rounded-2xl overflow-hidden border border-white/20 flex items-center md:items-end">
        {slides.length > 0 ? (
          <div className="absolute inset-0">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === current ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <SanityImage
                  image={slide}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/40 to-black/25" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gray-800" />
        )}

        <div className="w-full mx-auto px-6 md:px-10 lg:px-14 relative z-10 pb-10 md:pb-20 pt-40">
          <div className="flex flex-col items-center text-center lg:text-left lg:flex-row lg:items-end lg:justify-between gap-4 md:gap-6 lg:gap-16">
            <div className="max-w-170">
              {badge && (
                <span className="inline-block border border-white/30 text-white/90 text-xs tracking-wider uppercase px-4 py-1.5 rounded-sm mb-5">
                  {badge}
                </span>
              )}
              {title && (
                <h1 className="text-[1.8rem] md:text-4xl lg:text-5xl font-bold leading-tight mx-auto lg:mx-0">
                  {title}
                </h1>
              )}
            </div>
            {subtitle && (
              <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-sm lg:max-w-72 lg:text-right shrink-0">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
