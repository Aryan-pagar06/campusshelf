import { useMemo, useState } from 'react';
import { Header } from '../home/Header';

type NotificationCategory =
  | 'request'
  | 'wishlist'
  | 'system'
  | 'exchange';

type NotificationItem = {
  id: number;
  category: NotificationCategory;
  label: string;
  title: string;
  description: React.ReactNode;
  time: string;
  icon: string;
  iconClass: string;
  badgeClass: string;
  read: boolean;
  action?: {
    label: string;
    path: string;
    primary?: boolean;
  };
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    category: 'request',
    label: 'INCOMING REQUEST',
    title: 'New request for your resource',
    description: (
      <>
        <strong className="text-[#1b1b1e]">Neha Patil</strong> requested your
        copy of <em className="text-[#1b1b1e]">"DSA C++"</em>.
      </>
    ),
    time: '12 min ago',
    icon: 'assignment_ind',
    iconClass: 'bg-[#dde1ff] text-[#00288e]',
    badgeClass: 'bg-[#dde1ff] text-[#001453]',
    read: false,
    action: {
      label: 'View Request',
      path: '/requests',
      primary: true,
    },
  },

  {
    id: 2,
    category: 'request',
    label: 'REQUEST UPDATE',
    title: 'Request accepted',
    description: (
      <>
        Your request for <em className="text-[#1b1b1e]">"Operating Systems"</em>{' '}
        has been accepted by{' '}
        <strong className="text-[#1b1b1e]">Ishita Joshi</strong>.
      </>
    ),
    time: '1 hour ago',
    icon: 'check_circle',
    iconClass: 'bg-[#eae7eb] text-[#735c00]',
    badgeClass: 'bg-[#eae7eb] text-[#444653]',
    read: true,
    action: {
      label: 'Open Request',
      path: '/requests',
    },
  },

  {
    id: 3,
    category: 'wishlist',
    label: 'WISHLIST',
    title: 'Resource added to wishlist',
    description: (
      <>
        <em className="text-[#1b1b1e]">
          "Engineering Mathematics III Notes"
        </em>{' '}
        was added to your personal wishlist.
      </>
    ),
    time: '2 hours ago',
    icon: 'favorite',
    iconClass: 'bg-[#ffdad6]/60 text-[#bb0112]',
    badgeClass: 'bg-[#ffdad6]/50 text-[#410002]',
    read: true,
    action: {
      label: 'View in Wishlist',
      path: '/wishlist',
    },
  },

  {
    id: 4,
    category: 'wishlist',
    label: 'BACK IN STOCK',
    title: 'Your resource is now available',
    description: (
      <>
        <em className="text-[#1b1b1e]">
          "Digital Electronics Lab Manual"
        </em>{' '}
        is back in active circulation on the campus shelf.
      </>
    ),
    time: 'Yesterday',
    icon: 'notifications_active',
    iconClass: 'bg-[#00288e] text-white',
    badgeClass: 'bg-[#ffe083] text-[#231b00]',
    read: false,
    action: {
      label: 'Browse Resource',
      path: '/browse',
      primary: true,
    },
  },

  {
    id: 5,
    category: 'request',
    label: 'REQUEST UPDATE',
    title: 'Request rejected',
    description: (
      <>
        Your request for <em className="text-[#1b1b1e]">"Computer Networks"</em>{' '}
        was rejected by the owner because the item is currently shared
        elsewhere.
      </>
    ),
    time: 'Yesterday',
    icon: 'cancel',
    iconClass: 'bg-[#ffdad6] text-[#ba1a1a]',
    badgeClass: 'bg-[#eae7eb] text-[#444653]',
    read: true,
    action: {
      label: 'Search Alternative →',
      path: '/browse',
    },
  },

  {
    id: 6,
    category: 'system',
    label: 'LISTING LIVE',
    title: 'Resource listing published',
    description: (
      <>
        Your <em className="text-[#1b1b1e]">"Discrete Mathematics Notes"</em>{' '}
        listing is now officially live on CampusShelf.
      </>
    ),
    time: '2 days ago',
    icon: 'publish',
    iconClass: 'bg-[#e4e1e6] text-[#444653]',
    badgeClass: 'bg-[#eae7eb] text-[#444653]',
    read: true,
  },

  {
    id: 7,
    category: 'exchange',
    label: 'EXCHANGE PROPOSAL',
    title: 'New exchange request',
    description: (
      <>
        <strong className="text-[#1b1b1e]">Aditya Shah</strong> wants to
        exchange a resource with you (Physics Volume 1).
      </>
    ),
    time: '3 days ago',
    icon: 'swap_horiz',
    iconClass: 'bg-[#ffe083] text-[#231b00]',
    badgeClass: 'bg-[#cea700]/30 text-[#574500]',
    read: false,
    action: {
      label: 'View Proposal',
      path: '/requests',
      primary: true,
    },
  },

  {
    id: 8,
    category: 'system',
    label: 'SYSTEM',
    title: 'Welcome to CampusShelf',
    description: (
      <>
        Your CampusShelf account is ready. Start exploring academic resources
        across campus.
      </>
    ),
    time: '1 week ago',
    icon: 'school',
    iconClass: 'bg-[#eae7eb] text-[#00288e]',
    badgeClass: 'bg-[#eae7eb] text-[#444653]',
    read: true,
  },
];

export function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');

  const [showEmptyState, setShowEmptyState] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const visibleNotifications = useMemo(() => {
    let result = [...notifications];

    if (filter === 'unread') {
      result = result.filter((notification) => !notification.read);
    }

    if (sort === 'oldest') {
      result.reverse();
    }

    return result;
  }, [notifications, filter, sort]);

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const handleNotificationAction = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-[#fbf8fc] text-[#1b1b1e]">
      <Header activePath="/notifications" />

      <main className="w-full pt-16">
        {/* =========================================================
            1. ARCHIVAL STRIP
        ========================================================= */}
        <div className="w-full border-b border-[#c4c5d5]/40 bg-[#f6f2f7] px-4 py-2 md:px-10">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#444653]">
                NOTIFICATIONS // CAMPUS EXCHANGE PROTOCOL
              </span>

              <span className="hidden text-[10px] text-[#c4c5d5] sm:inline">
                /
              </span>

              <span className="hidden items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#00288e] sm:flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00288e]" />
                INBOX ACTIVE
              </span>
            </div>

            <span className="hidden font-mono text-[10px] uppercase tracking-wider text-[#444653] md:inline">
              CAMPUS NODE // ACTIVE
            </span>
          </div>
        </div>

        {/* =========================================================
            2. HERO
        ========================================================= */}
        <section className="relative mx-auto w-full max-w-[1280px] overflow-hidden px-4 pb-8 pt-8 md:px-10 md:pb-10 md:pt-12">
          {/* Doodles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-3 select-none opacity-20 md:right-16 md:top-6"
          >
            <svg
              className="h-[150px] w-[190px] text-[#00288e] md:h-[180px] md:w-[220px]"
              fill="none"
              viewBox="0 0 220 180"
            >
              {/* Bell */}
              <path
                d="M140 40 C140 25, 160 25, 160 40 C160 55, 172 65, 178 75 C182 82, 175 88, 165 88 L135 88 C125 88, 118 82, 122 75 C128 65, 140 55, 140 40 Z"
                stroke="currentColor"
                strokeDasharray="3 1"
                strokeWidth="1.4"
              />

              <path
                d="M145 88 C145 93, 155 93, 155 88"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.4"
              />

              {/* Pencil */}
              <path
                d="M40 120 L80 145 L76 153 L36 128 Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />

              {/* Stars */}
              <path
                d="M190 20 L193 28 L201 31 L193 34 L190 42 L187 34 L179 31 L187 28 Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />

              <path
                d="M70 45 L72 50 L77 52 L72 54 L70 59 L68 54 L63 52 L68 50 Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />

              {/* Paper-plane path */}
              <path
                d="M30 30 Q70 10, 110 35 T170 30"
                stroke="currentColor"
                strokeDasharray="4 4"
                strokeWidth="1.4"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded bg-[#dde1ff]/70 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#00288e]">
                // YOUR CAMPUSSHELF INBOX
              </span>

              <span className="hidden font-mono text-[10px] uppercase tracking-widest text-[#444653] sm:inline">
                LIVE ACTIVITY
              </span>
            </div>

            <h1 className="font-['Space_Grotesk'] text-4xl font-bold leading-tight tracking-tight text-[#1b1b1e] md:text-6xl">
              YOUR NOTIFICATIONS.
              <br className="hidden sm:inline" />
              <span className="relative inline-block text-[#00288e]">
                STAY IN THE LOOP.
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-2.5 left-0 h-3.5 w-full text-[#00288e]"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 280 14"
                >
                  <path
                    d="M2 9.5C65 4.5 140 3.5 278 8.5C210 11.5 90 12 20 12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-5 max-w-2xl font-['Plus_Jakarta_Sans'] text-base leading-7 text-[#444653] md:text-lg">
              Requests, peer updates, wishlist alerts, and vital CampusShelf
              exchanges — all cataloged in one dedicated feed.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex rotate-[-1deg] items-center gap-2 rounded-lg border border-[#cea700]/30 bg-[#ffe083]/80 px-3 py-1.5 text-sm font-medium text-[#231b00] shadow-sm">
                <span className="material-symbols-outlined text-[18px]">
                  edit_note
                </span>
                <span>don’t miss the good stuff</span>
              </div>

              <div className="hidden items-center gap-1 text-[#00288e] sm:flex">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                  FOLLOW FEED
                </span>

                <span className="material-symbols-outlined animate-bounce text-[20px]">
                  south
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. SUMMARY + CONTROLS
        ========================================================= */}
        <section className="mx-auto mb-6 w-full max-w-[1280px] px-4 md:px-10">
          <div className="flex flex-col justify-between gap-6 rounded-xl border border-[#c4c5d5]/30 bg-white p-4 shadow-sm md:p-6 lg:flex-row lg:items-center">
            {/* Stats */}
            <div className="flex items-center gap-6 divide-x divide-[#c4c5d5]/40">
              <div className="pr-6">
                <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#444653]">
                  Total Ledger
                </span>

                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#1b1b1e]">
                    {notifications.length}
                  </span>

                  <span className="font-mono text-[10px] uppercase text-[#444653]">
                    ENTRIES
                  </span>
                </div>
              </div>

              <div className="pl-6">
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#00288e]">
                  <span className="h-2 w-2 rounded-full bg-[#bb0112]" />
                  Action Required
                </span>

                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#bb0112]">
                    {unreadCount}
                  </span>

                  <span className="font-mono text-[10px] uppercase text-[#444653]">
                    UNREAD
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2 border-t border-[#c4c5d5]/20 pt-3 lg:border-t-0 lg:pt-0">
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#444653] transition hover:bg-[#f0edf1] hover:text-[#00288e]"
              >
                <span className="material-symbols-outlined text-[18px]">
                  done_all
                </span>
                Mark all as read
              </button>

              {/* Filter */}
              <div className="inline-flex rounded-lg bg-[#f0edf1] p-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className={`rounded px-3 py-1.5 transition ${
                    filter === 'all'
                      ? 'bg-white font-bold text-[#00288e] shadow-sm'
                      : 'text-[#444653] hover:text-[#1b1b1e]'
                  }`}
                >
                  All ({notifications.length})
                </button>

                <button
                  type="button"
                  onClick={() => setFilter('unread')}
                  className={`rounded px-3 py-1.5 transition ${
                    filter === 'unread'
                      ? 'bg-white font-bold text-[#00288e] shadow-sm'
                      : 'text-[#444653] hover:text-[#1b1b1e]'
                  }`}
                >
                  Unread ({unreadCount})
                </button>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  aria-label="Sort notifications"
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value as 'newest' | 'oldest')
                  }
                  className="cursor-pointer appearance-none rounded-lg border border-[#c4c5d5]/60 bg-white px-3 py-1.5 pr-8 font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#1b1b1e] outline-none focus:border-[#00288e]"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="oldest">Sort: Oldest First</option>
                </select>

                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-[#444653]">
                  expand_more
                </span>
              </div>

              {/* Demo empty-state toggle */}
              <button
                type="button"
                onClick={() => setShowEmptyState((current) => !current)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[#c4c5d5] px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#444653] transition hover:border-[#00288e] hover:text-[#00288e]"
              >
                <span className="material-symbols-outlined text-[16px]">
                  visibility
                </span>
                {showEmptyState ? 'Show Notifications' : 'Simulate Empty'}
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================
            4. NOTIFICATION LIST
        ========================================================= */}
        <section className="mx-auto mb-12 w-full max-w-[1280px] px-4 md:px-10">
          {!showEmptyState && visibleNotifications.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-[#c4c5d5]/30 bg-white shadow-sm">
              {visibleNotifications.map((notification) => (
                <article
                  key={notification.id}
                  className={`flex flex-col justify-between gap-4 border-b border-[#c4c5d5]/40 p-4 transition last:border-b-0 hover:bg-[#f6f2f7]/60 md:flex-row md:items-start md:p-6 ${
                    !notification.read ? 'bg-[#dde1ff]/10' : ''
                  }`}
                >
                  <div className="flex min-w-0 w-full items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${notification.iconClass}`}
                    >
                      <span className="material-symbols-outlined text-[24px]">
                        {notification.icon}
                      </span>

                      {!notification.read && (
                        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#bb0112] ring-2 ring-white" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${notification.badgeClass}`}
                        >
                          {notification.label}
                        </span>

                        <span className="font-mono text-[11px] text-[#444653]">
                          {notification.time}
                        </span>
                      </div>

                      <h2
                        className={`font-['Space_Grotesk'] text-lg text-[#1b1b1e] ${
                          notification.read
                            ? 'font-semibold'
                            : 'font-bold'
                        }`}
                      >
                        {notification.title}
                      </h2>

                      <p className="font-['Plus_Jakarta_Sans'] text-sm leading-6 text-[#444653]">
                        {notification.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex w-full shrink-0 items-center justify-between gap-2 pt-1 sm:justify-end md:w-auto md:flex-col md:items-end md:justify-start">
                    {notification.action && (
                      <button
                        type="button"
                        onClick={() => {
                          markAsRead(notification.id);
                          handleNotificationAction(
                            notification.action!.path
                          );
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-['Plus_Jakarta_Sans'] text-xs font-semibold transition ${
                          notification.action.primary
                            ? 'bg-[#00288e] text-white shadow-sm hover:bg-[#1e40af]'
                            : 'border border-[#c4c5d5]/60 text-[#00288e] hover:border-[#00288e] hover:bg-[#f6f2f7]'
                        }`}
                      >
                        {notification.action.label}

                        <span className="material-symbols-outlined text-[16px]">
                          arrow_forward
                        </span>
                      </button>
                    )}

                    {!notification.read && (
                      <button
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                        className="font-mono text-[10px] uppercase tracking-wider text-[#757684] transition hover:text-[#00288e]"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* =======================================================
              EMPTY STATE
          ======================================================= */}
          {(showEmptyState || visibleNotifications.length === 0) && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#c4c5d5] bg-white px-6 py-16 text-center md:py-20">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#eae7eb] text-[#00288e]">
                <span className="material-symbols-outlined text-[44px]">
                  notifications_paused
                </span>
              </div>

              <span className="mb-2 rounded bg-[#dde1ff]/70 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#00288e]">
                ZERO UNRESOLVED ALERTS
              </span>

              <h2 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-[#1b1b1e]">
                ALL CAUGHT UP.
              </h2>

              <p className="mt-2 max-w-md font-['Plus_Jakarta_Sans'] text-sm leading-6 text-[#444653]">
                You're clear for now. New requests, wishlist notifications,
                and peer exchanges will appear here.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleNotificationAction('/browse')}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#00288e] px-5 py-2.5 font-['Plus_Jakarta_Sans'] text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e40af]"
                >
                  BROWSE RESOURCES

                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>

                {showEmptyState && (
                  <button
                    type="button"
                    onClick={() => setShowEmptyState(false)}
                    className="rounded-lg border border-[#c4c5d5]/60 px-4 py-2 font-['Plus_Jakarta_Sans'] text-sm font-semibold text-[#1b1b1e] transition hover:bg-[#f0edf1]"
                  >
                    Restore List View
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        {/* =========================================================
            5. CTA
        ========================================================= */}
        <section className="relative w-full overflow-hidden bg-[#00288e] py-10 text-white md:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-10"
          >
            <svg
              className="h-full w-full"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 1200 240"
            >
              <rect
                height="90"
                rx="4"
                transform="rotate(-12 80 40)"
                width="70"
                x="80"
                y="40"
              />

              <line x1="88" x2="135" y1="55" y2="45" />
              <line x1="90" x2="137" y1="70" y2="60" />

              <path d="M1020 60 L1025 75 L1040 80 L1025 85 L1020 100 L1015 85 L1000 80 L1015 75 Z" />

              <path
                d="M600 20 C640 40, 680 40, 720 20"
                strokeDasharray="6 6"
              />

              <circle cx="1120" cy="160" r="28" strokeDasharray="4 4" />
            </svg>
          </div>

          <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-10">
            <div className="max-w-xl text-center md:text-left">
              <div className="mb-2 inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#ffe083]" />

                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#dde1ff]">
                  CAMPUS ACADEMIC COMMONS
                </span>
              </div>

              <h2 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight">
                KEEP EXPLORING.
              </h2>

              <p className="mt-1 font-['Plus_Jakarta_Sans'] text-sm leading-6 text-[#dde1ff]/80">
                Find your next textbook, notes, lab manual, or academic
                resource across campus.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleNotificationAction('/browse')}
                className="inline-flex items-center gap-2 rounded-lg bg-[#ffe083] px-6 py-3 font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#231b00] shadow-md transition hover:bg-[#eec200] hover:-translate-y-0.5"
              >
                BROWSE RESOURCES

                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleNotificationAction('/list-resource')}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 font-['Plus_Jakarta_Sans'] text-sm font-semibold text-white transition hover:bg-white/10"
              >
                List a Resource
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================
            6. FOOTER
        ========================================================= */}
        <footer className="w-full bg-white shadow-[0_-1px_6px_rgba(0,0,0,0.03)]">
          <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-10">
            <div className="flex flex-col justify-between gap-8 pb-8 md:flex-row md:items-start">
              <div className="max-w-sm space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00288e] text-white">
                    <span className="material-symbols-outlined text-[16px]">
                      school
                    </span>
                  </div>

                  <span className="font-['Space_Grotesk'] text-lg font-bold text-[#00288e]">
                    CampusShelf
                  </span>
                </div>

                <p className="pt-1 font-['Plus_Jakarta_Sans'] text-base font-medium text-[#1b1b1e]">
                  Find it. Share it. Pass it on.
                </p>

                <p className="font-['Plus_Jakarta_Sans'] text-sm leading-5 text-[#444653]">
                  Collegiate academic exchange for textbooks, notes, lab
                  manuals, and course materials.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-12 gap-y-6 font-['Plus_Jakarta_Sans'] text-sm">
                <div className="flex flex-col gap-2">
                  <span className="pb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#444653]">
                    Index
                  </span>

                  <button
                    onClick={() => handleNotificationAction('/browse')}
                    className="text-left text-[#444653] transition hover:text-[#00288e]"
                  >
                    Browse
                  </button>

                  <button
                    onClick={() =>
                      handleNotificationAction('/list-resource')
                    }
                    className="text-left text-[#444653] transition hover:text-[#00288e]"
                  >
                    List Resource
                  </button>

                  <button
                    onClick={() => handleNotificationAction('/wishlist')}
                    className="text-left text-[#444653] transition hover:text-[#00288e]"
                  >
                    Wishlist
                  </button>

                  <button
                    onClick={() => handleNotificationAction('/requests')}
                    className="text-left text-[#444653] transition hover:text-[#00288e]"
                  >
                    Requests
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="pb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#444653]">
                    CampusShelf
                  </span>

                  <button
                    onClick={() => handleNotificationAction('/about')}
                    className="text-left text-[#444653] transition hover:text-[#00288e]"
                  >
                    About
                  </button>

                  <button
                    onClick={() =>
                      handleNotificationAction('/notifications')
                    }
                    className="text-left text-[#444653] transition hover:text-[#00288e]"
                  >
                    Notifications
                  </button>

                  <button
                    onClick={() => handleNotificationAction('/profile')}
                    className="text-left text-[#444653] transition hover:text-[#00288e]"
                  >
                    Academic Profile
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-2 border-t border-[#c4c5d5]/40 pt-5 font-['Plus_Jakarta_Sans'] text-xs text-[#444653] sm:flex-row">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#cea700]" />
                <span>© 2025 CampusShelf. Crafted for academic communities.</span>
              </div>

              <span className="font-mono text-[10px] uppercase tracking-widest text-[#757684]">
                VER. 1.0.0 // CAMPUS
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}