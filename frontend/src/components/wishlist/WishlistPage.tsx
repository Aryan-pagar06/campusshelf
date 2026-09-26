import { useEffect, useMemo, useState } from 'react';
import { Header } from '../home/Header';
import { Footer } from '../home/Footer';
import { navigateTo } from '../../lib/navigation';

type DealType = 'sale' | 'rent' | 'exchange' | 'free';

interface WishlistResource {
  id: string;
  title: string;
  category: string;
  program: string;
  course: string;
  description: string;
  owner: string;
  ownerInitial: string;
  timeAgo: string;
  dealType: DealType;
  dealLabel: string;
  price: number;
  priceDisplay: string;
  resourceId: string;
  image: string;
  badge?: string;
  note: string;
}

const STORAGE_KEY = 'campusshelf-wishlist-v1';

const DEMO_RESOURCES: WishlistResource[] = [
  {
    id: 'item-1',
    title: 'Clean Code — Robert C. Martin',
    category: 'Textbooks',
    program: 'B.Tech',
    course: 'CSE',
    description:
      'Gently used copy with highlighted chapters on refactoring and clean pages. All diagrams intact.',
    owner: 'Rohan',
    ownerInitial: 'R',
    timeAgo: '2 days ago',
    dealType: 'sale',
    dealLabel: 'FOR SALE · ₹450',
    price: 450,
    priceDisplay: '₹450',
    resourceId: '#BK-4401',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzdZfh7CDk70e5JAGhylpn_avPeykb0IX5OOWndNoq1AqBVeL5jJofFyz44pFPKWolnmLnsPLex1mjKi8j5muB3xN86afjSCnTFBFdBeLGQXk8pdrKJheu72bl9CHiH5BJdGy4er8RWQRvWJc0wr_xsebj4qrfQM_bgCbn_Bj1eDS04n9myb7srXFYL-DYBCa1g5hTX8sOcP8KPUMOuE8NFmmV75KqMw1FF2ithmKLJ_pyW-z4QOY',
    badge: 'CSE 301',
    note: 'worth checking ✦',
  },
  {
    id: 'item-2',
    title: 'Data Structures Complete Notes',
    category: 'Notes',
    program: 'B.Tech',
    course: 'CSE',
    description:
      'Handwritten class notes covering AVL trees, graph traversals, Quicksort derivations, and amortized complexity.',
    owner: 'Neha',
    ownerInitial: 'N',
    timeAgo: '4 days ago',
    dealType: 'free',
    dealLabel: 'FREE RESOURCE · ₹0',
    price: 0,
    priceDisplay: 'Free',
    resourceId: '#NT-9082',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJR3sz08qyKC87lxqMtA5Zm40k3U-tuXtv0H0mAHpkdrWjTWDbmR4kRwCeUoaIdrxVHH2ESJSE54Ekzcs-UVR-RKLxMBKTxw8c-sl1KCXYrHzWUy-Vj0oCwoKJsrD0c_-_LzbtexNFmBHEnitE8jyFnHhTWM6KrGC9BSZQRWzwTWaZqoV4GBuIk8E15dPsUaddNYJut_OpY76nmeLL9i8K9iTVWSu1MK7oM9AZvmzgEF5MTjNI9ro',
    badge: 'COMMUNITY',
    note: 'saved 4 days ago',
  },
  {
    id: 'item-3',
    title: 'Morrison & Boyd Organic Chemistry',
    category: 'Reference Books',
    program: 'B.Pharm',
    course: 'Med Chem',
    description:
      'Well-maintained reference copy with minimal markings. Useful reference for chemical synthesis modules.',
    owner: 'Isha',
    ownerInitial: 'I',
    timeAgo: '5 days ago',
    dealType: 'rent',
    dealLabel: 'RENT · ₹200 / TERM',
    price: 200,
    priceDisplay: '₹200 / term',
    resourceId: '#RF-1120',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAx7ayt4JTOiUGc2Nv3FhiUF0a62USIoZmp4YqaNgeHbs5XcWpTajTQyMbp3z0OOMGfnPRPaSvrT0KiNCnufGMCP8Dc86hRRABwTjOS04Aow3xKjEtiUW5pGiN44NnGRN86g4fs_u4ja79fdZ1t5DTYXoHJEj5DFSQ191z1SsDhYgcMKUJvEUD6cRDRQJESElwgmKyCKF3s8n27MK7GQU-yUS0M1ZktTi8UPBIIkWP4ZBfyzLHIV78',
    note: 'check rental terms →',
  },
  {
    id: 'item-4',
    title: 'Engineering Mathematics III — PYQs',
    category: 'PYQs',
    program: 'B.Tech',
    course: 'Engineering',
    description:
      'Previous-year university examination papers compiled with topic annotations and Laplace transform solutions.',
    owner: 'Aditya',
    ownerInitial: 'A',
    timeAgo: '1 week ago',
    dealType: 'exchange',
    dealLabel: 'EXCHANGE · FOR DISCRETE MATH',
    price: 0,
    priceDisplay: 'Exchange',
    resourceId: '#PQ-2030',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBOpgFiEIoOLc2TwOyuqlzeUjkIpeudykGaF1XqRZajrfIyhG-Ffyw1iRvSTMP2mENlry1r-Kgp2jyTIq-GeT6bnm2ElsPe1rPJJO6bjR0hQRRvrvyhm1mnCgIsKNyzCY4W4XEqyacQTPu5DUE6bHwyEsc0B2Qjm_GY7uSMnvWZXg2EJuaDEMwc1ccCUo8DVKyFiPBKBo2N-dwcQZ_JiQVzhpb_oNA1NxP9lYkHziuax0x4abrUqwI',
    badge: '5 YEARS',
    note: 'still available ✦',
  },
  {
    id: 'item-5',
    title: 'Digital Electronics Lab Manual',
    category: 'Lab Manuals',
    program: 'B.Tech',
    course: 'ECE',
    description:
      'Complete practical file record with circuit diagrams, truth tables, and oscilloscope observations.',
    owner: 'Mehul',
    ownerInitial: 'M',
    timeAgo: '1 week ago',
    dealType: 'sale',
    dealLabel: 'FOR SALE · ₹150',
    price: 150,
    priceDisplay: '₹150',
    resourceId: '#LM-6712',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcRcAIDdT4nE9pGUTyVLYeHPojlZVmVUikVCsf1xVRC2mq0YSQrIFZVLdz_2G6pYI8rEDO-XLXO59HGKqZD-lHEjMGM2Of5TDHAlSb5vXNspt4WNW-6qRZbp6jq8SubAmJMySvdu2j8Bw_-OPww2n7qzda30FLSVN-r39sml8jjDWyhGycx8JQQTMaehFON9sYscmMkuRE8UquN9Z_zDLj5_xiRaL1h8IwaWx_ucSTda1-FIhJSlM',
    note: 'good condition ✦',
  },
  {
    id: 'item-6',
    title: 'Scientific Calculator — Casio FX-991ES Plus',
    category: 'Materials / Stationery',
    program: 'B.Tech',
    course: 'Engineering',
    description:
      'Fully working collegiate calculator with fresh batteries and hard protective cover.',
    owner: 'Kunal',
    ownerInitial: 'K',
    timeAgo: '2 weeks ago',
    dealType: 'sale',
    dealLabel: 'FOR SALE · ₹700',
    price: 700,
    priceDisplay: '₹700',
    resourceId: '#HW-7731',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDF1YfrhX-3ucmt2iAczJgBICJRXawzo-F-esijtuXCjvdwIvm-T63T2Bvqf7SRgILrU9_bPB8jK4gKZOGTvnEIeoKIZOM61AKD2bzhxAYCw7c2cGrcabrKRVTR6sr2DN_vunCVOICDyHfFZ32hHQ2hXGcKOw6GcAVsQoW1JRaQXNZ27L6t0bkNwf1Ey8647H5B04Cqdm6P86UkN_jN1wUEmfk4KpRuPQjWWlpcpuyu7WJOAvY502Y',
    note: 'useful for exam hall →',
  },
];

const FILTERS: { key: 'all' | DealType; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'sale', label: 'FOR SALE' },
  { key: 'rent', label: 'RENT' },
  { key: 'exchange', label: 'EXCHANGE' },
  { key: 'free', label: 'FREE RESOURCE' },
];

function getInitialWishlist(): WishlistResource[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return DEMO_RESOURCES;
    }

    const savedIds = JSON.parse(saved) as string[];

    return DEMO_RESOURCES.filter((resource) =>
      savedIds.includes(resource.id),
    );
  } catch {
    return DEMO_RESOURCES;
  }
}

function saveWishlist(resources: WishlistResource[]) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(resources.map((resource) => resource.id)),
    );
  } catch {
    // Ignore localStorage errors in demo mode.
  }
}

export function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistResource[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | DealType>('all');
  const [sortBy, setSortBy] = useState<
    'recent' | 'price-asc' | 'price-desc' | 'requested'
  >('recent');
  const [showEmptyPreview, setShowEmptyPreview] = useState(false);
  const [showRemovedMessage, setShowRemovedMessage] = useState(false);

  useEffect(() => {
    setWishlist(getInitialWishlist());
  }, []);

  useEffect(() => {
    if (wishlist.length > 0) {
      saveWishlist(wishlist);
    }
  }, [wishlist]);

  const filteredResources = useMemo(() => {
    let resources = [...wishlist];

    if (activeFilter !== 'all') {
      resources = resources.filter(
        (resource) => resource.dealType === activeFilter,
      );
    }

    switch (sortBy) {
      case 'price-asc':
        resources.sort((a, b) => a.price - b.price);
        break;

      case 'price-desc':
        resources.sort((a, b) => b.price - a.price);
        break;

      case 'requested':
        // Demo ordering. Backend request counts can replace this later.
        resources.sort((a, b) => {
          const aScore = a.dealType === 'sale' ? 4 : a.dealType === 'free' ? 3 : 2;
          const bScore = b.dealType === 'sale' ? 4 : b.dealType === 'free' ? 3 : 2;
          return bScore - aScore;
        });
        break;

      case 'recent':
      default:
        break;
    }

    return resources;
  }, [wishlist, activeFilter, sortBy]);

  const removeFromWishlist = (id: string) => {
    setWishlist((current) => current.filter((resource) => resource.id !== id));

    setShowRemovedMessage(true);

    window.setTimeout(() => {
      setShowRemovedMessage(false);
    }, 1800);
  };

  const resetWishlist = () => {
    setWishlist(DEMO_RESOURCES);
    setActiveFilter('all');
    setShowEmptyPreview(false);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(DEMO_RESOURCES.map((resource) => resource.id)),
      );
    } catch {
      // Ignore localStorage errors.
    }
  };

  const browseResources = () => {
    navigateTo('/browse');
  };

  const getFilterCount = (filter: 'all' | DealType) => {
    if (filter === 'all') {
      return wishlist.length;
    }

    return wishlist.filter((resource) => resource.dealType === filter).length;
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Header activePath="wishlist" />

      <main className="w-full pt-16">
        {/* Archival Header Strip */}
        <div className="w-full bg-surface-container-high py-2 px-4 lg:px-10 border-b border-outline-variant/30 flex items-center justify-between text-on-surface-variant font-label-stamp text-label-stamp uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse" />
            <span>INDEX // USER_ARCHIVE</span>
            <span className="hidden sm:inline text-outline">•</span>
            <span className="hidden sm:inline">CAMPUS RESOURCE SHELF</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline">
              SAVED ON THIS DEVICE
            </span>
            <span className="bg-surface px-2 py-0.5 rounded text-on-surface font-semibold">
              ACTIVE
            </span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative w-full max-w-7xl mx-auto px-4 lg:px-10 pt-8 pb-6 overflow-hidden">
          {/* Decorative open book */}
          <svg
            className="absolute top-4 right-12 w-28 h-28 text-outline-variant/35 -rotate-12 pointer-events-none hidden lg:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 100 100"
          >
            <path d="M15 70 C30 65 45 68 50 78 C55 68 70 65 85 70 L85 30 C70 25 55 28 50 38 C45 28 30 25 15 30 Z" />
            <path d="M50 38 L50 78" />
            <path d="M22 40 C30 38 40 40 45 44" strokeDasharray="2 2" />
            <path d="M55 44 C60 40 70 38 78 40" strokeDasharray="2 2" />
            <path
              d="M88 15 L90 22 L97 24 L90 26 L88 33 L86 26 L79 24 L86 22 Z"
              fill="currentColor"
            />
          </svg>

          <svg
            className="absolute bottom-2 left-6 w-20 h-20 text-outline-variant/40 rotate-6 pointer-events-none hidden md:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 80 80"
          >
            <polygon points="10,70 60,70 10,20" />
            <polygon points="18,64 48,64 18,34" strokeDasharray="2 2" />
            <path d="M52 20 L68 36 L62 42 L46 26 Z" />
            <path d="M46 26 L40 20 L46 14 L52 20" />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-on-surface-variant font-label-stamp text-label-stamp uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  bookmark
                </span>
                <span>// SAVED FOR LATER • ARCHIVE SHELF</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-display-lg font-headline-lg text-on-surface tracking-tight leading-tight">
                YOUR WISHLIST.
                <br />
                <span className="text-primary relative inline-block">
                  WORTH KEEPING.
                  <svg
                    className="absolute -bottom-2.5 left-0 w-full h-3 text-primary"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 250 12"
                  >
                    <path
                      d="M3 8C60 2 180 3 247 9"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                </span>
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-2">
                Keep the resources you are interested in close by. When
                you&apos;re ready, open a resource and send a request to the
                owner.
              </p>

              <div className="flex items-center gap-2 mt-1 text-primary">
                <svg
                  className="w-8 h-6 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 40 24"
                >
                  <path d="M2 18 C12 6 26 8 36 12" strokeLinecap="round" />
                  <path
                    d="M30 6 L37 12 L31 18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="font-label-stamp text-label-stamp italic tracking-wide">
                  Save good finds now // decide later ✦
                </span>
              </div>
            </div>

            {/* Sticky Note */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end pt-1">
              <div className="relative bg-tertiary-fixed text-on-tertiary-fixed p-4 rounded shadow-md transform rotate-2 hover:rotate-0 transition-transform duration-300 max-w-xs w-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-surface-container-highest/80 backdrop-blur-sm -rotate-2 rounded shadow-sm" />

                <div className="flex items-center justify-between pb-2 border-b border-on-tertiary-fixed/20 font-label-stamp text-label-stamp uppercase tracking-wider">
                  <span>MEMO: CS-NOTES</span>
                  <span>WISHLIST ✦</span>
                </div>

                <p className="font-headline-sm text-headline-sm font-bold tracking-tight mt-2 uppercase leading-snug">
                  &quot;GOOD FINDS SHOULDN&apos;T GET LOST.&quot;
                </p>

                <p className="font-body-sm text-body-sm mt-2 text-on-tertiary-fixed/80">
                  Save useful books, notes, PYQs and academic materials for
                  when you actually need them.
                </p>

                <div className="mt-3 pt-2 border-t border-on-tertiary-fixed/15 flex items-center justify-between font-label-stamp text-label-stamp">
                  <span className="tracking-widest">ARCHIVE</span>
                  <span className="bg-on-tertiary-fixed text-tertiary-fixed px-1.5 py-0.5 rounded">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="w-full max-w-7xl mx-auto px-4 lg:px-10 mb-6">
          <div className="bg-surface-container-lowest p-4 rounded border border-outline-variant/60 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse inline-block" />

                <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
                  YOUR SAVED RESOURCES
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="bg-primary/10 text-primary font-label-stamp text-label-stamp px-2 py-0.5 rounded uppercase">
                  {wishlist.length} RESOURCES SAVED
                </span>

                <span className="text-outline-variant">•</span>

                <span className="text-body-sm text-on-surface-variant">
                  Saved locally
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
              {/* Sort */}
              <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1.5 rounded border border-outline-variant/40">
                <span className="font-label-stamp text-label-stamp uppercase text-on-surface-variant">
                  SORT:
                </span>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(
                      event.target.value as
                        | 'recent'
                        | 'price-asc'
                        | 'price-desc'
                        | 'requested',
                    )
                  }
                  className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer"
                >
                  <option value="recent">Recently Saved</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="requested">Most Requested</option>
                </select>
              </div>

              {/* Active / Empty Preview */}
              <div className="flex items-center bg-surface-container-high p-1 rounded border border-outline-variant/50">
                <button
                  type="button"
                  onClick={() => setShowEmptyPreview(false)}
                  className={`font-label-stamp text-label-stamp px-2.5 py-1 rounded transition-all shadow-sm ${
                    !showEmptyPreview
                      ? 'bg-primary text-on-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  ACTIVE ({wishlist.length})
                </button>

                <button
                  type="button"
                  onClick={() => setShowEmptyPreview(true)}
                  className={`font-label-stamp text-label-stamp px-2.5 py-1 rounded transition-all ${
                    showEmptyPreview
                      ? 'bg-primary text-on-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  PREVIEW EMPTY
                </button>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1">
            {FILTERS.map((filter) => {
              const active = activeFilter === filter.key;
              const count = getFilterCount(filter.key);

              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter.key);
                    setShowEmptyPreview(false);
                  }}
                  className={`font-label-stamp text-label-stamp uppercase px-3 py-1.5 rounded whitespace-nowrap transition-all ${
                    active
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/50'
                  }`}
                >
                  {filter.label} ({count})
                </button>
              );
            })}
          </div>
        </section>

        {/* Removed Message */}
        {showRemovedMessage && (
          <div className="fixed right-5 bottom-5 z-[70] bg-on-surface text-surface px-4 py-3 rounded shadow-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">
              bookmark_remove
            </span>
            <span className="font-label-md text-label-md">
              Removed from wishlist
            </span>
          </div>
        )}

        {/* Empty Preview */}
        {showEmptyPreview ? (
          <EmptyWishlistState
            onBrowse={browseResources}
            onReset={resetWishlist}
          />
        ) : wishlist.length === 0 ? (
          <EmptyWishlistState
            onBrowse={browseResources}
            onReset={resetWishlist}
          />
        ) : (
          <section className="w-full max-w-7xl mx-auto px-4 lg:px-10 pb-12">
            {filteredResources.length === 0 ? (
              <div className="bg-surface-container-lowest border border-outline-variant/60 rounded p-10 text-center">
                <span className="material-symbols-outlined text-primary text-4xl">
                  filter_alt_off
                </span>

                <h2 className="font-headline-sm text-headline-sm font-bold mt-3">
                  NOTHING IN THIS CATEGORY.
                </h2>

                <p className="text-body-sm text-on-surface-variant mt-1">
                  Try another wishlist filter.
                </p>

                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className="mt-4 bg-primary text-on-primary px-4 py-2 rounded font-label-lg"
                >
                  SHOW ALL
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <WishlistCard
                    key={resource.id}
                    resource={resource}
                    onRemove={removeFromWishlist}
                    onView={browseResources}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Bottom Banner */}
        <section className="w-full max-w-7xl mx-auto px-4 lg:px-10 pb-12">
          <div className="relative bg-primary text-on-primary p-6 lg:p-10 rounded shadow-lg overflow-hidden border border-primary-container">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex flex-col gap-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-label-stamp text-label-stamp uppercase px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-bold rounded tracking-wider">
                    CAMPUS EXCHANGE
                  </span>

                  <span className="text-on-primary-container font-label-stamp text-label-stamp">
                    WISHLIST
                  </span>
                </div>

                <h2 className="text-3xl md:text-headline-lg font-headline-lg font-bold tracking-tight text-on-primary uppercase leading-tight mt-2">
                  FOUND SOMETHING YOU NEED?
                </h2>

                <p className="font-body-md text-body-md text-on-primary-container/90 mt-1">
                  Open the resource, send a request, and coordinate with the
                  owner after the request is accepted. CampusShelf does not
                  process payments inside the platform.
                </p>

                <div className="flex items-center gap-2 text-on-primary font-label-stamp text-label-stamp pt-2">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
                    bookmark
                  </span>

                  <span>
                    Keep useful resources close until you&apos;re ready to act.
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto flex-shrink-0">
                <button
                  type="button"
                  onClick={browseResources}
                  className="inline-flex items-center justify-center gap-2 font-label-lg text-label-lg px-6 py-3 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold hover:bg-tertiary-fixed-dim transition-colors shadow-sm text-center"
                >
                  BROWSE MORE FINDS
                  <span className="material-symbols-outlined text-[18px]">
                    travel_explore
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('/list-resource')}
                  className="inline-flex items-center justify-center gap-1 font-label-md text-label-md px-4 py-2 rounded bg-primary-container/70 text-on-primary border border-on-primary-container/30 hover:bg-primary-container transition-colors text-center"
                >
                  LIST YOUR OWN RESOURCE
                  <span className="material-symbols-outlined text-[16px]">
                    add
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

interface WishlistCardProps {
  resource: WishlistResource;
  onRemove: (id: string) => void;
  onView: () => void;
}

function WishlistCard({
  resource,
  onRemove,
  onView,
}: WishlistCardProps) {
  return (
    <article className="group bg-surface-container-lowest rounded border border-outline-variant/60 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Image */}
        <div className="relative w-full h-52 bg-surface-container-low overflow-hidden">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Category */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap max-w-[75%]">
            <span className="font-label-stamp text-label-stamp uppercase px-2 py-0.5 bg-surface/95 backdrop-blur text-primary border border-outline-variant/40 rounded shadow-sm">
              {resource.category}
            </span>

            {resource.badge && (
              <span className="font-label-stamp text-label-stamp uppercase px-1.5 py-0.5 bg-primary-container text-on-primary-container rounded">
                {resource.badge}
              </span>
            )}
          </div>

          {/* Heart */}
          <button
            type="button"
            aria-label={`Remove ${resource.title} from wishlist`}
            onClick={() => onRemove(resource.id)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur text-secondary hover:bg-surface hover:scale-110 transition-all flex items-center justify-center shadow-sm"
          >
            <span
              className="material-symbols-outlined text-[19px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
          </button>

          {/* Deal */}
          <div className="absolute bottom-3 left-3">
            <span
              className={`font-label-stamp text-label-stamp uppercase px-2 py-1 font-bold rounded shadow-sm ${
                resource.dealType === 'free'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-surface-container-lowest text-on-surface border border-outline-variant/60'
              }`}
            >
              {resource.dealLabel}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-1">
          <div className="flex items-center justify-between text-body-sm text-on-surface-variant gap-2">
            <span>
              {resource.program} · {resource.course}
            </span>

            <span className="text-outline font-label-stamp text-label-stamp whitespace-nowrap">
              ID: {resource.resourceId}
            </span>
          </div>

          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors leading-tight mt-1">
            {resource.title}
          </h2>

          <p className="text-body-sm text-on-surface-variant line-clamp-2 mt-1">
            {resource.description}
          </p>

          {/* Owner */}
          <div className="flex items-center gap-2 pt-2 border-t border-surface-container-high mt-2">
            <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-label-stamp text-label-stamp">
              {resource.ownerInitial}
            </div>

            <span className="font-label-md text-label-md text-on-surface-variant">
              Listed by{' '}
              <span className="font-semibold text-on-surface">
                {resource.owner}
              </span>{' '}
              • {resource.timeAgo}
            </span>
          </div>

          {/* Annotation */}
          <div className="flex items-center gap-1.5 mt-1 text-primary">
            <span className="material-symbols-outlined text-[14px]">
              arrow_forward
            </span>

            <span className="font-label-stamp text-label-stamp italic">
              {resource.note}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-surface-container-high/60 mt-1">
        <button
          type="button"
          onClick={onView}
          className="inline-flex items-center justify-center gap-1 font-label-lg text-label-lg px-4 py-2 rounded bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm w-full"
        >
          View Resource
          <span className="material-symbols-outlined text-[16px]">
            arrow_forward
          </span>
        </button>

        <button
          type="button"
          onClick={() => onRemove(resource.id)}
          title="Remove from wishlist"
          className="p-2 rounded text-on-surface-variant hover:text-secondary hover:bg-surface-container-high transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]">
            delete_outline
          </span>
        </button>
      </div>
    </article>
  );
}

interface EmptyWishlistStateProps {
  onBrowse: () => void;
  onReset: () => void;
}

function EmptyWishlistState({
  onBrowse,
  onReset,
}: EmptyWishlistStateProps) {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 lg:px-10 pb-12">
      <div className="relative bg-surface-container-lowest p-8 md:p-12 rounded border-2 border-dashed border-outline-variant/80 text-center flex flex-col items-center justify-center shadow-sm">
        <div className="absolute -top-3.5 left-8 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed font-label-stamp text-label-stamp uppercase tracking-widest rounded shadow-sm">
          BLANK DESK // ARCHIVE STATUS
        </div>

        <div className="w-24 h-24 rounded-full bg-surface-container-low flex items-center justify-center mb-4 text-primary relative">
          <svg
            className="w-14 h-14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 64 64"
          >
            <path d="M10 46 C20 42 28 44 32 50 C36 44 44 42 54 46 L54 18 C44 14 36 16 32 22 C28 16 20 14 10 18 Z" />
            <path d="M32 22 L32 50" />

            <path
              d="M32 22 L38 12 L44 22 L38 30 Z"
              fill="#bb0112"
              stroke="#bb0112"
            />

            <circle cx="21" cy="28" fill="#00288e" r="4" />
          </svg>

          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-xs">
            0
          </span>
        </div>

        <h2 className="text-3xl md:text-headline-lg font-headline-lg text-on-surface font-bold tracking-tight">
          NOTHING SAVED YET.
        </h2>

        <p className="text-body-md text-on-surface-variant max-w-md mt-1">
          Your wishlist is waiting for its first good find. Browse the campus
          shelf and save textbooks, notes, PYQs, lab manuals, or academic
          materials you want to come back to.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-2">
          <button
            type="button"
            onClick={onBrowse}
            className="inline-flex items-center gap-2 font-label-lg text-label-lg px-6 py-2.5 rounded bg-primary text-on-primary hover:bg-primary-container transition-all shadow-md"
          >
            BROWSE RESOURCES
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="font-label-lg text-label-lg px-4 py-2.5 rounded bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors border border-outline-variant/60"
          >
            RESET DEMO ITEMS
          </button>
        </div>

        <p className="font-label-stamp text-label-stamp italic text-primary mt-4">
          Start with textbooks, lecture notes, PYQs or lab manuals ✦
        </p>
      </div>
    </section>
  );
}