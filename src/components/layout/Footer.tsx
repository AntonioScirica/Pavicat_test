import Link from 'next/link'
import { SanityImage } from '@/components/shared/SanityImage'

interface ContactItem {
  itemType: string
  label?: string
  value: string
}

interface FooterColumn {
  title: string
  columnType?: string
  links?: Array<{ label: string; href?: string; fileUrl?: string }>
  contactItems?: ContactItem[]
}

interface SocialLink {
  platform: string
  label?: string
  url: string
}

interface FooterProps {
  logo?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
  siteName?: string
  footerColumns?: FooterColumn[]
  services?: Array<{ title: string; slug: string }>
  socialLinks?: SocialLink[]
  copyrightText?: string
}

const platformLabels: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp',
}

export function Footer({
  logo,
  siteName,
  footerColumns,
  services,
  socialLinks,
  copyrightText,
}: FooterProps) {
  const hasSocial = socialLinks && socialLinks.length > 0
  const columnCount = (footerColumns?.length || 0) + (hasSocial ? 2 : 1)
  const gridClass = columnCount <= 3
    ? 'lg:grid-cols-3'
    : columnCount === 4
      ? 'lg:grid-cols-[140px_1fr_1fr_1fr]'
      : 'lg:grid-cols-[140px_1fr_1fr_1fr_1fr]'

  return (
    <footer className="bg-[#2B2B2B] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 md:py-20">
        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridClass} gap-8 text-center md:text-left`}>
          {/* Logo */}
          <div>
            {logo?.image?.asset?._ref ? (
              <SanityImage image={logo} width={150} height={60} className="h-16 w-auto mx-auto md:mx-0" />
            ) : (
              <span className="text-xl font-bold block">{siteName || 'Pavicat'}</span>
            )}
          </div>

          {/* Columns */}
          {footerColumns?.map((column, i) => (
            <div key={i}>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-5">{column.title}</h3>
              <ul className="space-y-3">
                {column.columnType === 'services' ? (
                  services?.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/servizi/${service.slug}`}
                        className="text-[#7C7C7C] hover:text-white text-sm transition-colors"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))
                ) : column.columnType === 'contacts' && column.contactItems ? (
                  <>
                    {column.contactItems.map((item, j) => (
                      <li key={j} className="text-sm text-[#7C7C7C]">
                        {item.itemType === 'company' ? (
                          <span className="font-semibold">{item.value}</span>
                        ) : item.itemType === 'phone' ? (
                          <>Cel: <a href={`tel:${item.value}`} className="hover:text-white transition-colors underline">{item.value}</a></>
                        ) : item.itemType === 'email' ? (
                          <>Email: <a href={`mailto:${item.value}`} className="hover:text-white transition-colors underline">{item.value}</a></>
                        ) : item.itemType === 'pec' ? (
                          <>Pec: <a href={`mailto:${item.value}`} className="hover:text-white transition-colors underline">{item.value}</a></>
                        ) : item.itemType === 'piva' ? (
                          <>P.Iva/CF: {item.value}</>
                        ) : item.itemType === 'sdi' ? (
                          <>Sdi: {item.value}</>
                        ) : item.itemType === 'address' ? (
                          <span className="whitespace-pre-line">{item.value}</span>
                        ) : item.itemType === 'custom' ? (
                          <>{item.label ? `${item.label} ` : ''}{item.value}</>
                        ) : (
                          item.value
                        )}
                      </li>
                    ))}
                  </>
                ) : (
                  column.links?.map((link, j) => (
                    <li key={j}>
                      {link.fileUrl ? (
                        <a
                          href={`${link.fileUrl}?dl=`}
                          className="text-[#7C7C7C] hover:text-white text-sm transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : link.href ? (
                        <Link
                          href={link.href}
                          className="text-[#7C7C7C] hover:text-white text-sm transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : null}
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}

          {/* Social */}
          {hasSocial && (
            <div>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-5">Social</h3>
              <ul className="space-y-3">
                {socialLinks.map((social, i) => {
                  const label = social.platform === 'custom' ? (social.label || 'Link') : (platformLabels[social.platform] || social.platform)
                  const isExternal = social.url?.startsWith('http')
                  return (
                    <li key={i}>
                      {isExternal ? (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#7C7C7C] hover:text-white text-sm transition-colors"
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          href={social.url || '/'}
                          className="text-[#7C7C7C] hover:text-white text-sm transition-colors"
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-[#7C7C7C]">
          <span>{copyrightText || `Copyright © ${new Date().getFullYear()} Pavicat S.R.L.. All Right Reserved.`}</span>
          <span>Made With ❤ By Antonio Scirica</span>
        </div>
      </div>
    </footer>
  )
}
