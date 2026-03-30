import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e: MouseEvent) => {
      glow.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none -z-10 opacity-0 animate-fade-in"
      style={{
        background:
          'radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(14,165,233,0.03) 40%, transparent 70%)',
      }}
    />
  );
}
