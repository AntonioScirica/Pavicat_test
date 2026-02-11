'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SanityImage } from '@/components/shared/SanityImage'
import { ServicesDropdown } from './ServicesDropdown'
import { MobileMenu } from './MobileMenu'

interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
}

interface Service {
  _id: string
  title: string
  slug: string
  shortDescription?: string
}

interface HeaderProps {
  logo?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
  siteName?: string
  navItems: NavItem[]
  ctaButton?: { label: string; href: string }
  services: Service[]
}

export function Header({ logo, siteName, navItems, ctaButton, services }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 100)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {scrolled && (
        <div className="absolute inset-x-0 top-0 h-24 backdrop-blur-sm pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent)' }} />
      )}
      <div className="relative max-w-6xl mx-auto px-0 pt-8 md:pt-10">
        <nav
          className={`flex items-center justify-between backdrop-blur-sm rounded-lg px-2 h-14 md:h-15 transition-all duration-300 ${
            scrolled
              ? 'bg-white/92 border border-[#DBDBDB]'
              : 'bg-white/6 border border-white/25'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 pl-4.5">
            {logo?.image?.asset?._ref ? (
              <SanityImage
                image={logo}
                width={140}
                height={46}
                className={`h-6 w-auto transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
              />
            ) : (
              <span className={`text-xl font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                {siteName || 'PAVICAT'}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-16">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <ServicesDropdown
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  services={services}
                  scrolled={scrolled}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                    scrolled
                      ? 'text-gray-900/70 hover:text-gray-900'
                      : 'text-white/85 hover:text-white'
                  } ${pathname === item.href ? 'underline underline-offset-4 decoration-1 font-medium' : ''}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contatti"
              className={`hidden lg:inline-block text-sm font-semibold uppercase tracking-normal px-5 py-2.5 rounded transition-colors duration-300 ${
                scrolled
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-white text-gray-900 hover:bg-white/90'
              }`}
            >
              CONTATTACI
            </Link>
            <MobileMenu navItems={navItems} ctaButton={ctaButton} services={services} scrolled={scrolled} />
          </div>
        </nav>
      </div>
    </header>
  )
}
