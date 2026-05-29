export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  inventory: number;
  is_active: boolean;
  created_at: string;
}

export interface DigitalProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  preview_url: string;
  file_url: string;
  duration_seconds: number;
  is_active: boolean;
  created_at: string;
}

export interface Release {
  id: string;
  title: string;
  release_type: string;
  release_date: string | null;
  cover_url: string;
  description: string;
  tracklist: { title: string; duration?: string }[];
  soundcloud_url: string;
  spotify_url: string;
  bandcamp_url: string;
  youtube_url: string;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface ArcanaCard {
  id: string;
  card_number: number;
  name: string;
  archetype: string;
  description: string;
  image_url: string;
  keywords: string[];
  element: string;
  is_revealed: boolean;
  sort_order: number;
}

export interface MembershipTier {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_monthly: number;
  features: string[];
  is_active: boolean;
  sort_order: number;
}

export interface Membership {
  id: string;
  user_id: string;
  tier_id: string;
  status: string;
  started_at: string;
  expires_at: string | null;
}

export interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  event_location: string;
  venue_name: string;
  expected_attendance: number;
  budget_range: string;
  additional_notes: string;
}

export type Page = 'home' | 'merch' | 'downloads' | 'booking' | 'listening' | 'membership' | 'about' | 'releases' | 'arcana' | 'quiz';
