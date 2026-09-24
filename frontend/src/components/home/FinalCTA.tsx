import React from 'react';
import { navigateTo } from '../../lib/navigation';

export const FinalCTA: React.FC = () => {
  return (
    <section className="w-full py-20 px-6 max-w-7xl mx-auto">
      <div className="bg-surface-container border border-outline-variant/60 rounded p-8 sm:p-14 text-center relative overflow-hidden shadow-sm">
        {/* Decorative Paper Grid Marks */}
        <div className="absolute top-4 left-4 font-label-stamp text-xs text-outline opacity-40 font-mono select-none">
          + + +
        </div>
        <div className="absolute top-4 right-4 font-label-stamp text-xs text-outline opacity-40 font-mono select-none">
          + + +
        </div>
        <div className="absolute bottom-4 left-4 font-label-stamp text-xs text-outline opacity-40 font-mono select-none">
          + + +
        </div>
        <div className="absolute bottom-4 right-4 font-label-stamp text-xs text-outline opacity-40 font-mono select-none">
          + + +
        </div>

        <div className="max-w-2xl mx-auto flex flex-col items-center relative z-10">
          <span className="font-label-stamp text-label-stamp uppercase tracking-widest text-primary font-bold mb-3">
            GET STARTED TODAY
          </span>

          <h2 className="font-headline-lg text-headline-lg sm:text-display-lg text-on-surface font-bold tracking-tight mb-4">
            Ready to explore what’s available on campus?
          </h2>

          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            Join your fellow classmates circulating hundreds of syllabus books, notes, and academic essentials every term.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/browse"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/browse');
              }}
              className="bg-primary-container text-on-secondary px-8 py-4 font-headline-sm text-headline-sm rounded flex items-center gap-2 hover:bg-primary transition-all shadow-[3px_4px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px]"
            >
              <span>BROWSE ALL RESOURCES</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </a>
            <a
              href="/list-resource"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/list-resource');
              }}
              className="bg-surface-container-lowest text-on-surface px-8 py-4 font-headline-sm text-headline-sm rounded border border-outline hover:border-on-surface hover:bg-surface-bright transition-all shadow-sm"
            >
              <span>LIST A RESOURCE</span>
            </a>
          </div>

          <p className="font-label-md text-label-md text-on-surface-variant mt-6">
            Open to all currently enrolled collegiate students &amp; faculty members.
          </p>
        </div>
      </div>
    </section>
  );
};
