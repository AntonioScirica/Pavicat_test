import { createClient } from '@/lib/supabase/server'

export interface Service {
  id: string
  sanity_id: string | null
  title: string
  slug: string
  short_description: string | null
  icon_url: string | null
  featured_image_url: string | null
  gallery: Array<{ url: string; alt: string }>
  body: unknown
  features: Array<{ title: string; description: string }>
  display_order: number
  seo: unknown
  is_published: boolean
  created_at: string
  updated_at: string
}

export async function getAllServices(): Promise<Service[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }

  return data as Service[]
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Error fetching service:', error)
    return null
  }

  return data as Service
}

export async function getServicesForNav(): Promise<Pick<Service, 'id' | 'title' | 'slug' | 'short_description'>[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select('id, title, slug, short_description')
    .eq('is_published', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching nav services:', error)
    return []
  }

  return data
}
