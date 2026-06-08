import { useState } from 'react';
import { ExternalLink, Music, Radio, Archive } from 'lucide-react';

// ── Bandcamp embed IDs ──────────────────────────────────────────
const ALBUMS = [
  {
    id: 'satyr-arcana-i',
    title: 'Satyr Arcana I',
    year: '2026',
    released: 'May 1, 2026',
    tracks: 16,
    bandcampId: '3855290290',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/album/satyr-arcana-i',
    cover: 'https://f4.bcbits.com/img/a0353809289_5.jpg',
    description: 'A chromesthetic journey through the Major Arcana rendered in sound. Each track channels the energy of a tarot archetype, blending Balkan, Celtic, and industrial tech‑house with deep‑house, alternative, and cinematic textures. A dancefloor séance where myth meets memory.',
    tags: ['Tarot', 'Concept Album', 'Tech House', 'Darkwave', 'Cinematic'],
    color: '#c8962a',
  },
  {
    id: 'imbolc',
    title: 'Imbolc',
    year: '2026',
    released: 'Feb 2, 2026',
    tracks: 24,
    bandcampId: '1038269871',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/album/imbolc',
    cover: 'https://f4.bcbits.com/img/a2847027179_5.jpg',
    description: 'Released on the pagan festival of Imbolc — the midpoint between winter solstice and spring equinox. 24 tracks of raw, personal, ritual electronic music. From leather anthems to love songs, ghost stories to battle cries.',
    tags: ['Pagan', 'Electronic', 'Personal', 'Leather', 'Ritual'],
    color: '#4a9e6b',
  },
];

const LATE_NIGHT_RAIN = {
  title: 'Late Night Rain',
  artist: 'DJ Green Satyr & Wetzel Parker',
  released: 'March 14, 2026',
  bandcampId: '2088490534',
  bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/late-night-rain',
  cover: 'https://f4.bcbits.com/img/a1112996553_5.jpg',
  charts: ['#20 Vietnam Top 50', 'Viral — Indonesia', '2,733 SoundCloud plays'],
  story: 'Written and recorded with his husband Wetzel Parker shortly after their November 2025 wedding — a meditation on memory, grief, and love that crossed oceans, going viral in Indonesia and charting at #20 in Vietnam.',
};

const SINGLES = [
  { title: 'Three Women, Three Lessons', artist: 'DJ Green Satyr', year: '2026', url: 'https://djgreensatyr.bandcamp.com/track/three-women-three-lessons' },
  { title: 'Everything Hits Hard', artist: 'DJ Green Satyr', year: '2026', url: 'https://djgreensatyr.bandcamp.com/track/everything-hits-hard' },
  { title: 'The Scapegoat', artist: 'DJ Green Satyr', year: '2026', url: 'https://djgreensatyr.bandcamp.com/track/the-scapegoat' },
  { title: 'Lucky Stars', artist: 'DJ Green Satyr & Wetzel Parker', year: '2026', url: 'https://djgreensatyr.bandcamp.com/track/lucky-stars' },
  { title: 'Hold Me', artist: 'DJ Green Satyr', year: '2026', url: 'https://music.apple.com/us/artist/dj-green-satyr/1861136228' },
  { title: 'My Heart\'s in the Right Place', artist: 'DJ Green Satyr', year: '2026', url: 'https://music.apple.com/us/artist/dj-green-satyr/1861136228' },
  { title: 'I Wish You Knew', artist: 'DJ Green Satyr & Wetzel Parker', year: '2026', url: 'https://music.apple.com/us/artist/dj-green-satyr/1861136228' },
  { title: 'Crown & Temptation', artist: 'DJ Green Satyr', year: '2026', url: 'https://music.apple.com/us/artist/dj-green-satyr/1861136228' },
  { title: 'Everything Hits Hard', artist: 'DJ Green Satyr', year: '2026', url: 'https://music.apple.com/us/artist/dj-green-satyr/1861136228' },
  { title: 'Spell Song', artist: 'DJ Green Satyr', year: '2026', url: 'https://music.apple.com/us/artist/dj-green-satyr/1861136228' },
  { title: 'Angel of Chaos', artist: 'DJ Green Satyr', year: '2026', url: 'https://music.apple.com/us/artist/dj-green-satyr/1861136228' },
  { title: 'Three Women, Three Lessons', artist: 'DJ Green Satyr', year: '2026', url: 'https://music.apple.com/us/artist/dj-green-satyr/1861136228' },
  { title: 'Deep Down Dirty', artist: 'DJ Green Satyr', year: '2026', url: 'https://music.apple.com/us/artist/dj-green-satyr/1861136228' },
];

const FEATURED_MIX = {
  title: 'Three Women, Three Lessons',
  slug: 'three-women-three-lessons',
  url: 'https://www.mixcloud.com/GreenSatyr/three-women-three-lessons/',
  genres: 'House · Tech House · Progressive Hip Hop · Modern Hip Hop',
  cover: 'https://thumbnailer.mixcloud.com/unsafe/600x600/extaudio/5/c/a/6/65ef-7035-4adb-9d72-dc930694773e',
};

const MIXES = [
  { title: 'The Devour Hour', slug: 'the-devour-hour', genres: 'Tech House · Bass House', duration: '—' },
  { title: 'The Satyr Arcana (part 1)', slug: 'the-satyr-arcana', genres: 'Neo Classical Darkwave · Latin House · Progressive EDM', duration: '1:00:23' },
  { title: "Mother's Day at the Groovy Grove", slug: 'mothers-day-at-the-groovy-grove', genres: 'Soulful House · Nu-Disco', duration: '51:28' },
  { title: 'Changeling', slug: 'changeling', genres: 'Progressive EDM · Minimal Techno · Tech House', duration: '2:05:45' },
  { title: 'Wolves of the Mystic Woods (part 2)', slug: 'wolves-of-the-mystic-woods-part-2', genres: 'Techno · Deep Tech · Progressive EDM', duration: '1:13:27' },
  { title: 'Wolves of the Mystic Woods (part 1)', slug: 'wolves-of-the-mystic-woods-part-1', genres: 'Tech House · Melodic House', duration: '1:28:13' },
  { title: 'The Mockingbird Lies', slug: 'the-mockingbird-lies', genres: 'Techno · Deep Tech', duration: '59:02' },
  { title: "Green Satyr spins at Dick's — Palm Springs", slug: 'the-green-satyr-spins-at-dicks-in-palm-springs-90625', genres: 'Progressive EDM · Tech House · Nu-Disco', duration: '4:43:08' },
  { title: 'The Enchanted Emerald Forest', slug: 'the-enchanted-emerald-forest', genres: 'Vocal House · Electro', duration: '1:07:58' },
  { title: 'Bears in Space', slug: 'bears-in-space', genres: 'Bass House · Techno', duration: '1:25:35' },
];

const STREAMING = [
  { name: 'Apple Music', url: 'https://music.apple.com/us/artist/dj-green-satyr/1861136228', color: '#fc3c44' },
  { name: 'Amazon Music', url: 'https://music.amazon.co.uk/artists/B0G6TWDTB4/dj-green-satyr', color: '#00a8e1' },
  { name: 'Bandcamp', url: 'https://djgreensatyr.bandcamp.com', color: '#1da0c3' },
  { name: 'Mixcloud', url: 'https://www.mixcloud.com/GreenSatyr/', color: '#52aad8' },
  { name: 'SoundCloud', url: 'https://soundcloud.com/thegreensatyr', color: '#ff5500' },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=IM+Fell+English+SC&family=Raleway:wght@300;400;500&display=swap');

  .rp-wrap {
    background: #08060e;
    min-height: 100vh;
    padding-top: 5rem;
    font-family: 'Raleway', sans-serif;
    color: #e8e8e8;
  }

  .rp-hero {
    text-align: center;
    padding: 4rem 1.5rem 3rem;
    position: relative;
  }

  .rp-hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(200,150,42,0.08) 0%, transparent 65%);
    pointer-events: none;
  }

  .rp-eyebrow {
    font-family: 'IM Fell English SC', serif;
    font-size: 0.78rem;
    letter-spacing: 0.4em;
    color: #8a6a2e;
    margin-bottom: 0.75rem;
  }

  .rp-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    background: linear-gradient(135deg, #c8962a, #f0c96a, #c8962a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .rp-subtitle {
    font-family: 'IM Fell English SC', serif;
    font-size: 0.9rem;
    color: #5a4a2a;
    letter-spacing: 0.2em;
    margin-bottom: 2rem;
  }

  .rp-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 500px;
    margin: 0 auto 1.5rem;
  }

  .rp-divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,150,42,0.4), transparent);
  }

  .rp-divider-glyph {
    color: #c8962a;
    font-size: 1rem;
  }

  .rp-section {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  .rp-section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }

  .rp-section-icon {
    color: #c8962a;
    flex-shrink: 0;
  }

  .rp-section-title {
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #c8962a;
  }

  .rp-section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(200,150,42,0.3), transparent);
  }

  .rp-album-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
    gap: 2.5rem;
  }

  @media (max-width: 560px) {
    .rp-album-grid { grid-template-columns: 1fr; }
  }

  .rp-album-card {
    background: rgba(15, 10, 5, 0.9);
    border: 1px solid rgba(200,150,42,0.2);
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s;
  }

  .rp-album-card:hover {
    border-color: rgba(200,150,42,0.5);
  }

  .rp-album-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }

  .rp-album-top {
    display: flex;
    gap: 1.25rem;
    padding: 1.5rem 1.5rem 1rem;
    align-items: flex-start;
  }

  .rp-album-cover {
    width: 90px;
    height: 90px;
    object-fit: cover;
    flex-shrink: 0;
    border: 1px solid rgba(200,150,42,0.3);
  }

  .rp-album-meta {
    flex: 1;
  }

  .rp-album-year {
    font-family: 'IM Fell English SC', serif;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    color: #8a6a2e;
    margin-bottom: 0.3rem;
  }

  .rp-album-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #f0c96a;
    margin-bottom: 0.4rem;
    line-height: 1.3;
  }

  .rp-album-tracks {
    font-size: 0.75rem;
    color: rgba(232,232,232,0.4);
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
  }

  .rp-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .rp-tag {
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    letter-spacing: 0.15em;
    padding: 0.2rem 0.6rem;
    border: 1px solid rgba(200,150,42,0.2);
    color: rgba(200,150,42,0.6);
  }

  .rp-album-desc {
    padding: 0 1.5rem 1rem;
    font-size: 0.82rem;
    color: rgba(232,232,232,0.5);
    line-height: 1.75;
  }

  .rp-embed-wrap {
    padding: 0 1.5rem 0.5rem;
  }

  .rp-embed-wrap iframe {
    width: 100%;
    border: none;
    display: block;
  }

  .rp-album-footer {
    padding: 1rem 1.5rem 1.5rem;
    display: flex;
    gap: 0.75rem;
  }

  .rp-btn-gold {
    font-family: 'Cinzel', serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.55rem 1.2rem;
    background: linear-gradient(135deg, #c8962a, #f0c96a, #c8962a);
    color: #08060e;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .rp-btn-gold:hover { opacity: 0.85; }

  .rp-btn-ghost {
    font-family: 'Cinzel', serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.55rem 1.2rem;
    background: transparent;
    color: #c8962a;
    border: 1px solid rgba(200,150,42,0.4);
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .rp-btn-ghost:hover {
    background: rgba(200,150,42,0.1);
  }

  .rp-featured-single {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    background: rgba(15,10,5,0.9);
    border: 1px solid rgba(200,150,42,0.35);
    padding: 2rem;
    margin-bottom: 2.5rem;
    position: relative;
    overflow: hidden;
  }
  .rp-featured-single::before {
    content: '★ INTERNATIONAL CHART HIT';
    position: absolute;
    top: 0; right: 0;
    font-family: 'Cinzel', serif;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    padding: 0.35rem 1rem;
    background: linear-gradient(135deg, #c8962a, #f0c96a);
    color: #08060e;
  }
  @media (max-width: 640px) {
    .rp-featured-single { grid-template-columns: 1fr; }
  }
  .rp-featured-left { display: flex; flex-direction: column; gap: 1rem; }
  .rp-featured-cover-row { display: flex; align-items: center; gap: 1rem; }
  .rp-featured-cover { width: 80px; height: 80px; object-fit: cover; border: 1px solid rgba(200,150,42,0.4); flex-shrink: 0; }
  .rp-featured-title { font-family: 'Cinzel Decorative', serif; font-size: 1.3rem; font-weight: 700; color: #f0c96a; line-height: 1.2; margin-bottom: 0.3rem; }
  .rp-featured-artist { font-family: 'IM Fell English SC', serif; font-size: 0.75rem; color: rgba(200,150,42,0.7); letter-spacing: 0.1em; margin-bottom: 0.3rem; }
  .rp-featured-date { font-size: 0.7rem; color: rgba(232,232,232,0.35); }
  .rp-chart-badges { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .rp-chart-badge { font-family: 'Cinzel', serif; font-size: 0.62rem; letter-spacing: 0.15em; padding: 0.3rem 0.8rem; border: 1px solid rgba(200,150,42,0.5); color: #f0c96a; background: rgba(200,150,42,0.08); }
  .rp-featured-story { font-size: 0.82rem; color: rgba(232,232,232,0.55); line-height: 1.75; font-style: italic; }
  .rp-featured-right { display: flex; flex-direction: column; justify-content: center; gap: 1rem; }

  .rp-singles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 0.75rem;
  }

  .rp-single-card {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.85rem 1rem;
    background: rgba(15,10,5,0.7);
    border: 1px solid rgba(200,150,42,0.1);
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
    cursor: pointer;
  }

  .rp-single-card:hover {
    border-color: rgba(200,150,42,0.35);
    background: rgba(200,150,42,0.04);
  }

  .rp-single-num {
    font-family: 'Cinzel', serif;
    font-size: 0.6rem;
    color: rgba(200,150,42,0.4);
    width: 1.2rem;
    flex-shrink: 0;
    text-align: right;
  }

  .rp-single-info { flex: 1; min-width: 0; }

  .rp-single-title {
    font-size: 0.82rem;
    font-weight: 500;
    color: #e8e8e8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0.15rem;
  }

  .rp-single-artist {
    font-size: 0.7rem;
    color: rgba(232,232,232,0.35);
  }

  .rp-single-year {
    font-family: 'Cinzel', serif;
    font-size: 0.6rem;
    color: rgba(200,150,42,0.5);
    flex-shrink: 0;
  }

  .rp-mixes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.25rem;
  }

  .rp-mix-card {
    background: rgba(15,10,5,0.8);
    border: 1px solid rgba(82,170,216,0.15);
    padding: 1.25rem;
    transition: border-color 0.2s;
  }

  .rp-mix-card:hover {
    border-color: rgba(82,170,216,0.35);
  }

  .rp-mix-title {
    font-family: 'Cinzel', serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: #e8e8e8;
    margin-bottom: 0.4rem;
    line-height: 1.35;
  }

  .rp-mix-genres {
    font-size: 0.72rem;
    color: rgba(82,170,216,0.6);
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  .rp-mix-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.75rem;
  }

  .rp-mix-duration {
    font-family: 'Cinzel', serif;
    font-size: 0.62rem;
    color: rgba(232,232,232,0.3);
    letter-spacing: 0.1em;
  }

  .rp-mix-link {
    font-family: 'Cinzel', serif;
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    color: rgba(82,170,216,0.7);
    text-decoration: none;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: color 0.2s;
  }

  .rp-mix-link:hover { color: #52aad8; }

  .rp-streaming-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .rp-streaming-btn {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.75rem 1.75rem;
    text-decoration: none;
    border: 1px solid;
    transition: background 0.2s, color 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .rp-archive-box {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    padding: 3rem 2rem;
    border: 1px solid rgba(200,150,42,0.15);
    background: rgba(15,10,5,0.6);
    position: relative;
    overflow: hidden;
  }

  .rp-archive-box::before {
    content: '30+';
    position: absolute;
    font-family: 'Cinzel Decorative', serif;
    font-size: 8rem;
    font-weight: 700;
    color: rgba(200,150,42,0.04);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    line-height: 1;
  }

  .rp-archive-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: 1.1rem;
    color: #c8962a;
    margin-bottom: 0.75rem;
  }

  .rp-archive-text {
    font-size: 0.85rem;
    color: rgba(232,232,232,0.5);
    line-height: 1.75;
    margin-bottom: 1.5rem;
    position: relative;
  }

  .rp-separator {
    border: none;
    border-top: 1px solid rgba(200,150,42,0.08);
    margin: 0;
  }

  .coming-soon-banner {
    max-width: 1100px;
    margin: 0 auto 1rem;
    padding: 0 1.5rem;
  }

  .coming-soon-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border: 1px solid rgba(57,255,20,0.2);
    background: rgba(57,255,20,0.03);
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .coming-soon-text {
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: rgba(57,255,20,0.7);
  }

  .coming-soon-badge {
    font-family: 'Cinzel', serif;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    padding: 0.3rem 0.8rem;
    background: rgba(57,255,20,0.1);
    border: 1px solid rgba(57,255,20,0.3);
    color: rgba(57,255,20,0.8);
  }
`;

export default function ReleasesPage() {
  const [expandedMix, setExpandedMix] = useState<string | null>(null);

  return (
    <>
      <style>{css}</style>
      <div className="rp-wrap">

        {/* Hero */}
        <div className="rp-hero">
          <p className="rp-eyebrow">DJ Green Satyr</p>
          <h1 className="rp-title">Discography</h1>
          <div className="rp-divider">
            <span className="rp-divider-line" />
            <span className="rp-divider-glyph">✦</span>
            <span className="rp-divider-line" />
          </div>
          <p className="rp-subtitle">30 years of electronic music · Mid-1990s to present</p>
        </div>

        {/* Coming Soon — Satyr Arcana II */}
        <div className="coming-soon-banner">
          <div className="coming-soon-inner">
            <span className="coming-soon-text">✦ Satyr Arcana II — Opening with Card XVI: The Tower</span>
            <span className="coming-soon-badge">August 1, 2026 · Lammas</span>
          </div>
        </div>

        {/* ── ALBUMS ── */}
        <section className="rp-section">
          <div className="rp-section-header">
            <Music size={14} className="rp-section-icon" />
            <span className="rp-section-title">Albums</span>
            <span className="rp-section-line" />
          </div>

          <div className="rp-album-grid">
            {ALBUMS.map((album) => (
              <div
                key={album.id}
                className="rp-album-card"
                style={{ '--accent': album.color } as React.CSSProperties}
              >
                <div className="rp-album-top">
                  <img src={album.cover} alt={album.title} className="rp-album-cover" />
                  <div className="rp-album-meta">
                    <p className="rp-album-year">{album.released}</p>
                    <h2 className="rp-album-title">{album.title}</h2>
                    <p className="rp-album-tracks">{album.tracks} tracks</p>
                    <div className="rp-tags">
                      {album.tags.map(t => (
                        <span key={t} className="rp-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="rp-album-desc">{album.description}</p>

                <div className="rp-embed-wrap">
                  <iframe
                    src={`https://bandcamp.com/EmbeddedPlayer/album=${album.bandcampId}/size=small/bgcol=000000/linkcol=c8962a/transparent=true/`}
                    seamless
                    title={album.title}
                    height="42"
                  />
                </div>

                <div className="rp-album-footer">
                  <a href={album.bandcampUrl} target="_blank" rel="noopener noreferrer" className="rp-btn-gold">
                    Buy on Bandcamp <ExternalLink size={10} />
                  </a>
                  <a href={album.bandcampUrl} target="_blank" rel="noopener noreferrer" className="rp-btn-ghost">
                    Full tracklist
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="rp-separator" />

        {/* ── SINGLES ── */}
        <section className="rp-section">
          <div className="rp-section-header">
            <Music size={14} className="rp-section-icon" />
            <span className="rp-section-title">Singles</span>
            <span className="rp-section-line" />
          </div>

          {/* Featured Single — Late Night Rain */}
          <div className="rp-featured-single">
            <div className="rp-featured-left">
              <div className="rp-featured-cover-row">
                <img src={LATE_NIGHT_RAIN.cover} alt="Late Night Rain" className="rp-featured-cover" />
                <div>
                  <p className="rp-featured-title">Late Night Rain</p>
                  <p className="rp-featured-artist">{LATE_NIGHT_RAIN.artist}</p>
                  <p className="rp-featured-date">{LATE_NIGHT_RAIN.released}</p>
                </div>
              </div>
              <div className="rp-chart-badges">
                {LATE_NIGHT_RAIN.charts.map(c => (
                  <span key={c} className="rp-chart-badge">{c}</span>
                ))}
              </div>
              <p className="rp-featured-story">{LATE_NIGHT_RAIN.story}</p>
              <a href={LATE_NIGHT_RAIN.bandcampUrl} target="_blank" rel="noopener noreferrer" className="rp-btn-gold" style={{ alignSelf: 'flex-start' }}>
                Buy on Bandcamp <ExternalLink size={10} />
              </a>
            </div>
            <div className="rp-featured-right">
              <iframe
                src={`https://bandcamp.com/EmbeddedPlayer/track=${LATE_NIGHT_RAIN.bandcampId}/size=large/bgcol=000000/linkcol=c8962a/tracklist=false/artwork=small/transparent=true/`}
                seamless
                title="Late Night Rain"
                style={{ width: '100%', height: '120px', border: 'none' }}
              />
            </div>
          </div>

          <div className="rp-singles-grid">
            {SINGLES.map((s, i) => (
              <a key={s.title} href={s.url} target="_blank" rel="noopener noreferrer" className="rp-single-card">
                <span className="rp-single-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="rp-single-info">
                  <p className="rp-single-title">{s.title}</p>
                  <p className="rp-single-artist">{s.artist}</p>
                </div>
                <span className="rp-single-year">{s.year}</span>
              </a>
            ))}
          </div>
        </section>

        <hr className="rp-separator" />

        {/* ── DJ MIXES ── */}
        <section className="rp-section">
          <div className="rp-section-header">
            <Radio size={14} className="rp-section-icon" style={{ color: '#52aad8' }} />
            <span className="rp-section-title" style={{ color: '#52aad8' }}>DJ Mixes</span>
            <span className="rp-section-line" style={{ background: 'linear-gradient(90deg, rgba(82,170,216,0.3), transparent)' }} />
          </div>

          {/* Featured Mix — Three Women, Three Lessons */}
          <div className="rp-featured-single" style={{ marginBottom: '2.5rem', '--accent': '#52aad8' } as React.CSSProperties}>
            <div className="rp-featured-left">
              <div className="rp-featured-cover-row">
                <img src={FEATURED_MIX.cover} alt={FEATURED_MIX.title} className="rp-featured-cover" style={{ borderColor: 'rgba(82,170,216,0.4)' }} />
                <div>
                  <p className="rp-featured-title" style={{ fontSize: '1rem' }}>{FEATURED_MIX.title}</p>
                  <p className="rp-featured-artist" style={{ color: 'rgba(82,170,216,0.7)' }}>DJ Green Satyr</p>
                </div>
              </div>
              <div className="rp-chart-badges">
                {FEATURED_MIX.genres.split(' · ').map(g => (
                  <span key={g} className="rp-chart-badge" style={{ borderColor: 'rgba(82,170,216,0.4)', color: 'rgba(82,170,216,0.8)', background: 'rgba(82,170,216,0.06)' }}>{g}</span>
                ))}
              </div>
              <a href={FEATURED_MIX.url} target="_blank" rel="noopener noreferrer" className="rp-btn-ghost" style={{ alignSelf: 'flex-start', color: '#52aad8', borderColor: 'rgba(82,170,216,0.4)' }}>
                Listen on Mixcloud <ExternalLink size={10} />
              </a>
            </div>
            <div className="rp-featured-right">
              <iframe
                width="100%"
                height="120"
                src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FGreenSatyr%2F${FEATURED_MIX.slug}%2F`}
                style={{ border: 'none', display: 'block' }}
                title={FEATURED_MIX.title}
              />
            </div>
          </div>

          <div className="rp-mixes-grid">
            {MIXES.map((mix) => (
              <div key={mix.slug} className="rp-mix-card">
                {expandedMix === mix.slug ? (
                  <>
                    <iframe
                      width="100%"
                      height="120"
                      src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FGreenSatyr%2F${mix.slug}%2F`}
                      style={{ border: 'none', display: 'block', marginBottom: '0.75rem' }}
                      title={mix.title}
                    />
                    <button
                      onClick={() => setExpandedMix(null)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.65rem', color: 'rgba(232,232,232,0.3)', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}
                    >
                      ✕ collapse
                    </button>
                  </>
                ) : (
                  <>
                    <p className="rp-mix-title">{mix.title}</p>
                    <p className="rp-mix-genres">{mix.genres}</p>
                    <div className="rp-mix-footer">
                      <span className="rp-mix-duration">{mix.duration}</span>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <button
                          onClick={() => setExpandedMix(mix.slug)}
                          style={{ background: 'none', border: '1px solid rgba(82,170,216,0.3)', cursor: 'pointer', fontSize: '0.6rem', color: 'rgba(82,170,216,0.7)', fontFamily: 'Cinzel, serif', letterSpacing: '0.15em', padding: '0.3rem 0.7rem', textTransform: 'uppercase' }}
                        >
                          ▶ Play
                        </button>
                        <a
                          href={`https://www.mixcloud.com/GreenSatyr/${mix.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rp-mix-link"
                        >
                          Mixcloud <ExternalLink size={9} />
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a
              href="https://www.mixcloud.com/GreenSatyr/"
              target="_blank"
              rel="noopener noreferrer"
              className="rp-btn-ghost"
              style={{ color: '#52aad8', borderColor: 'rgba(82,170,216,0.3)' }}
            >
              All 16 Mixes on Mixcloud <ExternalLink size={10} />
            </a>
          </div>
        </section>

        <hr className="rp-separator" />

        {/* ── STREAMING ── */}
        <section className="rp-section">
          <div className="rp-section-header">
            <ExternalLink size={14} className="rp-section-icon" />
            <span className="rp-section-title">Stream Everywhere</span>
            <span className="rp-section-line" />
          </div>

          <div className="rp-streaming-grid">
            {STREAMING.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rp-streaming-btn"
                style={{ borderColor: s.color + '40', color: s.color }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = s.color + '15'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {s.name}
              </a>
            ))}
          </div>
        </section>

        <hr className="rp-separator" />

        {/* ── ARCHIVE ── */}
        <section className="rp-section">
          <div className="rp-section-header">
            <Archive size={14} className="rp-section-icon" />
            <span className="rp-section-title">The Archive</span>
            <span className="rp-section-line" />
          </div>

          <div className="rp-archive-box">
            <h3 className="rp-archive-title">The Deep Archive</h3>
            <p className="rp-archive-text">
              Over 126 tracks spanning three decades of electronic music — from the mid-1990s underground to now. DJ sets, experiments, collaborations, and unreleased material. The full history of the Green Satyr in sound.
            </p>
            <a
              href="https://soundcloud.com/thegreensatyr"
              target="_blank"
              rel="noopener noreferrer"
              className="rp-btn-ghost"
              style={{ position: 'relative' }}
            >
              Explore on SoundCloud <ExternalLink size={10} />
            </a>
          </div>
        </section>

      </div>
    </>
  );
}
