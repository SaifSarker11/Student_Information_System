import React from 'react';

interface StanfordLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export const StanfordLogo: React.FC<StanfordLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md'
}) => {
  const sizeMap = {
    sm: { tree: 28, text: 'text-sm' },
    md: { tree: 38, text: 'text-base' },
    lg: { tree: 56, text: 'text-xl' }
  };

  const isWhite = variant === 'white';
  const cardinalColor = isWhite ? '#FFFFFF' : '#8C1515';
  const treeColor = isWhite ? '#8FF6D0' : '#008566';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Stanford Redwood 'S' Crest */}
      <svg
        width={sizeMap[size].tree}
        height={sizeMap[size].tree * 1.3}
        viewBox="0 0 100 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Outer White Contour / Shadow */}
        <path
          d="M20 30 C20 18 35 12 50 12 C65 12 80 18 80 30 C80 42 70 48 55 52 L45 55 C32 58 22 66 22 80 C22 96 35 106 50 106 C65 106 78 98 80 84"
          stroke={cardinalColor}
          strokeWidth="18"
          strokeLinecap="square"
          fill="none"
        />
        {/* Redwood Tree Silhouette in Center */}
        <g fill={treeColor}>
          {/* Tree trunk */}
          <rect x="47" y="55" width="6" height="50" rx="1.5" />
          {/* Foliage tiers */}
          <path d="M50 8 L40 24 H60 Z" />
          <path d="M50 20 L35 38 H65 Z" />
          <path d="M50 34 L30 54 H70 Z" />
          <path d="M50 48 L25 72 H75 Z" />
          <path d="M50 64 L22 92 H78 Z" />
        </g>
      </svg>

      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-serif font-bold tracking-tight ${
              isWhite ? 'text-white' : 'text-[#8C1515]'
            } ${sizeMap[size].text}`}
            style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
          >
            Stanford
          </span>
          <span
            className={`text-[9px] uppercase tracking-[0.2em] font-semibold ${
              isWhite ? 'text-stone-300' : 'text-stone-600'
            }`}
          >
            University
          </span>
        </div>
      )}
    </div>
  );
};

export const AxessHeaderBadge: React.FC<{ activeTab?: string }> = () => {
  return (
    <div className="bg-[#8C1515] px-3.5 py-2 flex items-center justify-between text-white text-[11px] font-medium border-b border-[#6E1111] shadow-xs">
      <div className="flex items-center gap-2">
        <span
          className="font-serif font-black tracking-tight text-xs text-white"
          style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
        >
          Stanford
        </span>
        <span className="text-stone-400">|</span>
        <span className="text-[10px] uppercase font-bold tracking-wider text-red-100">
          Axess
        </span>
        <span className="bg-red-950/80 text-[8px] font-semibold text-red-200 px-1.5 py-0.5 rounded tracking-wider uppercase">
          Student
        </span>
      </div>

      <div className="flex items-center gap-1.5 bg-[#8FF6D0]/20 border border-[#8FF6D0]/40 text-[#8FF6D0] text-[9px] font-bold px-2 py-0.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-[#008566] animate-pulse"></span>
        <span>Key Active</span>
      </div>
    </div>
  );
};
