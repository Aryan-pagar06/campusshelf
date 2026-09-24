import React from 'react';

interface StepItem {
  number: string;
  badge: string;
  title: string;
  description: string;
  footerLabel: string;
  icon: string;
}

const STEPS: StepItem[] = [
  {
    number: '01',
    badge: 'STEP // DISCOVER',
    title: 'FIND YOUR MATERIAL',
    description: 'Find books, notes and academic materials shared by students and faculty.',
    footerLabel: 'Browse Campus Catalog',
    icon: 'search_insights',
  },
  {
    number: '02',
    badge: 'STEP // REQUEST',
    title: 'SEND A DIRECT REQUEST',
    description: 'Send a request to the person who listed the resource.',
    footerLabel: 'Direct Resource Inquiries',
    icon: 'outgoing_mail',
  },
  {
    number: '03',
    badge: 'STEP // CONNECT',
    title: 'CONNECT & ARRANGE',
    description: 'Once the request is accepted, coordinate directly and arrange the exchange, sale, rental or sharing.',
    footerLabel: 'Direct Campus Coordination',
    icon: 'location_on',
  },
];

export const HowCampusShelfWorks: React.FC = () => {
  return (
    <section className="w-full py-20 px-6 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center gap-2 mb-2 text-primary font-bold font-label-stamp text-label-stamp uppercase tracking-widest">
          <span>SIMPLE 3-STEP CYCLE</span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-2">
          HOW CAMPUSSHELF WORKS
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant italic">
          "Small steps. Big impact. ✦"
        </p>
      </div>

      {/* Steps Grid with Editorial Clean Layout & Hand-Drawn Flow Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {STEPS.map((step, idx) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-start bg-surface-container-lowest p-8 rounded border border-outline-variant/50 relative hover:shadow-[3px_4px_0px_#18181b] transition-all">
              <div className="flex items-center justify-between w-full mb-6">
                <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-md text-headline-md font-bold shadow-sm">
                  {step.number}
                </div>
                <span className="font-label-stamp text-xs uppercase tracking-widest text-outline">
                  {step.badge}
                </span>
              </div>

              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-3">
                {step.title}
              </h3>

              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {step.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-primary font-label-md text-label-md">
                <span className="material-symbols-outlined text-base">{step.icon}</span>
                <span>{step.footerLabel}</span>
              </div>
            </div>

            {/* Connecting Hand Arrow (Desktop only between 1->2 and 2->3) */}
            {idx === 0 && (
              <div className="hidden md:flex absolute top-1/2 left-[31%] -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none text-primary">
                <svg className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 60 24">
                  <path d="M4 12 Q 28 4, 52 12" strokeLinecap="round" />
                  <path d="M44 6 L54 12 L46 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            {idx === 1 && (
              <div className="hidden md:flex absolute top-1/2 left-[65%] -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none text-primary">
                <svg className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 60 24">
                  <path d="M4 12 Q 28 4, 52 12" strokeLinecap="round" />
                  <path d="M44 6 L54 12 L46 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
