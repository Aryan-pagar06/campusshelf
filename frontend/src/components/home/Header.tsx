import { useEffect, useState } from 'react';

interface HeaderProps {
  activePath?: string;
}

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Browse', path: '/browse' },
  { label: 'List Resource', path: '/list-resource' },
  { label: 'Wishlist', path: '/wishlist' },
  { label: 'Requests', path: '/requests' },
];

export function Header({ activePath }: HeaderProps) {
  const [currentPath, setCurrentPath] = useState(
    activePath || window.location.pathname
  );

  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', updatePath);

    return () => {
      window.removeEventListener('popstate', updatePath);
    };
  }, []);

  useEffect(() => {
    if (activePath) {
      setCurrentPath(activePath);
    } else {
      setCurrentPath(window.location.pathname);
    }
  }, [activePath]);

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    event.preventDefault();

    if (window.location.pathname === path) {
      setCurrentPath(path);
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);

    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#c4c5d5]/60 bg-[#faf7f2]/95 shadow-[0_1px_8px_rgba(0,0,0,0.02)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">

        {/* Logo */}
        <div className="flex items-center gap-4 md:gap-6">
          <a
            href="/"
            onClick={(event) => handleNavigation(event, '/')}
            className="group flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#00288e] text-white shadow-sm">
              <span className="material-symbols-outlined text-[21px]">
                school
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-[#1b1b1e] transition-colors group-hover:text-[#00288e]">
                CampusShelf
              </span>

              <span className="rounded border border-[#c4c5d5]/60 bg-[#f0edf1] px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-[#444653]">
                CS
              </span>
            </div>
          </a>

          {/* Divider */}
          <div className="hidden h-5 w-px bg-[#c4c5d5]/60 md:block" />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;

              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(event) =>
                    handleNavigation(event, item.path)
                  }
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#00288e]'
                      : 'text-[#444653] hover:text-[#00288e]'
                  }`}
                >
                  {item.label}

                  {/* ACTIVE BLUE UNDERLINE */}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-0 right-0 mx-auto h-1 rounded-full bg-[#3157c7]"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-md p-2 text-[#444653] transition-colors hover:bg-[#f0edf1] hover:text-[#1b1b1e]"
            onClick={() => {
              window.history.pushState({}, '', '/notifications');
              setCurrentPath('/notifications');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
          >
            <span className="material-symbols-outlined text-[22px]">
              notifications
            </span>

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#bb0112] ring-2 ring-[#faf7f2]" />
          </button>

          {/* Divider */}
          <div className="hidden h-6 w-px bg-[#c4c5d5]/60 sm:block" />

          {/* Profile */}
          <button
            type="button"
            aria-label="Profile"
            onClick={() => {
              window.history.pushState({}, '', '/profile');
              setCurrentPath('/profile');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="flex items-center"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c4c5d5] bg-[#f0edf1] text-[#00288e] transition-all hover:border-[#00288e]">
              <span className="material-symbols-outlined text-[21px]">
                person
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="border-t border-[#c4c5d5]/40 md:hidden">
        <nav className="flex overflow-x-auto px-4">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;

            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(event) =>
                  handleNavigation(event, item.path)
                }
                aria-current={isActive ? 'page' : undefined}
                className={`relative whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-[#00288e]'
                    : 'text-[#444653] hover:text-[#00288e]'
                }`}
              >
                {item.label}

                {isActive && (
                  <span
                    className="absolute bottom-0 left-4 right-4 h-1 rounded-full bg-[#3157c7]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}