'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils'; // Fixed import path since we don't have `@` aliases configured

import { Home, Grid, History, Code, Award, Mail } from 'lucide-react';

type DockIcon = React.ComponentType<{ className?: string }>;

export interface DockItem {
  title: string;
  icon: DockIcon;
  href?: string;
  onClick?: () => void;
}

export interface GlassDockProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: DockItem[];
  dockClassName?: string;
}

const defaultItems: DockItem[] = [
  { title: 'Home', href: '#main', icon: Home },
  { title: 'Work', href: '#projects', icon: Grid },
  { title: 'Experience', href: '#experience', icon: History },
  { title: 'Arsenal', href: '#tech-stack', icon: Code },
  { title: 'Awards', href: '#certificates', icon: Award },
  { title: 'Connect', href: '#contact', icon: Mail },
];

export const GlassDock = React.forwardRef<HTMLDivElement, GlassDockProps>(
  ({ items = defaultItems, className, dockClassName, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState(0);

    const handleMouseEnter = (index: number) => {
      if (hoveredIndex !== null && index !== hoveredIndex) {
        setDirection(index > hoveredIndex ? 1 : -1);
      }
      setHoveredIndex(index);
    };

    // Calculate tooltip absolute position assuming 40px width (w-10) + 16px gap (gap-4)
    // 56px per item. We start at 24px padding (px-6).
    const getTooltipPosition = (index: number) => index * 56 + 24;

    return (
      <div ref={ref} className={cn('w-max', className)} {...props}>
        <div
          className={cn(
            "glass-dock relative flex gap-4 items-center px-6 py-4 rounded-3xl",
            "bg-surface-container-highest/60 border border-white/10",
            "backdrop-blur-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] justify-center",
            dockClassName
          )}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setDirection(0);
          }}
        >
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: -64,
                  x: getTooltipPosition(hoveredIndex),
                }}
                exit={{ opacity: 0, scale: 0.92, y: 12 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                className="absolute top-0 left-0 pointer-events-none z-30 transform-gpu origin-bottom"
              >
                <div
                  className={cn(
                    'px-4 py-2 rounded-lg',
                    'bg-surface-container-highest text-on-surface',
                    'shadow-2xl flex items-center justify-center',
                    'border border-white/10',
                    'min-w-[80px]'
                  )}
                >
                  <div className="relative h-4 flex items-center justify-center overflow-hidden w-full">
                    <AnimatePresence mode="popLayout" custom={direction}>
                      <motion.span
                        key={items[hoveredIndex].title}
                        custom={direction}
                        initial={{
                          x: direction > 0 ? 35 : -35,
                          opacity: 0,
                          filter: 'blur(6px)',
                        }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          filter: 'blur(0px)',
                        }}
                        exit={{
                          x: direction > 0 ? -35 : 35,
                          opacity: 0,
                          filter: 'blur(6px)',
                        }}
                        transition={{
                          duration: 0.3,
                          ease: 'easeOut',
                        }}
                        className="text-xs font-semibold tracking-wide whitespace-nowrap"
                      >
                        {items[hoveredIndex].title}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {items.map((el, index) => {
            const Icon = el.icon;
            const isHovered = hoveredIndex === index;

            const handleClick = (e: React.MouseEvent) => {
              if (el.onClick) {
                el.onClick();
              }
              if (el.href) {
                if (el.href.startsWith('#')) {
                  e.preventDefault();
                  const targetId = el.href;
                  const lenis = typeof window !== 'undefined' ? (window as any).lenis : null;

                  if (targetId === '#' || targetId === '#main' || targetId === '#hero') {
                    if (lenis) {
                      lenis.scrollTo(0, { duration: 1.2 });
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    try { window.history.pushState(null, '', targetId); } catch {}
                  } else if (targetId === '#contact') {
                    if (lenis) {
                      lenis.scrollTo(document.body.scrollHeight, { duration: 1.2 });
                    } else {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }
                    try { window.history.pushState(null, '', targetId); } catch {}
                  } else {
                    const elem = document.querySelector(targetId);
                    if (elem) {
                      if (lenis) {
                        lenis.scrollTo(elem as HTMLElement, { offset: -20, duration: 1.2 });
                      } else {
                        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                      try { window.history.pushState(null, '', targetId); } catch {}
                    }
                  }
                } else {
                  window.location.href = el.href;
                }
              }
            };

            return (
              <a
                key={el.title}
                href={el.href || '#'}
                aria-label={el.title}
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={handleClick}
                className="relative w-10 h-10 flex items-center justify-center cursor-pointer group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-neutral-300 hover:text-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleClick(e as unknown as React.MouseEvent);
                  }
                }}
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: isHovered ? 1.25 : 1,
                    y: isHovered ? -4 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="z-10 relative flex items-center justify-center pointer-events-none"
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        'w-6 h-6 text-neutral-300 transition-colors duration-300 group-hover:text-white',
                        isHovered && 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.95)] drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]'
                      )}
                    />
                  )}
                </motion.div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
);

GlassDock.displayName = 'GlassDock';
