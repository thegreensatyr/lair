import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Page } from './index';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { label: string; page: Page }[] = [
  { label: 'Releases', page: 'releases' },
  { label: 'Music Shop', page: 'downloads' },
  { label: 'Merch', page: 'merch' },
  { label: 'DJ Bookings', page: 'booking' },
  { label: 'Listening', page: 'listening' },
  { label: 'Sound Quiz', page: 'quiz' },
  { label: "Satyr's Den", page: 'membership' },
  { label: 'Satyr Arcana', page: 'arcana' },
  { label: 'About', page: 'about' },
];

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(1,6,12,0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(57,255,20,0.15)',
        boxShadow: '0 2px 30px rgba(0,0,0,0.8)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo — uses brand character image */}
          <button
            onClick={() => { onNavigate('home'); setMobileOpen(false); }}
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <img
              src="/Copilot_20260521_001427.png"
              alt="DJ Green Satyr"
              className="w-10 h-10 object-cover rounded-none"
              style={{ imageRendering: 'crisp-edges', filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.6))' }}
            />
            <div className="leading-none">
              <span
                className="font-display block text-xs sm:text-sm font-black tracking-wider"
                style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14, 0 0 20px rgba(57,255,20,0.4)', letterSpacing: '0.08em' }}
              >
                DJ GREEN
              </span>
              <span
                className="font-display block text-base sm:text-lg font-black"
                style={{ color: '#D4AF37', textShadow: '0 0 10px rgba(212,175,55,0.7)', letterSpacing: '0.05em', marginTop: '-2px' }}
              >
                SATYR
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map(({ label, page }) => {
              const active = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => onNavigate(page)}
                  className="relative px-3 py-2 font-body text-xs tracking-wider uppercase transition-all duration-200 group"
                  style={{
                    color: active ? '#39FF14' : 'rgba(232,232,232,0.6)',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textShadow: active ? '0 0 8px #39FF14' : 'none',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#e8e8e8'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.6)'; }}
                >
                  {label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-2 right-2 h-px"
                      style={{ background: '#39FF14', boxShadow: '0 0 6px #39FF14' }}
                    />
                  )}
                  {(page === 'arcana' || page === 'quiz') && (
                    <span
                      className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                      style={{ background: page === 'quiz' ? '#39FF14' : '#D4AF37', boxShadow: `0 0 4px ${page === 'quiz' ? '#39FF14' : '#D4AF37'}` }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 transition-all duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: '#39FF14', filter: mobileOpen ? 'drop-shadow(0 0 8px #39FF14)' : 'none' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{
            background: 'rgba(1,6,12,0.99)',
            borderBottom: '1px solid rgba(57,255,20,0.15)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.9)',
          }}
        >
          {/* Brand image strip */}
          <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(57,255,20,0.08)' }}>
            <img src="/Copilot_20260521_001427.png" alt="DJ Green Satyr" className="w-14 h-14 object-cover" style={{ filter: 'drop-shadow(0 0 6px rgba(57,255,20,0.5))' }} />
            <div>
              <p className="font-display text-sm font-black" style={{ color: '#39FF14', textShadow: '0 0 8px #39FF14' }}>DJ GREEN SATYR</p>
              <p className="font-mono text-xs" style={{ color: 'rgba(212,175,55,0.7)' }}>GreenSatyr.Buzz</p>
            </div>
          </div>
          <nav className="py-2">
            {navItems.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => { onNavigate(page); setMobileOpen(false); }}
                className="w-full flex items-center gap-3 px-5 py-3 text-left font-body text-sm tracking-wider uppercase transition-all duration-150"
                style={{
                  color: currentPage === page ? '#39FF14' : 'rgba(232,232,232,0.75)',
                  background: currentPage === page ? 'rgba(57,255,20,0.07)' : 'transparent',
                  borderLeft: currentPage === page ? '2px solid #39FF14' : '2px solid transparent',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                }}
              >
                {label}
                {page === 'arcana' && <span className="ml-auto font-mono text-xs px-2 py-0.5" style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)' }}>New</span>}
                {page === 'quiz' && <span className="ml-auto font-mono text-xs px-2 py-0.5" style={{ background: 'rgba(57,255,20,0.12)', color: '#39FF14', border: '1px solid rgba(57,255,20,0.3)' }}>Funnel</span>}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
