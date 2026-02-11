import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function sanityImageUrl(ref: string | undefined): string | null {
  if (!ref) return null
  // Convert Sanity image ref to CDN URL
  // Format: image-{id}-{width}x{height}-{ext}
  const [, id, dimensions, ext] = ref.split('-')
  if (!id || !dimensions || !ext) return null
  return `https://cdn.sanity.io/images/24ap8lkp/production/${id}-${dimensions}.${ext}`
}

interface SanityServiceBody {
  _id: string
  _type: string
  _rev?: string
  title?: string
  slug?: { current: string }
  shortDescription?: string
  icon?: { image?: { asset?: { _ref?: string } } }
  featuredImage?: { image?: { asset?: { _ref?: string } } }
  gallery?: Array<{ image?: { asset?: { _ref?: string } }; alt?: string }>
  body?: unknown
  features?: Array<{ title?: string; description?: string }>
  order?: number
  seo?: unknown
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<SanityServiceBody>(
      req,
      process.env.SANITY_WEBHOOK_SECRET
    )

    if (!isValidSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    if (!body?._type || body._type !== 'service') {
      return NextResponse.json({ skipped: true, reason: 'Not a service document' })
    }

    const sanityId = body._id

    // Handle delete (Sanity sends a body with only _id and _type when deleting)
    if (!body.title && !body.slug) {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('sanity_id', sanityId)

      if (error) throw error
      return NextResponse.json({ deleted: true, sanityId })
    }

    // Upsert service
    const serviceData = {
      sanity_id: sanityId,
      title: body.title || '',
      slug: body.slug?.current || '',
      short_description: body.shortDescription || null,
      icon_url: sanityImageUrl(body.icon?.image?.asset?._ref),
      featured_image_url: sanityImageUrl(body.featuredImage?.image?.asset?._ref),
      gallery: (body.gallery || []).map((item) => ({
        url: sanityImageUrl(item.image?.asset?._ref),
        alt: item.alt || '',
      })),
      body: body.body || null,
      features: (body.features || []).map((f) => ({
        title: f.title || '',
        description: f.description || '',
      })),
      display_order: body.order || 0,
      seo: body.seo || null,
      is_published: true,
    }

    const { error } = await supabase
      .from('services')
      .upsert(serviceData, { onConflict: 'sanity_id' })

    if (error) throw error

    return NextResponse.json({ synced: true, sanityId, slug: serviceData.slug })
  } catch (err) {
    console.error('Sync service error:', err)
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    )
  }
}
