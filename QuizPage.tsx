import { useState } from 'react';
import { ChevronRight, ChevronLeft, Mail, Share2, RotateCcw, Copy, Check } from 'lucide-react';
import { supabase } from './supabase';
import type { Page } from './index';

interface QuizPageProps {
  onNavigate: (page: Page) => void;
}

// ─── SCORING MAP ────────────────────────────────────────────────────────────

type Archetype =
  | 'Fool' | 'Magician' | 'HighPriestess' | 'Empress' | 'Emperor'
  | 'Hierophant' | 'Lovers' | 'Chariot' | 'Strength' | 'Hermit'
  | 'Wheel' | 'Justice' | 'HangedOne' | 'Death' | 'Tower'
  | 'Moon' | 'Sun';

type Scores = Partial<Record<Archetype, number>>;

interface Option {
  text: string;
  points: Archetype[];
}

interface Question {
  question: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    question: 'What energy do you walk into a room with?',
    options: [
      { text: 'Quiet gravity', points: ['Hermit', 'Empress'] },
      { text: 'Magnetic confidence', points: ['Emperor', 'Chariot'] },
      { text: 'Chaotic sparkle', points: ['Fool'] },
      { text: 'Warm, grounding presence', points: ['Strength', 'Sun'] },
    ],
  },
  {
    question: 'What do people come to you for?',
    options: [
      { text: 'Advice or clarity', points: ['HighPriestess', 'Justice'] },
      { text: 'Protection or leadership', points: ['Emperor', 'Strength'] },
      { text: 'Escape or fun', points: ['Fool'] },
      { text: 'Comfort or emotional safety', points: ['Empress', 'Moon'] },
    ],
  },
  {
    question: "What's your default coping style?",
    options: [
      { text: 'Retreat and analyze', points: ['Hermit', 'HighPriestess'] },
      { text: 'Push forward harder', points: ['Chariot', 'Emperor'] },
      { text: 'Distract, joke, improvise', points: ['Fool'] },
      { text: 'Feel it fully, then rise', points: ['Death', 'Tower'] },
    ],
  },
  {
    question: 'Which environment feels like home?',
    options: [
      { text: 'A candlelit study', points: ['Hermit', 'HighPriestess'] },
      { text: 'A neon-lit club', points: ['Magician'] },
      { text: 'A sun-drenched field', points: ['Sun', 'Strength'] },
      { text: 'A stormy cliffside', points: ['Tower', 'Death'] },
    ],
  },
  {
    question: "What's your relationship with power?",
    options: [
      { text: 'I wield it carefully', points: ['Justice', 'HighPriestess'] },
      { text: 'I take charge naturally', points: ['Emperor', 'Chariot'] },
      { text: 'I transform it into art', points: ['Magician'] },
      { text: "I don't chase it — it finds me", points: ['Empress', 'Moon'] },
    ],
  },
  {
    question: 'What breaks you open in the best way?',
    options: [
      { text: 'Solitude', points: ['Hermit'] },
      { text: 'Love', points: ['Empress'] },
      { text: 'Chaos', points: ['Tower'] },
      { text: 'Reinvention', points: ['Death'] },
    ],
  },
  {
    question: "What's your shadow side?",
    options: [
      { text: 'Overthinking', points: ['Hermit', 'HighPriestess'] },
      { text: 'Control issues', points: ['Emperor', 'Chariot'] },
      { text: 'Impulsiveness', points: ['Fool'] },
      { text: 'Emotional overwhelm', points: ['Moon'] },
    ],
  },
  {
    question: 'What kind of magic do you trust?',
    options: [
      { text: 'Intuition', points: ['HighPriestess', 'Moon'] },
      { text: 'Willpower', points: ['Chariot', 'Strength'] },
      { text: 'Transformation', points: ['Death', 'Tower'] },
      { text: 'Creation', points: ['Magician'] },
    ],
  },
  {
    question: "What's your relationship with desire?",
    options: [
      { text: 'I keep it private', points: ['Hermit', 'HighPriestess'] },
      { text: 'I pursue it boldly', points: ['Emperor', 'Chariot'] },
      { text: 'I let it lead me', points: ['Moon'] },
      { text: 'I turn it into inspiration', points: ['Magician'] },
    ],
  },
  {
    question: 'What do you protect most fiercely?',
    options: [
      { text: 'My peace', points: ['Hermit', 'HighPriestess'] },
      { text: 'My people', points: ['Strength', 'Emperor'] },
      { text: 'My freedom', points: ['Fool'] },
      { text: 'My heart', points: ['Empress', 'Moon'] },
    ],
  },
  {
    question: "What's your growth edge right now?",
    options: [
      { text: 'Letting go', points: ['Death'] },
      { text: 'Trusting yourself', points: ['HighPriestess'] },
      { text: 'Taking action', points: ['Chariot'] },
      { text: 'Opening up', points: ['Empress'] },
    ],
  },
  {
    question: 'What kind of ending feels like a beginning?',
    options: [
      { text: 'A quiet goodbye', points: ['Hermit'] },
      { text: 'A dramatic collapse', points: ['Tower'] },
      { text: 'A sudden spark', points: ['Magician'] },
      { text: 'A slow sunrise', points: ['Sun'] },
    ],
  },
];

// ─── OUTCOMES ────────────────────────────────────────────────────────────────

interface Outcome {
  key: Archetype;
  number: string;
  name: string;
  tagline: string;
  meaning: string;
  shadow: string;
  gift: string;
  mood: string;
  color: string;
  bandcampUrl: string;
}

const OUTCOMES: Outcome[] = [
  {
    key: 'Fool',
    number: '0',
    name: 'The Fool',
    tagline: 'New beginnings. Pure potential.',
    meaning: 'You carry the energy of fresh starts, chaos, and curiosity.',
    shadow: 'Avoidance',
    gift: 'Fresh perspective',
    mood: 'Bouncy, bright, chaotic-fun club energy',
    color: '#39FF14',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/album/satyr-arcana-i',
  },
  {
    key: 'Magician',
    number: 'I',
    name: 'The Dream Traveler',
    tagline: 'You walk between worlds.',
    meaning: 'A natural alchemist. You turn ideas into reality and cross thresholds others cannot see.',
    shadow: 'Manipulation',
    gift: 'Turning ideas into reality',
    mood: 'Slick, clever, rhythmic, spell-casting',
    color: '#D4AF37',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-dream-traveler',
  },
  {
    key: 'HighPriestess',
    number: 'II',
    name: 'She Knew',
    tagline: 'You already know.',
    meaning: 'Quietly powerful. You hold others\' secrets with grace and see what is unspoken.',
    shadow: 'Withdrawal',
    gift: 'Deep perception',
    mood: 'Hypnotic, minimal, moonlit',
    color: '#9B59B6',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/she-knew',
  },
  {
    key: 'Empress',
    number: 'III',
    name: 'A Mother to Them',
    tagline: 'Your love is unconditional.',
    meaning: 'Warm, generous, and grounding. You make everyone feel like they belong.',
    shadow: 'Self-neglect',
    gift: 'Healing presence',
    mood: 'Soulful deep house, nature-infused',
    color: '#27AE60',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/a-mother-to-them',
  },
  {
    key: 'Emperor',
    number: 'IV',
    name: 'The Anchor in the Room',
    tagline: 'Steady. True. Unshakeable.',
    meaning: 'Commanding and strategic. You are the quiet force that holds everything together.',
    shadow: 'Rigidity',
    gift: 'Stability',
    mood: 'Heavy, percussive, grounded',
    color: '#E74C3C',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-anchor-in-the-room',
  },
  {
    key: 'Hierophant',
    number: 'V',
    name: 'RIGHT ON',
    tagline: 'You initiate. You open doors.',
    meaning: 'A guide and a teacher. You introduce people to worlds they did not know were theirs.',
    shadow: 'Dogma',
    gift: 'Wisdom',
    mood: 'Ritualistic, chant-like, slow build',
    color: '#F39C12',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/right-on',
  },
  {
    key: 'Lovers',
    number: 'VI',
    name: 'F.W.B.',
    tagline: 'Chosen intimacy without chains.',
    meaning: 'Heart-forward and free. You know that the deepest love does not require possession.',
    shadow: 'Codependency',
    gift: 'Union',
    mood: 'Warm, sensual, melodic',
    color: '#E91E8C',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/fwb',
  },
  {
    key: 'Chariot',
    number: 'VII',
    name: 'The Message',
    tagline: 'You carry it forward.',
    meaning: 'Focused and unstoppable. Your vehicle is the music and the stories travel through you.',
    shadow: 'Tunnel vision',
    gift: 'Momentum',
    mood: 'Fast, kinetic, adrenaline-charged',
    color: '#00C8FF',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-message',
  },
  {
    key: 'Strength',
    number: 'VIII',
    name: 'The Spark',
    tagline: 'Gentle but unbreakable.',
    meaning: 'You have faced the hardest things and came out glowing. Your courage is quiet and infinite.',
    shadow: 'Self-sacrifice',
    gift: 'Courage',
    mood: 'Warm, steady, glowing',
    color: '#FF6B35',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/the-spark',
  },
  {
    key: 'Hermit',
    number: 'IX',
    name: 'Reconfiguration',
    tagline: 'You carry your own light.',
    meaning: 'Insightful and observant. You carry wisdom earned from having to figure out the world from scratch.',
    shadow: 'Isolation',
    gift: 'Illumination',
    mood: 'Minimal, echoing, introspective',
    color: '#95A5A6',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/reconfiguration',
  },
  {
    key: 'Wheel',
    number: 'X',
    name: 'Fate',
    tagline: 'The cycle can break.',
    meaning: 'Adaptable and attuned to timing. You understand that nothing stays the same — and that is the gift.',
    shadow: 'Passivity',
    gift: 'Timing',
    mood: 'Pulsing, circular, evolving',
    color: '#8E44AD',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/fate',
  },
  {
    key: 'Justice',
    number: 'XI',
    name: 'Karmic Justice',
    tagline: 'What you put out returns.',
    meaning: 'Fair and discerning. You know the wheel does not forget — and you live accordingly.',
    shadow: 'Harsh judgment',
    gift: 'Clarity',
    mood: 'Sharp, clean, symmetrical',
    color: '#F1C40F',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/karmic-justice',
  },
  {
    key: 'HangedOne',
    number: 'XII',
    name: 'Perspective',
    tagline: 'You surrender to see clearly.',
    meaning: 'Patient and perceptive. You turn your world upside down willingly when love calls for it.',
    shadow: 'Stagnation',
    gift: 'Insight',
    mood: 'Slow, suspended, atmospheric',
    color: '#1ABC9C',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/perspective',
  },
  {
    key: 'Death',
    number: 'XIII',
    name: 'Santa Muerte',
    tagline: 'You walk the threshold.',
    meaning: 'A rebirth engine. You move between worlds with serenity and know that every ending makes room.',
    shadow: 'Fear of change',
    gift: 'Reinvention',
    mood: 'Dark, pulsing, cathartic',
    color: '#BDC3C7',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/track/santa-muerte',
  },
  {
    key: 'Tower',
    number: 'XVI',
    name: 'The Tower',
    tagline: 'Liberation through disruption.',
    meaning: 'A catalyst. You crack things open so the light can finally get in.',
    shadow: 'Destruction',
    gift: 'Liberation',
    mood: 'Explosive, glitchy, dramatic',
    color: '#E74C3C',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/album/satyr-arcana-i',
  },
  {
    key: 'Moon',
    number: 'XVIII',
    name: 'The Moon',
    tagline: 'Deep, mysterious, dreaming.',
    meaning: 'You feel everything. Your imagination is your greatest power and your greatest wilderness.',
    shadow: 'Confusion',
    gift: 'Imagination',
    mood: 'Lush, watery, nocturnal',
    color: '#5DADE2',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/album/satyr-arcana-i',
  },
  {
    key: 'Sun',
    number: 'XIX',
    name: 'The Sun',
    tagline: 'Radiant. Joyful. Alive.',
    meaning: 'You bring light into every room. Your presence is the gift — not what you do, just who you are.',
    shadow: 'Avoiding darkness',
    gift: 'Illumination',
    mood: 'Bright, warm, euphoric',
    color: '#F7DC6F',
    bandcampUrl: 'https://djgreensatyr.bandcamp.com/album/satyr-arcana-i',
  },
];

// ─── SCORING FUNCTION ────────────────────────────────────────────────────────

function computeResult(answers: (Option | null)[]): Outcome {
  const scores: Scores = {};
  answers.forEach(answer => {
    if (!answer) return;
    answer.points.forEach(archetype => {
      scores[archetype] = (scores[archetype] || 0) + 1;
    });
  });

  // Find highest score; ties broken by earliest appearance in OUTCOMES
  let top: Archetype = 'Magician';
  let topScore = -1;
  OUTCOMES.forEach(outcome => {
    const s = scores[outcome.key] || 0;
    if (s > topScore) {
      topScore = s;
      top = outcome.key;
    }
  });

  return OUTCOMES.find(o => o.key === top) ?? OUTCOMES[1];
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function QuizPage({ onNavigate }: QuizPageProps) {
  const [step, setStep] = useState<'intro' | 'quiz' | 'email' | 'result'>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<(Option | null)[]>(Array(QUESTIONS.length).fill(null));
  const [selected, setSelected] = useState<Option | null>(null);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Outcome | null>(null);
  const [copied, setCopied] = useState(false);

  const totalQ = QUESTIONS.length;
  const currentQ = QUESTIONS[qIndex];
  const progress = (qIndex / totalQ) * 100;

  function handleSelect(opt: Option) {
    setSelected(opt);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = selected;
    setAnswers(newAnswers);
    setSelected(null);
    if (qIndex < totalQ - 1) {
      setQIndex(i => i + 1);
    } else {
      setStep('email');
    }
  }

  function handleBack() {
    if (qIndex === 0) {
      setStep('intro');
    } else {
      setQIndex(i => i - 1);
      setSelected(answers[qIndex - 1]);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const matched = computeResult(answers);
    setResult(matched);
    if (email) {
      await supabase.from('newsletter_subscribers').upsert({ email, source: 'arcana_quiz', result_slug: matched.key }, { onConflict: 'email' });
    }
    setSubmitting(false);
    setStep('result');
  }

  function handleSkip() {
    setResult(computeResult(answers));
    setStep('result');
  }

  function handleRestart() {
    setStep('intro');
    setQIndex(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setSelected(null);
    setEmail('');
    setResult(null);
  }

  function handleShare() {
    const text = `I took the Satyr Arcana ritual and my card is ${result?.number} — ${result?.name}. "${result?.tagline}" Find yours at GreenSatyr.Buzz`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (step === 'intro') {
    return (
      <div className="min-h-screen pt-16" style={{ background: '#010812' }}>
        {/* Hero */}
        <div className="relative py-24 px-4 text-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.09) 0%, #010812 65%)', borderBottom: '1px solid rgba(212,175,55,0.12)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(57,255,20,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="max-w-3xl mx-auto relative z-10">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#D4AF37' }}>The Satyr Arcana</p>
            <h1 className="font-display text-4xl sm:text-6xl font-black mb-6" style={{ color: '#e8e8e8', lineHeight: 1.1 }}>
              Which Card<br />
              <span style={{ color: '#D4AF37', textShadow: '0 0 30px rgba(212,175,55,0.5)' }}>Claims You?</span>
            </h1>
            <p className="font-body text-lg mb-4 max-w-xl mx-auto" style={{ color: 'rgba(232,232,232,0.6)', lineHeight: 1.8 }}>
              Step into the grove. Answer honestly. Let the Satyr choose you.
            </p>
            <p className="font-body text-base mb-10 max-w-xl mx-auto" style={{ color: 'rgba(232,232,232,0.45)', lineHeight: 1.8 }}>
              This ritual aligns your energy with one of the 15 Satyr Arcana archetypes — each tied to a real track, a real mood, and a real path.
            </p>
            <button
              onClick={() => setStep('quiz')}
              className="btn-gold text-base px-12 py-4 flex items-center gap-3 mx-auto mb-6"
            >
              Begin the Ritual <ChevronRight size={18} />
            </button>
            <button
              onClick={() => onNavigate('arcana')}
              className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: 'rgba(232,232,232,0.3)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.3)'; }}
            >
              Hear the First Cards
            </button>
          </div>
        </div>

        {/* What Is It */}
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#39FF14' }}>What Is the Satyr Arcana?</p>
          <p className="font-body text-lg mb-16 max-w-2xl mx-auto" style={{ color: 'rgba(232,232,232,0.6)', lineHeight: 1.9 }}>
            A 15-card system blending myth, club culture, and personal archetypes. Each card represents a force you carry — desire, chaos, clarity, ambition, intuition, rebirth.
          </p>

          {/* How It Works */}
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-8" style={{ color: '#D4AF37' }}>How the Ritual Works</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { step: '01', label: 'Answer the questions' },
              { step: '02', label: 'Enter your email' },
              { step: '03', label: 'Receive your track' },
            ].map(({ step: s, label }) => (
              <div key={s} className="p-6 text-center" style={{ border: '1px solid rgba(212,175,55,0.15)', background: 'rgba(212,175,55,0.03)' }}>
                <p className="font-mono text-3xl font-bold mb-3" style={{ color: 'rgba(212,175,55,0.3)' }}>{s}</p>
                <p className="font-body text-sm" style={{ color: 'rgba(232,232,232,0.6)' }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Card Grid Preview */}
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-8" style={{ color: '#D4AF37' }}>The Cards You Might Pull</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-12">
            {OUTCOMES.map(o => (
              <div key={o.key} className="p-3 text-center" style={{ border: `1px solid ${o.color}20`, background: `${o.color}06` }}>
                <p className="font-mono text-xs mb-1" style={{ color: o.color, opacity: 0.7 }}>{o.number}</p>
                <p className="font-display text-xs" style={{ color: 'rgba(232,232,232,0.7)', fontSize: '10px', lineHeight: 1.4 }}>{o.name}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep('quiz')}
            className="btn-gold text-base px-12 py-4 flex items-center gap-3 mx-auto"
          >
            Begin the Ritual <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ ───────────────────────────────────────────────────────────────────
  if (step === 'quiz') {
    return (
      <div className="min-h-screen pt-16" style={{ background: '#010812' }}>
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs" style={{ color: 'rgba(232,232,232,0.3)' }}>
                Question {qIndex + 1} of {totalQ}
              </span>
              <span className="font-mono text-xs" style={{ color: '#D4AF37' }}>
                {Math.round(progress)}% complete
              </span>
            </div>
            <div className="h-px w-full" style={{ background: 'rgba(212,175,55,0.12)' }}>
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #D4AF37, #39FF14)', boxShadow: '0 0 8px rgba(212,175,55,0.5)' }}
              />
            </div>
          </div>

          {/* Question */}
          <h2 className="font-display text-2xl sm:text-3xl font-black mb-10" style={{ color: '#e8e8e8', lineHeight: 1.3 }}>
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-10">
            {currentQ.options.map((opt, i) => {
              const isChosen = selected?.text === opt.text;
              const letters = ['A', 'B', 'C', 'D'];
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left p-5 transition-all duration-200 flex items-center gap-4"
                  style={{
                    border: `1px solid ${isChosen ? '#D4AF37' : 'rgba(212,175,55,0.12)'}`,
                    background: isChosen ? 'rgba(212,175,55,0.07)' : 'rgba(1,8,18,0.6)',
                    boxShadow: isChosen ? '0 0 24px rgba(212,175,55,0.1)' : 'none',
                  }}
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-mono text-xs font-bold"
                    style={{
                      border: `1px solid ${isChosen ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
                      color: isChosen ? '#D4AF37' : 'rgba(232,232,232,0.35)',
                      background: isChosen ? 'rgba(212,175,55,0.12)' : 'transparent',
                    }}
                  >
                    {letters[i]}
                  </div>
                  <p className="font-body text-base flex-1" style={{ color: isChosen ? '#e8e8e8' : 'rgba(232,232,232,0.6)', lineHeight: 1.5 }}>
                    {opt.text}
                  </p>
                  {isChosen && (
                    <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full" style={{ background: '#D4AF37' }}>
                      <span style={{ color: '#010812', fontSize: '10px', fontWeight: 700 }}>✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 font-mono text-xs transition-all duration-200"
              style={{ color: 'rgba(232,232,232,0.35)', border: '1px solid rgba(212,175,55,0.1)', padding: '8px 16px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#e8e8e8'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.35)'; }}
            >
              <ChevronLeft size={14} /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selected}
              className="btn-gold flex items-center gap-2 text-sm"
              style={{ opacity: selected ? 1 : 0.3, cursor: selected ? 'pointer' : 'not-allowed' }}
            >
              {qIndex < totalQ - 1 ? 'Next' : 'Reveal My Card'}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── EMAIL GATE ─────────────────────────────────────────────────────────────
  if (step === 'email') {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4" style={{ background: '#010812' }}>
        <div className="max-w-md w-full text-center">
          <div
            className="w-20 h-20 mx-auto mb-8 flex items-center justify-center"
            style={{ border: '2px solid rgba(212,175,55,0.5)', background: 'rgba(212,175,55,0.05)', boxShadow: '0 0 40px rgba(212,175,55,0.15)' }}
          >
            <span style={{ fontSize: '32px' }}>🜂</span>
          </div>
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#D4AF37' }}>The ritual is complete</p>
          <h2 className="font-display text-3xl font-black mb-4" style={{ color: '#e8e8e8' }}>
            Your card is <span style={{ color: '#D4AF37', textShadow: '0 0 12px rgba(212,175,55,0.5)' }}>ready.</span>
          </h2>
          <p className="font-body text-base mb-8" style={{ color: 'rgba(232,232,232,0.5)', lineHeight: 1.8 }}>
            Enter your email to reveal your Satyr Arcana archetype and receive your matching track.
          </p>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-5 py-4 font-body text-base rounded-none text-center"
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-gold w-full py-4 flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              {submitting ? 'Summoning...' : 'Reveal My Card'}
            </button>
          </form>

          <button
            onClick={handleSkip}
            className="mt-5 font-mono text-xs transition-colors duration-200"
            style={{ color: 'rgba(232,232,232,0.2)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.5)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.2)'; }}
          >
            Skip — reveal without subscribing
          </button>

          <p className="font-mono text-xs mt-6" style={{ color: 'rgba(232,232,232,0.15)' }}>
            No spam. No noise. Just transmissions.
          </p>
        </div>
      </div>
    );
  }

  // ── RESULT ─────────────────────────────────────────────────────────────────
  if (step === 'result' && result) {
    return (
      <div className="min-h-screen pt-16" style={{ background: '#010812' }}>
        <div className="max-w-2xl mx-auto px-4 py-16">

          {/* Card reveal */}
          <div
            className="mb-10 p-10 relative overflow-hidden text-center"
            style={{
              border: `2px solid ${result.color}50`,
              background: `linear-gradient(135deg, ${result.color}08 0%, rgba(1,8,18,0.97) 60%)`,
              boxShadow: `0 0 80px ${result.color}12`,
            }}
          >
            {/* Corner brackets */}
            {['top-3 left-3 border-t-2 border-l-2', 'top-3 right-3 border-t-2 border-r-2', 'bottom-3 left-3 border-b-2 border-l-2', 'bottom-3 right-3 border-b-2 border-r-2'].map((cls, i) => (
              <div key={i} className={`absolute w-6 h-6 pointer-events-none ${cls}`} style={{ borderColor: `${result.color}40` }} />
            ))}

            <div className="relative z-10">
              <p className="font-mono text-xs tracking-[0.4em] uppercase mb-2" style={{ color: result.color, opacity: 0.6 }}>
                Your Satyr Arcana
              </p>
              <p className="font-mono text-5xl font-black mb-2" style={{ color: result.color, opacity: 0.3 }}>
                {result.number}
              </p>
              <h2
                className="font-display text-4xl sm:text-5xl font-black mb-4 leading-tight"
                style={{ color: result.color, textShadow: `0 0 40px ${result.color}50` }}
              >
                {result.name}
              </h2>
              <p className="font-display text-xl mb-8" style={{ color: '#e8e8e8', fontStyle: 'italic', opacity: 0.8 }}>
                "{result.tagline}"
              </p>
              <div style={{ width: '60px', height: '1px', background: result.color, margin: '0 auto 2rem', opacity: 0.4 }} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
                {[
                  { label: 'Your Energy', value: result.meaning },
                  { label: 'Your Shadow', value: result.shadow },
                  { label: 'Your Gift', value: result.gift },
                ].map(({ label, value }) => (
                  <div key={label} className="p-4" style={{ border: `1px solid ${result.color}15`, background: `${result.color}05` }}>
                    <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: result.color, opacity: 0.6 }}>{label}</p>
                    <p className="font-body text-sm" style={{ color: 'rgba(232,232,232,0.7)', lineHeight: 1.6 }}>{value}</p>
                  </div>
                ))}
              </div>

              <p className="font-mono text-xs mb-6" style={{ color: 'rgba(232,232,232,0.3)' }}>
                Track mood: {result.mood}
              </p>

              <a
                href={result.bandcampUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm px-8 py-3 font-bold tracking-wider uppercase transition-all duration-200"
                style={{
                  border: `1px solid ${result.color}`,
                  color: '#010812',
                  background: result.color,
                  boxShadow: `0 0 24px ${result.color}40`,
                  textDecoration: 'none',
                }}
              >
                Listen to Your Track
              </a>
            </div>
          </div>

          {/* Share */}
          <div className="text-center mb-12">
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(232,232,232,0.3)' }}>Share Your Card</p>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 font-mono text-xs px-6 py-3 transition-all duration-200"
              style={{ border: `1px solid rgba(232,232,232,0.15)`, color: 'rgba(232,232,232,0.5)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${result.color}50`; (e.currentTarget as HTMLElement).style.color = result.color; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,232,232,0.15)'; (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.5)'; }}
            >
              {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy to share</>}
            </button>
          </div>

          {/* All cards */}
          <div style={{ borderTop: '1px solid rgba(212,175,55,0.08)', paddingTop: '2.5rem' }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6 text-center" style={{ color: 'rgba(232,232,232,0.25)' }}>
              Explore the Arcana
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {OUTCOMES.map(o => (
                <div
                  key={o.key}
                  className="p-3 text-center"
                  style={{
                    border: `1px solid ${o.key === result.key ? o.color + '60' : o.color + '15'}`,
                    background: o.key === result.key ? `${o.color}10` : `${o.color}04`,
                  }}
                >
                  <p className="font-mono text-xs mb-1" style={{ color: o.color, opacity: o.key === result.key ? 1 : 0.5 }}>{o.number}</p>
                  <p className="font-display" style={{ color: o.key === result.key ? '#e8e8e8' : 'rgba(232,232,232,0.4)', fontSize: '9px', lineHeight: 1.4 }}>{o.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Retake */}
          <div className="text-center mt-10">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 font-mono text-xs transition-colors duration-200"
              style={{ color: 'rgba(232,232,232,0.2)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.2)'; }}
            >
              <RotateCcw size={12} /> Retake the ritual
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
