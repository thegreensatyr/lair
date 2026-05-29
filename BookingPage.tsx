import { useState } from 'react';
import { Calendar, CheckCircle, Music, ExternalLink, Camera, FileText, Mail } from 'lucide-react';
import SigilBorder from '../components/SigilBorder';
import SigilSymbol from '../components/SigilSymbol';
import { supabase } from '../lib/supabase';
import type { BookingRequest } from '../types';

const EVENT_TYPES = [
  { value: 'club_set', label: 'Club Set', desc: '3–5 hour main floor set', price: 'From $800' },
  { value: 'ritual_set', label: 'Dark/Ambient Set', desc: 'Deep ambient and dark electronic set', price: 'From $600' },
  { value: 'private_event', label: 'Private Event', desc: 'Private party or gathering', price: 'From $500' },
  { value: 'after_hours', label: 'After-Hours', desc: 'Late night underground set', price: 'From $400' },
  { value: 'festival', label: 'Festival', desc: 'Outdoor or multi-stage', price: 'Inquire' },
  { value: 'online_stream', label: 'Online Stream', desc: 'Live-streamed DJ set', price: 'From $300' },
];

const BUDGET_RANGES = ['Under $400', '$400–$800', '$800–$1,500', '$1,500–$3,000', '$3,000+', 'Let\'s discuss'];

const mixLinks = [
  { label: 'Midnight Vol. 1 — SoundCloud', href: '#', platform: 'SoundCloud' },
  { label: 'Forest Rave Mix — Mixcloud', href: '#', platform: 'Mixcloud' },
  { label: 'Live Sessions — YouTube', href: '#', platform: 'YouTube' },
];

const pressPhotos = [
  'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
];

const defaultForm: BookingRequest = {
  name: '', email: '', phone: '', event_type: 'club_set',
  event_date: '', event_location: '', venue_name: '',
  expected_attendance: 0, budget_range: '', additional_notes: '',
};

export default function BookingPage() {
  const [form, setForm] = useState<BookingRequest>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function update(field: keyof BookingRequest, value: string | number) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.from('booking_requests').insert({
      name: form.name.slice(0, 200),
      email: form.email.slice(0, 254),
      phone: form.phone.slice(0, 30),
      event_type: form.event_type,
      event_date: form.event_date,
      event_location: form.event_location.slice(0, 200),
      venue_name: form.venue_name.slice(0, 200),
      expected_attendance: form.expected_attendance,
      budget_range: form.budget_range,
      additional_notes: form.additional_notes.slice(0, 2000),
    });
    if (err) {
      setError('Something went wrong. Please try again or email directly.');
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen pt-16" style={{ background: '#020B18' }}>
      {/* Header */}
      <div className="relative py-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #051A2E 0%, #020B18 100%)', borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
        <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none overflow-hidden hidden lg:block">
          <img src="/DJ_Bookings_vine_tex.png" alt="" className="absolute right-0 top-0 h-full object-contain object-right" style={{ opacity: 0.35, filter: 'drop-shadow(0 0 20px rgba(57,255,20,0.3))' }} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <img src="/DJ_Bookings_vine_tex.png" alt="DJ Bookings" className="w-16 h-16 object-cover" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.4))' }} />
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase mb-1" style={{ color: '#D4AF37' }}>Summon the Satyr</p>
              <h1 className="font-display text-3xl sm:text-5xl" style={{ color: '#e8e8e8' }}>
                DJ <span style={{ color: '#39FF14', textShadow: '0 0 12px #39FF14' }}>Bookings</span>
              </h1>
            </div>
          </div>
          <p className="font-body text-base" style={{ color: 'rgba(232,232,232,0.5)' }}>
            Bring the music to your venue. Complete the form to begin the process.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT — Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
                <div className="animate-float">
                  <CheckCircle size={64} style={{ color: '#39FF14', filter: 'drop-shadow(0 0 12px #39FF14)' }} />
                </div>
                <h2 className="font-display text-2xl" style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14' }}>Request Received</h2>
                <p className="font-body text-base max-w-md" style={{ color: 'rgba(232,232,232,0.6)' }}>
                  Your request has been received. We'll respond within 48 hours via email to confirm details and availability.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-neon text-sm mt-4">Submit Another Request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Event type selector */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#D4AF37' }}>
                    Set Type *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {EVENT_TYPES.map(et => (
                      <button
                        key={et.value}
                        type="button"
                        onClick={() => update('event_type', et.value)}
                        className="flex items-start gap-3 p-4 text-left transition-all duration-200"
                        style={{
                          border: `1px solid ${form.event_type === et.value ? '#39FF14' : 'rgba(57,255,20,0.15)'}`,
                          background: form.event_type === et.value ? 'rgba(57,255,20,0.08)' : 'rgba(5,26,46,0.4)',
                          boxShadow: form.event_type === et.value ? '0 0 12px rgba(57,255,20,0.15)' : 'none',
                        }}
                      >
                        <Calendar size={16} style={{ color: form.event_type === et.value ? '#39FF14' : '#D4AF37', marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <p className="font-display text-xs" style={{ color: form.event_type === et.value ? '#39FF14' : '#e8e8e8' }}>{et.label}</p>
                          <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(232,232,232,0.4)' }}>{et.desc}</p>
                          <p className="font-mono text-xs mt-1" style={{ color: form.event_type === et.value ? '#D4AF37' : 'rgba(212,175,55,0.5)' }}>{et.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal info */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#D4AF37' }}>Contact Information *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs mb-2" style={{ color: 'rgba(232,232,232,0.5)' }}>Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        placeholder="Your name or company"
                        required
                        className="w-full px-4 py-3 font-body text-sm rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs mb-2" style={{ color: 'rgba(232,232,232,0.5)' }}>Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-3 font-body text-sm rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs mb-2" style={{ color: 'rgba(232,232,232,0.5)' }}>Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => update('phone', e.target.value)}
                        placeholder="+1 555 000 0000"
                        className="w-full px-4 py-3 font-body text-sm rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs mb-2" style={{ color: 'rgba(232,232,232,0.5)' }}>Event Date *</label>
                      <input
                        type="date"
                        value={form.event_date}
                        onChange={e => update('event_date', e.target.value)}
                        required
                        className="w-full px-4 py-3 font-body text-sm rounded-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Venue */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#D4AF37' }}>Venue Details</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs mb-2" style={{ color: 'rgba(232,232,232,0.5)' }}>Venue Name</label>
                      <input type="text" value={form.venue_name} onChange={e => update('venue_name', e.target.value)} placeholder="Club / venue name" className="w-full px-4 py-3 font-body text-sm rounded-none" />
                    </div>
                    <div>
                      <label className="block font-mono text-xs mb-2" style={{ color: 'rgba(232,232,232,0.5)' }}>City, State</label>
                      <input type="text" value={form.event_location} onChange={e => update('event_location', e.target.value)} placeholder="Chicago, IL" className="w-full px-4 py-3 font-body text-sm rounded-none" />
                    </div>
                    <div>
                      <label className="block font-mono text-xs mb-2" style={{ color: 'rgba(232,232,232,0.5)' }}>Expected Attendance</label>
                      <input type="number" value={form.expected_attendance || ''} onChange={e => update('expected_attendance', parseInt(e.target.value) || 0)} placeholder="200" className="w-full px-4 py-3 font-body text-sm rounded-none" />
                    </div>
                    <div>
                      <label className="block font-mono text-xs mb-2" style={{ color: 'rgba(232,232,232,0.5)' }}>Budget Range</label>
                      <select value={form.budget_range} onChange={e => update('budget_range', e.target.value)} className="w-full px-4 py-3 font-body text-sm rounded-none">
                        <option value="">Select range</option>
                        {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-mono text-xs mb-2" style={{ color: 'rgba(232,232,232,0.5)' }}>Additional Notes</label>
                  <textarea
                    value={form.additional_notes}
                    onChange={e => update('additional_notes', e.target.value)}
                    placeholder="Theme, vibe, technical requirements, or anything else..."
                    rows={4}
                    className="w-full px-4 py-3 font-body text-sm rounded-none resize-none"
                  />
                </div>

                {error && <p className="font-mono text-sm" style={{ color: '#C0392B' }}>{error}</p>}

                <button type="submit" disabled={loading} className="btn-neon text-sm w-full sm:w-auto flex items-center justify-center gap-2">
                  {loading ? 'Sending...' : <><Mail size={15} /> Submit Booking Request</>}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT — Sidebar */}
          <div className="space-y-8">
            {/* Mix previews */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#D4AF37' }}>
                <Music size={13} className="inline mr-2" />Listen First
              </h3>
              <div className="space-y-2">
                {mixLinks.map(m => (
                  <a
                    key={m.label}
                    href={m.href}
                    className="flex items-center justify-between p-3 transition-all duration-200 group"
                    style={{ border: '1px solid rgba(57,255,20,0.12)', background: 'rgba(5,26,46,0.4)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.3)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.12)'; }}
                  >
                    <span className="font-body text-xs" style={{ color: 'rgba(232,232,232,0.7)' }}>{m.label}</span>
                    <ExternalLink size={12} style={{ color: '#D4AF37', flexShrink: 0 }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Press photos */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#D4AF37' }}>
                <Camera size={13} className="inline mr-2" />Press Photos
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {pressPhotos.map((src, i) => (
                  <div key={i} className="aspect-square overflow-hidden" style={{ border: '1px solid rgba(57,255,20,0.15)' }}>
                    <img src={src} alt={`Press ${i + 1}`} className="w-full h-full object-cover" style={{ filter: 'saturate(0.7)' }} />
                  </div>
                ))}
              </div>
              <button className="btn-neon w-full mt-3 text-xs py-2 flex items-center justify-center gap-1.5">
                <FileText size={13} /> Download Press Kit
              </button>
            </div>

            {/* Rider note */}
            <SigilBorder variant="rust">
              <div className="p-4" style={{ background: 'rgba(5,26,46,0.7)', border: '1px solid rgba(230,126,34,0.15)' }}>
                <h4 className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: '#E67E22' }}>Technical Rider</h4>
                <ul className="space-y-1.5 font-body text-xs" style={{ color: 'rgba(232,232,232,0.55)' }}>
                  {['Pioneer CDJ-3000 or CDJ-2000NXS2 (×2)', 'Pioneer DJM-900NXS2 or DJM-A9', 'Monitor speakers on stage', 'XLR line out to PA', 'Stable Wi-Fi (for Rekordbox)', 'Secure USB connections'].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span style={{ color: '#E67E22', marginTop: '2px' }}>›</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SigilBorder>
          </div>
        </div>
      </div>
    </div>
  );
}
