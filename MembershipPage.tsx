import { useEffect, useState } from 'react';
import { Lock, CheckCircle, MessageSquare, Radio, Crown, LogOut, Eye, EyeOff } from 'lucide-react';
import { Lock, CheckCircle, MessageSquare, Radio, Crown, LogOut, Eye, EyeOff } from 'lucide-react';
import SigilBorder from '../components/SigilBorder';
import SigilSymbol from '../components/SigilSymbol';
import { supabase } from '../lib/supabase';
import type { MembershipTier } from '../types';
import type { User } from '@supabase/supabase-js';
import type { MembershipTier } from '../types';
import type { User } from '@supabase/supabase-js';

type AuthMode = 'login' | 'register';

const MESSAGES = [
  { user: 'Acolyte_77', text: 'That Midnight mix is unreal. Loop 4 hours deep.', time: '2m ago' },
  { user: 'DarkPriestess', text: 'Anyone caught the Forest Rave stream last night? Absolute ceremony.', time: '14m ago' },
  { user: 'SigilKeeper', text: 'New sample pack just dropped — the bass hits different.', time: '1h ago' },
  { user: 'GreenSatyr', text: 'Live set tonight at 11PM EST. Get in here.', time: '2h ago', isAdmin: true },
];

export default function MembershipPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tiers, setTiers] = useState<MembershipTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [chatMsg, setChatMsg] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.from('membership_tiers').select('*').order('sort_order').then(({ data }) => {
      if (data) setTiers(data);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    if (authMode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setAuthError(error.message);
    }
    setAuthLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  const tierColors: Record<string, { border: string; glow: string; badge: string }> = {
    acolyte: { border: 'rgba(57,255,20,0.3)', glow: 'rgba(57,255,20,0.1)', badge: '#39FF14' },
    initiate: { border: 'rgba(212,175,55,0.5)', glow: 'rgba(212,175,55,0.1)', badge: '#D4AF37' },
    'high-priest': { border: 'rgba(230,126,34,0.5)', glow: 'rgba(230,126,34,0.1)', badge: '#E67E22' },
  };

  return (
    <div className="min-h-screen pt-16" style={{ background: '#020B18' }}>
      {/* Header */}
      <div className="relative py-20 px-4 overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, #1A4D2E22 0%, #020B18 70%)', borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
        <SigilSymbol variant="sigil" size={260} color="#39FF14" animate className="absolute left-1/2 -translate-x-1/2 -top-10 opacity-5 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#D4AF37' }}>The Inner Sanctum</p>
          <h1 className="font-display text-3xl sm:text-5xl mb-3" style={{ color: '#e8e8e8' }}>
            Satyr's <span style={{ color: '#39FF14', textShadow: '0 0 12px #39FF14' }}>Den</span>
          </h1>
          <p className="font-body text-base" style={{ color: 'rgba(232,232,232,0.5)' }}>
            Members-only streaming, live chat, and exclusive content.
          </p>
        </div>
      </div>

      {user ? (
        /* LOGGED IN VIEW */
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* User bar */}
          <div className="flex items-center justify-between mb-10 p-4" style={{ border: '1px solid rgba(57,255,20,0.15)', background: 'rgba(5,26,46,0.5)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center" style={{ background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.3)' }}>
                <Crown size={16} style={{ color: '#39FF14' }} />
              </div>
              <div>
                <p className="font-mono text-xs" style={{ color: '#39FF14' }}>{user.email}</p>
                <p className="font-mono text-xs" style={{ color: 'rgba(232,232,232,0.3)' }}>Acolyte Member</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 font-mono text-xs transition-colors duration-200" style={{ color: 'rgba(232,232,232,0.4)' }}>
              <LogOut size={14} /> Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live stream */}
            <div className="lg:col-span-2 space-y-6">
              <SigilBorder variant="neon">
                <div style={{ border: '1px solid rgba(57,255,20,0.12)', background: 'rgba(5,26,46,0.8)' }}>
                  <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid rgba(57,255,20,0.08)' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#39FF14', boxShadow: '0 0 6px #39FF14' }} />
                      <span className="font-mono text-xs uppercase tracking-wider" style={{ color: '#39FF14' }}>Live Stream</span>
                    </div>
                    <span className="font-mono text-xs" style={{ color: 'rgba(232,232,232,0.3)' }}>147 watching</span>
                  </div>
                  <div className="aspect-video flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg, #051A2E, #0D2B1A)' }}>
                    <div className="text-center">
                      <Radio size={48} className="mx-auto mb-4 animate-pulse" style={{ color: '#39FF14', filter: 'drop-shadow(0 0 12px #39FF14)' }} />
                      <p className="font-display text-sm mb-2" style={{ color: '#39FF14', textShadow: '0 0 8px #39FF14' }}>Next Live Set</p>
                      <p className="font-mono text-xs" style={{ color: 'rgba(212,175,55,0.7)' }}>Tonight · 11PM EST</p>
                      <p className="font-mono text-xs mt-1" style={{ color: 'rgba(232,232,232,0.3)' }}>Stream begins automatically</p>
                    </div>
                  </div>
                </div>
              </SigilBorder>

              {/* Exclusive content grid */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#D4AF37' }}>Member Exclusives</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Backstage — The Grounds 2024', type: 'Photos', locked: false },
                    { title: 'Monthly Mix — May 2024', type: 'Download', locked: false },
                    { title: 'Q&A Session — Studio Tour', type: 'Video', locked: true },
                    { title: 'Unreleased Track Preview', type: 'Audio', locked: true },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 transition-all duration-200"
                      style={{ border: '1px solid rgba(57,255,20,0.1)', background: 'rgba(5,26,46,0.4)' }}
                    >
                      <div>
                        <p className="font-body text-sm" style={{ color: item.locked ? 'rgba(232,232,232,0.3)' : '#e8e8e8' }}>{item.title}</p>
                        <p className="font-mono text-xs mt-0.5" style={{ color: item.locked ? 'rgba(212,175,55,0.3)' : '#D4AF37' }}>{item.type}</p>
                      </div>
                      {item.locked ? (
                        <Lock size={14} style={{ color: 'rgba(192,57,43,0.6)', flexShrink: 0 }} />
                      ) : (
                        <CheckCircle size={14} style={{ color: '#39FF14', flexShrink: 0 }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat */}
            <div className="flex flex-col" style={{ border: '1px solid rgba(57,255,20,0.15)', background: 'rgba(5,26,46,0.4)', height: '600px' }}>
              <div className="p-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
                <MessageSquare size={14} style={{ color: '#D4AF37' }} />
                <h3 className="font-mono text-xs uppercase tracking-widest" style={{ color: '#D4AF37' }}>Den Chat</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {MESSAGES.map((msg, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="font-mono text-xs"
                        style={{ color: msg.isAdmin ? '#39FF14' : '#D4AF37', textShadow: msg.isAdmin ? '0 0 6px #39FF14' : 'none' }}
                      >
                        {msg.isAdmin ? '★ ' : ''}{msg.user}
                      </span>
                      <span className="font-mono text-xs" style={{ color: 'rgba(232,232,232,0.25)' }}>{msg.time}</span>
                    </div>
                    <p className="font-body text-xs" style={{ color: 'rgba(232,232,232,0.65)' }}>{msg.text}</p>
                  </div>
                ))}
              </div>
              <form
                onSubmit={e => { e.preventDefault(); setChatMsg(''); }}
                className="p-3 flex gap-2"
                style={{ borderTop: '1px solid rgba(57,255,20,0.1)' }}
              >
                <input
                  type="text"
                  value={chatMsg}
                  onChange={e => setChatMsg(e.target.value)}
                  placeholder="Send a message..."
                  className="flex-1 px-3 py-2 text-xs font-body rounded-none"
                />
                <button type="submit" className="px-3 py-2 font-mono text-xs" style={{ background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.3)', color: '#39FF14' }}>
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* LOGGED OUT — Auth + Tiers */
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Tier cards */}
            <div>
              <h2 className="font-display text-xl mb-2" style={{ color: '#e8e8e8' }}>
                Choose Your <span style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14' }}>Tier</span>
              </h2>
              <p className="font-body text-sm mb-8" style={{ color: 'rgba(232,232,232,0.45)' }}>
                All tiers grant access to the Den. Higher tiers unlock deeper chambers.
              </p>

              {loading ? (
                <div className="flex justify-center py-12">
                  <SigilSymbol variant="pentagram" size={50} color="#39FF14" animate />
                </div>
              ) : (
                <div className="space-y-4">
                  {tiers.map(tier => {
                    const c = tierColors[tier.slug] || tierColors.acolyte;
                    return (
                      <div
                        key={tier.id}
                        className="p-5 transition-all duration-200"
                        style={{ border: `1px solid ${c.border}`, background: `rgba(5,26,46,0.6)`, boxShadow: `0 0 20px ${c.glow}` }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-display text-sm" style={{ color: c.badge, textShadow: `0 0 8px ${c.badge}44` }}>{tier.name}</h3>
                            <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(232,232,232,0.5)' }}>{tier.description}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-mono font-bold text-xl" style={{ color: c.badge }}>${tier.price_monthly}</span>
                            <span className="font-mono text-xs block" style={{ color: 'rgba(232,232,232,0.3)' }}>/month</span>
                          </div>
                        </div>
                        <ul className="space-y-1.5 mt-3">
                          {tier.features.map(f => (
                            <li key={f} className="flex items-center gap-2 font-body text-xs" style={{ color: 'rgba(232,232,232,0.65)' }}>
                              <CheckCircle size={11} style={{ color: c.badge, flexShrink: 0 }} /> {f}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => {}}
                          className="mt-4 w-full font-mono text-xs py-2 tracking-widest uppercase transition-all duration-200"
                          style={{ border: `1px solid ${c.border}`, color: c.badge, background: 'transparent' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = c.glow; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                        >
                          Join as {tier.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Auth form */}
            <div>
              <SigilBorder variant="neon">
                <div className="p-8" style={{ background: 'rgba(5,26,46,0.9)', border: '1px solid rgba(57,255,20,0.1)' }}>
                  <div className="text-center mb-8">
                    <Lock size={28} className="mx-auto mb-3" style={{ color: '#39FF14', filter: 'drop-shadow(0 0 8px #39FF14)' }} />
                    <h2 className="font-display text-lg" style={{ color: '#e8e8e8' }}>
                      {authMode === 'login' ? 'Enter the Den' : 'Create Account'}
                    </h2>
                    <p className="font-mono text-xs mt-1" style={{ color: 'rgba(232,232,232,0.35)' }}>
                      {authMode === 'login' ? 'Members only beyond this point' : 'Begin your initiation'}
                    </p>
                  </div>

                  <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                      <label className="block font-mono text-xs mb-2" style={{ color: 'rgba(232,232,232,0.5)' }}>Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 font-body text-sm rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs mb-2" style={{ color: 'rgba(232,232,232,0.5)' }}>Password</label>
                      <div className="relative">
                        <input
                          type={showPw ? 'text' : 'password'}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full px-4 py-3 pr-12 font-body text-sm rounded-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw(!showPw)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          style={{ color: 'rgba(232,232,232,0.3)' }}
                        >
                          {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {authError && (
                      <p className="font-mono text-xs" style={{ color: '#C0392B' }}>{authError}</p>
                    )}

                    <button type="submit" disabled={authLoading} className="btn-neon w-full text-sm py-3">
                      {authLoading ? 'Entering...' : authMode === 'login' ? 'Enter the Den' : 'Create Account'}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthError(''); }}
                      className="font-mono text-xs transition-colors duration-200"
                      style={{ color: 'rgba(232,232,232,0.4)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.4)'; }}
                    >
                      {authMode === 'login' ? "Don't have an account? Register" : 'Already a member? Sign in'}
                    </button>
                  </div>
                </div>
              </SigilBorder>

              {/* Preview teaser */}
              <div className="mt-6 p-5" style={{ border: '1px solid rgba(57,255,20,0.08)', background: 'rgba(5,26,46,0.3)' }}>
                <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(232,232,232,0.3)' }}>Members get access to:</p>
                {['Live DJ stream sessions', 'Real-time Den chat', 'Exclusive monthly mixes', 'Early event announcements', 'Backstage content'].map(item => (
                  <div key={item} className="flex items-center gap-2 py-1.5" style={{ borderBottom: '1px solid rgba(57,255,20,0.04)' }}>
                    <Lock size={10} style={{ color: 'rgba(57,255,20,0.4)', flexShrink: 0 }} />
                    <span className="font-body text-xs" style={{ color: 'rgba(232,232,232,0.4)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
