import React from 'react';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { WhatIsCampusShelf } from './WhatIsCampusShelf';
import { WhatsOnCampus } from './WhatsOnCampus';
import { TornPaperBanner } from './TornPaperBanner';
import { HowCampusShelfWorks } from './HowCampusShelfWorks';
import { CommunitySection } from './CommunitySection';
import { FinalCTA } from './FinalCTA';
import { Footer } from './Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      {/* 1. Header / Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="w-full pt-16 bg-background flex-grow">
        <div className="flex flex-col w-full relative overflow-x-hidden selection:bg-tertiary-fixed selection:text-on-tertiary-fixed">
          {/* 2. Hero — Introduce CampusShelf */}
          <HeroSection />

          {/* 3. What Is CampusShelf? */}
          <WhatIsCampusShelf />

          {/* 4. What's on Campus? */}
          <WhatsOnCampus />

          {/* 5. Blue Torn-Paper Banner */}
          <TornPaperBanner />

          {/* 6. How CampusShelf Works */}
          <HowCampusShelfWorks />

          {/* 7. Built Around Your Campus Community */}
          <CommunitySection />

          {/* 8. Final CTA */}
          <FinalCTA />
        </div>
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
};
