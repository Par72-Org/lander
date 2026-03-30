export default function GolfFlag({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pole */}
      <line x1="6" y1="3" x2="6" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Flag */}
      <path
        d="M6 3 L18 7 L6 11 Z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* Ground line */}
      <path
        d="M3 22 C4.5 20.5 7.5 20.5 9 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
