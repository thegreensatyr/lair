import { useEffect, useState } from 'react';
import { Star, Lock, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ArcanaCard } from '../types';

const ELEMENT_COLORS: Record<string, string> = {
  fire: '#E67E22',
  water: '#1A8FFF',
  earth: '#39FF14',
  air: '#D4AF37',
  aether: '#B57BFF',
  void: '#888',
};

// Card I — The Green Satyr — hardcoded as the centrepiece
const CARD_ONE = {
  number: 'I',
  name: 'The Green Satyr',
  subtitle: 'Master of Frequencies',
  description: 'The Summoner stands at his altar — turntables as instruments of power, the disco ball as sacred sun, candles burning on both sides. He is the DJ, the wild one. Sound is will made manifest.',
  keywords: ['mastery', 'power', 'craft', 'command', 'frequency'],
  element: 'earth',
};

export default function ArcanaPage() {
  const [cards, setCards] = useState<ArcanaCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ArcanaCard | null>(null);
  const [activePart, setActivePart] = useState<1 | 2>(1);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  useEffect(() => {
    supabase
      .from('arcana_cards')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data) setCards(data as ArcanaCard[]);
        setLoading(false);
      });
  }, []);

  const displayCards = activePart === 1
    ? cards.filter(c => (c as unknown as { deck_part?: number }).deck_part !== 2)
    : cards.filter(c => (c as unknown as { deck_part?: number }).deck_part === 2);

  return (
    <div className="min-h-screen pt-16" style={{ background: '#010812' }}>

      {/* ── HERO — Full card art ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.1) 0%, #010812 60%)' }}
      >
        {/* Atmospheric bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(57,255,20,0.04) 0%, transparent 60%)' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT — Card art (dominant) */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Multi-layer glow */}
                <div className="absolute -inset-8 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.15) 0%, transparent 65%)', filter: 'blur(30px)', animation: 'glow-pulse 4s ease-in-out infinite alternate' }} />
                <div className="absolute -inset-4 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(57,255,20,0.07) 0%, transparent 65%)', filter: 'blur(20px)' }} />

                {/* The Card */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: 'min(360px, 85vw)',
                    aspectRatio: '2/3',
                    border: '3px solid rgba(212,175,55,0.7)',
                    boxShadow: '0 0 60px rgba(212,175,55,0.3), 0 0 120px rgba(57,255,20,0.1), 0 40px 80px rgba(0,0,0,0.6)',
                  }}
                >
                  <img
                    src="/Copilot_20260417_191924.png"
                    alt="The Green Satyr — Satyr Arcana Card I"
                    className="w-full h-full object-cover"
                    style={{ filter: 'contrast(1.08) saturate(1.15)' }}
                    onLoad={() => setHeroImageLoaded(true)}
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).src = '/Copilot_20260521_001427.png';
                      setHeroImageLoaded(true);
                    }}
                  />

                  {/* Card shine overlay */}
                  {heroImageLoaded && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, transparent 40%, rgba(57,255,20,0.04) 100%)' }}
                    />
                  )}
                </div>

                {/* Ornamental corner brackets */}
                {[
                  'top-0 left-0 border-t-2 border-l-2 -translate-x-3 -translate-y-3',
                  'top-0 right-0 border-t-2 border-r-2 translate-x-3 -translate-y-3',
                  'bottom-0 left-0 border-b-2 border-l-2 -translate-x-3 translate-y-3',
                  'bottom-0 right-0 border-b-2 border-r-2 translate-x-3 translate-y-3',
                ].map((cls, i) => (
                  <div key={i} className={`absolute w-8 h-8 pointer-events-none ${cls}`} style={{ borderColor: 'rgba(212,175,55,0.6)' }} />
                ))}
              </div>
            </div>

            {/* RIGHT — Card info */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5))' }} />
                <Star size={16} style={{ color: '#D4AF37', filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.8))' }} />
                <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: '#D4AF37' }}>Satyr Arcana · Card I</span>
                <Star size={16} style={{ color: '#D4AF37', filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.8))' }} />
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)' }} />
              </div>

              <h1
                className="font-display text-4xl sm:text-5xl font-black mb-2 leading-tight"
                style={{ color: '#D4AF37', textShadow: '0 0 30px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.2)' }}
              >
                The Green
              </h1>
              <h1
                className="font-display text-4xl sm:text-5xl font-black mb-6 leading-tight"
                style={{ color: '#39FF14', textShadow: '0 0 20px #39FF14, 0 0 40px rgba(57,255,20,0.3)' }}
              >
                Satyr
              </h1>

              <p className="font-mono text-sm mb-6" style={{ color: 'rgba(212,175,55,0.6)', fontStyle: 'italic' }}>
                "{CARD_ONE.subtitle}"
              </p>

              <p className="font-body text-base mb-6" style={{ color: 'rgba(232,232,232,0.65)', lineHeight: 1.85 }}>
                {CARD_ONE.description}
              </p>

              {/* Keywords */}
              <div className="mb-6">
                <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(212,175,55,0.5)' }}>Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {CARD_ONE.keywords.map(k => (
                    <span
                      key={k}
                      className="font-mono text-xs px-3 py-1 capitalize"
                      style={{ border: '1px solid rgba(57,255,20,0.25)', color: '#39FF14', background: 'rgba(57,255,20,0.06)' }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              {/* Element */}
              <div className="flex items-center gap-2 mb-8">
                <div className="w-3 h-3 rounded-full" style={{ background: ELEMENT_COLORS[CARD_ONE.element], boxShadow: `0 0 8px ${ELEMENT_COLORS[CARD_ONE.element]}` }} />
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: ELEMENT_COLORS[CARD_ONE.element] }}>Element: {CARD_ONE.element}</span>
              </div>

              {/* Arcana Part II teaser */}
              <div
                className="p-4 flex items-center gap-4"
                style={{ border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.05)' }}
              >
                <img src="/BCO.fed5fb31-edef-47e3-a3fe-d643a3659b67.png" alt="Part II" className="w-14 h-14 object-cover flex-shrink-0" />
                <div>
                  <p className="font-display text-xs font-black" style={{ color: '#D4AF37' }}>SATYR ARCANA PART II</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#39FF14', boxShadow: '0 0 4px #39FF14' }} />
                    <p className="font-mono text-xs" style={{ color: '#39FF14' }}>Drops August 1, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-8">
          <ChevronDown size={22} className="animate-float" style={{ color: 'rgba(212,175,55,0.4)' }} />
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="flex items-center gap-4 px-6 py-2">
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3))' }} />
        <Star size={14} style={{ color: 'rgba(212,175,55,0.4)' }} />
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(212,175,55,0.35)' }}>The Full Deck</span>
        <Star size={14} style={{ color: 'rgba(212,175,55,0.4)' }} />
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.3), transparent)' }} />
      </div>

      {/* ── DECK GRID ── */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="font-body text-base" style={{ color: 'rgba(232,232,232,0.55)', lineHeight: 1.8 }}>
            The Satyr Arcana is a tarot-inspired oracle deck drawn from the mythology of DJ Green Satyr — forest spirits, deep frequencies, and the forces of the underground. Each card is an archetype from the world of the Green Satyr.
          </p>
        </div>

        {/* Part tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActivePart(1)}
            className="font-display text-sm px-6 py-3 transition-all duration-200"
            style={{
              border: `1px solid ${activePart === 1 ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
              background: activePart === 1 ? 'rgba(212,175,55,0.1)' : 'transparent',
              color: activePart === 1 ? '#D4AF37' : 'rgba(232,232,232,0.4)',
              textShadow: activePart === 1 ? '0 0 8px rgba(212,175,55,0.5)' : 'none',
            }}
          >
            Part I
          </button>
          <button
            onClick={() => setActivePart(2)}
            className="font-display text-sm px-6 py-3 transition-all duration-200 relative"
            style={{
              border: `1px solid ${activePart === 2 ? '#39FF14' : 'rgba(57,255,20,0.2)'}`,
              background: activePart === 2 ? 'rgba(57,255,20,0.08)' : 'transparent',
              color: activePart === 2 ? '#39FF14' : 'rgba(232,232,232,0.4)',
            }}
          >
            Part II
            <span className="absolute -top-2 -right-2 font-mono text-xs px-1.5 py-0.5 font-bold" style={{ background: '#D4AF37', color: '#010812', fontSize: '9px' }}>AUG 1</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Star size={48} className="animate-spin-slow" style={{ color: '#D4AF37', filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.8))' }} />
          </div>
        ) : activePart === 2 ? (
          /* Part II teaser */
          <div className="max-w-2xl mx-auto text-center py-12">
            <div
              className="mx-auto mb-8 overflow-hidden"
              style={{ width: 'min(300px, 80vw)', aspectRatio: '1/1', border: '2px solid rgba(212,175,55,0.5)', boxShadow: '0 0 60px rgba(212,175,55,0.15)' }}
            >
              <img src="/BCO.fed5fb31-edef-47e3-a3fe-d643a3659b67.png" alt="Satyr Arcana Part II" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-display text-2xl font-black mb-3" style={{ color: '#D4AF37', textShadow: '0 0 15px rgba(212,175,55,0.5)' }}>
              Coming August 1, 2026
            </h2>
            <p className="font-body text-base mb-8" style={{ color: 'rgba(232,232,232,0.5)', lineHeight: 1.8 }}>
              The second chapter deepens the mythology. New archetypes, expanded lore, and the full framework. Cards remain sealed until the drop date.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-1"
                  style={{ aspectRatio: '2/3', background: 'linear-gradient(170deg, rgba(212,175,55,0.06), rgba(1,8,18,0.9))', border: '1px solid rgba(212,175,55,0.15)' }}
                >
                  <Lock size={14} style={{ color: 'rgba(212,175,55,0.3)' }} />
                  <span className="font-mono" style={{ color: 'rgba(212,175,55,0.2)', fontSize: '8px' }}>?</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-center">
              <button className="btn-gold text-sm">Pre-order Part II</button>
              <button className="btn-neon text-sm">Join the Waitlist</button>
            </div>
          </div>
        ) : (
          /* Part I — Card grid with Card I as hero */
          <>
            {/* Card I spotlight in grid */}
            <div className="mb-6">
              <button
                className="group w-full flex flex-col sm:flex-row items-center gap-6 p-5 text-left transition-all duration-300"
                style={{ border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.04)', boxShadow: '0 0 30px rgba(212,175,55,0.06)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.7)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(212,175,55,0.12)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(212,175,55,0.06)'; }}
              >
                <div
                  className="flex-shrink-0 overflow-hidden"
                  style={{ width: '80px', aspectRatio: '2/3', border: '2px solid rgba(212,175,55,0.6)', boxShadow: '0 0 20px rgba(212,175,55,0.3)' }}
                >
                  <img
                    src="/Copilot_20260417_191924.png"
                    alt="Card I"
                    className="w-full h-full object-cover"
                    onError={e => { (e.currentTarget as HTMLImageElement).src = '/Copilot_20260521_001427.png'; }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs px-2 py-0.5 font-bold" style={{ background: '#D4AF37', color: '#010812' }}>CARD I</span>
                    <span className="font-mono text-xs" style={{ color: 'rgba(57,255,20,0.6)' }}>earth · featured</span>
                  </div>
                  <h3 className="font-display text-xl font-black mb-1" style={{ color: '#D4AF37', textShadow: '0 0 10px rgba(212,175,55,0.4)' }}>
                    The Green Satyr
                  </h3>
                  <p className="font-mono text-xs mb-2" style={{ color: 'rgba(212,175,55,0.5)', fontStyle: 'italic' }}>Master of Frequencies</p>
                  <p className="font-body text-sm" style={{ color: 'rgba(232,232,232,0.5)', lineHeight: 1.6 }}>
                    The DJ at the altar, turntables as instruments of power. Sound is will made manifest.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {CARD_ONE.keywords.map(k => (
                      <span key={k} className="font-mono text-xs px-2 py-0.5 capitalize" style={{ border: '1px solid rgba(57,255,20,0.2)', color: 'rgba(57,255,20,0.6)', fontSize: '10px' }}>{k}</span>
                    ))}
                  </div>
                </div>
              </button>
            </div>

            {/* Rest of Part I cards */}
            {displayCards.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {displayCards.map(card => {
                  const isRevealed = card.is_revealed;
                  const elColor = ELEMENT_COLORS[card.element] || '#D4AF37';

                  return (
                    <button
                      key={card.id}
                      onClick={() => isRevealed ? setSelected(card) : undefined}
                      className={`group relative overflow-hidden transition-all duration-300 ${isRevealed ? 'cursor-pointer' : 'cursor-default'}`}
                      style={{
                        aspectRatio: '2/3',
                        border: `1px solid ${isRevealed ? `${elColor}35` : 'rgba(212,175,55,0.1)'}`,
                        background: 'linear-gradient(170deg, rgba(5,26,46,0.9) 0%, rgba(1,8,18,0.95) 100%)',
                      }}
                      onMouseEnter={e => { if (isRevealed) { (e.currentTarget as HTMLElement).style.borderColor = `${elColor}70`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${elColor}20`; } }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = isRevealed ? `${elColor}35` : 'rgba(212,175,55,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                    >
                      {isRevealed ? (
                        <>
                          <div className="h-3/5 overflow-hidden relative">
                            {card.image_url ? (
                              <img src={`${card.image_url}?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop`} alt={card.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ filter: 'saturate(0.7) contrast(1.1)' }} />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center" style={{ background: `radial-gradient(circle, ${elColor}12 0%, transparent 70%)` }}>
                                <Star size={28} style={{ color: elColor, opacity: 0.4 }} />
                              </div>
                            )}
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(1,8,18,0.85) 100%)' }} />
                            <div className="absolute top-2 left-0 right-0 flex justify-center">
                              <span className="font-mono text-xs px-2 py-0.5" style={{ background: 'rgba(1,8,18,0.85)', color: elColor, border: `1px solid ${elColor}40` }}>
                                {card.card_number.toString().padStart(2, '0')}
                              </span>
                            </div>
                          </div>
                          <div className="h-2/5 p-2.5 flex flex-col justify-center">
                            <p className="font-display text-xs font-black text-center leading-tight mb-1" style={{ color: '#e8e8e8' }}>{card.name}</p>
                            <p className="font-mono text-center" style={{ color: elColor, opacity: 0.7, fontSize: '10px' }}>{card.archetype}</p>
                          </div>
                          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: elColor, boxShadow: `0 0 5px ${elColor}` }} />
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-3">
                          <div className="w-12 h-12 flex items-center justify-center" style={{ border: '1px solid rgba(212,175,55,0.18)', background: 'rgba(212,175,55,0.04)' }}>
                            <Lock size={16} style={{ color: 'rgba(212,175,55,0.25)' }} />
                          </div>
                          <p className="font-mono text-center" style={{ color: 'rgba(212,175,55,0.25)', fontSize: '9px' }}>Card {card.card_number.toString().padStart(2, '0')}</p>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {!loading && displayCards.length === 0 && (
              <div className="text-center py-16">
                <p className="font-body" style={{ color: 'rgba(232,232,232,0.3)' }}>Connecting to the oracle...</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Card detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(1,8,18,0.94)', backdropFilter: 'blur(16px)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden"
            style={{
              background: 'rgba(5,26,46,0.98)',
              border: `1px solid ${ELEMENT_COLORS[selected.element] || '#D4AF37'}44`,
              boxShadow: `0 0 80px ${ELEMENT_COLORS[selected.element] || '#D4AF37'}15`,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4" style={{ borderBottom: `1px solid ${ELEMENT_COLORS[selected.element] || '#D4AF37'}20` }}>
              <span className="font-mono text-xs px-2 py-0.5" style={{ background: `${ELEMENT_COLORS[selected.element] || '#D4AF37'}20`, color: ELEMENT_COLORS[selected.element] || '#D4AF37', border: `1px solid ${ELEMENT_COLORS[selected.element] || '#D4AF37'}40` }}>
                Card {selected.card_number.toString().padStart(2, '0')} · {selected.element}
              </span>
              <button onClick={() => setSelected(null)} className="font-mono text-xs" style={{ color: 'rgba(232,232,232,0.4)' }}>✕ Close</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="aspect-square">
                {selected.image_url ? (
                  <img src={`${selected.image_url}?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop`} alt={selected.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: `radial-gradient(circle, ${ELEMENT_COLORS[selected.element] || '#D4AF37'}12 0%, rgba(1,8,18,0.9) 70%)` }}>
                    <Star size={64} style={{ color: ELEMENT_COLORS[selected.element] || '#D4AF37', opacity: 0.3 }} />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="font-display text-xl font-black mb-1" style={{ color: '#e8e8e8' }}>{selected.name}</h2>
                <p className="font-mono text-xs mb-4" style={{ color: ELEMENT_COLORS[selected.element] || '#D4AF37', opacity: 0.8 }}>{selected.archetype}</p>
                <p className="font-body text-sm mb-4" style={{ color: 'rgba(232,232,232,0.6)', lineHeight: 1.75 }}>{selected.description}</p>
                {selected.keywords?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {selected.keywords.map(k => (
                      <span key={k} className="font-mono text-xs px-2 py-0.5 capitalize" style={{ border: `1px solid ${ELEMENT_COLORS[selected.element] || '#D4AF37'}30`, color: 'rgba(232,232,232,0.5)', fontSize: '10px' }}>{k}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
