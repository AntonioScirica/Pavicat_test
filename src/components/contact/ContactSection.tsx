import { ContactForm } from './ContactForm'

interface ContactSectionProps {
  phone?: string
  email?: string
  address?: string
  mapUrl?: string
  hours?: string
  formHeading?: string
  successMessage?: string
}

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>
)

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
)

const AddressIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

export function ContactSection({
  phone,
  email,
  address,
  mapUrl,
  hours,
  formHeading,
  successMessage,
}: ContactSectionProps) {
  const items = [
    { label: 'Telefono:', value: phone, href: phone ? `tel:${phone}` : undefined, icon: <PhoneIcon /> },
    { label: 'Email:', value: email, href: email ? `mailto:${email}` : undefined, icon: <EmailIcon /> },
    { label: 'Indirizzo:', value: address, href: mapUrl || (address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : undefined), external: true, icon: <AddressIcon /> },
    { label: 'Orari:', value: hours, icon: <ClockIcon /> },
  ]

  return (
    <section className="relative">
      <div className="hidden lg:block absolute left-1/2 -top-3 md:-top-4 bottom-0 w-px bg-gray-200" />
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="lg:pr-12">
            <h2 className="text-2xl font-bold text-gray-900 uppercase mb-8">
              Informazioni
            </h2>
            <div className="space-y-6">
              {items.map((item) => {
                if (!item.value) return null
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-semibold text-gray-900 hover:text-gray-700"
                          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-gray-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="lg:pl-12">
            {formHeading && (
              <h2 className="text-2xl font-bold text-gray-900 uppercase mb-8">
                {formHeading}
              </h2>
            )}
            <ContactForm successMessage={successMessage} />
          </div>
        </div>
      </div>
    </section>
  )
}
