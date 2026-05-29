import { useState } from 'react';
import { Instagram, Twitter, Youtube, Music2, Mail, ExternalLink } from 'lucide-react';
import type { Page } from '../types';
import { supabase } from '../lib/supabase';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await supabase.from('newsletter_subscribers').insert({ email });
    setSubscribed(true);
    setLoading(false);
    setEmail('');
  }

  return (
    <footer style={{ background: '#010810', borderTop: '1px solid rgba(57,255,20,0.12)' }}>
      {/* Divider — brand image strip */}
      <div className="flex items-center justify-center gap-4 py-8">
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
        <img src="/Copilot_20260521_001427.png" alt="DJ Green Satyr" className="w-12 h-12 object-cover opacity-60" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.4))' }} />
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/Copilot_20260521_001427.png" alt="DJ Green Satyr" className="w-14 h-14 object-cover" style={{ filter: 'drop-shadow(0 0 6px rgba(57,255,20,0.4))' }} />
              <div>
                <span className="font-display block text-sm font-black" style={{ color: '#39FF14', textShadow: '0 0 8px #39FF14' }}>DJ GREEN SATYR</span>
                <span className="font-mono text-xs" style={{ color: 'rgba(212,175,55,0.6)' }}>GreenSatyr.Buzz</span>
              </div>
            </div>
            <p className="text-sm font-body" style={{ color: 'rgba(232,232,232,0.5)', lineHeight: '1.7' }}>
              Dark techno for the devoted. Enter the temple. Feel the current.
            </p>
            <div className="flex gap-4 mt-5">
              {[
                { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
                { icon: <Twitter size={18} />, href: '#', label: 'Twitter/X' },
                { icon: <Youtube size={18} />, href: '#', label: 'YouTube' },
                { icon: <Music2 size={18} />, href: '#', label: 'SoundCloud' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  className="transition-all duration-200"
                  style={{ color: 'rgba(212,175,55,0.6)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#39FF14'; (e.currentTarget as HTMLElement).style.filter = 'drop-shadow(0 0 6px #39FF14)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(212,175,55,0.6)'; (e.currentTarget as HTMLElement).style.filter = 'none'; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-xs tracking-widest mb-4 uppercase" style={{ color: '#D4AF37' }}>Navigate</h4>
            <ul className="space-y-2">
              {(['home', 'releases', 'arcana', 'quiz', 'merch', 'downloads', 'booking', 'listening', 'membership', 'about'] as Page[]).map(page => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-sm font-body capitalize transition-colors duration-200"
                    style={{ color: 'rgba(232,232,232,0.5)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#39FF14'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.5)'; }}
                  >
                    {page === 'membership' ? "Satyr's Den" : page === 'downloads' ? 'Music Shop' : page === 'arcana' ? 'Satyr Arcana' : page === 'quiz' ? 'Sound Quiz' : page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* External links */}
          <div>
            <h4 className="font-display text-xs tracking-widest mb-4 uppercase" style={{ color: '#D4AF37' }}>Listen</h4>
            <ul className="space-y-2">
              {[
                { label: 'SoundCloud', href: '#' },
                { label: 'Mixcloud', href: '#' },
                { label: 'YouTube', href: '#' },
                { label: 'Spotify', href: '#' },
                { label: 'Bandcamp', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-1.5 text-sm font-body transition-colors duration-200"
                    style={{ color: 'rgba(232,232,232,0.5)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#39FF14'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.5)'; }}
                  >
                    <ExternalLink size={12} /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-xs tracking-widest mb-4 uppercase" style={{ color: '#D4AF37' }}>Join the List</h4>
            <p className="text-sm font-body mb-4" style={{ color: 'rgba(232,232,232,0.5)' }}>
              Receive announcements, exclusive drops, and transmissions.
            </p>
            {subscribed ? (
              <p className="text-sm font-body" style={{ color: '#39FF14', textShadow: '0 0 8px #39FF14' }}>
                You're on the list.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-3 py-2 text-sm font-body rounded-none"
                    style={{ background: 'rgba(5,26,46,0.8)', border: '1px solid rgba(57,255,20,0.2)', color: '#e8e8e8' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-neon w-full text-xs py-2"
                >
                  {loading ? 'Entering...' : 'Enter the Circle'}
                </button>
              </form>
            )}
            <div className="flex items-center gap-2 mt-4">
              <Mail size={14} style={{ color: 'rgba(212,175,55,0.5)' }} />
              <a href="mailto:contact@greensatyr.buzz" className="text-xs font-mono" style={{ color: 'rgba(232,232,232,0.4)' }}>
                contact@greensatyr.buzz
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs font-mono" style={{ color: 'rgba(232,232,232,0.3)' }}>
            &copy; {new Date().getFullYear()} GreenSatyr.Buzz — All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Terms', 'Privacy', 'Refunds'].map(item => (
              <a
                key={item}
                href="#"
                className="text-xs font-body transition-colors duration-200"
                style={{ color: 'rgba(232,232,232,0.3)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(212,175,55,0.7)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.3)'; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
