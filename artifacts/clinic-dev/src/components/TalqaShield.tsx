import React from 'react';

interface TalqaShieldProps {
  size?: number;
  className?: string;
}

export const TalqaShield = ({ size = 32, className = '' }: TalqaShieldProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="shieldGrad" x1="0" y1="0" x2="40" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0B4A6F" />
        <stop offset="100%" stopColor="#00B4D8" />
      </linearGradient>
      <linearGradient id="shieldGlow" x1="0" y1="0" x2="40" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0B4A6F" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#00B4D8" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    {/* Shield shape */}
    <path
      d="M20 1L3 8V22C3 31.5 10.5 40.2 20 43C29.5 40.2 37 31.5 37 22V8L20 1Z"
      fill="url(#shieldGrad)"
    />
    {/* Inner glow */}
    <path
      d="M20 4L6 10.5V22C6 29.8 12 37.4 20 40C28 37.4 34 29.8 34 22V10.5L20 4Z"
      fill="white"
      fillOpacity="0.08"
    />
    {/* ت letter */}
    <text
      x="20"
      y="27"
      textAnchor="middle"
      fill="white"
      fontSize="17"
      fontWeight="800"
      fontFamily="Tajawal, Arial, sans-serif"
      letterSpacing="0"
    >
      ت
    </text>
    {/* Bottom accent line */}
    <line x1="13" y1="32" x2="27" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3"/>
  </svg>
);

export const TalqaShieldSmall = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sg2" x1="0" y1="0" x2="40" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0B4A6F" />
        <stop offset="100%" stopColor="#00B4D8" />
      </linearGradient>
    </defs>
    <path d="M20 1L3 8V22C3 31.5 10.5 40.2 20 43C29.5 40.2 37 31.5 37 22V8L20 1Z" fill="url(#sg2)" />
    <path d="M20 4L6 10.5V22C6 29.8 12 37.4 20 40C28 37.4 34 29.8 34 22V10.5L20 4Z" fill="white" fillOpacity="0.08" />
    <text x="20" y="27" textAnchor="middle" fill="white" fontSize="17" fontWeight="800" fontFamily="Tajawal, Arial, sans-serif">ت</text>
  </svg>
);
