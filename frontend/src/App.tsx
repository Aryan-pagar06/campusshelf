import React, { useEffect, useState } from 'react';
import { HomePage } from './components/home/HomePage';
import { Header } from './components/home/Header';
import { Footer } from './components/home/Footer';
import { BrowsePage } from './components/browse/BrowsePage';
import { ListResourcePage } from './components/list-resource/ListResourcePage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { RequestsPage } from './components/requests/RequestsPage';
import { NotificationsPage } from './components/notifications/NotificationsPage';
import { ProfilePage } from './components/profile/ProfilePage';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Home Page
  if (currentPath === '/' || currentPath === '') {
    return <HomePage />;
  }

  // Browse Resources
  if (currentPath === '/browse') {
    return <BrowsePage />;
  }

  if (currentPath === '/list-resource') {
  return <ListResourcePage />;
}

if (currentPath === '/wishlist') {
  return <WishlistPage />;
}

if (currentPath === '/requests') {
  return <RequestsPage />;
}

if (currentPath === '/notifications') {
  return <NotificationsPage />;
}

if (currentPath === '/profile') {
  return <ProfilePage />;
}

  // Placeholder for routes that are not implemented yet
  const routeNames: Record<string, string> = {
    '/list-resource': 'List a Resource',
    '/wishlist': 'Your Wishlist',
    '/requests': 'Resource Requests',
    '/notifications': 'Notifications',
    '/profile': 'User Profile',
    '/about': 'About CampusShelf',
  };

  const title = routeNames[currentPath] || 'Page Under Construction';

  return (
    <div className="bg-background min-h-screen flex flex-col text-on-surface">
      <Header activePath={currentPath} />

      <main className="flex-grow pt-24 pb-16 px-6 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded p-8 sm:p-12 shadow-sm max-w-lg w-full">
          <span className="font-label-stamp text-label-stamp uppercase tracking-widest text-primary font-bold block mb-2">
            [ CAMPUSSHELF // NAVIGATION ]
          </span>

          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-4">
            {title}
          </h1>

          <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
            This section will be fully implemented in an upcoming phase according to the approved CampusShelf roadmap.
          </p>

          <a
            href="/"
            className="inline-flex items-center gap-2 bg-primary-container text-on-secondary px-6 py-3 font-headline-sm text-headline-sm rounded shadow-sm hover:bg-primary transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">
              arrow_back
            </span>
            <span>BACK TO HOME</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;