import React, { useState } from 'react';
import { HOME_IMAGES } from '../../constants/images';
import { navigateTo } from '../../lib/navigation';

interface HeaderProps {
  activePath?: string;
}

export const Header: React.FC<HeaderProps> = ({ activePath }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const current = activePath || (typeof window !== 'undefined' ? window.location.pathname : '/');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigateTo(path);
  };

  const isHome = current === '/' || current === '';
  const isBrowse = current === '/browse';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf7f2]/95 backdrop-blur-md border-b border-outline-variant/60 shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
      <div className="h-16 max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center gap-2 group text-decoration-none"
          >
            <span className="material-symbols-outlined text-primary text-2xl transition-transform group-hover:-rotate-6">
              school
            </span>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight group-hover:text-primary transition-colors flex items-center gap-1.5">
                CampusShelf
                <span className="font-label-stamp text-label-stamp bg-surface-container text-on-surface-variant px-1.5 py-0.5 rounded border border-outline-variant/50">
                  CS
                </span>
              </span>
            </div>
          </a>

          <div className="h-5 w-[1px] bg-outline-variant/60 hidden md:block"></div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              aria-current={isHome ? 'page' : undefined}
              className={`font-label-lg text-label-lg transition-colors relative py-1 ${
                isHome
                  ? 'text-primary font-bold after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2.5px] after:bg-primary-container after:rounded-full'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Home
            </a>
            <a
              href="/browse"
              onClick={(e) => handleNavClick(e, '/browse')}
              aria-current={isBrowse ? 'page' : undefined}
              className={`font-label-lg text-label-lg transition-colors relative py-1 ${
                isBrowse
                  ? 'text-primary font-semibold pen-underline'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Browse
            </a>
            <a
              href="/list-resource"
              onClick={(e) => handleNavClick(e, '/list-resource')}
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-1"
            >
              List Resource
            </a>
            <a
              href="/wishlist"
              onClick={(e) => handleNavClick(e, '/wishlist')}
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-1"
            >
              Wishlist
            </a>
            <a
              href="/requests"
              onClick={(e) => handleNavClick(e, '/requests')}
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-1"
            >
              Requests
            </a>
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => navigateTo('/notifications')}
            className="relative p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary ring-2 ring-[#faf7f2]"></span>
          </button>

          <div className="h-6 w-[1px] bg-outline-variant/60 hidden sm:block"></div>

          <a
            href="/profile"
            onClick={(e) => handleNavClick(e, '/profile')}
            className="flex items-center pl-1 cursor-pointer"
          >
            <div className="relative rounded-full ring-1 ring-outline-variant/80 p-0.5 hover:ring-primary transition-all">
              <img
                alt={HOME_IMAGES.profileAvatar.alt}
                src={HOME_IMAGES.profileAvatar.src}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = HOME_IMAGES.profileAvatar.fallback;
                }}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-on-surface-variant hover:text-on-surface rounded-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf7f2] border-b border-outline-variant/30 px-6 py-4 flex flex-col gap-3 shadow-lg">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className={`py-1 pl-3 ${
              isHome
                ? 'text-primary font-bold border-l-2 border-primary-container'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Home
          </a>
          <a
            href="/browse"
            onClick={(e) => handleNavClick(e, '/browse')}
            className={`py-1 pl-3 ${
              isBrowse
                ? 'text-primary font-bold border-l-2 border-primary-container'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Browse
          </a>
          <a
            href="/list-resource"
            onClick={(e) => handleNavClick(e, '/list-resource')}
            className="py-1 text-on-surface-variant hover:text-on-surface pl-3"
          >
            List Resource
          </a>
          <a
            href="/wishlist"
            onClick={(e) => handleNavClick(e, '/wishlist')}
            className="py-1 text-on-surface-variant hover:text-on-surface pl-3"
          >
            Wishlist
          </a>
          <a
            href="/requests"
            onClick={(e) => handleNavClick(e, '/requests')}
            className="py-1 text-on-surface-variant hover:text-on-surface pl-3"
          >
            Requests
          </a>
        </div>
      )}
    </header>
  );
};
