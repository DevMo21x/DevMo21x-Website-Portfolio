import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroVisual() {
  const blobRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle pulse animation for the blob
      gsap.to(blobRef.current, {
        scale: 1.2,
        opacity: 0.6,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Mouse tracking
      const onMouseMove = (e: MouseEvent) => {
        if (!containerRef.current || !blobRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        // Move the blob towards the cursor
        gsap.to(blobRef.current, {
          x: x - 200, // offset by half the blob size
          y: y - 200,
          duration: 1.5,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated Blob */}
      <div
        ref={blobRef}
        className="absolute w-[400px] h-[400px] rounded-full bg-primary/20 blur-[100px]"
        style={{ top: '30%', left: '40%' }}
      />
      
      {/* Dot Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Gradient Mask to fade out edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-container-low/50 to-surface-container-low" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-transparent to-surface-container-low" />
    </div>
  );
}
