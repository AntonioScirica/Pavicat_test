import { SanityImage } from '@/components/shared/SanityImage'

interface Value {
  title: string
  description?: string
  icon?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
}

interface ValuesGridProps {
  values?: Value[]
}

export function ValuesGrid({ values }: ValuesGridProps) {
  if (!values || values.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {values.map((value, index) => (
        <div key={index} className="text-center p-6">
          {value.icon && (
            <div className="w-16 h-16 mx-auto mb-4">
              <SanityImage image={value.icon} width={64} height={64} className="w-full h-full object-contain" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
          {value.description && (
            <p className="text-gray-600 text-sm">{value.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}
