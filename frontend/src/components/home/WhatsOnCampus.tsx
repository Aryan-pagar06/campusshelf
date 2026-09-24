import React from 'react';
import { HOME_IMAGES } from '../../constants/images';
import { navigateTo } from '../../lib/navigation';

interface CategoryItem {
  id: string;
  title: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  footerLabel: string;
  icon: string;
  image: {
    src: string;
    fallback: string;
    alt: string;
  };
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'textbooks',
    title: 'Textbooks',
    badge: 'Curriculum',
    badgeBg: 'bg-primary-container',
    badgeText: 'text-on-secondary',
    description: 'Prescribed curriculum titles, standard reference guides & foreign author editions.',
    footerLabel: 'Syllabus Bound',
    icon: 'menu_book',
    image: HOME_IMAGES.textbooks,
  },
  {
    id: 'notes',
    title: 'Lecture Notes',
    badge: 'Handmade',
    badgeBg: 'bg-tertiary-fixed',
    badgeText: 'text-on-tertiary-fixed',
    description: 'Handwritten lecture summaries, curated formulas, and key unit breakdowns.',
    footerLabel: 'Student Curated',
    icon: 'edit_document',
    image: HOME_IMAGES.notes,
  },
  {
    id: 'pyqs',
    title: 'PYQ Archives',
    badge: 'Exam Prep',
    badgeBg: 'bg-surface-container-highest',
    badgeText: 'text-on-surface',
    description: 'Past 5-year semester exam papers, viva guides, and midterm solution compilations.',
    footerLabel: 'Exam Archives',
    icon: 'quiz',
    image: HOME_IMAGES.pyqs,
  },
  {
    id: 'lab-manuals',
    title: 'Lab Manuals',
    badge: 'Practical',
    badgeBg: 'bg-primary-fixed',
    badgeText: 'text-on-primary-fixed',
    description: 'Standard department practical logbooks, reading records, and viva preparations.',
    footerLabel: 'Department Logs',
    icon: 'science',
    image: HOME_IMAGES.labManuals,
  },
  {
    id: 'tools-stationery',
    title: 'Tools & Kits',
    badge: 'Hardware',
    badgeBg: 'bg-secondary-fixed',
    badgeText: 'text-on-secondary-fixed',
    description: 'Scientific calculators, engineering mini-drafters, dissection kits, and lab coats.',
    footerLabel: 'Ready to Use',
    icon: 'architecture',
    image: HOME_IMAGES.tools,
  },
];

export const WhatsOnCampus: React.FC = () => {
  return (
    <section className="w-full py-20 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2 text-on-surface-variant">
            <span className="font-label-stamp text-label-stamp uppercase tracking-widest text-outline">
              CATEGORIES // EXPLORE
            </span>
            <span className="text-xs">➔</span>
            <span className="font-body-sm text-body-sm italic text-secondary font-semibold">
              Good stuff circulating right now
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            WHAT’S ON CAMPUS?
          </h2>
        </div>

        <a
          href="/browse"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/browse');
          }}
          className="mt-4 md:mt-0 font-headline-sm text-headline-sm text-primary flex items-center gap-1.5 hover:gap-3 transition-all"
        >
          <span>VIEW ALL RESOURCES</span>
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </a>
      </div>

      {/* Editorial Preview Grid of 5 Key Resource Types */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="group bg-surface-container-lowest border border-outline-variant/60 rounded overflow-hidden flex flex-col hover:border-on-surface transition-colors shadow-sm"
          >
            <div className="w-full aspect-[4/3] bg-surface-container overflow-hidden relative">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt={cat.image.alt}
                src={cat.image.src}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = cat.image.fallback;
                }}
              />
              <span
                className={`absolute top-2 left-2 ${cat.badgeBg} ${cat.badgeText} font-label-stamp text-[10px] px-2 py-0.5 uppercase tracking-wider rounded font-bold`}
              >
                {cat.badge}
              </span>
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-1">
                  {cat.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
                <span>{cat.footerLabel}</span>
                <span className="material-symbols-outlined text-primary text-base">{cat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
