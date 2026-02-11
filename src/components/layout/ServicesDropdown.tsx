'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface Service {
  _id: string
  title: string
  slug: string
  shortDescription?: string
}

interface ServicesDropdownProps {
  label: string
  href: string
  services: Service[]
  scrolled?: boolean
}

export function ServicesDropdown({ label, href, services, scrolled }: ServicesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={href}
        className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 py-2 inline-flex items-center gap-1 ${
          scrolled
            ? 'text-gray-900/70 hover:text-gray-900'
            : 'text-white/80 hover:text-white'
        }`}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>

      {isOpen && (
        <div className="absolute top-full left-0 mt-3 w-lg bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20 py-4 z-50">
          <div className="grid grid-cols-2 gap-x-2">
            {services.map((service) => (
              <Link
                key={service._id}
                href={`/servizi/${service.slug}`}
                className="block px-5 py-2.5 hover:bg-gray-100/60 transition-colors rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <span className="block text-sm font-semibold text-gray-900">
                  {service.title}
                </span>
                {service.shortDescription && (
                  <span className="block text-xs text-gray-500 mt-0.5">
                    {service.shortDescription}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 px-5">
            <Link
              href={href}
              className="text-sm text-gray-900 font-medium hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Vedi tutti i servizi &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
