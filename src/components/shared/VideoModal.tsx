'use client'

import { useState, useEffect, useCallback } from 'react'

interface VideoModalProps {
  url: string
  buttonText: string
  icon?: React.ReactNode
}

export function VideoModal({ url, buttonText, icon }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, close])

  const embedUrl = url.includes('facebook.com')
    ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=false&muted=true`
    : url.includes('youtube.com') || url.includes('youtu.be')
      ? url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/') + '?autoplay=0&mute=1'
      : url

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2.5 bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-gray-800 transition-colors mt-8 cursor-pointer"
      >
        {icon}
        {buttonText}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors"
              aria-label="Chiudi"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}
