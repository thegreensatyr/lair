/*
  # GreenSatyr.Buzz Initial Schema

  ## Summary
  Creates all tables needed for the GreenSatyr.Buzz website including:
  - Physical products (merch store)
  - Digital products (downloads store)
  - Booking requests
  - Membership tiers and subscriptions
  - Newsletter subscribers
  - Tips/donations

  ## Tables
  1. `products` - Physical merch items (apparel, posters, stickers, accessories)
  2. `digital_products` - Tracks, mixes, sample packs, PDFs
  3. `booking_requests` - DJ booking form submissions
  4. `membership_tiers` - Paid membership levels
  5. `memberships` - User membership records
  6. `newsletter_subscribers` - Email list
  7. `tips` - Tip jar donations

  ## Security
  - RLS enabled on all tables
  - Public can read products and digital products
  - Only authenticated users can manage their own data
  - Admins (service role) manage all data
*/

-- Products table (physical merch)
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'apparel',
  image_url text DEFAULT '',
  inventory integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (is_active = true);

-- Digital products table
CREATE TABLE IF NOT EXISTS digital_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'track',
  image_url text DEFAULT '',
  preview_url text DEFAULT '',
  file_url text DEFAULT '',
  duration_seconds integer DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE digital_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active digital products"
  ON digital_products FOR SELECT
  USING (is_active = true);

-- Booking requests table
CREATE TABLE IF NOT EXISTS booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  event_type text NOT NULL DEFAULT 'club_set',
  event_date date,
  event_location text DEFAULT '',
  venue_name text DEFAULT '',
  expected_attendance integer DEFAULT 0,
  budget_range text DEFAULT '',
  additional_notes text DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit booking requests"
  ON booking_requests FOR INSERT
  WITH CHECK (true);

-- Membership tiers
CREATE TABLE IF NOT EXISTS membership_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  price_monthly numeric(10,2) NOT NULL DEFAULT 0,
  features text[] DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE membership_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active membership tiers"
  ON membership_tiers FOR SELECT
  USING (is_active = true);

-- User memberships
CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier_id uuid NOT NULL REFERENCES membership_tiers(id),
  status text NOT NULL DEFAULT 'active',
  started_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own membership"
  ON memberships FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own membership"
  ON memberships FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own membership"
  ON memberships FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Tips / donations
CREATE TABLE IF NOT EXISTS tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  amount numeric(10,2) NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can leave a tip"
  ON tips FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own tips"
  ON tips FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Seed membership tiers
INSERT INTO membership_tiers (name, slug, description, price_monthly, features, sort_order)
VALUES
  ('Acolyte', 'acolyte', 'Entry-level access to the Satyr''s Den', 5.00, ARRAY['Access to member chat', 'Early event announcements', 'Members-only tracks'], 1),
  ('Initiate', 'initiate', 'Full ritual access and exclusive content', 12.00, ARRAY['Everything in Acolyte', 'Live stream access', 'Monthly exclusive mix download', 'Backstage photos'], 2),
  ('High Priest', 'high-priest', 'Maximum access — the inner sanctum', 25.00, ARRAY['Everything in Initiate', 'Private Discord channel', 'Monthly 1-on-1 Q&A', 'Free digital download monthly', 'Name in credits'], 3)
ON CONFLICT (slug) DO NOTHING;

-- Seed sample products
INSERT INTO products (name, description, price, category, image_url, inventory)
VALUES
  ('GreenSatyr Ritual Tee', 'Heavy cotton tee with neon green occult print on jet black', 35.00, 'apparel', 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg', 50),
  ('Satyr''s Den Hoodie', 'Oversized hoodie — deep forest green with gold embroidery', 75.00, 'apparel', 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg', 30),
  ('Sigil Poster 18x18', 'Square format foil poster — GreenSatyr sigil on matte black', 20.00, 'posters', 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg', 100),
  ('Triquetra Sticker Pack', '5 holographic vinyl stickers — occult symbols in neon green', 8.00, 'stickers', 'https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg', 200),
  ('GreenSatyr Enamel Pin', 'Hard enamel collector pin — satyr silhouette in gold & green', 12.00, 'accessories', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 150)
ON CONFLICT DO NOTHING;

-- Seed sample digital products
INSERT INTO digital_products (name, description, price, category, image_url, preview_url, duration_seconds)
VALUES
  ('Midnight Ritual Vol. 1', 'Full 90-minute dark techno ritual mix', 5.00, 'mix', 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg', '', 5400),
  ('Forest Rave Sample Pack', '120 samples — dark forest textures, percussions, synth stabs', 15.00, 'sample_pack', 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg', '', 0),
  ('The Green Satyr Mythos (PDF)', 'A ritual guide to the Green Satyr mythology and symbolism', 8.00, 'book', 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg', '', 0),
  ('Occult Frequencies EP', '4-track EP — acid and ritual techno originals', 7.00, 'track', 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg', '', 1200)
ON CONFLICT DO NOTHING;
