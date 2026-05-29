import { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft, Star, RotateCcw, Mail, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Page } from '../types';

interface QuizPageProps {
  onNavigate: (page: Page) => void;
}

interface Option {
  id: string;
  text: string;
  score: Record<string, number>;
}

interface Question {
  id: string;
  sort_order: number;
  question: string;
  subtitle: string;
  options: Option[];
}

interface Result {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  cta_label: string;
  cta_url: string;
  color: string;
}

type Scores = Record<string, number>;

const RESULT_CTA_PAGES: Record<string, Page> = {
  ritual: 'arcana',
  forest: 'listening',
  underground: 'releases',
  cosmic: 'membership',
};

function computeResult(answers: Record<string, Option>, results: Result[]): Result | null {
  const totals: Scores = {};
  Object.values(answers).forEach(opt => {
    Object.entries(opt.score).forEach(([k, v]) => {
      totals[k] = (totals[k] || 0) + v;
    });
  });
  const top = Object.entries(totals).sort((a, b) => b[1] - a[1])[0]?.[0];
  return results.find(r => r.slug === top) ?? results[0] ?? null;
}

export default function QuizPage({ onNavigate }: QuizPageProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  // Flow state
  const [step, setStep] = useState<'intro' | 'quiz' | 'email' | 'result'>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [selected, setSelected] = useState<Option | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Promise.all([
      supabase.from('quiz_questions').select('*').eq('is_active', true).order('sort_order'),
      supabase.from('quiz_results').select('*').eq('is_active', true),
    ]).then(([qRes, rRes]) => {
      if (qRes.data) setQuestions(qRes.data as Question[]);
      if (rRes.data) setResults(rRes.data as Result[]);
      setLoading(false);
    });
  }, []);

  const currentQ = questions[qIndex];
  const totalQ = questions.length;
  const progress = totalQ > 0 ? ((qIndex) / totalQ) * 100 : 0;

  function handleSelectOption(opt: Option) {
    setSelected(opt);
  }

  function handleNext() {
    if (!selected || !currentQ) return;
    const newAnswers = { ...answers, [currentQ.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (qIndex < totalQ - 1) {
      setQIndex(q => q + 1);
    } else {
      setStep('email');
    }
  }

  function handleBack() {
    if (qIndex === 0) {
      setStep('intro');
      setAnswers({});
      setSelected(null);
    } else {
      setQIndex(q => q - 1);
      const prevQ = questions[qIndex - 1];
      setSelected(answers[prevQ?.id] ?? null);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const matched = computeResult(answers, results);
    setResult(matched);

    await supabase.from('quiz_submissions').insert({
      email,
      name,
      answers: Object.fromEntries(Object.entries(answers).map(([k, v]) => [k, v.id])),
      result_slug: matched?.slug ?? '',
      source: 'quiz',
    });

    // Also subscribe to newsletter
    if (email) {
      await supabase.from('newsletter_subscribers').upsert({ email }, { onConflict: 'email' });
    }

    setSubmitting(false);
    setStep('result');
  }

  function handleSkipEmail() {
    const matched = computeResult(answers, results);
    setResult(matched);
    setStep('result');
  }

  function handleRestart() {
    setStep('intro');
    setQIndex(0);
    setAnswers({});
    setSelected(null);
    setEmail('');
    setName('');
    setResult(null);
  }

  function handleShare() {
    const text = `I took the Green Satyr vibe quiz and my archetype is "${result?.title}". Find out yours at GreenSatyr.Buzz`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" style={{ background: '#010812' }}>
        <Star size={48} className="animate-spin-slow" style={{ color: '#D4AF37', filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.8))' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16" style={{ background: '#010812' }}>
      {/* Header */}
      <div
        className="relative py-16 px-4 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.07) 0%, #010812 65%)', borderBottom: '1px solid rgba(212,175,55,0.12)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(57,255,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <p className="font-mono text-xs tracking-[0.35em] uppercase mb-2" style={{ color: '#D4AF37' }}>The Satyr Oracle</p>
          <h1 className="font-display text-3xl sm:text-5xl font-black mb-3" style={{ color: '#e8e8e8' }}>
            What's Your <span style={{ color: '#39FF14', textShadow: '0 0 12px #39FF14' }}>Sound Type?</span>
          </h1>
          <p className="font-body text-base" style={{ color: 'rgba(232,232,232,0.5)' }}>
            6 questions. Your archetype revealed.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* ── INTRO ── */}
        {step === 'intro' && (
          <div className="text-center">
            <div
              className="mb-8 mx-auto overflow-hidden"
              style={{ width: 'min(260px, 80vw)', aspectRatio: '2/3', border: '2px solid rgba(212,175,55,0.5)', boxShadow: '0 0 50px rgba(212,175,55,0.2), 0 0 100px rgba(57,255,20,0.06)', margin: '0 auto' }}
            >
              <img
                src="/Copilot_20260417_191924.png"
                alt="The Green Satyr"
                className="w-full h-full object-cover"
                style={{ filter: 'contrast(1.05) saturate(1.1)' }}
                onError={e => { (e.currentTarget as HTMLImageElement).src = '/Copilot_20260521_001427.png'; }}
              />
            </div>

            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#D4AF37' }}>
              Discover your path
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-black mb-5" style={{ color: '#e8e8e8' }}>
              Are you a Deep Groover, a Forest Walker,<br />
              <span style={{ color: '#39FF14', textShadow: '0 0 8px #39FF14' }}>the Initiated, or a Frequency Traveler?</span>
            </h2>
            <p className="font-body text-base mb-8 max-w-md mx-auto" style={{ color: 'rgba(232,232,232,0.55)', lineHeight: 1.8 }}>
              Answer 6 questions drawn from the Satyr Arcana oracle system. We'll reveal your sound archetype and guide you to the part of this world that belongs to you.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { slug: 'ritual', label: 'The Deep Groover', color: '#D4AF37' },
                { slug: 'forest', label: 'Forest Walker', color: '#39FF14' },
                { slug: 'underground', label: 'The Initiated', color: '#E67E22' },
                { slug: 'cosmic', label: 'Freq. Traveler', color: '#00C8FF' },
              ].map(({ slug, label, color }) => (
                <div
                  key={slug}
                  className="p-3 text-center"
                  style={{ border: `1px solid ${color}25`, background: `${color}08` }}
                >
                  <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                  <p className="font-mono text-xs" style={{ color, fontSize: '10px' }}>{label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep('quiz')}
              className="btn-gold text-base px-10 py-4 flex items-center gap-3 mx-auto"
            >
              Find Your Sound <ChevronRight size={18} />
            </button>
            <p className="font-mono text-xs mt-4" style={{ color: 'rgba(232,232,232,0.25)' }}>
              Takes about 2 minutes
            </p>
          </div>
        )}

        {/* ── QUIZ ── */}
        {step === 'quiz' && currentQ && (
          <div>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs" style={{ color: 'rgba(232,232,232,0.35)' }}>
                  Question {qIndex + 1} of {totalQ}
                </span>
                <span className="font-mono text-xs" style={{ color: '#39FF14' }}>
                  {Math.round(progress)}% complete
                </span>
              </div>
              <div className="h-1 w-full" style={{ background: 'rgba(57,255,20,0.12)' }}>
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #39FF14, #00C851)',
                    boxShadow: '0 0 8px #39FF14',
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="font-display text-xl sm:text-2xl font-black mb-2" style={{ color: '#e8e8e8', lineHeight: 1.35 }}>
                {currentQ.question}
              </h2>
              {currentQ.subtitle && (
                <p className="font-mono text-xs" style={{ color: 'rgba(212,175,55,0.55)' }}>{currentQ.subtitle}</p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt: Option) => {
                const isChosen = selected?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className="w-full text-left p-4 transition-all duration-200 flex items-start gap-4 group"
                    style={{
                      border: `1px solid ${isChosen ? '#39FF14' : 'rgba(57,255,20,0.12)'}`,
                      background: isChosen ? 'rgba(57,255,20,0.08)' : 'rgba(5,26,46,0.3)',
                      boxShadow: isChosen ? '0 0 20px rgba(57,255,20,0.12)' : 'none',
                    }}
                  >
                    {/* Letter indicator */}
                    <div
                      className="flex-shrink-0 w-7 h-7 flex items-center justify-center font-mono text-xs font-bold mt-0.5"
                      style={{
                        border: `1px solid ${isChosen ? '#39FF14' : 'rgba(57,255,20,0.2)'}`,
                        color: isChosen ? '#39FF14' : 'rgba(232,232,232,0.4)',
                        background: isChosen ? 'rgba(57,255,20,0.15)' : 'transparent',
                        textShadow: isChosen ? '0 0 6px #39FF14' : 'none',
                      }}
                    >
                      {opt.id.toUpperCase()}
                    </div>
                    <p
                      className="font-body text-sm flex-1"
                      style={{ color: isChosen ? '#e8e8e8' : 'rgba(232,232,232,0.65)', lineHeight: 1.6 }}
                    >
                      {opt.text}
                    </p>
                    {isChosen && (
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full" style={{ background: '#39FF14' }}>
                          <span style={{ color: '#010812', fontSize: '10px', fontWeight: 700 }}>✓</span>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Nav buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 font-mono text-xs transition-all duration-200"
                style={{ color: 'rgba(232,232,232,0.4)', border: '1px solid rgba(57,255,20,0.1)', padding: '8px 14px' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#e8e8e8'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.4)'; }}
              >
                <ChevronLeft size={14} /> Back
              </button>
              <button
                onClick={handleNext}
                disabled={!selected}
                className="btn-neon flex items-center gap-2 text-sm transition-all duration-200"
                style={{ opacity: selected ? 1 : 0.35, cursor: selected ? 'pointer' : 'not-allowed' }}
              >
                {qIndex < totalQ - 1 ? 'Next' : 'See My Result'}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── EMAIL CAPTURE ── */}
        {step === 'email' && (
          <div className="text-center">
            <div className="mb-8">
              <div
                className="w-20 h-20 mx-auto mb-6 flex items-center justify-center"
                style={{ border: '2px solid rgba(212,175,55,0.5)', background: 'rgba(212,175,55,0.06)', boxShadow: '0 0 30px rgba(212,175,55,0.15)' }}
              >
                <Star size={32} style={{ color: '#D4AF37', filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.8))' }} />
              </div>
              <h2 className="font-display text-2xl font-black mb-3" style={{ color: '#e8e8e8' }}>
                Your archetype is <span style={{ color: '#39FF14', textShadow: '0 0 8px #39FF14' }}>ready.</span>
              </h2>
              <p className="font-body text-base max-w-sm mx-auto" style={{ color: 'rgba(232,232,232,0.5)', lineHeight: 1.7 }}>
                Enter your email to reveal your sound archetype and receive transmissions from DJ Green Satyr.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-3 max-w-sm mx-auto">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full px-4 py-3 font-body text-sm rounded-none text-center"
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 font-body text-sm rounded-none text-center"
              />
              <button
                type="submit"
                disabled={submitting}
                className="btn-gold w-full text-sm py-3 flex items-center justify-center gap-2"
              >
                <Mail size={15} />
                {submitting ? 'Revealing...' : 'Reveal My Archetype'}
              </button>
            </form>

            <button
              onClick={handleSkipEmail}
              className="mt-4 font-mono text-xs transition-colors duration-200"
              style={{ color: 'rgba(232,232,232,0.25)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.25)'; }}
            >
              Skip — reveal without subscribing
            </button>

            <p className="font-mono text-xs mt-6" style={{ color: 'rgba(232,232,232,0.2)' }}>
              No spam. Unsubscribe any time. Your result is yours.
            </p>
          </div>
        )}

        {/* ── RESULT ── */}
        {step === 'result' && result && (
          <div className="text-center">
            {/* Result card */}
            <div
              className="mb-8 p-8 relative overflow-hidden"
              style={{
                border: `2px solid ${result.color}50`,
                background: `linear-gradient(135deg, ${result.color}08 0%, rgba(1,8,18,0.95) 60%)`,
                boxShadow: `0 0 60px ${result.color}15`,
              }}
            >
              {/* Background glow */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${result.color}12 0%, transparent 65%)` }} />

              {/* Corner brackets */}
              {[
                'top-3 left-3 border-t-2 border-l-2',
                'top-3 right-3 border-t-2 border-r-2',
                'bottom-3 left-3 border-b-2 border-l-2',
                'bottom-3 right-3 border-b-2 border-r-2',
              ].map((cls, i) => (
                <div key={i} className={`absolute w-5 h-5 pointer-events-none ${cls}`} style={{ borderColor: `${result.color}50` }} />
              ))}

              <div className="relative z-10">
                <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: result.color, opacity: 0.7 }}>
                  Your Sound Archetype
                </p>
                <h2
                  className="font-display text-4xl sm:text-5xl font-black mb-3 leading-tight"
                  style={{ color: result.color, textShadow: `0 0 30px ${result.color}60, 0 0 60px ${result.color}25` }}
                >
                  {result.title}
                </h2>
                <p
                  className="font-display text-lg mb-6"
                  style={{ color: '#e8e8e8', fontStyle: 'italic', opacity: 0.85 }}
                >
                  "{result.subtitle}"
                </p>
                <div style={{ width: '60px', height: '1px', background: result.color, margin: '0 auto 1.5rem', opacity: 0.5 }} />
                <p
                  className="font-body text-base max-w-lg mx-auto"
                  style={{ color: 'rgba(232,232,232,0.7)', lineHeight: 1.85 }}
                >
                  {result.description}
                </p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <button
                onClick={() => onNavigate(RESULT_CTA_PAGES[result.slug] ?? 'home')}
                className="font-mono text-sm px-8 py-3 font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  border: `1px solid ${result.color}`,
                  color: '#010812',
                  background: result.color,
                  boxShadow: `0 0 20px ${result.color}40`,
                }}
              >
                {result.cta_label} <ChevronRight size={16} />
              </button>
              <button
                onClick={handleShare}
                className="font-mono text-sm px-6 py-3 tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
                style={{ border: `1px solid rgba(232,232,232,0.2)`, color: 'rgba(232,232,232,0.6)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${result.color}50`; (e.currentTarget as HTMLElement).style.color = result.color; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,232,232,0.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.6)'; }}
              >
                <Share2 size={14} /> {copied ? 'Copied!' : 'Share'}
              </button>
            </div>

            {/* Other archetypes teaser */}
            <div className="mb-8" style={{ borderTop: '1px solid rgba(57,255,20,0.08)', paddingTop: '2rem' }}>
              <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(232,232,232,0.3)' }}>Other Archetypes</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {results.filter(r => r.slug !== result.slug).map(r => (
                  <div
                    key={r.slug}
                    className="p-3 text-center"
                    style={{ border: `1px solid ${r.color}20`, background: `${r.color}05` }}
                  >
                    <div className="w-2 h-2 rounded-full mx-auto mb-2" style={{ background: r.color, boxShadow: `0 0 6px ${r.color}` }} />
                    <p className="font-display text-xs" style={{ color: r.color, fontSize: '11px' }}>{r.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="flex items-center gap-2 font-mono text-xs mx-auto transition-colors duration-200"
              style={{ color: 'rgba(232,232,232,0.3)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.6)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,232,0.3)'; }}
            >
              <RotateCcw size={13} /> Retake the quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
