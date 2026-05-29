interface SigilBorderProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'neon' | 'gold' | 'rust';
}

export default function SigilBorder({ children, className = '', variant = 'neon' }: SigilBorderProps) {
  const colors = {
    neon: { stroke: '#39FF14', glow: 'rgba(57,255,20,0.4)' },
    gold: { stroke: '#D4AF37', glow: 'rgba(212,175,55,0.4)' },
    rust: { stroke: '#E67E22', glow: 'rgba(230,126,34,0.4)' },
  };
  const c = colors[variant];

  return (
    <div className={`relative ${className}`}>
      {/* Corner ornaments */}
      <svg className="absolute top-0 left-0 w-12 h-12 pointer-events-none" viewBox="0 0 48 48" fill="none">
        <path d="M2 24 L2 2 L24 2" stroke={c.stroke} strokeWidth="1.5" opacity="0.8"/>
        <circle cx="2" cy="2" r="2" fill={c.stroke} opacity="0.6"/>
        <path d="M8 2 L8 8 L2 8" stroke={c.stroke} strokeWidth="0.8" opacity="0.4"/>
      </svg>
      <svg className="absolute top-0 right-0 w-12 h-12 pointer-events-none" viewBox="0 0 48 48" fill="none">
        <path d="M46 24 L46 2 L24 2" stroke={c.stroke} strokeWidth="1.5" opacity="0.8"/>
        <circle cx="46" cy="2" r="2" fill={c.stroke} opacity="0.6"/>
        <path d="M40 2 L40 8 L46 8" stroke={c.stroke} strokeWidth="0.8" opacity="0.4"/>
      </svg>
      <svg className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none" viewBox="0 0 48 48" fill="none">
        <path d="M2 24 L2 46 L24 46" stroke={c.stroke} strokeWidth="1.5" opacity="0.8"/>
        <circle cx="2" cy="46" r="2" fill={c.stroke} opacity="0.6"/>
        <path d="M8 46 L8 40 L2 40" stroke={c.stroke} strokeWidth="0.8" opacity="0.4"/>
      </svg>
      <svg className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none" viewBox="0 0 48 48" fill="none">
        <path d="M46 24 L46 46 L24 46" stroke={c.stroke} strokeWidth="1.5" opacity="0.8"/>
        <circle cx="46" cy="46" r="2" fill={c.stroke} opacity="0.6"/>
        <path d="M40 46 L40 40 L46 40" stroke={c.stroke} strokeWidth="0.8" opacity="0.4"/>
      </svg>
      <div
        className="relative"
        style={{ filter: `drop-shadow(0 0 6px ${c.glow})` }}
      >
        {children}
      </div>
    </div>
  );
}
