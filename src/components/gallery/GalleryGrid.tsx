'use client'

import { useState, useCallback, useEffect } from 'react'
import { SanityImage } from '@/components/shared/SanityImage'

interface GalleryImage {
  image?: { asset?: { _ref?: string } }
  alt?: string
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const validImages = images.filter((img) => img?.image?.asset?._ref)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % validImages.length : null))
  }, [validImages.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + validImages.length) % validImages.length : null))
  }, [validImages.length])

  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  if (validImages.length === 0) {
    return (
      <p className="text-center text-gray-400 py-12">
        Nessuna immagine disponibile.
      </p>
    )
  }

  return (
    <>
      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {validImages.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => openLightbox(index)}
            className="block w-full mb-4 break-inside-avoid rounded-xl overflow-hidden cursor-pointer group"
          >
            <div className="relative">
              <SanityImage
                image={img}
                width={600}
                height={450}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              {img.alt && (
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-semibold uppercase tracking-wide">
                    {img.alt}
                  </span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Chiudi"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Previous */}
          {validImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Precedente"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <SanityImage
              image={validImages[lightboxIndex]}
              width={1400}
              height={1050}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              sizes="90vw"
            />
            {validImages[lightboxIndex].alt && (
              <p className="text-white/60 text-sm text-center mt-4">
                {validImages[lightboxIndex].alt}
              </p>
            )}
            <p className="text-white/40 text-xs text-center mt-2">
              {lightboxIndex + 1} / {validImages.length}
            </p>
          </div>

          {/* Next */}
          {validImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Successivo"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  )
}
