import { useState } from "react";

const BASE = "https://djgreensatyr.bandcamp.com/track/";
const IMG = "https://raw.githubusercontent.com/thegreensatyr/lair/main/";

const CARDS = [
  { id: 1, title: "The Dream Traveler", numeral: "I", image: `${IMG}1_dream_traveler.jpg`, bandcamp: `${BASE}the-dream-traveler` },
  { id: 2, title: "She Knew", numeral: "II", image: `${IMG}2_she_knewu.jpg`, bandcamp: `${BASE}she-knew` },
  { id: 3, title: "A Mother to Them", numeral: "III", image: `${IMG}3_A_mother_to_them.jpg`, bandcamp: `${BASE}mother-to-them` },
  { id: 4, title: "The Anchor", numeral: "IV", image: `${IMG}4_the_anchor.jpg`, bandcamp: `${BASE}the-anchor-in-the-room` },
  { id: 5, title: "Right On", numeral: "V", image: `${IMG}5_right_on.jpg`, bandcamp: `${BASE}right-on` },
  { id: 6, title: "F.W.B.", numeral: "VI", image: `${IMG}fwb.jpg`, bandcamp: `${BASE}f-w-b` },
  { id: 7, title: "The Message", numeral: "VII", image: `${IMG}6_the_message.jpg`, bandcamp: `${BASE}the-message` },
  { id: 8, title: "The Spark", numeral: "VIII", image: `${IMG}8_the_spark.jpg`, bandcamp: `${BASE}the-spark` },
  { id: 9, title: "Reconfiguration", numeral: "IX", image: `${IMG}reconfiguration.jpg`, bandcamp: `${BASE}reconfiguration` },
  { id: 10, title: "Fate", numeral: "X", image: `${IMG}fate.jpg`, bandcamp: `${BASE}fate` },
  { id: 11, title: "Karmic Justice", numeral: "XI", image: `${IMG}karma.jpg`, bandcamp: `${BASE}karmic-justice` },
  { id: 12, title: "Perspective", numeral: "XII", image: `${IMG}Perspective.jpg`, bandcamp: `${BASE}perspective` },
  { id: 13, title: "Santa Muerte", numeral: "XIII", image: `${IMG}santa_muerte.jpg`, bandcamp: `${BASE}santa-muerte` },
  { id: 14, title: "Temperance", numeral: "XIV", image: `${IMG}temperance.jpg`, bandcamp: `${BASE}temperance` },
  { id: 15, title: "The Devil", numeral: "XV", image: `${IMG}de_ville.jpg`, bandcamp: `${BASE}the-devil` },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=IM+Fell+English+SC&display=swap');

  .sa-gallery-wrap {
    background: #0a0705;
    min-height: 100vh;
    padding: 4rem 2rem 6rem;
    font-family: 'Cinzel', serif;
  }

  .sa-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .sa-header-eyebrow {
    font-family: 'IM Fell English SC', serif;
    font-size: 0.85rem;
    letter-spacing: 0.35em;
    color: #8a6a2e;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  .sa-header-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(1.6rem, 4vw, 3rem);
    font-weight: 700;
    background: linear-gradient(135deg, #c8962a 0%, #f0c96a 40%, #c8962a 70%, #8a6a2e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  .sa-header-sub {
    font-family: 'IM Fell English SC', serif;
    font-size: 0.9rem;
    color: #5a4a2a;
    letter-spacing: 0.2em;
  }

  .sa-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 1.5rem auto;
    max-width: 400px;
  }

  .sa-divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #8a6a2e, transparent);
  }

  .sa-divider-glyph {
    color: #c8962a;
    font-size: 1.1rem;
  }

  .sa-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  @media (max-width: 900px) {
    .sa-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
  }

  @media (max-width: 560px) {
    .sa-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
      max-width: 380px;
    }
    .sa-gallery-wrap {
      padding: 2.5rem 1.25rem 4rem;
    }
  }

  .sa-card-scene {
    perspective: 1000px;
    aspect-ratio: 1 / 1;
    cursor: pointer;
    position: relative;
  }

  .sa-card-scene:focus-visible {
    outline: 2px solid #c8962a;
    outline-offset: 4px;
    border-radius: 4px;
  }

  .sa-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  }

  .sa-card-inner.flipped {
    transform: rotateY(180deg);
  }

  .sa-card-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 4px;
    overflow: hidden;
  }

  .sa-card-front {
    background: #1a0e00;
  }

  .sa-card-back {
    transform: rotateY(180deg);
    background: #0e0a04;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    padding: 1.5rem;
  }

  .sa-copper-frame {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    border-radius: 4px;
    box-shadow:
      inset 0 0 0 3px #7a4f1a,
      inset 0 0 0 6px #1a0e00,
      inset 0 0 0 9px #c8962a,
      inset 0 0 0 11px #8a6a2e,
      0 0 0 1px #5a3a0e;
  }

  .sa-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .sa-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
    z-index: 1;
  }

  .sa-card-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    padding: 0.75rem 0.75rem 1rem;
    text-align: center;
  }

  .sa-numeral {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    letter-spacing: 0.4em;
    color: #c8962a;
    display: block;
    margin-bottom: 0.2rem;
  }

  .sa-card-name {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(0.6rem, 1.5vw, 0.85rem);
    font-weight: 700;
    color: #f0c96a;
    line-height: 1.3;
    text-shadow: 0 1px 8px rgba(0,0,0,0.9);
  }

  .sa-back-glyph {
    font-size: 2rem;
    color: #c8962a;
    line-height: 1;
  }

  .sa-back-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(0.7rem, 2vw, 1rem);
    font-weight: 700;
    color: #f0c96a;
    text-align: center;
    line-height: 1.4;
  }

  .sa-back-numeral {
    font-family: 'IM Fell English SC', serif;
    font-size: 0.75rem;
    letter-spacing: 0.35em;
    color: #8a6a2e;
  }

  .sa-back-divider {
    width: 60%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #8a6a2e, transparent);
  }

  .sa-listen-btn {
    display: inline-block;
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: #0a0705;
    background: linear-gradient(135deg, #c8962a, #f0c96a, #c8962a);
    padding: 0.6rem 1.4rem;
    border-radius: 2px;
    text-decoration: none;
    text-transform: uppercase;
    transition: opacity 0.2s, transform 0.2s;
    border: 1px solid #8a6a2e;
    cursor: pointer;
  }

  .sa-listen-btn:hover {
    opacity: 0.85;
    transform: scale(1.03);
  }

  .sa-back-hint {
    font-family: 'IM Fell English SC', serif;
    font-size: 0.62rem;
    color: #4a3a1a;
    letter-spacing: 0.15em;
  }

  .sa-footer {
    text-align: center;
    margin-top: 4rem;
  }

  .sa-footer-btn {
    display: inline-block;
    font-family: 'Cinzel', serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.25em;
    color: #c8962a;
    border: 1px solid #8a6a2e;
    padding: 0.85rem 2.5rem;
    text-decoration: none;
    text-transform: uppercase;
    transition: background 0.2s, color 0.2s;
    border-radius: 2px;
  }

  .sa-footer-btn:hover {
    background: #c8962a;
    color: #0a0705;
  }
`;

function TarotCard({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="sa-card-scene"
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => e.key === "Enter" && setFlipped(!flipped)}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={`${card.title} — click to ${flipped ? "see artwork" : "listen on Bandcamp"}`}
    >
      <div className={`sa-card-inner${flipped ? " flipped" : ""}`}>

        {/* FRONT */}
        <div className="sa-card-face sa-card-front">
          <img
            src={card.image}
            alt={card.title}
            className="sa-card-img"
            loading="lazy"
          />
          <div className="sa-card-overlay" />
          <div className="sa-copper-frame" />
          <div className="sa-card-label">
            <span className="sa-numeral">{card.numeral}</span>
            <span className="sa-card-name">{card.title}</span>
          </div>
        </div>

        {/* BACK */}
        <div className="sa-card-face sa-card-back">
          <div className="sa-copper-frame" />
          <div className="sa-back-glyph">☽✦☾</div>
          <div className="sa-back-numeral">{card.numeral}</div>
          <div className="sa-back-divider" />
          <div className="sa-back-title">{card.title}</div>
          <div className="sa-back-divider" />
          <a
            href={card.bandcamp}
            target="_blank"
            rel="noopener noreferrer"
            className="sa-listen-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Listen on Bandcamp
          </a>
          <div className="sa-back-hint">click card to return</div>
        </div>

      </div>
    </div>
  );
}

export default function SatyrArcanaGallery() {
  return (
    <>
      <style>{styles}</style>
      <section className="sa-gallery-wrap">
        <h2 className="sr-only">Satyr Arcana I — Card Gallery by DJ Green Satyr</h2>

        <header className="sa-header">
          <p className="sa-header-eyebrow">DJ Green Satyr presents</p>
          <h1 className="sa-header-title">Satyr Arcana I</h1>
          <div className="sa-divider">
            <span className="sa-divider-line" />
            <span className="sa-divider-glyph">✦</span>
            <span className="sa-divider-line" />
          </div>
          <p className="sa-header-sub">Tap a card to hear its song</p>
        </header>

        <div className="sa-grid">
          {CARDS.map((card) => (
            <TarotCard key={card.id} card={card} />
          ))}
        </div>

        <footer className="sa-footer">
          <a
            href="https://djgreensatyr.bandcamp.com/album/satyr-arcana-i"
            target="_blank"
            rel="noopener noreferrer"
            className="sa-footer-btn"
          >
            Get the Full Album on Bandcamp
          </a>
        </footer>
      </section>
    </>
  );
}
