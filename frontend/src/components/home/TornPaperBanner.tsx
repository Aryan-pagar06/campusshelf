import React from 'react';

export const TornPaperBanner: React.FC = () => {
  return (
    <section className="w-full my-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto relative overflow-hidden bg-primary text-on-primary rounded shadow-[4px_6px_0px_#18181b]">
        {/* Top Jagged Paper Edge Effect (CSS SVG Hairline) */}
        <div className="w-full h-3 overflow-hidden text-background fill-current">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 12">
            <path d="M0,0 L20,12 L40,2 L60,12 L80,0 L100,10 L120,3 L140,12 L160,0 L180,12 L200,2 L220,12 L240,0 L260,10 L280,3 L300,12 L320,0 L340,12 L360,2 L380,12 L400,0 L420,10 L440,3 L460,12 L480,0 L500,12 L520,2 L540,12 L560,0 L580,10 L600,3 L620,12 L640,0 L660,12 L680,2 L700,12 L720,0 L740,10 L760,3 L780,12 L800,0 L820,12 L840,2 L860,12 L880,0 L900,10 L920,3 L940,12 L960,0 L980,12 L1000,2 L1020,12 L1040,0 L1060,10 L1080,3 L1100,12 L1120,0 L1140,12 L1160,2 L1180,12 L1200,0 V12 H0 Z" />
          </svg>
        </div>

        <div className="p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Banner Headline */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-stamp text-xs uppercase px-2 py-0.5 font-bold tracking-widest rotate-[-1deg]">
                CAMPUS SUSTAINABILITY PLEDGE
              </span>
            </div>

            <h2 className="font-display-lg text-display-lg-mobile sm:text-display-lg font-bold tracking-tight text-white leading-[1.1] mb-6">
              DON’T LET GOOD STUDY
              <br />
              MATERIAL COLLECT DUST.
            </h2>

            <div className="inline-block bg-tertiary-fixed text-on-tertiary-fixed px-4 py-2 font-headline-md text-headline-md font-bold rotate-[0.5deg] shadow-sm max-w-fit mb-4">
              Pass it on. Sell it. Rent it. Exchange it. Give it away.
            </div>

            <p className="font-body-md text-body-md text-primary-fixed-dim max-w-xl">
              Every semester, thousands of textbooks and notebooks sit forgotten on shelves while freshmen scramble to buy identical copies brand new. Break the cycle.
            </p>
          </div>

          {/* Right Side: White Ink Hand-drawn Passing Books Illustration */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs aspect-square p-6 border-2 border-dashed border-primary-fixed-dim/40 rounded flex flex-col items-center justify-center text-center relative">
              {/* Hand passing illustration SVG */}
              <svg
                className="w-36 h-36 text-primary-fixed mb-3"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 120 120"
              >
                {/* Left hand */}
                <path d="M10 65 L35 65 L45 55 L65 55" />
                <path d="M10 75 L35 75 L50 70" />
                {/* Book in middle */}
                <rect
                  fill="currentColor"
                  fillOpacity="0.15"
                  height="48"
                  rx="2"
                  transform="rotate(-10 42 30)"
                  width="36"
                  x="42"
                  y="30"
                />
                <path d="M48 38 L72 34" />
                <path d="M50 48 L74 44" />
                <path d="M52 58 L76 54" />
                {/* Right hand receiving */}
                <path d="M110 50 L85 50 L75 60 L60 60" />
                <path d="M110 40 L85 40 L70 45" />
                {/* Movement dashes */}
                <path d="M55 20 C 60 16, 68 16, 72 22" strokeDasharray="2 3" />
                <path d="M45 88 C 50 92, 58 92, 62 86" strokeDasharray="2 3" />
              </svg>
              <span className="font-label-stamp text-xs uppercase tracking-widest text-tertiary-fixed font-bold">
                [ REAL STUDENTS · REAL CIRCULATION ]
              </span>
              <span className="font-body-sm text-[12px] text-primary-fixed-dim mt-1">
                Direct handoffs outside department libraries
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Jagged Paper Edge Effect */}
        <div className="w-full h-3 overflow-hidden text-background fill-current rotate-180">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 12">
            <path d="M0,0 L20,12 L40,2 L60,12 L80,0 L100,10 L120,3 L140,12 L160,0 L180,12 L200,2 L220,12 L240,0 L260,10 L280,3 L300,12 L320,0 L340,12 L360,2 L380,12 L400,0 L420,10 L440,3 L460,12 L480,0 L500,12 L520,2 L540,12 L560,0 L580,10 L600,3 L620,12 L640,0 L660,12 L680,2 L700,12 L720,0 L740,10 L760,3 L780,12 L800,0 L820,12 L840,2 L860,12 L880,0 L900,10 L920,3 L940,12 L960,0 L980,12 L1000,2 L1020,12 L1040,0 L1060,10 L1080,3 L1100,12 L1120,0 L1140,12 L1160,2 L1180,12 L1200,0 V12 H0 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
};
