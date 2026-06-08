import { useState } from 'react';
import { ExternalLink, Play, Music, Radio, Youtube } from 'lucide-react';

const VIDEOS = [
  {
    id: 'tmE1X1CQ2N4',
    title: 'The Dream Traveler',
    subtitle: 'Official Music Video — Satyr Arcana I',
    description: 'An animated journey through all 15 Major Arcana portraits from Satyr Arcana I, following the Dream Traveler as he visits each card in the deck.',
    featured: true,
  },
  {
    id: 'nYQ-QrLlNQ0',
    title: 'Pack of Hounds',
    subtitle: 'Standalone Single',
    description: '',
    featured: false,
  },
  {
    id: 'b5HZKgETdX4',
    title: 'Fear the World',
    subtitle: 'From the album Imbolc',
    description: '',
    featured: false,
  },
  {
    id: 'cyW3x5NdFCs',
    title: 'Worshipping Satan On a Cloudy Day',
    subtitle: 'Single',
    description: '',
    featured: false,
  },
];

const PLATFORMS = [
  { name: 'Bandcamp', url: 'https://djgreensatyr.bandcamp.com', color: '#1da0c3' },
  { name: 'Apple Music', url: 'https://music.apple.com/us/artist/dj-green-satyr/1861136228', color: '#fc3c44' },
  { name: 'Amazon Music', url: 'https://music.amazon.co.uk/artists/B0G6TWDTB4/dj-green-satyr', color: '#00a8e1' },
  { name: 'SoundCloud', url: 'https://soundcloud.com/thegreensatyr', color: '#ff5500' },
  { name: 'Mixcloud', url: 'https://www.mixcloud.com/GreenSatyr/', color: '#52aad8' },
  { name: 'YouTube Music', url: 'https://www.youtube.com/channel/UCctmUlLZgcdCCHNob7qBJqg', color: '#ff0000' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@greensatyr', color: '#00f2ea' },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=IM+Fell+English+SC&family=Raleway:wght@300;400;500&display=swap');

  .lp-wrap {
    background: #08060e;
    min-height: 100vh;
    padding-top: 5rem;
    font-family: 'Raleway', sans-serif;
    color: #e8e8e8;
  }

  .lp-hero {
    text-align: center;
    padding: 4rem 1.5rem 3rem;
    position: relative;
  }

  .lp-hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(200,150,42,0.07) 0%, transparent 65%);
    pointer-events: none;
  }

  .lp-eyebrow {
    font-family: 'IM Fell English SC', serif;
    font-size: 0.78rem;
    letter-spacing: 0.4em;
    color: #8a6a2e;
    margin-bottom: 0.75rem;
  }

  .lp-title {
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

  .lp-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 500px;
    margin: 0 auto 1rem;
  }

  .lp-divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,150,42,0.4), transparent);
  }

  .lp-divider-glyph { color: #c8962a; font-size: 1rem; }

  .lp-section {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  .lp-section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }

  .lp-section-icon { color: #c8962a; flex-shrink: 0; }

  .lp-section-title {
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #c8962a;
  }

  .lp-section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(200,150,42,0.3), transparent);
  }

  .lp-separator {
    border: none;
    border-top: 1px solid rgba(200,150,42,0.08);
    margin: 0;
  }

  /* ── VIDEOS ── */
  .lp-video-featured {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 2rem;
    margin-bottom: 2.5rem;
    background: rgba(15,10,5,0.8);
    border: 1px solid rgba(200,150,42,0.25);
    overflow: hidden;
  }

  @media (max-width: 700px) {
    .lp-video-featured { grid-template-columns: 1fr; }
  }

  .lp-video-embed {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
  }

  .lp-video-embed iframe {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    border: none;
  }

  .lp-video-info {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.75rem;
  }

  .lp-video-badge {
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    letter-spacing: 0.25em;
    color: #c8962a;
    text-transform: uppercase;
    border: 1px solid rgba(200,150,42,0.3);
    padding: 0.2rem 0.6rem;
    display: inline-block;
    width: fit-content;
  }

  .lp-video-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #f0c96a;
    line-height: 1.3;
  }

  .lp-video-subtitle {
    font-family: 'IM Fell English SC', serif;
    font-size: 0.75rem;
    color: rgba(200,150,42,0.6);
    letter-spacing: 0.1em;
  }

  .lp-video-desc {
    font-size: 0.82rem;
    color: rgba(232,232,232,0.5);
    line-height: 1.75;
  }

  .lp-video-link {
    font-family: 'Cinzel', serif;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    color: #c8962a;
    text-decoration: none;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.5rem;
    transition: opacity 0.2s;
  }

  .lp-video-link:hover { opacity: 0.75; }

  .lp-video-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 700px) {
    .lp-video-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 900px) and (min-width: 701px) {
    .lp-video-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .lp-video-card {
    background: rgba(15,10,5,0.7);
    border: 1px solid rgba(200,150,42,0.1);
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .lp-video-card:hover { border-color: rgba(200,150,42,0.3); }

  .lp-video-thumb {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    cursor: pointer;
  }

  .lp-video-thumb img {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transition: opacity 0.2s;
  }

  .lp-video-thumb:hover img { opacity: 0.7; }

  .lp-play-btn {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 48px; height: 48px;
    background: rgba(200,150,42,0.85);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .lp-video-thumb iframe {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    border: none;
  }

  .lp-video-card-info {
    padding: 0.85rem 1rem;
  }

  .lp-video-card-title {
    font-family: 'Cinzel', serif;
    font-size: 0.78rem;
    font-weight: 600;
    color: #e8e8e8;
    margin-bottom: 0.25rem;
    line-height: 1.35;
  }

  .lp-video-card-sub {
    font-size: 0.68rem;
    color: rgba(232,232,232,0.35);
  }

  .lp-coming-soon {
    border: 1px dashed rgba(200,150,42,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 140px;
    background: rgba(200,150,42,0.02);
  }

  .lp-coming-soon-text {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    color: rgba(200,150,42,0.3);
    text-transform: uppercase;
  }

  .lp-yt-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.75rem 1.75rem;
    border: 1px solid rgba(255,0,0,0.3);
    color: #ff4444;
    text-decoration: none;
    margin-top: 2rem;
    display: flex;
    width: fit-content;
    margin: 2rem auto 0;
    transition: background 0.2s;
  }

  .lp-yt-btn:hover { background: rgba(255,0,0,0.08); }

  /* ── PLATFORMS ── */
  .lp-platforms-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .lp-platform-btn {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.85rem 1.75rem;
    text-decoration: none;
    border: 1px solid;
    transition: background 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* ── STATS ── */
  .lp-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
    margin-bottom: 3rem;
  }

  .lp-stat-card {
    background: rgba(15,10,5,0.8);
    border: 1px solid rgba(200,150,42,0.15);
    padding: 1.5rem;
    text-align: center;
  }

  .lp-stat-number {
    font-family: 'Cinzel Decorative', serif;
    font-size: 1.75rem;
    font-weight: 700;
    background: linear-gradient(135deg, #c8962a, #f0c96a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
    margin-bottom: 0.4rem;
  }

  .lp-stat-label {
    font-family: 'IM Fell English SC', serif;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    color: rgba(232,232,232,0.4);
  }

  .lp-stat-detail {
    font-size: 0.68rem;
    color: rgba(200,150,42,0.5);
    margin-top: 0.25rem;
    font-style: italic;
  }
`;

function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="lp-video-card">
      <div className="lp-video-thumb" onClick={() => setPlaying(true)}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={video.title}
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.title}
            />
            <div className="lp-play-btn">
              <Play size={18} fill="#08060e" color="#08060e" />
            </div>
          </>
        )}
      </div>
      <div className="lp-video-card-info">
        <p className="lp-video-card-title">{video.title}</p>
        <p className="lp-video-card-sub">{video.subtitle}</p>
      </div>
    </div>
  );
}

export default function ListeningPage() {
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const featured = VIDEOS[0];
  const rest = VIDEOS.slice(1);

  return (
    <>
      <style>{css}</style>
      <div className="lp-wrap">

        {/* Hero */}
        <div className="lp-hero">
          <p className="lp-eyebrow">DJ Green Satyr</p>
          <h1 className="lp-title">Listen</h1>
          <div className="lp-divider">
            <span className="lp-divider-line" />
            <span className="lp-divider-glyph">✦</span>
            <span className="lp-divider-line" />
          </div>
        </div>

        {/* ── STATS ── */}
        <section className="lp-section" style={{ paddingTop: '0' }}>
          <div className="lp-stats-grid">
            <div className="lp-stat-card">
              <p className="lp-stat-number">69K+</p>
              <p className="lp-stat-label">SoundCloud Plays</p>
              <p className="lp-stat-detail">+133,750% in 12 months</p>
            </div>
            <div className="lp-stat-card">
              <p className="lp-stat-number">#20</p>
              <p className="lp-stat-label">Vietnam Top 50</p>
              <p className="lp-stat-detail">Late Night Rain · viral in Indonesia</p>
            </div>
            <div className="lp-stat-card">
              <p className="lp-stat-number">30+</p>
              <p className="lp-stat-label">Years Making Music</p>
              <p className="lp-stat-detail">Mid-1990s to present</p>
            </div>
            <div className="lp-stat-card">
              <p className="lp-stat-number">126+</p>
              <p className="lp-stat-label">Tracks Released</p>
              <p className="lp-stat-detail">Albums · singles · DJ mixes</p>
            </div>
          </div>
        </section>

        <hr className="lp-separator" />

        {/* ── VIDEOS ── */}
        <section className="lp-section">
          <div className="lp-section-header">
            <Youtube size={14} className="lp-section-icon" style={{ color: '#ff4444' }} />
            <span className="lp-section-title" style={{ color: '#ff4444' }}>Videos</span>
            <span className="lp-section-line" style={{ background: 'linear-gradient(90deg, rgba(255,68,68,0.3), transparent)' }} />
          </div>

          {/* Featured */}
          <div className="lp-video-featured">
            <div className="lp-video-embed">
              {featuredPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${featured.id}?autoplay=1`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={featured.title}
                />
              ) : (
                <div
                  style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
                  onClick={() => setFeaturedPlaying(true)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${featured.id}/maxresdefault.jpg`}
                    alt={featured.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 64, height: 64,
                    background: 'rgba(200,150,42,0.9)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Play size={24} fill="#08060e" color="#08060e" />
                  </div>
                </div>
              )}
            </div>
            <div className="lp-video-info">
              <span className="lp-video-badge">Official Music Video</span>
              <h2 className="lp-video-title">{featured.title}</h2>
              <p className="lp-video-subtitle">{featured.subtitle}</p>
              <p className="lp-video-desc">{featured.description}</p>
              <a
                href={`https://www.youtube.com/watch?v=${featured.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-video-link"
              >
                Watch on YouTube <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Grid */}
          <div className="lp-video-grid">
            {rest.map(v => <VideoCard key={v.id} video={v} />)}
            <div className="lp-coming-soon">
              <p className="lp-coming-soon-text">More Videos Coming Soon</p>
            </div>
          </div>

          <a
            href="https://www.youtube.com/channel/UCctmUlLZgcdCCHNob7qBJqg"
            target="_blank"
            rel="noopener noreferrer"
            className="lp-yt-btn"
          >
            <Youtube size={14} /> DJ Green Satyr on YouTube Music
          </a>
        </section>

        <hr className="lp-separator" />

        {/* ── STREAM EVERYWHERE ── */}
        <section className="lp-section">
          <div className="lp-section-header">
            <Music size={14} className="lp-section-icon" />
            <span className="lp-section-title">Stream Everywhere</span>
            <span className="lp-section-line" />
          </div>

          <div className="lp-platforms-grid">
            {PLATFORMS.map(p => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-platform-btn"
                style={{ borderColor: p.color + '40', color: p.color }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = p.color + '15'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {p.name}
              </a>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
