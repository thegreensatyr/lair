import { useEffect, useState } from 'react';
import { Download, Play, Pause, Music, BookOpen, Layers, FileAudio } from 'lucide-react';
import SigilBorder from '../components/SigilBorder';
import SigilSymbol from '../components/SigilSymbol';
import { supabase } from '../lib/supabase';
import type { DigitalProduct } from '../types';

const CATEGORIES = ['all', 'track', 'mix', 'sample_pack', 'book'];

const categoryIcon: Record<string, React.ReactNode> = {
  track: <Music size={16} />,
  mix: <FileAudio size={16} />,
  sample_pack: <Layers size={16} />,
  book: <BookOpen size={16} />,
};

const categoryLabel: Record<string, string> = {
  track: 'Track / EP',
  mix: 'Mix',
  sample_pack: 'Sample Pack',
  book: 'PDF Book',
};

function formatDuration(secs: number) {
  if (!secs) return '';
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function DownloadsPage() {
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [playing, setPlaying] = useState<string | null>(null);
  const [purchased, setPurchased] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('digital_products').select('*').order('created_at').then(({ data }) => {
      if (data) setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  function handleBuy(id: string) {
    setPurchased(id);
    setTimeout(() => setPurchased(null), 2000);
  }

  return (
    <div className="min-h-screen pt-16" style={{ background: '#020B18' }}>
      {/* Header */}
      <div className="relative py-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0D2B1A 0%, #020B18 100%)', borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
        <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none overflow-hidden hidden lg:block">
          <img src="/transparent_PNG_of_g.png" alt="" className="absolute right-0 top-0 h-full object-contain object-right" style={{ opacity: 0.25, filter: 'drop-shadow(0 0 20px rgba(57,255,20,0.3))' }} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <img src="/transparent_PNG_of_g.png" alt="Music Shop" className="w-16 h-16 object-cover" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.5))' }} />
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase mb-1" style={{ color: '#D4AF37' }}>Digital Transmissions</p>
              <h1 className="font-display text-3xl sm:text-5xl" style={{ color: '#e8e8e8' }}>
                Music <span style={{ color: '#39FF14', textShadow: '0 0 12px #39FF14' }}>Shop</span>
              </h1>
            </div>
          </div>
          <p className="font-body text-base" style={{ color: 'rgba(232,232,232,0.5)' }}>
            Tracks, mixes, sample packs & digital releases. Instant delivery.
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-16 z-30 px-4 py-3 flex items-center gap-3 flex-wrap" style={{ background: 'rgba(2,11,24,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(57,255,20,0.08)' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="flex items-center gap-1.5 font-mono text-xs px-4 py-1.5 tracking-wider uppercase transition-all duration-200"
            style={{
              border: `1px solid ${activeCategory === cat ? '#39FF14' : 'rgba(57,255,20,0.2)'}`,
              color: activeCategory === cat ? '#39FF14' : 'rgba(232,232,232,0.5)',
              background: activeCategory === cat ? 'rgba(57,255,20,0.1)' : 'transparent',
            }}
          >
            {cat !== 'all' && categoryIcon[cat]}
            {cat === 'all' ? 'All' : categoryLabel[cat] || cat}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-24">
            <SigilSymbol variant="pentagram" size={60} color="#39FF14" animate />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(product => (
              <SigilBorder key={product.id} variant="neon">
                <div className="card-dark flex flex-col overflow-hidden" style={{ border: 'none' }}>
                  {/* Square image */}
                  <div className="aspect-square relative overflow-hidden group">
                    <img
                      src={`${product.image_url}?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop`}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: 'saturate(0.7) contrast(1.1)' }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,11,24,0.8) 0%, transparent 60%)' }} />

                    {/* Category badge */}
                    <div
                      className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 font-mono text-xs uppercase tracking-wider"
                      style={{ background: 'rgba(13,43,26,0.9)', border: '1px solid rgba(57,255,20,0.3)', color: '#39FF14' }}
                    >
                      {categoryIcon[product.category]}
                      {categoryLabel[product.category] || product.category}
                    </div>

                    {product.duration_seconds > 0 && (
                      <span className="absolute bottom-2 right-2 font-mono text-xs px-2 py-0.5" style={{ background: 'rgba(2,11,24,0.85)', color: 'rgba(212,175,55,0.8)' }}>
                        {formatDuration(product.duration_seconds)}
                      </span>
                    )}

                    {/* Play button */}
                    <button
                      onClick={() => setPlaying(playing === product.id ? null : product.id)}
                      className="absolute bottom-2 left-2 w-10 h-10 flex items-center justify-center transition-all duration-200 rounded-none"
                      style={{ background: playing === product.id ? 'rgba(57,255,20,0.9)' : 'rgba(2,11,24,0.85)', border: '1px solid rgba(57,255,20,0.5)', color: playing === product.id ? '#020B18' : '#39FF14' }}
                    >
                      {playing === product.id ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                    </button>
                  </div>

                  {/* Preview bar */}
                  {playing === product.id && (
                    <div className="px-4 py-2" style={{ background: 'rgba(57,255,20,0.06)', borderTop: '1px solid rgba(57,255,20,0.15)' }}>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5 items-end h-4">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 rounded-none"
                              style={{
                                background: '#39FF14',
                                height: `${Math.random() * 100}%`,
                                animation: `glow-pulse ${0.4 + Math.random() * 0.4}s ease-in-out infinite alternate`,
                                opacity: 0.8,
                              }}
                            />
                          ))}
                        </div>
                        <span className="font-mono text-xs" style={{ color: 'rgba(57,255,20,0.8)' }}>Preview...</span>
                      </div>
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <h3 className="font-display text-xs leading-snug mb-1" style={{ color: '#e8e8e8' }}>{product.name}</h3>
                      <p className="font-body text-xs" style={{ color: 'rgba(232,232,232,0.4)', lineHeight: '1.5' }}>{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-mono font-bold text-base" style={{ color: '#D4AF37', textShadow: '0 0 6px rgba(212,175,55,0.4)' }}>
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleBuy(product.id)}
                        className="flex items-center gap-1.5 font-mono text-xs px-4 py-2 transition-all duration-200"
                        style={{
                          background: purchased === product.id ? 'rgba(57,255,20,0.15)' : 'transparent',
                          border: `1px solid ${purchased === product.id ? '#39FF14' : 'rgba(212,175,55,0.4)'}`,
                          color: purchased === product.id ? '#39FF14' : '#D4AF37',
                        }}
                      >
                        {purchased === product.id ? '✓ Purchased' : <><Download size={12} /> Buy</>}
                      </button>
                    </div>
                  </div>
                </div>
              </SigilBorder>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <SigilSymbol variant="eye" size={60} color="#D4AF37" />
            <p className="font-body text-base" style={{ color: 'rgba(232,232,232,0.4)' }}>No downloads in this category yet.</p>
          </div>
        )}
      </div>

      {/* Bundle CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <SigilBorder variant="gold">
          <div
            className="p-8 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(5,26,46,0.9), rgba(13,43,26,0.9))', border: '1px solid rgba(212,175,55,0.2)' }}
          >
            <SigilSymbol variant="sigil" size={44} color="#D4AF37" className="mx-auto mb-4 opacity-60" animate />
            <h3 className="font-display text-xl mb-3" style={{ color: '#D4AF37', textShadow: '0 0 10px rgba(212,175,55,0.5)' }}>
              The Complete Bundle
            </h3>
            <p className="font-body text-sm mb-6 max-w-md mx-auto" style={{ color: 'rgba(232,232,232,0.6)' }}>
              All current digital releases — mixes, EPs, sample packs, and the Green Satyr Mythos guide — at one price.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div>
                <span className="font-mono text-sm line-through" style={{ color: 'rgba(232,232,232,0.3)' }}>$35.00</span>
                <span className="font-mono font-bold text-2xl ml-3" style={{ color: '#D4AF37', textShadow: '0 0 10px rgba(212,175,55,0.6)' }}>$22.00</span>
              </div>
              <button className="btn-gold text-sm">Get the Bundle</button>
            </div>
          </div>
        </SigilBorder>
      </div>
    </div>
  );
}
