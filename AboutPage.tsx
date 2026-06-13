import { Mail, Download, Instagram, Twitter, Youtube, Music2, ExternalLink } from 'lucide-react';
import SigilBorder from './SigilBorder';
import SigilSymbol from './SigilSymbol';
const pressPhotos = [
  { src: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', caption: 'Press Photo 1' },
  { src: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', caption: 'Press Photo 2' },
  { src: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', caption: 'Press Photo 3' },
  { src: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', caption: 'Live Shot' },
];

const genres = ['Dark Techno', 'Forest Rave', 'Acid', 'Industrial', 'Dark Ambient', 'Deep Bass'];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16" style={{ background: '#020B18' }}>
      {/* Header */}
      <div className="relative py-24 px-4 overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, #071E3D 0%, #020B18 70%)', borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
        <SigilSymbol variant="pentagram" size={350} color="#D4AF37" animate className="absolute right-0 top-1/2 -translate-y-1/2 opacity-4 pointer-events-none hidden lg:block" />
        <div className="max-w-6xl mx-auto relative z-10">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#D4AF37' }}>The Origin Myth</p>
          <h1 className="font-display text-3xl sm:text-5xl mb-3" style={{ color: '#e8e8e8' }}>
            About & <span style={{ color: '#39FF14', textShadow: '0 0 12px #39FF14' }}>Press Kit</span>
          </h1>
          <p className="font-body text-base" style={{ color: 'rgba(232,232,232,0.5)' }}>
            Bio, photos, logos, and contact for media and promoters.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Bio section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#D4AF37' }}>Artist Bio</p>
            <h2 className="font-display text-2xl sm:text-3xl mb-6" style={{ color: '#e8e8e8' }}>
              DJ <span style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14' }}>Green Satyr</span>
            </h2>

            <div className="space-y-4 font-body text-base" style={{ color: 'rgba(232,232,232,0.65)', lineHeight: '1.85' }}>
              <p>
                Green Satyr is a DJ and producer whose music operates at the intersection of the dancefloor and the deep underground. Known for relentless, hypnotic sets that fuse dark techno, forest rave electronics, and acid-drenched industrial sound, Green Satyr has built a reputation as one of the underground's most immersive live performers.
              </p>
              <p>
                Drawing from eight years in the underground — from basement raves to festival main stages — each set is a journey. The sonic palette is deliberate: slow-building tension, heavy percussion, acid basses, and the kind of sub-frequency pressure that moves bodies before minds can process.
              </p>
              <p>
                Off the decks, Green Satyr has developed an expanding body of original productions and sample tools that define the live experience. GreenSatyr.Buzz operates as both an artist home and a digital space for the devoted.
              </p>
            </div>

            {/* Genre tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {genres.map(g => (
                <span key={g} className="font-mono text-xs px-3 py-1" style={{ border: '1px solid rgba(57,255,20,0.25)', color: 'rgba(57,255,20,0.7)', background: 'rgba(57,255,20,0.05)' }}>
                  {g}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: <Instagram size={16} />, label: 'Instagram', href: '#' },
                { icon: <Twitter size={16} />, label: 'Twitter/X', href: '#' },
                { icon: <Youtube size={16} />, label: 'YouTube', href: '#' },
                { icon: <Music2 size={16} />, label: 'SoundCloud', href: '#' },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 px-4 py-2 font-mono text-xs transition-all duration-200"
                  style={{ border: '1px solid rgba(212,175,55,0.25)', color: 'rgba(212,175,55,0.7)', background: 'transparent' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.6)'; (e.currentTarget as HTMLElement).style.color = '#D4AF37'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.25)'; (e.currentTarget as HTMLElement).style.color = 'rgba(212,175,55,0.7)'; }}
                >
                  {icon} {label}
                </a>
              ))}
            </div>
          </div>

          {/* Main press photo */}
          <div className="relative">
            <SigilBorder variant="gold">
              <div className="aspect-square overflow-hidden" style={{ border: '1px solid rgba(212,175,55,0.2)' }}>
                <img
                  src="https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=700&h=700&fit=crop"
                  alt="DJ Green Satyr"
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.75) contrast(1.1)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(2,11,24,0.6))', pointerEvents: 'none' }} />
              </div>
            </SigilBorder>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display text-xs" style={{ color: '#D4AF37', textShadow: '0 0 8px rgba(212,175,55,0.6)' }}>DJ Green Satyr — Press Photo 2024</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16 opacity-50">
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5))' }} />
          <SigilSymbol variant="triquetra" size={28} color="#D4AF37" />
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)' }} />
        </div>

        {/* Press photos grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl" style={{ color: '#e8e8e8' }}>
              Press <span style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14' }}>Photos</span>
            </h2>
            <button className="btn-neon text-xs py-2 px-4 flex items-center gap-2">
              <Download size={13} /> Download All (ZIP)
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {pressPhotos.map((photo, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden cursor-pointer" style={{ border: '1px solid rgba(57,255,20,0.12)' }}>
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  style={{ filter: 'saturate(0.65) contrast(1.05)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(2,11,24,0.7)' }}>
                  <div className="flex flex-col items-center gap-2">
                    <Download size={20} style={{ color: '#39FF14', filter: 'drop-shadow(0 0 6px #39FF14)' }} />
                    <span className="font-mono text-xs" style={{ color: '#e8e8e8' }}>{photo.caption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logos + branding */}
        <div className="mb-20">
          <h2 className="font-display text-xl mb-6" style={{ color: '#e8e8e8' }}>
            Branding <span style={{ color: '#D4AF37', textShadow: '0 0 8px rgba(212,175,55,0.5)' }}>Assets</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Primary Logo — Dark BG', bg: '#020B18', textColor: '#39FF14' },
              { label: 'Primary Logo — Light BG', bg: '#f0f0f0', textColor: '#020B18' },
              { label: 'Sigil Mark', bg: '#051A2E', textColor: '#D4AF37' },
            ].map(({ label, bg, textColor }) => (
              <div key={label} style={{ border: '1px solid rgba(57,255,20,0.15)' }}>
                <div className="aspect-square flex flex-col items-center justify-center" style={{ background: bg }}>
                  <SigilSymbol variant="pentagram" size={60} color={textColor} />
                  <p className="font-display text-sm mt-3" style={{ color: textColor }}>GreenSatyr</p>
                  <p className="font-display text-xs" style={{ color: textColor, opacity: 0.7 }}>.Buzz</p>
                </div>
                <div className="p-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(57,255,20,0.1)', background: 'rgba(5,26,46,0.6)' }}>
                  <span className="font-mono text-xs" style={{ color: 'rgba(232,232,232,0.4)' }}>{label}</span>
                  <button className="font-mono text-xs flex items-center gap-1" style={{ color: '#D4AF37' }}>
                    <Download size={11} /> SVG
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <SigilBorder variant="rust">
          <div className="p-8 sm:p-12" style={{ background: 'rgba(5,26,46,0.8)', border: '1px solid rgba(230,126,34,0.15)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div>
                <h2 className="font-display text-xl mb-6" style={{ color: '#e8e8e8' }}>
                  Get in <span style={{ color: '#E67E22', textShadow: '0 0 8px rgba(230,126,34,0.5)' }}>Touch</span>
                </h2>
                <div className="space-y-4">
                  {[
                    { label: 'General Inquiries', value: 'contact@greensatyr.buzz', icon: <Mail size={15} /> },
                    { label: 'Booking', value: 'booking@greensatyr.buzz', icon: <Mail size={15} /> },
                    { label: 'Press / Media', value: 'press@greensatyr.buzz', icon: <Mail size={15} /> },
                  ].map(({ label, value, icon }) => (
                    <div key={label}>
                      <p className="font-mono text-xs mb-1" style={{ color: 'rgba(232,232,232,0.4)' }}>{label}</p>
                      <a
                        href={`mailto:${value}`}
                        className="flex items-center gap-2 font-body text-sm transition-colors duration-200"
                        style={{ color: '#E67E22' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#E67E22'; }}
                      >
                        {icon} {value}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#D4AF37' }}>Streaming Profiles</h3>
                <div className="space-y-2">
                  {['SoundCloud', 'Mixcloud', 'Bandcamp', 'Spotify', 'YouTube'].map(platform => (
                    <a
                      key={platform}
                      href="#"
                      className="flex items-center justify-between p-3 transition-all duration-200"
                      style={{ border: '1px solid rgba(230,126,34,0.15)', background: 'rgba(5,26,46,0.5)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(230,126,34,0.35)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(230,126,34,0.15)'; }}
                    >
                      <span className="font-body text-sm" style={{ color: 'rgba(232,232,232,0.7)' }}>{platform}</span>
                      <ExternalLink size={13} style={{ color: '#E67E22' }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SigilBorder>
      </div>
    </div>
  );
}
