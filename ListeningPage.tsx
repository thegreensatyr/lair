import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Heart, ExternalLink, Gift } from 'lucide-react';
import SigilBorder from '../components/SigilBorder';
import SigilSymbol from '../components/SigilSymbol';
import { supabase } from '../lib/supabase';

interface Track {
  id: string;
  title: string;
  duration: string;
  genre: string;
  year: string;
  cover: string;
}

const TRACKS: Track[] = [
  { id: '1', title: 'Midnight Vol. 1', duration: '1:32:00', genre: 'Dark Techno', year: '2024', cover: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
  { id: '2', title: 'Forest Rave — Live Set', duration: '58:12', genre: 'Forest / Psychedelic', year: '2024', cover: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
  { id: '3', title: 'Deep Frequencies EP', duration: '22:44', genre: 'Acid / Industrial', year: '2023', cover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
  { id: '4', title: 'The Descent — Ambient', duration: '44:10', genre: 'Dark Ambient', year: '2023', cover: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
];

const VIDEOS = [
  { id: 'v1', title: 'Live at The Grounds 2024', platform: 'YouTube', thumb: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', embedId: 'dQw4w9WgXcQ' },
  { id: 'v2', title: 'Forest Rave Footage', platform: 'YouTube', thumb: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', embedId: 'dQw4w9WgXcQ' },
];

export default function ListeningPage() {
  const [activeTrack, setActiveTrack] = useState<Track | null>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [tipAmount, setTipAmount] = useState(5);
  const [tipSent, setTipSent] = useState(false);
  const [tipLoading, setTipLoading] = useState(false);
  const [tipMessage, setTipMessage] = useState('');

  function toggleLike(id: string) {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function sendTip() {
    setTipLoading(true);
    await supabase.from('tips').insert({ amount: tipAmount, message: tipMessage });
    setTipSent(true);
    setTipLoading(false);
  }

  return (
    <div className="min-h-screen pt-16" style={{ background: '#020B18' }}>
      {/* Header */}
      <div className="relative py-20 px-4 overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, #071E3D 0%, #020B18 70%)', borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
        <SigilSymbol variant="eye" size={200} color="#39FF14" className="absolute left-1/2 -translate-x-1/2 top-4 opacity-5 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#D4AF37' }}>The Sanctum of Sound</p>
          <h1 className="font-display text-3xl sm:text-5xl mb-3" style={{ color: '#e8e8e8' }}>
            Listening <span style={{ color: '#39FF14', textShadow: '0 0 12px #39FF14' }}>Room</span>
          </h1>
          <p className="font-body text-base" style={{ color: 'rgba(232,232,232,0.5)' }}>
            Full mixes, live sets & previews. Enter, listen, be changed.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT — Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Now playing */}
            {activeTrack && (
              <SigilBorder variant="neon">
                <div className="p-6" style={{ background: 'rgba(5,26,46,0.9)', border: '1px solid rgba(57,255,20,0.1)' }}>
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Cover */}
                    <div className="relative flex-shrink-0">
                      <div className="w-40 h-40 overflow-hidden" style={{ border: '2px solid rgba(57,255,20,0.3)', boxShadow: '0 0 20px rgba(57,255,20,0.2)' }}>
                        <img
                          src={activeTrack.cover}
                          alt={activeTrack.title}
                          className="w-full h-full object-cover"
                          style={{ filter: isPlaying ? 'saturate(1.1)' : 'saturate(0.6)' }}
                        />
                      </div>
                      {isPlaying && (
                        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: '0 0 30px rgba(57,255,20,0.3)', border: '2px solid rgba(57,255,20,0.5)' }} />
                      )}
                    </div>

                    {/* Info + controls */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: '#D4AF37' }}>{activeTrack.genre}</p>
                          <h2 className="font-display text-lg leading-tight" style={{ color: '#e8e8e8' }}>{activeTrack.title}</h2>
                          <p className="font-mono text-xs mt-1" style={{ color: 'rgba(232,232,232,0.4)' }}>{activeTrack.year} · {activeTrack.duration}</p>
                        </div>
                        <button
                          onClick={() => toggleLike(activeTrack.id)}
                          className="transition-all duration-200"
                          style={{ color: liked.has(activeTrack.id) ? '#C0392B' : 'rgba(232,232,232,0.3)' }}
                        >
                          <Heart size={20} fill={liked.has(activeTrack.id) ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      {/* Progress bar (visual only) */}
                      <div className="mt-4 mb-4">
                        <div className="h-1 w-full rounded-none" style={{ background: 'rgba(57,255,20,0.15)' }}>
                          <div
                            className="h-full rounded-none transition-all duration-300"
                            style={{
                              width: isPlaying ? '38%' : '0%',
                              background: 'linear-gradient(90deg, #39FF14, #00C851)',
                              boxShadow: '0 0 6px #39FF14',
                            }}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="font-mono text-xs" style={{ color: 'rgba(232,232,232,0.3)' }}>{isPlaying ? '0:34:12' : '0:00:00'}</span>
                          <span className="font-mono text-xs" style={{ color: 'rgba(232,232,232,0.3)' }}>{activeTrack.duration}</span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-12 h-12 flex items-center justify-center rounded-none transition-all duration-200"
                          style={{
                            background: isPlaying ? 'rgba(57,255,20,0.2)' : 'transparent',
                            border: '1px solid #39FF14',
                            color: '#39FF14',
                            boxShadow: isPlaying ? '0 0 16px rgba(57,255,20,0.4)' : 'none',
                          }}
                        >
                          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                        </button>
                        <button
                          onClick={() => setMuted(!muted)}
                          style={{ color: muted ? 'rgba(232,232,232,0.3)' : 'rgba(212,175,55,0.7)' }}
                        >
                          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                        <input type="range" min="0" max="100" defaultValue="80" className="flex-1" />
                      </div>

                      {/* SoundCloud note */}
                      <p className="font-mono text-xs mt-4" style={{ color: 'rgba(232,232,232,0.3)' }}>
                        Full stream via SoundCloud — <a href="#" className="underline" style={{ color: 'rgba(57,255,20,0.6)' }}>open in app</a>
                      </p>
                    </div>
                  </div>
                </div>
              </SigilBorder>
            )}

            {/* Track list */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#D4AF37' }}>All Releases</h3>
              <div className="space-y-2">
                {TRACKS.map((track, i) => (
                  <button
                    key={track.id}
                    onClick={() => { setActiveTrack(track); setIsPlaying(true); }}
                    className="w-full flex items-center gap-4 p-3 text-left transition-all duration-200"
                    style={{
                      border: `1px solid ${activeTrack?.id === track.id ? 'rgba(57,255,20,0.4)' : 'rgba(57,255,20,0.08)'}`,
                      background: activeTrack?.id === track.id ? 'rgba(57,255,20,0.06)' : 'rgba(5,26,46,0.3)',
                    }}
                  >
                    <span className="font-mono text-xs w-5 text-right flex-shrink-0" style={{ color: 'rgba(232,232,232,0.3)' }}>{i + 1}</span>
                    <img src={track.cover} alt={track.title} className="w-10 h-10 object-cover flex-shrink-0" style={{ filter: 'saturate(0.7)' }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm truncate" style={{ color: activeTrack?.id === track.id ? '#39FF14' : '#e8e8e8' }}>{track.title}</p>
                      <p className="font-mono text-xs" style={{ color: 'rgba(232,232,232,0.35)' }}>{track.genre}</p>
                    </div>
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: 'rgba(232,232,232,0.35)' }}>{track.duration}</span>
                    <button
                      onClick={e => { e.stopPropagation(); toggleLike(track.id); }}
                      style={{ color: liked.has(track.id) ? '#C0392B' : 'rgba(232,232,232,0.2)', flexShrink: 0 }}
                    >
                      <Heart size={14} fill={liked.has(track.id) ? 'currentColor' : 'none'} />
                    </button>
                  </button>
                ))}
              </div>
            </div>

            {/* Videos */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#D4AF37' }}>Video Sets</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VIDEOS.map(v => (
                  <div key={v.id} className="relative overflow-hidden group cursor-pointer" onClick={() => setActiveVideo(activeVideo === v.id ? null : v.id)}>
                    <div className="aspect-video relative">
                      {activeVideo === v.id ? (
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${v.embedId}?autoplay=1`}
                          title={v.title}
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          style={{ border: 'none', background: '#000' }}
                        />
                      ) : (
                        <>
                          <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" style={{ filter: 'saturate(0.6)' }} />
                          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(2,11,24,0.5)' }}>
                            <div className="w-14 h-14 flex items-center justify-center transition-all duration-200 group-hover:scale-110" style={{ background: 'rgba(57,255,20,0.15)', border: '1px solid rgba(57,255,20,0.6)', boxShadow: '0 0 20px rgba(57,255,20,0.3)' }}>
                              <Play size={22} fill="#39FF14" style={{ color: '#39FF14' }} />
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(transparent, rgba(2,11,24,0.9))' }}>
                            <p className="font-body text-xs" style={{ color: '#e8e8e8' }}>{v.title}</p>
                            <p className="font-mono text-xs flex items-center gap-1 mt-0.5" style={{ color: '#D4AF37' }}>
                              <ExternalLink size={10} /> {v.platform}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Tip jar + info */}
          <div className="space-y-8">
            {/* Tip jar */}
            <SigilBorder variant="gold">
              <div className="p-6" style={{ background: 'rgba(5,26,46,0.9)', border: '1px solid rgba(212,175,55,0.15)' }}>
                <div className="text-center mb-5">
                  <Gift size={28} className="mx-auto mb-3" style={{ color: '#D4AF37', filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.5))' }} />
                  <h3 className="font-display text-sm" style={{ color: '#D4AF37', textShadow: '0 0 8px rgba(212,175,55,0.4)' }}>
                    Tip the Satyr
                  </h3>
                  <p className="font-body text-xs mt-1" style={{ color: 'rgba(232,232,232,0.45)' }}>
                    If the music moves you, send a token.
                  </p>
                </div>

                {tipSent ? (
                  <div className="text-center py-4">
                    <p className="font-display text-sm animate-pulse-neon" style={{ color: '#39FF14' }}>The offering is received.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {[3, 5, 10, 20].map(amt => (
                        <button
                          key={amt}
                          onClick={() => setTipAmount(amt)}
                          className="py-2 font-mono text-xs transition-all duration-200"
                          style={{
                            border: `1px solid ${tipAmount === amt ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
                            background: tipAmount === amt ? 'rgba(212,175,55,0.15)' : 'transparent',
                            color: tipAmount === amt ? '#D4AF37' : 'rgba(232,232,232,0.5)',
                          }}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={tipMessage}
                      onChange={e => setTipMessage(e.target.value)}
                      placeholder="Leave a message..."
                      className="w-full px-3 py-2 font-body text-xs mb-3 rounded-none"
                    />
                    <button onClick={sendTip} disabled={tipLoading} className="btn-gold w-full text-xs py-2.5">
                      {tipLoading ? 'Sending...' : `Send $${tipAmount} Tip`}
                    </button>
                  </>
                )}
              </div>
            </SigilBorder>

            {/* Stats */}
            <div style={{ border: '1px solid rgba(57,255,20,0.1)', background: 'rgba(5,26,46,0.4)', padding: '1.5rem' }}>
              <h4 className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#D4AF37' }}>By the Numbers</h4>
              {[
                { label: 'Total Plays', value: '42,800+' },
                { label: 'Years Active', value: '8+' },
                { label: 'Mixes Released', value: '24' },
                { label: 'Live Sets', value: '180+' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(57,255,20,0.06)' }}>
                  <span className="font-body text-xs" style={{ color: 'rgba(232,232,232,0.5)' }}>{label}</span>
                  <span className="font-mono text-xs font-bold" style={{ color: '#39FF14', textShadow: '0 0 6px rgba(57,255,20,0.4)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Membership CTA */}
            <div className="text-center p-6" style={{ background: 'linear-gradient(135deg, rgba(13,43,26,0.8), rgba(5,26,46,0.8))', border: '1px solid rgba(57,255,20,0.2)' }}>
              <SigilSymbol variant="triquetra" size={36} color="#39FF14" className="mx-auto mb-3 opacity-60" />
              <p className="font-display text-xs mb-2" style={{ color: '#39FF14' }}>Want More?</p>
              <p className="font-body text-xs mb-4" style={{ color: 'rgba(232,232,232,0.5)' }}>
                Members get full stream access, exclusive sets, and live sessions.
              </p>
              <button className="btn-neon w-full text-xs py-2">Join the Den</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
