import { useEffect, useState } from 'react';
import { ChevronDown, Play, MapPin, Clock } from 'lucide-react';
import type { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const upcomingEvents = [
  { date: 'JUN 14', venue: 'The Black Lodge', city: 'Chicago, IL', type: 'Club Set', time: '11PM–3AM' },
  { date: 'JUN 28', venue: 'The Grounds', city: 'Detroit, MI', type: 'Headline Set', time: '10PM–2AM' },
  { date: "JUL 12", venue: "Serpent's Hall", city: 'Austin, TX', type: 'After-Hours', time: '2AM–6AM' },
  { date: 'JUL 26', venue: 'Obsidian Club', city: 'Brooklyn, NY', type: 'Headline', time: '10PM–4AM' },
];

const quickNav = [
  { label: 'Releases', page: 'releases' as Page, img: '/Copilot_20260521_001427.png', desc: 'Albums & EPs' },
  { label: 'Music Shop', page: 'downloads' as Page, img: '/transparent_PNG_of_g.png', desc: 'Tracks & mixes' },
  { label: 'Merch', page: 'merch' as Page, img: '/fgg.png', desc: 'Apparel & gear' },
  { label: 'DJ Bookings', page: 'booking' as Page, img: '/DJ_Bookings_vine_tex.png', desc: 'Book a set' },
  { label: 'Video & Film', page: 'listening' as Page, img: '/tfg.png', desc: 'Watch & listen' },
  { label: 'Events', page: 'booking' as Page, img: '/generated-image-1_(17).png', desc: 'Shows & dates' },
  { label: 'Satyr Arcana', page: 'arcana' as Page, img: '/BCO.fed5fb31-edef-47e3-a3fe-d643a3659b67.png', desc: 'Part II · Aug 1' },
  { label: "Satyr's Den", page: 'membership' as Page, img: '/generated-image-1_(18).png', desc: 'Members only' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 40% 30%, #071E3D 0%, #010812 60%, #051A0E 100%)' }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(57,255,20,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.06) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-24">

            {/* LEFT — Text */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                <div style={{ width: '32px', height: '1px', background: 'rgba(212,175,55,0.7)' }} />
                <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#D4AF37', textShadow: '0 0 8px rgba(212,175,55,0.5)' }}>
                  DJ · Producer · Performer
                </span>
                <div style={{ width: '32px', height: '1px', background: 'rgba(212,175,55,0.7)' }} />
              </div>

              <h1 className="font-display leading-none mb-4">
                <span
                  className="block text-4xl sm:text-6xl lg:text-7xl font-black"
                  style={{ color: '#39FF14', textShadow: '0 0 20px #39FF14, 0 0 40px rgba(57,255,20,0.4)', letterSpacing: '-0.01em' }}
                >
                  DJ GREEN
                </span>
                <span
                  className="block text-6xl sm:text-8xl lg:text-9xl font-black"
                  style={{
                    color: '#FFFFFF',
                    WebkitTextStroke: '2px rgba(57,255,20,0.4)',
                    textShadow: '0 0 40px rgba(57,255,20,0.15)',
                    letterSpacing: '-0.02em',
                    lineHeight: 0.9,
                  }}
                >
                  SATYR
                </span>
              </h1>

              <p className="font-mono text-xs tracking-[0.3em] mt-3 mb-6" style={{ color: 'rgba(212,175,55,0.55)' }}>
                GREENSATYR.BUZZ
              </p>

              <p className="font-body text-lg sm:text-xl mb-8 max-w-lg mx-auto lg:mx-0" style={{ color: 'rgba(232,232,232,0.65)', lineHeight: 1.7 }}>
                Dark frequencies for the devoted. Where the underground meets the dancefloor and the forest swallows the bass.
              </p>

              {/* Satyr Arcana teaser badge */}
              <button
                onClick={() => onNavigate('arcana')}
                className="group flex items-center gap-4 mb-8 px-5 py-3 w-full sm:w-auto transition-all duration-300"
                style={{
                  border: '1px solid rgba(212,175,55,0.45)',
                  background: 'rgba(212,175,55,0.05)',
                  boxShadow: '0 0 20px rgba(212,175,55,0.08)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.7)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(212,175,55,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.45)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(212,175,55,0.08)'; }}
              >
                {/* Tarot card thumbnail */}
                <div
                  className="w-12 h-16 flex-shrink-0 overflow-hidden"
                  style={{ border: '1px solid rgba(212,175,55,0.5)', boxShadow: '0 0 12px rgba(212,175,55,0.3)' }}
                >
                  <img
                    src="/Copilot_20260417_191924.png"
                    alt="The Green Satyr Tarot Card"
                    className="w-full h-full object-cover object-top"
                    onError={e => { (e.currentTarget as HTMLImageElement).src = '/BCO.fed5fb31-edef-47e3-a3fe-d643a3659b67.png'; }}
                  />
                </div>
                <div className="text-left">
                  <p className="font-display text-xs font-black" style={{ color: '#D4AF37', textShadow: '0 0 8px rgba(212,175,55,0.6)' }}>
                    SATYR ARCANA — CARD I
                  </p>
                  <p className="font-mono text-xs mt-0.5" style={{ color: '#39FF14' }}>The Green Satyr</p>
                  <p className="font-mono text-xs mt-0.5" style={{ color: 'rgba(232,232,232,0.35)' }}>Part II drops August 1, 2026</p>
                </div>
                <ChevronDown
                  size={14}
                  className="-rotate-90 group-hover:translate-x-1 transition-transform ml-auto"
                  style={{ color: '#D4AF37', flexShrink: 0 }}
                />
              </button>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button onClick={() => onNavigate('releases')} className="btn-neon flex items-center justify-center gap-2 text-sm">
                  <Play size={14} fill="currentColor" /> Discography
                </button>
                <button onClick={() => onNavigate('booking')} className="btn-gold flex items-center justify-center gap-2 text-sm">
                  Book DJ Green Satyr
                </button>
              </div>
            </div>

            {/* RIGHT — Tarot card art */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Outer gold glow */}
                <div
                  className="absolute -inset-4 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                    animation: 'glow-pulse 3s ease-in-out infinite alternate',
                  }}
                />
                {/* Green glow beneath */}
                <div
                  className="absolute -inset-2 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(57,255,20,0.08) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />

                {/* Tarot card */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: 'min(320px, 80vw)',
                    aspectRatio: '2/3',
                    border: '2px solid rgba(212,175,55,0.6)',
                    boxShadow: '0 0 40px rgba(212,175,55,0.25), 0 0 80px rgba(57,255,20,0.1), inset 0 0 40px rgba(212,175,55,0.05)',
                  }}
                >
                  <img
                    src="/Copilot_20260417_191924.png"
                    alt="The Green Satyr — Satyr Arcana Card I"
                    className="w-full h-full object-cover"
                    style={{ filter: 'contrast(1.05) saturate(1.1)' }}
                    onError={e => {
                      // Fallback if image not yet added to public
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const parent = (e.currentTarget as HTMLImageElement).parentElement;
                      if (parent) parent.style.background = 'radial-gradient(ellipse at 50% 30%, #071E3D 0%, #010812 100%)';
                    }}
                  />
                  {/* Card title overlay at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 py-3 text-center"
                    style={{ background: 'linear-gradient(to top, rgba(1,8,18,0.9) 0%, transparent 100%)', borderTop: '1px solid rgba(212,175,55,0.3)' }}
                  >
                    <p className="font-display text-sm font-black tracking-wider" style={{ color: '#D4AF37', textShadow: '0 0 8px rgba(212,175,55,0.6)' }}>
                      THE GREEN SATYR
                    </p>
                    <p className="font-mono text-xs mt-0.5" style={{ color: 'rgba(57,255,20,0.7)' }}>Satyr Arcana · Card I</p>
                  </div>
                </div>

                {/* Floating corner sigil marks */}
                <div className="absolute -top-3 -left-3 w-6 h-6 pointer-events-none" style={{ borderTop: '2px solid rgba(212,175,55,0.6)', borderLeft: '2px solid rgba(212,175,55,0.6)' }} />
                <div className="absolute -top-3 -right-3 w-6 h-6 pointer-events-none" style={{ borderTop: '2px solid rgba(212,175,55,0.6)', borderRight: '2px solid rgba(212,175,55,0.6)' }} />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 pointer-events-none" style={{ borderBottom: '2px solid rgba(212,175,55,0.6)', borderLeft: '2px solid rgba(212,175,55,0.6)' }} />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 pointer-events-none" style={{ borderBottom: '2px solid rgba(212,175,55,0.6)', borderRight: '2px solid rgba(212,175,55,0.6)' }} />
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown size={22} style={{ color: 'rgba(57,255,20,0.4)' }} />
        </div>
      </section>

      {/* ── NAV TILES ── */}
      <section className="py-16 px-4" style={{ background: '#010812' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#D4AF37' }}>Enter the Temple</p>
            <h2 className="font-display text-2xl sm:text-3xl" style={{ color: '#e8e8e8' }}>
              Choose Your <span style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14' }}>Path</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {quickNav.map(({ label, page, img, desc }) => (
              <button
                key={`${page}-${label}`}
                onClick={() => onNavigate(page)}
                className="group relative aspect-square overflow-hidden cursor-pointer"
                style={{ border: '1px solid rgba(57,255,20,0.1)', background: '#010812' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.4)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.1)'; }}
              >
                <img
                  src={img}
                  alt={label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: 'brightness(0.82)' }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(1,8,18,0.2)' }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 py-2 px-3"
                  style={{ background: 'linear-gradient(to top, rgba(1,8,18,0.95) 0%, rgba(1,8,18,0.5) 100%)' }}
                >
                  <p className="font-display text-xs font-black tracking-wide text-center" style={{ color: '#39FF14', textShadow: '0 0 6px #39FF14' }}>{label}</p>
                </div>
                {page === 'arcana' && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 font-mono text-xs font-bold" style={{ background: '#D4AF37', color: '#010812', fontSize: '9px' }}>
                    NEW
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SATYR ARCANA SPOTLIGHT ── */}
      <section
        className="py-20 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #010812 0%, #0D1A08 50%, #010812 100%)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Tarot card display */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-6 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.1) 0%, transparent 70%)', filter: 'blur(20px)' }} />
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: 'min(280px, 75vw)',
                    aspectRatio: '2/3',
                    border: '2px solid rgba(212,175,55,0.55)',
                    boxShadow: '0 0 50px rgba(212,175,55,0.2), 0 0 100px rgba(57,255,20,0.06)',
                  }}
                >
                  <img
                    src="/Copilot_20260417_191924.png"
                    alt="Satyr Arcana Card I"
                    className="w-full h-full object-cover"
                    style={{ filter: 'contrast(1.05) saturate(1.1)' }}
                    onError={e => { (e.currentTarget as HTMLImageElement).src = '/BCO.fed5fb31-edef-47e3-a3fe-d643a3659b67.png'; }}
                  />
                </div>
                {/* Part II teaser layered over */}
                <div
                  className="absolute -bottom-4 -right-4 overflow-hidden"
                  style={{ width: '120px', aspectRatio: '1/1', border: '2px solid rgba(212,175,55,0.6)', boxShadow: '0 0 20px rgba(212,175,55,0.3)' }}
                >
                  <img src="/BCO.fed5fb31-edef-47e3-a3fe-d643a3659b67.png" alt="Part II" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-end justify-center pb-1" style={{ background: 'linear-gradient(to top, rgba(1,8,18,0.85) 0%, transparent 50%)' }}>
                    <span className="font-mono text-xs font-bold" style={{ color: '#D4AF37', fontSize: '9px' }}>PART II · AUG 1</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs tracking-[0.35em] uppercase mb-3" style={{ color: '#D4AF37' }}>Oracle Deck Series</p>
              <h2 className="font-display text-3xl sm:text-4xl font-black mb-1 leading-tight" style={{ color: '#D4AF37', textShadow: '0 0 20px rgba(212,175,55,0.5)' }}>
                Satyr Arcana
              </h2>
              <h3 className="font-display text-xl mb-5" style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14' }}>
                An Oracle Deck for the Devoted
              </h3>
              <p className="font-body text-base mb-4" style={{ color: 'rgba(232,232,232,0.6)', lineHeight: 1.8 }}>
                A tarot-inspired oracle deck drawn from the mythology of DJ Green Satyr — forest spirits, deep frequencies, and the underground. Each card is an archetype from the world of the Green Satyr.
              </p>
              <div className="flex items-center gap-3 mb-6 py-3 px-4" style={{ border: '1px solid rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.05)' }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#39FF14', boxShadow: '0 0 6px #39FF14', flexShrink: 0 }} />
                <p className="font-mono text-xs" style={{ color: '#39FF14' }}>Part II drops August 1, 2026</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => onNavigate('arcana')} className="btn-gold text-sm">Explore the Arcana</button>
                <button onClick={() => onNavigate('releases')} className="btn-neon text-sm">All Releases</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className="py-20 px-4" style={{ background: '#010812' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#D4AF37' }}>Tour Calendar</p>
              <h2 className="font-display text-2xl sm:text-3xl" style={{ color: '#e8e8e8' }}>
                Upcoming <span style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14' }}>Events</span>
              </h2>
            </div>
            <img src="/generated-image-1_(17).png" alt="Events" className="w-16 h-16 object-cover opacity-70 hidden sm:block" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.3))' }} />
          </div>

          <div className="space-y-2">
            {upcomingEvents.map((ev, i) => (
              <div
                key={i}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 transition-all duration-300 cursor-pointer"
                style={{ background: 'rgba(5,26,46,0.35)', border: '1px solid rgba(57,255,20,0.08)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.3)'; (e.currentTarget as HTMLElement).style.background = 'rgba(5,26,46,0.6)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(5,26,46,0.35)'; }}
              >
                <div className="flex items-center gap-5">
                  <div className="text-center min-w-14">
                    <span className="font-mono text-xs font-bold block" style={{ color: '#39FF14', textShadow: '0 0 8px #39FF14' }}>{ev.date}</span>
                  </div>
                  <div>
                    <p className="font-display text-sm" style={{ color: '#e8e8e8' }}>{ev.venue}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 font-mono text-xs" style={{ color: 'rgba(212,175,55,0.7)' }}><MapPin size={10} /> {ev.city}</span>
                      <span className="flex items-center gap-1 font-mono text-xs" style={{ color: 'rgba(232,232,232,0.35)' }}><Clock size={10} /> {ev.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-3 py-1 tracking-wider uppercase" style={{ background: 'rgba(230,126,34,0.12)', border: '1px solid rgba(230,126,34,0.25)', color: '#E67E22' }}>{ev.type}</span>
                  <button
                    onClick={() => onNavigate('booking')}
                    className="font-mono text-xs px-3 py-1 transition-all duration-200"
                    style={{ border: '1px solid rgba(57,255,20,0.25)', color: '#39FF14' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.08)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button onClick={() => onNavigate('booking')} className="btn-gold text-sm">Book for Your Event</button>
          </div>
        </div>
      </section>

      {/* ── FEATURED MIX ── */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(180deg, #010812 0%, #051A0E 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#D4AF37' }}>Now Playing</p>
              <h2 className="font-display text-2xl" style={{ color: '#e8e8e8' }}>
                Featured <span style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14' }}>Mix</span>
              </h2>
            </div>
            <img src="/transparent_PNG_of_g.png" alt="Music Shop" className="w-16 h-16 object-cover opacity-75 hidden sm:block" />
          </div>
          <div style={{ border: '1px solid rgba(57,255,20,0.2)', background: 'rgba(5,26,46,0.5)' }}>
            <div className="p-6 flex flex-col sm:flex-row items-center gap-6" style={{ background: 'linear-gradient(135deg, rgba(5,26,46,0.9), rgba(13,43,26,0.9))' }}>
              <img
                src="/Copilot_20260521_001427.png"
                alt="Midnight Vol. 1"
                className="w-24 h-24 object-cover flex-shrink-0"
                style={{ border: '1px solid rgba(57,255,20,0.3)', filter: 'drop-shadow(0 0 10px rgba(57,255,20,0.3))' }}
              />
              <div className="flex-1 text-center sm:text-left">
                <p className="font-display text-base font-black" style={{ color: '#39FF14', textShadow: '0 0 8px #39FF14' }}>Midnight Vol. 1</p>
                <p className="font-mono text-xs mt-1 mb-4" style={{ color: 'rgba(212,175,55,0.6)' }}>90 MIN · DARK TECHNO · FOREST RAVE</p>
                <div className="flex gap-3 justify-center sm:justify-start">
                  <button onClick={() => onNavigate('listening')} className="btn-neon text-xs py-2 flex items-center gap-1.5"><Play size={12} fill="currentColor" /> Listen Free</button>
                  <button onClick={() => onNavigate('downloads')} className="btn-gold text-xs py-2">Buy Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
