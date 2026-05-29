import { useState } from 'react';
import { BookOpen, ChevronRight, ChevronDown, Code2, Database, LayoutGrid as Layout, Palette, Globe, Package, Music, Calendar, Users, ShoppingBag, Download, Mic2, Star, HelpCircle, FileText, Zap, AlertTriangle, CheckCircle, Copy, Eye, CreditCard as Edit3, Plus, Trash2, ToggleLeft, Link, Settings, MessageSquare, Image as ImageIcon } from 'lucide-react';
import type { Page } from '../types';

interface ManualPageProps {
  onNavigate: (page: Page) => void;
}

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <div className="relative group rounded-none mb-4" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(57,255,20,0.15)' }}>
      <button
        onClick={copy}
        className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: copied ? '#39FF14' : 'rgba(232,232,232,0.4)', background: 'rgba(5,26,46,0.8)' }}
      >
        {copied ? <CheckCircle size={13} /> : <Copy size={13} />}
      </button>
      <pre className="p-4 overflow-x-auto text-xs leading-6" style={{ fontFamily: "'Share Tech Mono', monospace", color: '#39FF14' }}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Callout({ type, children }: { type: 'info' | 'warn' | 'tip'; children: React.ReactNode }) {
  const styles = {
    info: { border: 'rgba(0,200,255,0.3)', bg: 'rgba(0,200,255,0.05)', icon: <HelpCircle size={15} style={{ color: '#00C8FF' }} />, label: 'Note', color: '#00C8FF' },
    warn: { border: 'rgba(231,76,60,0.3)', bg: 'rgba(231,76,60,0.05)', icon: <AlertTriangle size={15} style={{ color: '#E74C3C' }} />, label: 'Warning', color: '#E74C3C' },
    tip: { border: 'rgba(57,255,20,0.3)', bg: 'rgba(57,255,20,0.04)', icon: <Zap size={15} style={{ color: '#39FF14' }} />, label: 'Tip', color: '#39FF14' },
  };
  const s = styles[type];
  return (
    <div className="my-4 p-4 flex gap-3" style={{ border: `1px solid ${s.border}`, background: s.bg }}>
      <div className="flex-shrink-0 mt-0.5">{s.icon}</div>
      <div>
        <span className="font-mono text-xs font-bold tracking-widest uppercase mr-2" style={{ color: s.color }}>{s.label}</span>
        <span className="font-body text-sm" style={{ color: 'rgba(232,232,232,0.7)', lineHeight: 1.7 }}>{children}</span>
      </div>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl font-black mt-10 mb-4 flex items-center gap-2" style={{ color: '#e8e8e8', borderBottom: '1px solid rgba(57,255,20,0.1)', paddingBottom: '0.5rem' }}>
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-base font-bold mt-6 mb-2" style={{ color: '#D4AF37' }}>{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="font-body text-sm mb-3" style={{ color: 'rgba(232,232,232,0.7)', lineHeight: 1.8 }}>{children}</p>;
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 mb-2 font-body text-sm" style={{ color: 'rgba(232,232,232,0.7)', lineHeight: 1.7 }}>
      <ChevronRight size={13} className="flex-shrink-0 mt-1" style={{ color: '#39FF14' }} />
      <span>{children}</span>
    </li>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 font-mono text-xs font-bold flex-shrink-0"
      style={{ background: '#39FF14', color: '#010812', borderRadius: 0 }}
    >
      {n}
    </span>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 mb-3">
      <StepBadge n={n} />
      <p className="font-body text-sm pt-0.5" style={{ color: 'rgba(232,232,232,0.75)', lineHeight: 1.75 }}>{children}</p>
    </div>
  );
}

function NavPill({ page, label, onNavigate }: { page: Page; label: string; onNavigate: (p: Page) => void }) {
  return (
    <button
      onClick={() => onNavigate(page)}
      className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs transition-all duration-200"
      style={{ border: '1px solid rgba(57,255,20,0.3)', color: '#39FF14', background: 'rgba(57,255,20,0.05)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.12)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.05)'; }}
    >
      <Eye size={11} /> View: {label}
    </button>
  );
}

// ─── SECTION CONTENT ───────────────────────────────────────────────────────

function SectionOverview({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div>
      <P>This manual documents everything you need to update, maintain, and expand <strong style={{ color: '#e8e8e8' }}>GreenSatyr.Buzz</strong>. Use the sidebar to jump to any section.</P>
      <Callout type="info">This site was built in Bolt (bolt.new) and lives in Supabase + Vite/React. You can reopen it in Bolt anytime to make changes using AI or direct code edits.</Callout>

      <H2><Globe size={16} />Site Map</H2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {[
          { page: 'home' as Page, label: 'Home', desc: 'Hero, nav tiles, events, featured mix' },
          { page: 'releases' as Page, label: 'Releases', desc: 'Music discography' },
          { page: 'merch' as Page, label: 'Merch', desc: 'Physical merchandise store' },
          { page: 'downloads' as Page, label: 'Music Shop', desc: 'Digital products & mixes' },
          { page: 'booking' as Page, label: 'DJ Bookings', desc: 'Booking request form' },
          { page: 'listening' as Page, label: 'Listening Room', desc: 'Video & audio embeds' },
          { page: 'membership' as Page, label: "Satyr's Den", desc: 'Membership tiers' },
          { page: 'arcana' as Page, label: 'Satyr Arcana', desc: 'Oracle card deck' },
          { page: 'quiz' as Page, label: 'Sound Quiz', desc: 'Lead funnel + email capture' },
          { page: 'about' as Page, label: 'About', desc: 'Artist bio' },
        ].map(({ page, label, desc }) => (
          <div key={page} className="flex items-center justify-between p-3" style={{ border: '1px solid rgba(57,255,20,0.1)', background: 'rgba(5,26,46,0.3)' }}>
            <div>
              <p className="font-mono text-xs font-bold" style={{ color: '#e8e8e8' }}>{label}</p>
              <p className="font-body text-xs" style={{ color: 'rgba(232,232,232,0.4)' }}>{desc}</p>
            </div>
            <NavPill page={page} label={label} onNavigate={onNavigate} />
          </div>
        ))}
      </div>

      <H2><Zap size={16} />Quick Reference — Most Common Tasks</H2>
      <div className="space-y-2">
        {[
          ['Add a new merch item', 'merch', 'Supabase → products table → Insert row'],
          ['Add a digital product/mix', 'downloads', 'Supabase → digital_products table → Insert row'],
          ['Add an event date', 'home', 'Edit HomePage.tsx events array directly in Bolt'],
          ['Change membership pricing', 'membership', 'Supabase → membership_tiers table → Edit row'],
          ['Update artist bio text', 'about', 'Edit AboutPage.tsx in Bolt'],
          ['Add a SoundCloud/YouTube embed', 'listening', 'Edit ListeningPage.tsx in Bolt'],
          ['Add an Arcana card', 'arcana', 'Edit ArcanaPage.tsx cards array in Bolt'],
          ['Edit quiz questions', 'quiz', 'Supabase → quiz_questions table → Edit rows'],
          ['Change footer social links', 'home', 'Edit Footer.tsx SOCIAL_LINKS array in Bolt'],
        ].map(([task, , method]) => (
          <div key={task} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 items-center" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(5,26,46,0.2)' }}>
            <p className="font-mono text-xs" style={{ color: '#e8e8e8' }}>{task}</p>
            <p className="font-body text-xs col-span-2" style={{ color: 'rgba(232,232,232,0.5)' }}>{method}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionDatabase() {
  return (
    <div>
      <P>All dynamic content lives in <strong style={{ color: '#e8e8e8' }}>Supabase</strong>. To edit data, go to your Supabase project dashboard → Table Editor or SQL Editor.</P>
      <Callout type="tip">Supabase URL and Anon Key are stored in the <code style={{ color: '#39FF14' }}>.env</code> file at the root of the project as VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</Callout>

      <H2><Database size={16} />Tables Reference</H2>

      {[
        {
          name: 'products', label: 'Physical Merch', page: 'merch' as Page,
          cols: [
            { col: 'name', type: 'text', note: 'Product display name' },
            { col: 'description', type: 'text', note: 'Short product description' },
            { col: 'price', type: 'numeric', note: 'Price in USD (e.g. 35.00)' },
            { col: 'category', type: 'text', note: 'apparel / posters / stickers / accessories' },
            { col: 'image_url', type: 'text', note: 'Full URL to product image' },
            { col: 'inventory', type: 'int', note: 'Stock count. 0 shows as sold out.' },
            { col: 'is_active', type: 'boolean', note: 'false = hidden from store' },
          ],
        },
        {
          name: 'digital_products', label: 'Digital Downloads', page: 'downloads' as Page,
          cols: [
            { col: 'name', type: 'text', note: 'Product name' },
            { col: 'price', type: 'numeric', note: 'Price in USD. 0 = free.' },
            { col: 'category', type: 'text', note: 'mix / sample_pack / book / track' },
            { col: 'preview_url', type: 'text', note: 'URL to audio/video preview embed' },
            { col: 'file_url', type: 'text', note: 'Download URL (can be a Supabase Storage URL)' },
            { col: 'duration_seconds', type: 'int', note: 'Length in seconds (e.g. 3600 = 1 hour)' },
            { col: 'is_active', type: 'boolean', note: 'false = hidden' },
          ],
        },
        {
          name: 'booking_requests', label: 'DJ Booking Submissions', page: 'booking' as Page,
          cols: [
            { col: 'name / email / phone', type: 'text', note: 'Client contact info' },
            { col: 'event_type', type: 'text', note: 'club_set / dark_ambient_set / private_event / after_hours / festival / online_stream' },
            { col: 'event_date', type: 'date', note: 'Date of the event' },
            { col: 'budget_range', type: 'text', note: 'Client\'s stated budget' },
            { col: 'status', type: 'text', note: 'pending → confirmed → completed. Update manually.' },
          ],
        },
        {
          name: 'membership_tiers', label: 'Membership Plans', page: 'membership' as Page,
          cols: [
            { col: 'name', type: 'text', note: 'Tier display name (e.g. Acolyte)' },
            { col: 'price_monthly', type: 'numeric', note: 'Monthly price in USD' },
            { col: 'features', type: 'text[]', note: 'Array of feature strings shown on the tier card' },
            { col: 'sort_order', type: 'int', note: 'Lower number = shown first (left to right)' },
            { col: 'is_active', type: 'boolean', note: 'false = hidden from page' },
          ],
        },
        {
          name: 'quiz_questions', label: 'Quiz Questions', page: 'quiz' as Page,
          cols: [
            { col: 'sort_order', type: 'int', note: 'Question display order (1 = first)' },
            { col: 'question', type: 'text', note: 'The question text' },
            { col: 'options', type: 'jsonb', note: 'Array of {id, text, score} objects — see format below' },
            { col: 'is_active', type: 'boolean', note: 'false = skipped in quiz' },
          ],
        },
        {
          name: 'quiz_results', label: 'Quiz Result Archetypes', page: 'quiz' as Page,
          cols: [
            { col: 'slug', type: 'text', note: 'Unique key: ritual / forest / underground / cosmic' },
            { col: 'title', type: 'text', note: 'Result title (e.g. "The Deep Groover")' },
            { col: 'description', type: 'text', note: 'Long description shown on result card' },
            { col: 'color', type: 'text', note: 'Hex color for the result card accent' },
            { col: 'cta_label', type: 'text', note: 'Button label on result card' },
          ],
        },
        {
          name: 'newsletter_subscribers', label: 'Email Subscribers', page: 'home' as Page,
          cols: [
            { col: 'email', type: 'text', note: 'Subscriber email (unique)' },
            { col: 'is_active', type: 'boolean', note: 'Set to false to unsubscribe without deleting' },
          ],
        },
      ].map(table => (
        <div key={table.name} className="mb-8">
          <H3><span style={{ color: '#39FF14' }}>{table.name}</span> — {table.label}</H3>
          <div style={{ border: '1px solid rgba(57,255,20,0.1)', overflow: 'hidden' }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: 'rgba(57,255,20,0.06)' }}>
                  <th className="text-left px-3 py-2 font-mono" style={{ color: '#D4AF37', width: '35%' }}>Column</th>
                  <th className="text-left px-3 py-2 font-mono" style={{ color: '#D4AF37', width: '15%' }}>Type</th>
                  <th className="text-left px-3 py-2 font-mono" style={{ color: '#D4AF37' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {table.cols.map((c, i) => (
                  <tr key={c.col} style={{ borderTop: '1px solid rgba(57,255,20,0.06)', background: i % 2 === 0 ? 'rgba(5,26,46,0.2)' : 'transparent' }}>
                    <td className="px-3 py-2 font-mono" style={{ color: '#39FF14' }}>{c.col}</td>
                    <td className="px-3 py-2 font-mono" style={{ color: 'rgba(212,175,55,0.6)' }}>{c.type}</td>
                    <td className="px-3 py-2 font-body" style={{ color: 'rgba(232,232,232,0.6)' }}>{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <H3>Quiz options JSON format</H3>
      <CodeBlock>{`[
  { "id": "a", "text": "Option A text here", "score": { "ritual": 2, "forest": 1, "underground": 0, "cosmic": 0 } },
  { "id": "b", "text": "Option B text here", "score": { "ritual": 0, "forest": 3, "underground": 0, "cosmic": 0 } },
  { "id": "c", "text": "Option C text here", "score": { "ritual": 0, "forest": 0, "underground": 3, "cosmic": 0 } },
  { "id": "d", "text": "Option D text here", "score": { "ritual": 0, "forest": 0, "underground": 0, "cosmic": 3 } }
]`}</CodeBlock>
      <Callout type="info">Scores across all questions are totalled per archetype slug. Highest total wins and becomes the result shown to the user.</Callout>

      <H2><Plus size={16} />How To: Add a New Merch Item</H2>
      <Step n={1}>Go to your Supabase project → Table Editor → <strong>products</strong></Step>
      <Step n={2}>Click <strong>Insert row</strong> at the top right</Step>
      <Step n={3}>Fill in: name, description, price (number), category (apparel/posters/stickers/accessories), image_url (link to your image), inventory (stock count), is_active = true</Step>
      <Step n={4}>Click Save. The item appears on the Merch page immediately.</Step>
      <Callout type="tip">For images, upload to Supabase Storage (Storage → Upload) and copy the public URL, or use any hosted image URL.</Callout>

      <H2><Plus size={16} />How To: Add a Digital Product</H2>
      <Step n={1}>Supabase → Table Editor → <strong>digital_products</strong> → Insert row</Step>
      <Step n={2}>Set category to: <code style={{ color: '#39FF14' }}>mix</code>, <code style={{ color: '#39FF14' }}>sample_pack</code>, <code style={{ color: '#39FF14' }}>book</code>, or <code style={{ color: '#39FF14' }}>track</code></Step>
      <Step n={3}>Set price to 0 for a free product. duration_seconds is optional (e.g. 3600 = 1 hour mix).</Step>
      <Step n={4}>Save. Appears on Downloads page immediately.</Step>
    </div>
  );
}

function SectionPages({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div>
      <P>Pages that are <strong style={{ color: '#e8e8e8' }}>hardcoded in the source files</strong> (not database-driven) need to be edited directly in Bolt. Here's what to change and where.</P>
      <Callout type="info">Open Bolt at bolt.new → open your project → click any file in the file tree on the left to edit it. Changes save and hot-reload instantly in the preview.</Callout>

      <H2><Layout size={16} />HomePage.tsx</H2>
      <H3>Upcoming Events List</H3>
      <P>Find the events array in <code style={{ color: '#39FF14' }}>src/pages/HomePage.tsx</code>. It looks like:</P>
      <CodeBlock>{`const upcomingEvents = [
  {
    date: 'Jun 14',
    venue: 'The Black Lodge',
    city: 'Chicago, IL',
    type: 'Club Set',
    time: '11PM–3AM',
  },
  // add more events here...
];`}</CodeBlock>
      <P>To add an event, copy one entry and update the values. To remove a past event, delete its entry from the array.</P>

      <H3>Featured Mix / Hero Text</H3>
      <P>Scroll down in <code style={{ color: '#39FF14' }}>HomePage.tsx</code> to find the hero section. The heading, subtitle, and featured mix card text are all inline strings you can edit directly.</P>

      <H2><Music size={16} />ReleasesPage.tsx</H2>
      <P>Releases are stored in an array inside <code style={{ color: '#39FF14' }}>src/pages/ReleasesPage.tsx</code>. Each release looks like:</P>
      <CodeBlock>{`{
  id: '1',
  title: 'Midnight Vol. 1',
  label: 'Self-Released',
  year: '2024',
  type: 'EP',           // Album / EP / Single / Compilation
  tracks: 4,
  coverUrl: '/your-cover-image.jpg',
  streamUrl: 'https://soundcloud.com/...',
  buyUrl: 'https://bandcamp.com/...',
  description: 'A descent into...',
}`}</CodeBlock>
      <Step n={1}>Open ReleasesPage.tsx in Bolt</Step>
      <Step n={2}>Find the releases array at the top of the file</Step>
      <Step n={3}>Add a new object or edit existing ones</Step>
      <Step n={4}>Add your cover art to the <code style={{ color: '#39FF14' }}>/public/</code> folder in Bolt and reference it as <code style={{ color: '#39FF14' }}>/filename.jpg</code></Step>

      <H2><Mic2 size={16} />ListeningPage.tsx</H2>
      <P>Video and audio embeds are arrays in <code style={{ color: '#39FF14' }}>src/pages/ListeningPage.tsx</code>:</P>
      <CodeBlock>{`// SoundCloud embed
{ title: 'Mix Name', embedUrl: 'https://w.soundcloud.com/player/?url=...' }

// YouTube embed
{ title: 'Video Name', embedUrl: 'https://www.youtube.com/embed/VIDEO_ID' }`}</CodeBlock>
      <H3>Getting an embed URL</H3>
      <P>SoundCloud: Open the track → Share → Embed → copy the <code style={{ color: '#39FF14' }}>src</code> value from the iframe code.</P>
      <P>YouTube: Open the video → Share → Embed → copy the <code style={{ color: '#39FF14' }}>src</code> value from the iframe code.</P>

      <H2><Star size={16} />ArcanaPage.tsx</H2>
      <P>The oracle cards are a hardcoded array in <code style={{ color: '#39FF14' }}>src/pages/ArcanaPage.tsx</code>. Each card:</P>
      <CodeBlock>{`{
  id: 'I',
  name: 'The Green Satyr',
  archetype: 'The Journey',
  keywords: ['power', 'craft', 'command'],
  upright: 'A time of great momentum...',
  reversed: 'Resistance without cause...',
  element: 'Earth',
  color: '#39FF14',
  imageUrl: '/your-card-image.png',
}`}</CodeBlock>

      <H2><Users size={16} />AboutPage.tsx</H2>
      <P>The bio text is all inline in <code style={{ color: '#39FF14' }}>src/pages/AboutPage.tsx</code>. Edit the paragraph text directly. Press photos are an array of image URLs near the top of the file.</P>
    </div>
  );
}

function SectionDesign() {
  return (
    <div>
      <P>The site uses a consistent dark techno design system. Here are the key values to stay on-brand when making edits.</P>

      <H2><Palette size={16} />Colors</H2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {[
          { hex: '#020B18', label: 'Abyss Black', use: 'Page background' },
          { hex: '#051A2E', label: 'Deep Blue', use: 'Section backgrounds' },
          { hex: '#39FF14', label: 'Neon Green', use: 'Primary accent, glow, buttons' },
          { hex: '#D4AF37', label: 'Gold', use: 'Secondary accent, luxury details' },
          { hex: '#e8e8e8', label: 'Light Gray', use: 'Default text color' },
          { hex: '#E67E22', label: 'Amber', use: 'Event badges, warnings' },
          { hex: '#00C8FF', label: 'Cyan', use: 'Cosmic archetype, info states' },
          { hex: '#E74C3C', label: 'Red', use: 'Errors, cancel states' },
        ].map(c => (
          <div key={c.hex} className="flex items-center gap-3 p-3" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(5,26,46,0.2)' }}>
            <div className="w-8 h-8 flex-shrink-0" style={{ background: c.hex, border: '1px solid rgba(255,255,255,0.1)' }} />
            <div>
              <p className="font-mono text-xs" style={{ color: '#e8e8e8' }}>{c.hex}</p>
              <p className="font-body text-xs" style={{ color: '#D4AF37' }}>{c.label}</p>
              <p className="font-body text-xs" style={{ color: 'rgba(232,232,232,0.45)' }}>{c.use}</p>
            </div>
          </div>
        ))}
      </div>

      <H2><FileText size={16} />Typography</H2>
      <div className="space-y-3 mb-6">
        {[
          { name: 'Cinzel Decorative', var: 'font-display', use: 'Page headings (h1–h3), card titles' },
          { name: 'Rajdhani', var: 'font-body', use: 'Body text, nav labels, buttons, forms' },
          { name: 'Share Tech Mono', var: 'font-mono', use: 'Category labels, badges, captions' },
        ].map(f => (
          <div key={f.name} className="p-3" style={{ border: '1px solid rgba(212,175,55,0.15)', background: 'rgba(5,26,46,0.2)' }}>
            <p className={`text-base mb-1 font-${f.var.split('-')[1]}`} style={{ color: '#e8e8e8' }}>{f.name}</p>
            <p className="font-mono text-xs" style={{ color: '#39FF14' }}>className="{f.var}"</p>
            <p className="font-body text-xs mt-1" style={{ color: 'rgba(232,232,232,0.4)' }}>{f.use}</p>
          </div>
        ))}
      </div>

      <H2><Code2 size={16} />Reusable CSS Classes</H2>
      <div style={{ border: '1px solid rgba(57,255,20,0.1)', overflow: 'hidden' }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: 'rgba(57,255,20,0.06)' }}>
              <th className="text-left px-3 py-2 font-mono" style={{ color: '#D4AF37' }}>Class</th>
              <th className="text-left px-3 py-2 font-mono" style={{ color: '#D4AF37' }}>Effect</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['btn-neon', 'Green glow button (border + text glow)'],
              ['btn-gold', 'Gold gradient filled button'],
              ['neon-text', 'Bright neon green text with multi-layer glow'],
              ['gold-text', 'Gold text with glow'],
              ['neon-border', 'Green glowing border'],
              ['gold-border', 'Gold glowing border'],
              ['glass-panel', 'Frosted glass panel (blur + semi-transparent)'],
              ['card-dark', 'Dark card with green hover effect'],
              ['animate-pulse-neon', 'Pulsing green glow animation'],
              ['animate-float', 'Vertical floating animation'],
              ['animate-glow-pulse', 'Box shadow breathing animation'],
              ['animate-spin-slow', '25-second slow rotation'],
            ].map(([cls, desc], i) => (
              <tr key={cls} style={{ borderTop: '1px solid rgba(57,255,20,0.06)', background: i % 2 === 0 ? 'rgba(5,26,46,0.2)' : 'transparent' }}>
                <td className="px-3 py-2 font-mono" style={{ color: '#39FF14' }}>.{cls}</td>
                <td className="px-3 py-2 font-body" style={{ color: 'rgba(232,232,232,0.6)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionEditing() {
  return (
    <div>
      <P>Most changes are made directly in <strong style={{ color: '#e8e8e8' }}>Bolt (bolt.new)</strong>. Here's how the editing workflow operates.</P>

      <H2><Edit3 size={16} />Opening the Project in Bolt</H2>
      <Step n={1}>Go to <strong style={{ color: '#39FF14' }}>bolt.new</strong> and sign in</Step>
      <Step n={2}>Find your GreenSatyr.Buzz project in your project list</Step>
      <Step n={3}>Click to open — the preview opens on the right, file tree on the left, AI chat at the bottom</Step>
      <Step n={4}>You can either: (a) edit files directly by clicking them in the tree, or (b) describe a change in the AI chat</Step>

      <Callout type="tip">To make a change with AI, just describe it in plain English in the chat. E.g.: "Change the hero headline to say X" or "Add a new event on July 4th at Club Venue in Chicago"</Callout>

      <H2><Plus size={16} />Adding a New Page</H2>
      <P>Every page follows the same pattern. Here's what to do:</P>
      <Step n={1}>Create <code style={{ color: '#39FF14' }}>src/pages/YourNewPage.tsx</code> — copy the structure from any existing page</Step>
      <Step n={2}>Add <code style={{ color: '#39FF14' }}>'your-page'</code> to the <code style={{ color: '#39FF14' }}>Page</code> type in <code style={{ color: '#39FF14' }}>src/types/index.ts</code></Step>
      <Step n={3}>Import it in <code style={{ color: '#39FF14' }}>src/App.tsx</code> and add: <code style={{ color: '#39FF14' }}>{"currentPage === 'your-page' && <YourNewPage />"}</code></Step>
      <Step n={4}>Add a nav entry in <code style={{ color: '#39FF14' }}>src/components/Header.tsx</code> in the navItems array</Step>
      <Step n={5}>Add it to the footer nav array in <code style={{ color: '#39FF14' }}>src/components/Footer.tsx</code></Step>
      <Callout type="info">Any page that needs to navigate to other pages should accept <code style={{ color: '#39FF14' }}>onNavigate: (page: Page) =&gt; void</code> as a prop.</Callout>

      <H2><ImageIcon size={16} />Adding Images</H2>
      <Step n={1}>In Bolt, open the file tree and look for the <code style={{ color: '#39FF14' }}>public/</code> folder</Step>
      <Step n={2}>Drag and drop image files into the public folder, or click the + button</Step>
      <Step n={3}>Reference images in your code as <code style={{ color: '#39FF14' }}>/filename.jpg</code> (no path prefix needed)</Step>
      <Callout type="tip">For best performance, keep images under 500KB. Use JPG for photos, PNG for graphics with transparency.</Callout>

      <H2><Link size={16} />Updating Social / External Links</H2>
      <P>Social links are defined in <code style={{ color: '#39FF14' }}>src/components/Footer.tsx</code>. Find the social links array and update the <code style={{ color: '#39FF14' }}>href</code> values for Instagram, Twitter, SoundCloud, YouTube, etc.</P>

      <H2><Trash2 size={16} />Removing a Page from Navigation</H2>
      <Step n={1}>In <code style={{ color: '#39FF14' }}>Header.tsx</code>, remove its entry from the navItems array</Step>
      <Step n={2}>In <code style={{ color: '#39FF14' }}>Footer.tsx</code>, remove its entry from the footer nav array</Step>
      <P>The page component and type entry can stay — removing from nav is enough to hide it from users.</P>
    </div>
  );
}

function SectionQuiz() {
  return (
    <div>
      <P>The Sound Quiz is a 4-step lead funnel: Intro → Questions → Email Capture → Archetype Result. All content is managed via Supabase.</P>

      <H2><MessageSquare size={16} />Editing Questions</H2>
      <Step n={1}>Supabase → Table Editor → <strong style={{ color: '#39FF14' }}>quiz_questions</strong></Step>
      <Step n={2}>Edit any row. Change the question text, subtitle, or options JSONB field.</Step>
      <Step n={3}>To reorder questions, change the <code style={{ color: '#39FF14' }}>sort_order</code> integer (lower = first)</Step>
      <Step n={4}>Set <code style={{ color: '#39FF14' }}>is_active = false</code> to temporarily remove a question</Step>
      <Callout type="warn">Always keep exactly 4 options per question (ids: a, b, c, d). Each option must have scores for all 4 archetype slugs: ritual, forest, underground, cosmic.</Callout>

      <H2><Star size={16} />Editing Result Archetypes</H2>
      <P>Supabase → <strong style={{ color: '#39FF14' }}>quiz_results</strong>. The 4 slugs are: <code style={{ color: '#39FF14' }}>ritual</code>, <code style={{ color: '#39FF14' }}>forest</code>, <code style={{ color: '#39FF14' }}>underground</code>, <code style={{ color: '#39FF14' }}>cosmic</code>. Do not change the slugs — they are internal identifiers that must match the score keys in question options.</P>
      <P>You can safely edit: title, subtitle, description, color, cta_label. To change which page each result navigates to, edit the RESULT_CTA_PAGES map in <code style={{ color: '#39FF14' }}>src/pages/QuizPage.tsx</code>:</P>
      <CodeBlock>{`const RESULT_CTA_PAGES: Record<string, Page> = {
  ritual: 'arcana',        // → Satyr Arcana page
  forest: 'listening',     // → Listening Room page
  underground: 'releases', // → Releases page
  cosmic: 'membership',    // → Satyr's Den page
};`}</CodeBlock>

      <H2><Download size={16} />Viewing Submissions</H2>
      <P>Every completed quiz saves to <strong style={{ color: '#39FF14' }}>quiz_submissions</strong>. Every email submission also upserts to <strong style={{ color: '#39FF14' }}>newsletter_subscribers</strong>.</P>
      <P>To export your email list, run this in Supabase → SQL Editor:</P>
      <CodeBlock>{`SELECT email, created_at
FROM newsletter_subscribers
WHERE is_active = true
ORDER BY created_at DESC;`}</CodeBlock>
    </div>
  );
}

function SectionBookings() {
  return (
    <div>
      <P>Booking requests submitted through the site save to the <strong style={{ color: '#39FF14' }}>booking_requests</strong> table in Supabase.</P>

      <H2><Calendar size={16} />Viewing Booking Requests</H2>
      <Step n={1}>Go to Supabase → Table Editor → <strong>booking_requests</strong></Step>
      <Step n={2}>You'll see all submissions sorted newest first</Step>
      <Step n={3}>Update the <code style={{ color: '#39FF14' }}>status</code> field manually: pending → confirmed → completed (or cancelled)</Step>

      <H2><Settings size={16} />Updating Pricing & Requirements</H2>
      <P>Pricing and technical rider are hardcoded in <code style={{ color: '#39FF14' }}>src/pages/BookingPage.tsx</code>. Find these sections to edit:</P>
      <CodeBlock>{`// Event type options with pricing
const EVENT_TYPES = [
  { value: 'club_set', label: 'Club Set', price: 'From $800', ... },
  { value: 'ritual_set', label: 'Dark/Ambient Set', price: 'From $600', ... },
  // edit the price strings here
];

// Technical rider
const technicalRider = [
  'Pioneer CDJ-3000 or CDJ-2000NXS2 (x2)',
  'Pioneer DJM-900NXS2 or DJM-A9',
  // add or remove requirements here
];`}</CodeBlock>

      <Callout type="tip">To receive email notifications for new bookings, set up a Supabase Database Webhook (Database → Webhooks) pointing to a service like Make.com or Zapier.</Callout>
    </div>
  );
}

function SectionMembership() {
  return (
    <div>
      <P>Membership tiers are database-driven. The payment flow is currently display-only — it shows tiers but does not process payments unless you integrate Stripe.</P>

      <H2><Users size={16} />Editing Tiers</H2>
      <Step n={1}>Supabase → <strong>membership_tiers</strong></Step>
      <Step n={2}>Edit price_monthly, name, description, or features array</Step>
      <Step n={3}>The features column is a PostgreSQL text array. Format in Supabase Table Editor: click the cell, edit as a JSON array <code style={{ color: '#39FF14' }}>["Feature one", "Feature two"]</code></Step>
      <Callout type="info">The sort_order column controls display order. Acolyte=1, Initiate=2, High Priest=3 by default.</Callout>

      <H2><Package size={16} />Adding Stripe Payments</H2>
      <P>To make memberships functional with real payments, you'll need to add Stripe. Tell the Bolt AI: "Add Stripe checkout to the membership page" — it will walk you through the integration.</P>
      <P>You'll need a Stripe account and your Secret Key from the Stripe Dashboard → Developers → API Keys.</P>
    </div>
  );
}

function SectionTroubleshooting() {
  return (
    <div>
      <H2><AlertTriangle size={16} />Common Issues</H2>

      {[
        {
          issue: 'Page is blank / showing nothing',
          fix: 'Check the browser console (F12 → Console) for red errors. Most commonly a Supabase connection issue or a missing .env variable.',
        },
        {
          issue: 'Merch / Downloads page shows no items',
          fix: 'Check Supabase → products or digital_products table. Make sure is_active = true on the rows. Also confirm your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set correctly in the .env file.',
        },
        {
          issue: 'Quiz shows no questions',
          fix: 'Check Supabase → quiz_questions. Make sure is_active = true and the migration ran successfully (check Supabase → Migrations).',
        },
        {
          issue: 'Image not showing up',
          fix: 'Make sure the image is in the /public folder and referenced as /filename.ext (with the leading slash). Also check that the file name has no spaces.',
        },
        {
          issue: 'Build fails in Bolt',
          fix: 'Open the terminal in Bolt and run: npm run build. Read the error — it will show the exact file and line. Common cause: a TypeScript type error from adding a new page without updating the Page type.',
        },
        {
          issue: 'Booking form submits but you see no data in Supabase',
          fix: 'Check that the booking_requests table exists and that RLS is not blocking inserts. In Supabase → Authentication → Policies, confirm there is an INSERT policy on booking_requests.',
        },
        {
          issue: 'Membership tiers not loading',
          fix: 'Supabase → membership_tiers → confirm rows exist with is_active = true. Check that the SELECT policy exists on the table.',
        },
      ].map(({ issue, fix }) => (
        <div key={issue} className="mb-4 p-4" style={{ border: '1px solid rgba(231,76,60,0.2)', background: 'rgba(231,76,60,0.04)' }}>
          <p className="font-mono text-sm font-bold mb-2 flex items-center gap-2" style={{ color: '#E74C3C' }}>
            <AlertTriangle size={13} /> {issue}
          </p>
          <p className="font-body text-sm" style={{ color: 'rgba(232,232,232,0.65)', lineHeight: 1.75 }}>{fix}</p>
        </div>
      ))}

      <H2><Code2 size={16} />Useful SQL Queries</H2>
      <H3>Export all newsletter subscribers</H3>
      <CodeBlock>{`SELECT email, created_at FROM newsletter_subscribers
WHERE is_active = true ORDER BY created_at DESC;`}</CodeBlock>

      <H3>View all booking requests (newest first)</H3>
      <CodeBlock>{`SELECT name, email, event_type, event_date, budget_range, status, created_at
FROM booking_requests ORDER BY created_at DESC;`}</CodeBlock>

      <H3>View quiz submission results breakdown</H3>
      <CodeBlock>{`SELECT result_slug, COUNT(*) as total
FROM quiz_submissions
GROUP BY result_slug ORDER BY total DESC;`}</CodeBlock>

      <H3>Disable a product without deleting it</H3>
      <CodeBlock>{`UPDATE products SET is_active = false WHERE name = 'Product Name Here';`}</CodeBlock>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function ManualPage({ onNavigate }: ManualPageProps) {
  const [active, setActive] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  const sections: Section[] = [
    { id: 'overview', label: 'Overview', icon: <BookOpen size={15} />, content: <SectionOverview onNavigate={onNavigate} /> },
    { id: 'database', label: 'Database & Content', icon: <Database size={15} />, content: <SectionDatabase /> },
    { id: 'pages', label: 'Pages & Content', icon: <Layout size={15} />, content: <SectionPages onNavigate={onNavigate} /> },
    { id: 'design', label: 'Design System', icon: <Palette size={15} />, content: <SectionDesign /> },
    { id: 'editing', label: 'Editing in Bolt', icon: <Edit3 size={15} />, content: <SectionEditing /> },
    { id: 'quiz', label: 'Sound Quiz', icon: <Star size={15} />, content: <SectionQuiz /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar size={15} />, content: <SectionBookings /> },
    { id: 'membership', label: 'Membership', icon: <Users size={15} />, content: <SectionMembership /> },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: <HelpCircle size={15} />, content: <SectionTroubleshooting /> },
  ];

  const current = sections.find(s => s.id === active)!;

  return (
    <div className="min-h-screen pt-16" style={{ background: '#010812' }}>
      <div
        className="py-10 px-4"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, #010812 60%)', borderBottom: '1px solid rgba(57,255,20,0.1)' }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs tracking-[0.35em] uppercase mb-1" style={{ color: '#D4AF37' }}>Site Documentation</p>
          <h1 className="font-display text-3xl sm:text-4xl font-black" style={{ color: '#e8e8e8' }}>
            Operator <span style={{ color: '#39FF14', textShadow: '0 0 12px #39FF14' }}>Manual</span>
          </h1>
          <p className="font-body text-sm mt-2" style={{ color: 'rgba(232,232,232,0.45)' }}>
            GreenSatyr.Buzz — How to update, maintain, and expand your site
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-6 relative">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block flex-shrink-0 w-52 sticky top-20 self-start">
            <nav className="space-y-0.5" style={{ border: '1px solid rgba(57,255,20,0.1)' }}>
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-all duration-150"
                  style={{
                    background: active === s.id ? 'rgba(57,255,20,0.08)' : 'transparent',
                    borderLeft: `2px solid ${active === s.id ? '#39FF14' : 'transparent'}`,
                    color: active === s.id ? '#39FF14' : 'rgba(232,232,232,0.5)',
                  }}
                >
                  {s.icon}
                  <span className="font-body text-xs font-semibold tracking-wide">{s.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Mobile section picker */}
          <div className="lg:hidden w-full mb-4" style={{ position: 'relative' }}>
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="w-full flex items-center justify-between px-4 py-3 font-body text-sm font-semibold"
              style={{ border: '1px solid rgba(57,255,20,0.2)', background: 'rgba(5,26,46,0.6)', color: '#39FF14' }}
            >
              <span className="flex items-center gap-2">{current.icon}{current.label}</span>
              <ChevronDown size={15} style={{ transform: mobileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {mobileOpen && (
              <div className="absolute top-full left-0 right-0 z-50" style={{ border: '1px solid rgba(57,255,20,0.2)', borderTop: 'none', background: '#010F20' }}>
                {sections.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { setActive(s.id); setMobileOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-left font-body text-sm"
                    style={{ color: active === s.id ? '#39FF14' : 'rgba(232,232,232,0.6)', borderBottom: '1px solid rgba(57,255,20,0.06)', background: active === s.id ? 'rgba(57,255,20,0.06)' : 'transparent' }}
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div
              className="p-6 sm:p-8"
              style={{ border: '1px solid rgba(57,255,20,0.08)', background: 'rgba(5,26,46,0.2)' }}
            >
              <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
                <span style={{ color: '#39FF14' }}>{current.icon}</span>
                <h2 className="font-display text-xl font-black" style={{ color: '#e8e8e8' }}>{current.label}</h2>
              </div>
              {current.content}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
