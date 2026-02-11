'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface NavItem {
  label: string
  href?: string
  hasDropdown?: boolean
  dropdownType?: string
  subItems?: { label: string; href: string; description?: string }[]
}

interface Service {
  _id: string
  title: string
  slug: string
}

interface MobileMenuProps {
  navItems: NavItem[]
  ctaButton?: { label: string; href: string }
  services: Service[]
  scrolled?: boolean
}

export function MobileMenu({ navItems, ctaButton, services, scrolled }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => setIsVisible(true))
    } else {
      setIsVisible(false)
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden relative z-50 p-2"
        aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2 bg-gray-900' : scrolled ? 'bg-gray-900' : 'bg-white'
            }`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              isOpen ? 'opacity-0 bg-gray-900' : scrolled ? 'bg-gray-900' : 'bg-white'
            }`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2 bg-gray-900' : scrolled ? 'bg-gray-900' : 'bg-white'
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className={`fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`pt-24 pb-8 px-6 transition-all duration-400 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <nav className="space-y-1">
              {navItems.map((item, index) => (
                <div key={item.href || `nav-${index}`}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        className="flex items-center justify-between w-full py-3 text-lg font-medium text-gray-900 uppercase tracking-wide"
                      >
                        {item.label}
                        <svg
                          className={`w-5 h-5 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openDropdown === item.label && (
                        <div className="pl-4 space-y-1 border-l-2 border-gray-200 ml-2 mb-2">
                          {item.dropdownType === 'services' ? (
                            <>
                              {item.href && (
                                <Link
                                  href={item.href}
                                  className="block py-2 text-base text-gray-900 font-medium"
                                >
                                  Tutti i servizi
                                </Link>
                              )}
                              {services.map((service) => (
                                <Link
                                  key={service._id}
                                  href={`/servizi/${service.slug}`}
                                  className="block py-2 text-base text-gray-600 hover:text-gray-900"
                                >
                                  {service.title}
                                </Link>
                              ))}
                            </>
                          ) : (
                            <>
                              {item.subItems?.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  className="block py-2 text-base text-gray-600 hover:text-gray-900"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </>
                          )}
                        </div>
                      )}
                    </>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      className="block py-3 text-lg font-medium text-gray-900 uppercase tracking-wide hover:text-gray-600"
                    >
                      {item.label}
                    </Link>
                  ) : null}
                </div>
              ))}
            </nav>

            <div className="mt-8">
              <Link
                href={ctaButton?.href || '/contattaci'}
                className="block w-full text-center bg-gray-900 text-white text-sm font-semibold uppercase tracking-wider py-3.5 px-6 rounded-sm hover:bg-gray-800 transition-colors"
              >
                {ctaButton?.label || 'Contattaci'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
