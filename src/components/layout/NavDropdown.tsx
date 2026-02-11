'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface SubItem {
  label: string
  href: string
  description?: string
}

interface NavDropdownProps {
  label: string
  href?: string
  subItems: SubItem[]
  scrolled?: boolean
}

export function NavDropdown({ label, href, subItems, scrolled }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }

  const className = `text-sm font-medium tracking-wide uppercase transition-colors duration-300 py-2 inline-flex items-center gap-1 cursor-pointer ${
    scrolled
      ? 'text-gray-900/70 hover:text-gray-900'
      : 'text-white/80 hover:text-white'
  }`

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {href ? (
        <Link href={href} className={className}>
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
      ) : (
        <button type="button" className={className}>
          {label}
          <svg
            className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="absolute top-full left-0 mt-3 w-64 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20 py-3 z-50">
          {subItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-5 py-2.5 hover:bg-gray-100/60 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="block text-sm font-semibold text-gray-900">
                {item.label}
              </span>
              {item.description && (
                <span className="block text-xs text-gray-500 mt-0.5">
                  {item.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
