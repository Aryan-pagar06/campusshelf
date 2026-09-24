import React from 'react';
import { HOME_IMAGES } from '../../constants/images';

interface PillarItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badgeBg: string;
  badgeText: string;
}

const PILLARS: PillarItem[] = [
  {
    id: 'campus-only',
    title: 'Campus Only',
    description: 'Resources are shared within the university community.',
    icon: 'school',
    badgeBg: 'bg-primary-fixed',
    badgeText: 'text-on-primary-fixed',
  },
  {
    id: 'student-faculty',
    title: 'Student + Faculty',
    description: 'Both students and faculty can list and request resources.',
    icon: 'group',
    badgeBg: 'bg-tertiary-fixed',
    badgeText: 'text-on-tertiary-fixed',
  },
  {
    id: 'share-more',
    title: 'Share More',
    description: 'Buy, sell, rent, exchange or provide resources as Free Resources.',
    icon: 'sync_alt',
    badgeBg: 'bg-secondary-fixed',
    badgeText: 'text-on-secondary-fixed',
  },
];

export const CommunitySection: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-low py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Scrapbook Polaroid Mosaic */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full max-w-md mx-auto h-[380px]">
              {/* Polaroid 1: Lawn Study Group (Tilted Left) */}
              <div className="absolute top-2 left-2 w-64 bg-surface-container-lowest p-3 pb-8 shadow-[3px_4px_0px_rgba(24,24,27,0.1)] border border-outline-variant/60 -rotate-6 z-10 hover:z-30 hover:rotate-0 transition-all duration-300">
                {/* Washi Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-tertiary-fixed/80 backdrop-blur-sm -rotate-2 pointer-events-none"></div>
                <div className="w-full aspect-[4/3] bg-surface-container overflow-hidden mb-3">
                  <img
                    className="w-full h-full object-cover"
                    alt={HOME_IMAGES.lawnStudy.alt}
                    src={HOME_IMAGES.lawnStudy.src}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = HOME_IMAGES.lawnStudy.fallback;
                    }}
                  />
                </div>
                <p className="font-headline-sm text-label-md font-bold text-center text-on-surface">
                  Campus Quad Lawn · 2:15 PM
                </p>
              </div>

              {/* Polaroid 2: Library Reading Table (Tilted Right) */}
              <div className="absolute bottom-2 right-2 w-64 bg-surface-container-lowest p-3 pb-8 shadow-[4px_6px_0px_rgba(24,24,27,0.12)] border border-outline-variant/60 rotate-6 z-20 hover:z-30 hover:rotate-0 transition-all duration-300">
                {/* Washi Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-tertiary-fixed/80 backdrop-blur-sm rotate-3 pointer-events-none"></div>
                <div className="w-full aspect-[4/3] bg-surface-container overflow-hidden mb-3">
                  <img
                    className="w-full h-full object-cover"
                    alt={HOME_IMAGES.libraryTable.alt}
                    src={HOME_IMAGES.libraryTable.src}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = HOME_IMAGES.libraryTable.fallback;
                    }}
                  />
                </div>
                <p className="font-headline-sm text-label-md font-bold text-center text-on-surface">
                  Central Library Annex · 4:40 PM
                </p>
              </div>

              {/* Sticky Note Annotation */}
              <div className="absolute -bottom-4 left-8 bg-tertiary-fixed text-on-tertiary-fixed p-3 shadow-md border border-on-tertiary-container/20 -rotate-3 z-30">
                <span className="font-headline-sm text-label-stamp font-bold block">
                  Same campus. Same goals. ✦
                </span>
              </div>
            </div>
          </div>

          {/* Right: Community Story & Pillars */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-label-stamp text-label-stamp text-secondary uppercase font-bold tracking-widest">
                COMMUNITY FIRST
              </span>
            </div>

            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-4">
              BUILT AROUND YOUR
              <br />
              CAMPUS{' '}
              <span className="underline decoration-tertiary-fixed decoration-4 underline-offset-4">
                COMMUNITY.
              </span>
            </h2>

            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-8">
              CampusShelf connects students and faculty within the same university so useful academic resources can move from one person to another instead of sitting unused.
            </p>

            {/* 3 Community Badges */}
            <div className="space-y-4">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  className="flex items-start gap-4 p-4 bg-surface-container-lowest rounded border border-outline-variant/40"
                >
                  <div
                    className={`w-10 h-10 rounded ${pillar.badgeBg} ${pillar.badgeText} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="material-symbols-outlined text-xl">{pillar.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {pillar.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
