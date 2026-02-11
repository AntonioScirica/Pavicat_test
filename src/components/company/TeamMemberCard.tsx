import { SanityImage } from '@/components/shared/SanityImage'

interface TeamMemberCardProps {
  name: string
  role?: string
  photo?: {
    image?: { asset?: { _ref?: string } }
    alt?: string
  }
  bio?: string
}

export function TeamMemberCard({ name, role, photo, bio }: TeamMemberCardProps) {
  return (
    <div className="text-center">
      {photo && (
        <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
          <SanityImage image={photo} width={160} height={160} className="object-cover w-full h-full" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      {role && <p className="text-blue-700 text-sm font-medium mt-1">{role}</p>}
      {bio && <p className="text-gray-600 text-sm mt-2 max-w-xs mx-auto">{bio}</p>}
    </div>
  )
}
