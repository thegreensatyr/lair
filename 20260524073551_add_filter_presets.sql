/*
  # Add Filter Presets Table

  1. New Tables
    - `filter_presets` — Saved photo editing presets for the booth operator
      - `id` (uuid, primary key)
      - `name` (text) — Display name
      - `category` (text) — wedding / portrait / event / bw / custom
      - `brightness` (numeric) — 0–200, default 100
      - `contrast` (numeric) — 0–200, default 100
      - `saturation` (numeric) — 0–200, default 100
      - `warmth` (numeric) — -100–100, default 0 (hue-rotate proxy)
      - `fade` (numeric) — 0–100, default 0 (opacity over white overlay)
      - `vignette` (numeric) — 0–100, default 0
      - `sharpness` (numeric) — 0–200, default 100 (contrast boost proxy)
      - `highlights` (numeric) — 0–200, default 100
      - `shadows` (numeric) — 0–200, default 100
      - `blur` (numeric) — 0–10, default 0 (px)
      - `sepia` (numeric) — 0–100, default 0
      - `grayscale` (numeric) — 0–100, default 0
      - `is_active` (boolean) — visible in quick-select list
      - `thumbnail_url` (text) — optional preview image
      - `sort_order` (int) — display ordering
      - `created_at` / `updated_at` (timestamptz)

  2. Security
    - RLS enabled, authenticated users can read/write all rows

  3. Seed data
    - 8 built-in presets covering common photo booth use cases
*/

CREATE TABLE IF NOT EXISTS filter_presets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'custom',
  brightness numeric NOT NULL DEFAULT 100,
  contrast numeric NOT NULL DEFAULT 100,
  saturation numeric NOT NULL DEFAULT 100,
  warmth numeric NOT NULL DEFAULT 0,
  fade numeric NOT NULL DEFAULT 0,
  vignette numeric NOT NULL DEFAULT 0,
  sharpness numeric NOT NULL DEFAULT 100,
  highlights numeric NOT NULL DEFAULT 100,
  shadows numeric NOT NULL DEFAULT 100,
  blur numeric NOT NULL DEFAULT 0,
  sepia numeric NOT NULL DEFAULT 0,
  grayscale numeric NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  thumbnail_url text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE filter_presets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can select filter_presets"
  ON filter_presets FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert filter_presets"
  ON filter_presets FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update filter_presets"
  ON filter_presets FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete filter_presets"
  ON filter_presets FOR DELETE TO authenticated USING (true);

-- Seed built-in presets
INSERT INTO filter_presets (name, category, brightness, contrast, saturation, warmth, fade, vignette, sepia, grayscale, blur, sort_order) VALUES
  ('Natural',      'portrait', 105, 105, 95,  5,  0,  0,  0,   0,  0, 1),
  ('Warm Glow',    'wedding',  108, 100, 110, 25, 10, 20,  8,   0,  0, 2),
  ('Cinematic',    'event',    95,  120, 80,  -8, 5,  35,  0,   0,  0, 3),
  ('Faded Film',   'custom',   110, 88,  85,  10, 22, 0,  12,   0,  0, 4),
  ('B&W Classic',  'bw',       105, 115, 0,   0,  0,  25,  0, 100,  0, 5),
  ('B&W Soft',     'bw',       115, 95,  0,   0, 15, 10,   5, 100,  0, 6),
  ('Golden Hour',  'wedding',  112, 108, 120, 35, 8,  28, 15,   0,  0, 7),
  ('Vivid',        'event',    102, 130, 140, 0,  0,  0,   0,   0,  0, 8);
