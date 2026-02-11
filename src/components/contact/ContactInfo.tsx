interface ContactInfoProps {
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
    piva?: string
    mapUrl?: string
    mapEmbed?: string
  }
  showMap?: boolean
}

export function ContactInfo({ contactInfo, showMap }: ContactInfoProps) {
  if (!contactInfo) return null

  return (
    <div>
      <div className="space-y-6">
        {contactInfo.address && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Indirizzo</h3>
            <p className="text-gray-600 whitespace-pre-line">{contactInfo.address}</p>
            {contactInfo.mapUrl && (
              <a
                href={contactInfo.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 text-sm hover:underline mt-1 inline-block"
              >
                Apri in Google Maps &rarr;
              </a>
            )}
          </div>
        )}
        {contactInfo.phone && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Telefono</h3>
            <a href={`tel:${contactInfo.phone}`} className="text-gray-600 hover:text-blue-700">
              {contactInfo.phone}
            </a>
          </div>
        )}
        {contactInfo.email && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
            <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-blue-700">
              {contactInfo.email}
            </a>
          </div>
        )}
        {contactInfo.piva && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Partita IVA</h3>
            <p className="text-gray-600">{contactInfo.piva}</p>
          </div>
        )}
      </div>

      {showMap && contactInfo.mapEmbed && (
        <div
          className="mt-8 rounded-lg overflow-hidden [&>iframe]:w-full [&>iframe]:h-64 [&>iframe]:border-0"
          dangerouslySetInnerHTML={{ __html: contactInfo.mapEmbed }}
        />
      )}
    </div>
  )
}
