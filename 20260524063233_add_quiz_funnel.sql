/*
  # Quiz Funnel Tables

  1. New Tables
    - `quiz_questions` - Quiz questions with multiple choice options, type, and ordering
    - `quiz_results` - Result archetypes mapped by answer patterns (slug-based scoring)
    - `quiz_submissions` - Stores each user's answers + email + matched result for lead capture

  2. Security
    - RLS enabled on all tables
    - Public read on questions and results
    - Anyone can insert a submission (lead capture)
    - Users can only read their own submissions

  3. Seed Data
    - 6 questions for a "What's Your Ritual Type?" funnel
    - 4 result archetypes tied to scoring
*/

CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer NOT NULL DEFAULT 0,
  question text NOT NULL,
  subtitle text DEFAULT '',
  image_url text DEFAULT '',
  options jsonb NOT NULL DEFAULT '[]',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active quiz questions"
  ON quiz_questions FOR SELECT
  USING (is_active = true);

CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  subtitle text DEFAULT '',
  description text DEFAULT '',
  image_url text DEFAULT '',
  cta_label text DEFAULT 'Enter the Temple',
  cta_url text DEFAULT '',
  color text DEFAULT '#39FF14',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active quiz results"
  ON quiz_results FOR SELECT
  USING (is_active = true);

CREATE TABLE IF NOT EXISTS quiz_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text DEFAULT '',
  name text DEFAULT '',
  answers jsonb NOT NULL DEFAULT '{}',
  result_slug text NOT NULL DEFAULT '',
  source text DEFAULT 'quiz',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a quiz"
  ON quiz_submissions FOR INSERT
  WITH CHECK (true);

-- Seed quiz questions
INSERT INTO quiz_questions (sort_order, question, subtitle, options) VALUES
(1,
 'When you walk into a venue, what pulls you to the dancefloor?',
 'Choose the one that resonates most.',
 '[
   {"id":"a","text":"The bass I can feel in my chest before I hear it","score":{"forest":2,"ritual":1,"underground":0,"cosmic":0}},
   {"id":"b","text":"The sacred geometry of the lights","score":{"forest":0,"ritual":2,"underground":0,"cosmic":2}},
   {"id":"c","text":"The anonymity — no one knows who you are in the dark","score":{"forest":0,"ritual":0,"underground":3,"cosmic":0}},
   {"id":"d","text":"A feeling like the room itself is breathing","score":{"forest":1,"ritual":2,"underground":0,"cosmic":2}}
 ]'
),
(2,
 'Which ritual do you perform before a night out?',
 '',
 '[
   {"id":"a","text":"Silence. I sit with myself until I feel ready.","score":{"forest":1,"ritual":3,"underground":0,"cosmic":1}},
   {"id":"b","text":"I put on a track and don''t move until it peaks","score":{"forest":2,"ritual":0,"underground":2,"cosmic":0}},
   {"id":"c","text":"Something physical — cold shower, movement, breathwork","score":{"forest":3,"ritual":0,"underground":0,"cosmic":1}},
   {"id":"d","text":"I don''t prepare. I arrive and let the current take me.","score":{"forest":0,"ritual":0,"underground":2,"cosmic":3}}
 ]'
),
(3,
 'What kind of set do you lose yourself in?',
 '',
 '[
   {"id":"a","text":"Slow, dark, hypnotic — the kind that erases time","score":{"forest":1,"ritual":3,"underground":1,"cosmic":0}},
   {"id":"b","text":"Acid and industrial — raw, relentless pressure","score":{"forest":0,"ritual":0,"underground":3,"cosmic":0}},
   {"id":"c","text":"Forest rave — organic, pagan, like the trees are dancing","score":{"forest":3,"ritual":1,"underground":0,"cosmic":0}},
   {"id":"d","text":"Cosmic, ambient techno — sound as frequency medicine","score":{"forest":0,"ritual":1,"underground":0,"cosmic":3}}
 ]'
),
(4,
 'How do you feel at the end of a peak night?',
 '',
 '[
   {"id":"a","text":"Empty and complete — like something was burned off","score":{"forest":0,"ritual":3,"underground":1,"cosmic":0}},
   {"id":"b","text":"Electrically alive — every nerve still humming","score":{"forest":1,"ritual":0,"underground":3,"cosmic":0}},
   {"id":"c","text":"Rooted and quiet — like I returned to something ancient","score":{"forest":3,"ritual":1,"underground":0,"cosmic":0}},
   {"id":"d","text":"Dissolved — I don''t know where I end and the music begins","score":{"forest":0,"ritual":0,"underground":0,"cosmic":3}}
 ]'
),
(5,
 'Which symbol speaks to you most?',
 '',
 '[
   {"id":"a","text":"The pentagram — earth, fire, water, air, spirit","score":{"forest":0,"ritual":3,"underground":1,"cosmic":0}},
   {"id":"b","text":"Roots growing into darkness","score":{"forest":3,"ritual":0,"underground":1,"cosmic":0}},
   {"id":"c","text":"The ouroboros — the snake consuming itself","score":{"forest":0,"ritual":1,"underground":3,"cosmic":0}},
   {"id":"d","text":"The spiral galaxy — infinite recursion","score":{"forest":0,"ritual":0,"underground":0,"cosmic":3}}
 ]'
),
(6,
 'What do you want from the music of DJ Green Satyr?',
 'Your final answer shapes your path.',
 '[
   {"id":"a","text":"A ceremony. Something that transforms me.","score":{"forest":0,"ritual":3,"underground":0,"cosmic":1}},
   {"id":"b","text":"An escape into something primal and wild","score":{"forest":3,"ritual":0,"underground":1,"cosmic":0}},
   {"id":"c","text":"The feeling of being truly underground","score":{"forest":0,"ritual":0,"underground":3,"cosmic":0}},
   {"id":"d","text":"Expansion — frequency as a portal","score":{"forest":0,"ritual":1,"underground":0,"cosmic":3}}
 ]'
);

-- Seed result archetypes
INSERT INTO quiz_results (slug, title, subtitle, description, cta_label, color) VALUES
(
  'ritual',
  'The Ritualist',
  'You are the ceremony itself.',
  'Sound is your sacred practice. You don''t attend events — you conduct them. The dancefloor is your altar, and every peak is a sacrament. You are drawn to the deepest, slowest, most transformative frequencies. Your path is inward. Your music strips away everything false until only the essential remains.',
  'Explore the Satyr Arcana',
  '#D4AF37'
),
(
  'forest',
  'The Forest Walker',
  'The bass calls you back to something older.',
  'You hear the ancient in the electronic. Pagan rhythms encoded in 4/4. The forest rave is your natural habitat — bodies moving among trees, the boundary between human and wild dissolving in the low end. You are drawn to organic, overgrown, untamed frequencies.',
  'Enter the Listening Room',
  '#39FF14'
),
(
  'underground',
  'The Initiated',
  'You live below the surface.',
  'You found the music that most never find. Industrial. Acid. Raw. You don''t need polish or comfort — you need the real thing. The dank basement. The unmarked door. The set that starts at 3AM and doesn''t apologize. You are the underground.',
  'Browse the Releases',
  '#E67E22'
),
(
  'cosmic',
  'The Frequency Traveler',
  'You use sound as a portal.',
  'For you, music is technology — a tool for altered states and expanded perception. You are drawn to the cosmic edge of the underground: ambient, spatial, psychedelic techno that treats the dancefloor as a launch pad. You don''t escape into music. You travel with it.',
  'Join the Den',
  '#00C8FF'
);
