import { useEffect, useState } from 'react';
import { Play, ExternalLink, Music, Disc, Radio } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Release, Page } from '../types';

interface ReleasesPageProps {
  onNavigate: (page: Page) => void;
}

const TYPE_LABELS: Record<string, string> = {
  album: 'Album',
  ep: 'EP',
  single: 'Single',
  mix: 'Mix',
  compilation: 'Compilation',
};

const TYPE_COLORS: Record<string, string> = {
  album: '#D4AF37',
  ep: '#39FF14',
  single: '#E67E22',
  mix: '#00C851',
  compilation: '#B5651D',
};

const STREAM_ICONS: Record<string, string> = {
  soundcloud: 'SC',
  spotify: 'SP',
  bandcamp: 'BC',
  youtube: 'YT',
};

function formatDate(d: string | null) {
  if (!d) return '';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ReleasesPage({ onNavigate }: ReleasesPageProps) {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selected, setSelected] = useState<Release | null>(null);

  useEffect(() => {
    supabase
      .from('releases')
      .select('*')
      .eq('is_published', true)
      .order('release_date', { ascending: false })
      .then(({ data }) => {
        if (data) setReleases(data as Release[]);
        setLoading(false);
      });
  }, []);

  const filters = ['all', ...Array.from(new Set(releases.map(r => r.release_type)))];
  const filtered = activeFilter === 'all' ? releases : releases.filter(r => r.release_type === activeFilter);
  const featured = releases.find(r => r.is_featured);

  return (
    <div className="min-h-screen pt-16" style={{ background: '#010812' }}>
      {/* Page header */}
      <div
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #051A0E 0%, #010812 100%)', borderBottom: '1px solid rgba(57,255,20,0.1)' }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden hidden lg:block">
          <img
            src="/Copilot_20260521_001427.png"
            alt=""
            className="absolute right-0 top-0 h-full object-contain object-right"
            style={{ opacity: 0.07, filter: 'blur(1px)' }}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#D4AF37' }}>Discography</p>
          <h1 className="font-display text-3xl sm:text-5xl mb-3" style={{ color: '#e8e8e8' }}>
            Albums & <span style={{ color: '#39FF14', textShadow: '0 0 12px #39FF14' }}>Releases</span>
          </h1>
          <p className="font-body text-base" style={{ color: 'rgba(232,232,232,0.5)' }}>
            The full ceremonial catalogue — albums, EPs, singles, and live mixes.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Featured release spotlight */}
        {featured && !loading && (
          <div className="mb-14">
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-5" style={{ color: '#D4AF37' }}>
              ★ Featured Release
            </p>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden"
              style={{ border: '1px solid rgba(212,175,55,0.35)', boxShadow: '0 0 40px rgba(212,175,55,0.08)' }}
            >
              {/* Cover */}
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={`${featured.cover_url}?auto=compress&cs=tinysrgb&w=700&h=700&fit=crop`}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.8) contrast(1.05)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(1,8,18,0.7))' }} />
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-xs px-3 py-1 font-bold" style={{ background: TYPE_COLORS[featured.release_type] || '#D4AF37', color: '#010812' }}>
                    {TYPE_LABELS[featured.release_type] || featured.release_type.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-8 flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, rgba(5,26,46,0.95), rgba(1,8,18,0.95))' }}>
                <div>
                  <p className="font-mono text-xs mb-2" style={{ color: 'rgba(212,175,55,0.6)' }}>{formatDate(featured.release_date)}</p>
                  <h2 className="font-display text-2xl sm:text-3xl font-black mb-4" style={{ color: '#D4AF37', textShadow: '0 0 15px rgba(212,175,55,0.4)' }}>
                    {featured.title}
                  </h2>
                  <p className="font-body text-sm mb-6" style={{ color: 'rgba(232,232,232,0.65)', lineHeight: 1.8 }}>
                    {featured.description}
                  </p>
                  {Array.isArray(featured.tracklist) && featured.tracklist.length > 0 && (
                    <div className="mb-6">
                      <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: '#D4AF37' }}>Tracklist</p>
                      <ol className="space-y-1.5">
                        {featured.tracklist.slice(0, 6).map((t, i) => (
                          <li key={i} className="flex items-center gap-3 font-body text-sm" style={{ color: 'rgba(232,232,232,0.55)' }}>
                            <span className="font-mono text-xs w-5 text-right" style={{ color: 'rgba(57,255,20,0.5)' }}>{i + 1}</span>
                            <span>{typeof t === 'string' ? t : t.title}</span>
                            {typeof t !== 'string' && t.duration && <span className="ml-auto font-mono text-xs" style={{ color: 'rgba(232,232,232,0.3)' }}>{t.duration}</span>}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => onNavigate('listening')} className="btn-neon text-xs py-2 flex items-center gap-1.5"><Play size={12} fill="currentColor" /> Listen</button>
                  {featured.bandcamp_url && <a href={featured.bandcamp_url} target="_blank" rel="noopener noreferrer" className="btn-gold text-xs py-2">Buy on Bandcamp</a>}
                  {featured.soundcloud_url && (
                    <a href={featured.soundcloud_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-mono text-xs px-4 py-2 transition-all duration-200" style={{ border: '1px solid rgba(57,255,20,0.2)', color: 'rgba(232,232,232,0.6)' }}>
                      <ExternalLink size={12} /> SoundCloud
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="font-mono text-xs px-4 py-1.5 tracking-wider uppercase transition-all duration-200"
              style={{
                border: `1px solid ${activeFilter === f ? (TYPE_COLORS[f] || '#39FF14') : 'rgba(57,255,20,0.18)'}`,
                color: activeFilter === f ? (TYPE_COLORS[f] || '#39FF14') : 'rgba(232,232,232,0.5)',
                background: activeFilter === f ? `${TYPE_COLORS[f] || '#39FF14'}15` : 'transparent',
              }}
            >
              {f === 'all' ? 'All' : TYPE_LABELS[f] || f}
            </button>
          ))}
        </div>

        {/* Releases grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Disc size={48} className="animate-spin-slow" style={{ color: '#39FF14', filter: 'drop-shadow(0 0 10px #39FF14)' }} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(release => (
              <button
                key={release.id}
                onClick={() => setSelected(release)}
                className="group text-left overflow-hidden transition-all duration-300"
                style={{ border: '1px solid rgba(57,255,20,0.1)', background: 'rgba(5,26,46,0.4)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${TYPE_COLORS[release.release_type] || '#39FF14'}55`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
              >
                {/* Square cover */}
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={`${release.cover_url}?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop`}
                    alt={release.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: 'saturate(0.75) contrast(1.05)' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(1,8,18,0.5)' }}>
                    <div className="w-14 h-14 flex items-center justify-center" style={{ border: `1px solid ${TYPE_COLORS[release.release_type] || '#39FF14'}`, background: 'rgba(1,8,18,0.8)' }}>
                      <Play size={20} fill={TYPE_COLORS[release.release_type] || '#39FF14'} style={{ color: TYPE_COLORS[release.release_type] || '#39FF14' }} />
                    </div>
                  </div>
                  <span
                    className="absolute top-2 left-2 font-mono text-xs px-2 py-0.5 font-bold"
                    style={{ background: TYPE_COLORS[release.release_type] || '#D4AF37', color: '#010812' }}
                  >
                    {TYPE_LABELS[release.release_type] || release.release_type.toUpperCase()}
                  </span>
                  {release.is_featured && (
                    <span className="absolute top-2 right-2 font-mono text-xs px-2 py-0.5" style={{ background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.5)', color: '#D4AF37' }}>★</span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="font-mono text-xs mb-1" style={{ color: 'rgba(212,175,55,0.5)' }}>{formatDate(release.release_date)}</p>
                  <h3 className="font-display text-sm font-black mb-2 leading-snug" style={{ color: '#e8e8e8' }}>{release.title}</h3>
                  <p className="font-body text-xs line-clamp-2" style={{ color: 'rgba(232,232,232,0.4)', lineHeight: 1.6 }}>{release.description}</p>

                  {/* Stream links */}
                  <div className="flex gap-2 mt-3">
                    {release.soundcloud_url && <span className="font-mono text-xs px-2 py-0.5" style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', color: '#39FF14' }}>SC</span>}
                    {release.spotify_url && <span className="font-mono text-xs px-2 py-0.5" style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', color: '#39FF14' }}>SP</span>}
                    {release.bandcamp_url && <span className="font-mono text-xs px-2 py-0.5" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37' }}>BC</span>}
                    {release.youtube_url && <span className="font-mono text-xs px-2 py-0.5" style={{ background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)', color: '#E67E22' }}>YT</span>}
                    {!release.soundcloud_url && !release.spotify_url && !release.bandcamp_url && !release.youtube_url && (
                      <span className="font-mono text-xs" style={{ color: 'rgba(232,232,232,0.25)' }}>Coming soon</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center py-24 gap-4">
            <Music size={48} style={{ color: 'rgba(57,255,20,0.3)' }} />
            <p className="font-body" style={{ color: 'rgba(232,232,232,0.35)' }}>No releases in this category yet.</p>
          </div>
        )}
      </div>

      {/* Release detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(1,8,18,0.92)', backdropFilter: 'blur(12px)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-2xl max-h-screen overflow-y-auto"
            style={{ background: 'rgba(5,26,46,0.98)', border: `1px solid ${TYPE_COLORS[selected.release_type] || '#39FF14'}44`, boxShadow: `0 0 60px ${TYPE_COLORS[selected.release_type] || '#39FF14'}22` }}
            onClick={e => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="aspect-square">
                <img src={`${selected.cover_url}?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop`} alt={selected.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-xs px-2 py-0.5 font-bold" style={{ background: TYPE_COLORS[selected.release_type] || '#D4AF37', color: '#010812' }}>
                    {TYPE_LABELS[selected.release_type] || selected.release_type.toUpperCase()}
                  </span>
                  <button onClick={() => setSelected(null)} className="font-mono text-xs" style={{ color: 'rgba(232,232,232,0.4)' }}>✕ Close</button>
                </div>
                <h2 className="font-display text-xl font-black mb-1" style={{ color: '#e8e8e8' }}>{selected.title}</h2>
                <p className="font-mono text-xs mb-4" style={{ color: 'rgba(212,175,55,0.6)' }}>{formatDate(selected.release_date)}</p>
                <p className="font-body text-sm mb-5" style={{ color: 'rgba(232,232,232,0.6)', lineHeight: 1.75 }}>{selected.description}</p>

                {Array.isArray(selected.tracklist) && selected.tracklist.length > 0 && (
                  <div className="mb-5">
                    <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: '#D4AF37' }}>Tracklist</p>
                    <ol className="space-y-1">
                      {selected.tracklist.map((t, i) => (
                        <li key={i} className="flex items-center gap-2 font-body text-xs" style={{ color: 'rgba(232,232,232,0.5)' }}>
                          <span className="font-mono text-xs w-4" style={{ color: 'rgba(57,255,20,0.4)' }}>{i + 1}</span>
                          {typeof t === 'string' ? t : t.title}
                          {typeof t !== 'string' && t.duration && <span className="ml-auto font-mono" style={{ color: 'rgba(232,232,232,0.25)' }}>{t.duration}</span>}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-auto">
                  {selected.soundcloud_url && <a href={selected.soundcloud_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 btn-neon text-xs py-2 px-3"><ExternalLink size={11} /> SoundCloud</a>}
                  {selected.bandcamp_url && <a href={selected.bandcamp_url} target="_blank" rel="noopener noreferrer" className="btn-gold text-xs py-2 px-3">Bandcamp</a>}
                  {selected.spotify_url && <a href={selected.spotify_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-mono text-xs px-3 py-2" style={{ border: '1px solid rgba(57,255,20,0.2)', color: '#39FF14' }}><Radio size={11} /> Spotify</a>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
