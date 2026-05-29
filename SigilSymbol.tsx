interface SigilProps {
  size?: number;
  className?: string;
  variant?: 'pentagram' | 'triquetra' | 'eye' | 'sigil';
  color?: string;
  animate?: boolean;
}

export default function SigilSymbol({ size = 60, className = '', variant = 'pentagram', color = '#39FF14', animate = false }: SigilProps) {
  const animClass = animate ? 'animate-spin-slow' : '';

  if (variant === 'pentagram') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`${animClass} ${className}`} style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
        <polygon
          points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.8"
        />
        <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="0.6" opacity="0.4" />
        <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="0.4" opacity="0.25" />
      </svg>
    );
  }

  if (variant === 'triquetra') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`${animClass} ${className}`} style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
        <path
          d="M50,15 C70,15 85,30 85,50 C85,70 70,85 50,85 C30,85 15,70 15,50 C15,30 30,15 50,15 Z M50,15 C30,25 20,45 30,62 C40,79 62,79 73,62 C83,45 73,25 50,15 Z M30,62 C20,79 30,95 50,90 C70,95 80,79 70,62 C50,50 30,62 30,62 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.8"
        />
        <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
      </svg>
    );
  }

  if (variant === 'eye') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`${className}`} style={{ filter: `drop-shadow(0 0 8px ${color})` }}>
        <ellipse cx="50" cy="50" rx="40" ry="22" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" />
        <circle cx="50" cy="50" r="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" />
        <circle cx="50" cy="50" r="5" fill={color} opacity="0.7" />
        <line x1="10" y1="50" x2="90" y2="50" stroke={color} strokeWidth="0.5" opacity="0.3" />
        <line x1="50" y1="28" x2="50" y2="72" stroke={color} strokeWidth="0.5" opacity="0.3" />
      </svg>
    );
  }

  // Default sigil
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={`${animClass} ${className}`} style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
      <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="50" cy="50" r="35" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="50" y1="5" x2="50" y2="95" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="5" y1="50" x2="95" y2="50" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="18" x2="82" y2="82" stroke={color} strokeWidth="0.6" opacity="0.3" />
      <line x1="82" y1="18" x2="18" y2="82" stroke={color} strokeWidth="0.6" opacity="0.3" />
      <polygon points="50,12 88,72 12,72" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}
