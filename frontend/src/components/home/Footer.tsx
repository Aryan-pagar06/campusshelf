import React from 'react';
import { navigateTo } from '../../lib/navigation';

export const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigateTo(path);
  };

  return (
    <footer className="w-full bg-[#faf7f2] border-t border-outline-variant/60 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-label-stamp text-label-stamp text-outline tracking-widest uppercase">
            — CS —
          </span>
        </div>

        <div className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight mb-1">
          CampusShelf
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant italic mb-6">
          Find it. Share it. Pass it on.
        </p>

        <nav className="flex flex-wrap justify-center items-center gap-6 mb-8">
          <a
            href="/browse"
            onClick={(e) => handleNavClick(e, '/browse')}
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Browse
          </a>
          <a
            href="/list-resource"
            onClick={(e) => handleNavClick(e, '/list-resource')}
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            List Resource
          </a>
          <a
            href="/wishlist"
            onClick={(e) => handleNavClick(e, '/wishlist')}
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Wishlist
          </a>
          <a
            href="/requests"
            onClick={(e) => handleNavClick(e, '/requests')}
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Requests
          </a>
          <a
            href="/about"
            onClick={(e) => handleNavClick(e, '/about')}
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            About
          </a>
        </nav>

        <div className="w-12 h-px bg-outline-variant/40 mb-4"></div>

        <p className="font-label-stamp text-[11px] text-outline uppercase tracking-wider">
          © {new Date().getFullYear()} CampusShelf Notebook &amp; Library Exchange. Academic Commons.
        </p>
      </div>
    </footer>
  );
};
