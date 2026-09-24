import React from 'react';

interface ConceptItem {
  id: string;
  number: string;
  tag: string;
  icon: string;
  title: string;
  description: string;
  footerLabel: string;
  footerIcon: string;
}

const CONCEPTS: ConceptItem[] = [
  {
    id: 'buy',
    number: '01 // BUY',
    tag: 'save money',
    icon: 'shopping_cart',
    title: 'Acquire Textbooks',
    description: 'Find academic resources listed by students and faculty when you need them.',
    footerLabel: 'Direct Campus Handover',
    footerIcon: 'handshake',
  },
  {
    id: 'sell',
    number: '02 // SELL',
    tag: 'declutter desk',
    icon: 'sell',
    title: 'Pass on Materials',
    description: 'List books and academic materials you no longer need and pass them on to another campus user.',
    footerLabel: 'Peer-to-Peer Sale',
    footerIcon: 'storefront',
  },
  {
    id: 'exchange',
    number: '03 // EXCHANGE',
    tag: 'peer swap',
    icon: 'sync_alt',
    title: 'Swap Course Notes',
    description: 'Exchange useful academic resources with other students or faculty.',
    footerLabel: 'Fair Resource Swap',
    footerIcon: 'published_with_changes',
  },
  {
    id: 'share',
    number: '04 // SHARE',
    tag: 'community gift',
    icon: 'volunteer_activism',
    title: 'Lend & Free Resources',
    description: 'Lend or provide resources as Free Resources for members of the campus community.',
    footerLabel: 'Community Sharing',
    footerIcon: 'favorite',
  },
];

export const WhatIsCampusShelf: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-low py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Editorial Stamp */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-label-stamp text-label-stamp uppercase tracking-widest text-primary font-bold">
              [ PEER-TO-PEER · CAMPUS VERIFIED ]
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-4">
            WHAT IS CAMPUSSHELF?
          </h2>
          <div className="w-16 h-0.5 bg-primary mb-4"></div>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            CampusShelf connects students and faculty within the same campus so useful academic resources can be passed from one hand to another instead of sitting unused on closet shelves.
          </p>
        </div>

        {/* 4 Visual Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONCEPTS.map((concept) => (
            <div
              key={concept.id}
              className="bg-surface-container-lowest p-6 rounded border border-outline-variant/60 flex flex-col justify-between relative group hover:shadow-[3px_4px_0px_#18181b] transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold px-2 py-0.5 bg-primary-fixed rounded">
                    {concept.number}
                  </span>
                  <span className="font-label-stamp text-xs text-secondary font-bold uppercase tracking-wider">
                    {concept.tag}
                  </span>
                </div>

                <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">{concept.icon}</span>
                </div>

                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">
                  {concept.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-normal">
                  {concept.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant/40 flex items-center gap-2 text-primary font-label-md text-label-md">
                <span>{concept.footerLabel}</span>
                <span className="material-symbols-outlined text-sm">{concept.footerIcon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
