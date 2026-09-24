import React from 'react';
import { HOME_IMAGES } from '../../constants/images';
import { navigateTo } from '../../lib/navigation';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-12 pb-20 lg:py-24">
      {/* Ambient Margin Doodles (Hand-drawn Ink Elements) */}
      <div className="absolute top-4 left-6 hidden lg:block pointer-events-none select-none text-on-surface/40">
        <svg
          className="w-20 h-20 -rotate-12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 100 100"
        >
          <path d="M15 45 L50 25 L85 45 L50 65 Z" strokeLinejoin="round" />
          <path d="M30 54 V72 C30 80 70 80 70 72 V54" strokeLinecap="round" />
          <path d="M85 45 V75 C85 78 88 80 90 77" strokeLinecap="round" />
          <circle cx="90" cy="80" fill="currentColor" r="2.5" />
        </svg>
        <span className="font-headline-sm text-label-stamp text-on-surface-variant tracking-wider uppercase block -mt-2 rotate-[-8deg] font-bold">
          Better Together // 01
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Storytelling & Action */}
        <div className="lg:col-span-7 flex flex-col z-10">
          {/* Overline Tag & Stamp */}
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-tertiary-fixed/90 text-on-tertiary-fixed font-label-stamp text-label-stamp px-3 py-1 uppercase tracking-widest rotate-[-1.5deg] shadow-sm">
              COLLEGIATE EXCHANGE SYSTEM
            </span>
            <span className="text-on-surface-variant font-label-md text-label-md flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span> Verified Campus Network
            </span>
          </div>

          {/* Main Display Headline with Hand-drawn Looped Oval */}
          <h1 className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight leading-[1.08] mb-6">
            YOUR CAMPUS.
            <br />
            YOUR{' '}
            <span className="relative inline-block text-primary">
              RESOURCES.
              {/* Hand-drawn loop doodle overlay */}
              <svg
                className="absolute -inset-x-5 -inset-y-3 w-[calc(100%+2.5rem)] h-[calc(100%+1.5rem)] pointer-events-none text-primary overflow-visible"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 320 90"
              >
                <path
                  d="M 12 46 C 18 18, 120 6, 220 8 C 295 10, 318 24, 314 48 C 309 72, 235 84, 130 82 C 45 80, 2 68, 6 42 C 9 22, 70 12, 185 10 C 275 8, 312 28, 305 52"
                  opacity="0.9"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.6"
                />
              </svg>
            </span>
          </h1>

          {/* Supporting Editorial Description */}
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed mb-8">
            CampusShelf is your campus marketplace for academic resources. Find, share, sell, rent, exchange, or give away books, notes, manuals and study materials with students and faculty around your campus.
          </p>

          {/* Call to Action Buttons (Tactile Stationery Style) */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/browse"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/browse');
              }}
              className="bg-primary-container text-on-secondary px-6 py-3.5 font-headline-sm text-headline-sm flex items-center gap-2 hover:bg-primary transition-all duration-150 rounded shadow-sm hover:shadow-[3px_4px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px]"
            >
              <span>BROWSE RESOURCES</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </a>
            <a
              href="/list-resource"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/list-resource');
              }}
              className="bg-surface-container-lowest text-on-surface px-6 py-3.5 font-headline-sm text-headline-sm flex items-center gap-2 border border-outline hover:border-on-surface hover:bg-surface-container transition-all duration-150 rounded shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">edit_note</span>
              <span>LIST A RESOURCE</span>
            </a>
          </div>

          {/* Micro Annotation below CTAs */}
          <div className="mt-8 flex items-center gap-6 text-on-surface-variant font-label-md text-label-md">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base">verified</span>
              <span>.edu campus authorization</span>
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base">recycling</span>
              <span>Zero textbook waste</span>
            </div>
          </div>
        </div>

        {/* Right Column: Asymmetric Editorial Academic Photo Collage */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
          {/* Floating Sketch Star Doodle */}
          <div className="absolute -top-10 right-8 text-on-surface/30 hidden sm:block pointer-events-none">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 50 50">
              <path
                d="M25 0 L29 18 L47 20 L32 30 L37 48 L25 36 L13 48 L18 30 L3 20 L21 18 Z"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Collage Stack Container */}
          <div className="relative w-full max-w-md mx-auto aspect-[4/5] p-3 bg-surface-container-lowest shadow-[4px_6px_0px_rgba(24,24,27,0.12)] border border-outline-variant/60 rotate-[2deg] transition-transform duration-300 hover:rotate-0">
            {/* Tape Element at Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-tertiary-fixed/80 backdrop-blur-sm -rotate-2 z-20 shadow-sm opacity-90 pointer-events-none"></div>

            {/* Main Composition Image */}
            <div className="w-full h-full relative overflow-hidden bg-surface-container">
              <img
                className="w-full h-full object-cover"
                alt={HOME_IMAGES.heroComposition.alt}
                src={HOME_IMAGES.heroComposition.src}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = HOME_IMAGES.heroComposition.fallback;
                }}
              />
              {/* Ruled Notebook Spine Detail Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/60 to-transparent text-inverse-on-surface">
                <span className="font-label-stamp text-label-stamp uppercase tracking-widest block text-tertiary-fixed mb-0.5">
                  ARCHIVE REF // SEM-04
                </span>
                <p className="font-headline-sm text-headline-sm leading-tight text-white">
                  Syllabus Textbooks & Practical Manuals
                </p>
              </div>
            </div>

            {/* Pinned Yellow Sticky Note Accent */}
            <div className="absolute -bottom-6 -left-6 w-44 p-4 bg-tertiary-fixed text-on-tertiary-fixed shadow-[3px_4px_0px_#18181b] -rotate-[7deg] z-30 border border-on-tertiary-container/20">
              <div className="flex items-center justify-between mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span>
                <span className="font-label-stamp text-[10px] tracking-widest uppercase opacity-75">MEMO</span>
              </div>
              <p className="font-headline-sm text-headline-sm leading-snug font-bold">
                Same books.
                <br />
                New stories. ✦
              </p>
              <p className="font-body-sm text-[11px] mt-1 opacity-80 italic">Pass it to juniors.</p>
            </div>

            {/* Arrow Sketch pointing inward */}
            <div className="absolute -bottom-8 right-2 text-on-surface/40 hidden sm:block pointer-events-none">
              <svg className="w-16 h-16 rotate-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 80 80">
                <path d="M10 60 C 35 65, 55 50, 60 20" strokeLinecap="round" />
                <path d="M48 24 L60 20 L64 34" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
