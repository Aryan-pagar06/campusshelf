import { useMemo, useState } from 'react';
import { Header } from '../home/Header';

type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';
type DealType = 'Sell' | 'Rent' | 'Exchange' | 'Free Resource';

interface IncomingRequest {
  id: string;
  resourceTitle: string;
  resourceCategory: string;
  resourceImage: string;
  requesterName: string;
  requesterInitials: string;
  requesterCourse: string;
  requesterYear: string;
  dealType: DealType;
  note: string;
  requestedAt: string;
  timestamp: number;
  status: RequestStatus;
  whatsappNumber: string;
  exchangeOffer?: string;
}

const initialRequests: IncomingRequest[] = [
  {
    id: 'REQ-1042',
    resourceTitle: 'Data Structures & Algorithms — C++',
    resourceCategory: 'Textbook · B.Tech',
    resourceImage:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=900&q=80',
    requesterName: 'Neha Patil',
    requesterInitials: 'NP',
    requesterCourse: 'B.Tech CSE',
    requesterYear: '2nd Year',
    dealType: 'Sell',
    note: 'Hi! I need this book for my DSA course this semester. Is it still available?',
    requestedAt: 'Today · 10:42 AM',
    timestamp: 6,
    status: 'PENDING',
    whatsappNumber: '919876543210',
  },
  {
    id: 'REQ-1039',
    resourceTitle: 'Engineering Mathematics III Notes',
    resourceCategory: 'Notes · B.Tech',
    resourceImage:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80',
    requesterName: 'Rohan Kulkarni',
    requesterInitials: 'RK',
    requesterCourse: 'B.Tech IT',
    requesterYear: '2nd Year',
    dealType: 'Free Resource',
    note: 'Would love to use these notes for exam preparation. Thank you!',
    requestedAt: 'Yesterday · 6:18 PM',
    timestamp: 5,
    status: 'PENDING',
    whatsappNumber: '919876543211',
  },
  {
    id: 'REQ-1035',
    resourceTitle: 'Digital Electronics Lab Manual',
    resourceCategory: 'Lab Manual · B.Tech',
    resourceImage:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    requesterName: 'Aditya Shah',
    requesterInitials: 'AS',
    requesterCourse: 'B.Tech E&TC',
    requesterYear: '2nd Year',
    dealType: 'Exchange',
    note: 'I can exchange this with my Microprocessor Lab Manual if you need it.',
    exchangeOffer: 'Microprocessor Lab Manual',
    requestedAt: '16 Feb · 11:20 AM',
    timestamp: 4,
    status: 'PENDING',
    whatsappNumber: '919876543212',
  },
  {
    id: 'REQ-1028',
    resourceTitle: 'Operating Systems — Galvin',
    resourceCategory: 'Reference Book · B.Tech',
    resourceImage:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80',
    requesterName: 'Ishita Joshi',
    requesterInitials: 'IJ',
    requesterCourse: 'B.Tech CSE',
    requesterYear: '3rd Year',
    dealType: 'Rent',
    note: 'I only need the book for the next few weeks for my OS assignment.',
    requestedAt: '15 Feb · 4:45 PM',
    timestamp: 3,
    status: 'ACCEPTED',
    whatsappNumber: '919876543213',
  },
  {
    id: 'REQ-1021',
    resourceTitle: 'Computer Networks — Kurose & Ross',
    resourceCategory: 'Textbook · B.Tech',
    resourceImage:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80',
    requesterName: 'Vivek More',
    requesterInitials: 'VM',
    requesterCourse: 'B.Tech CSE',
    requesterYear: '3rd Year',
    dealType: 'Sell',
    note: 'Looking for a used copy in decent condition. Please let me know.',
    requestedAt: '14 Feb · 1:10 PM',
    timestamp: 2,
    status: 'ACCEPTED',
    whatsappNumber: '919876543214',
  },
  {
    id: 'REQ-1016',
    resourceTitle: 'Discrete Mathematics Notes',
    resourceCategory: 'Notes · B.Tech',
    resourceImage:
      'https://images.unsplash.com/photo-1453738773917-9c3eff1db985?auto=format&fit=crop&w=900&q=80',
    requesterName: 'Siddharth Mehta',
    requesterInitials: 'SM',
    requesterCourse: 'B.Tech CSE',
    requesterYear: '2nd Year',
    dealType: 'Sell',
    note: 'I found another copy, so I no longer need this resource.',
    requestedAt: '13 Feb · 9:30 AM',
    timestamp: 1,
    status: 'REJECTED',
    whatsappNumber: '919876543215',
  },
];

export function RequestsPage() {
  const [requests, setRequests] =
    useState<IncomingRequest[]>(initialRequests);

  const [activeFilter, setActiveFilter] = useState<
    'ALL' | RequestStatus
  >('ALL');

  const [sortBy, setSortBy] = useState<
    'newest' | 'oldest' | 'title' | 'requester'
  >('newest');

  const [showEmptyState, setShowEmptyState] = useState(false);

  const [modal, setModal] = useState<{
    type: 'ACCEPT' | 'REJECT';
    request: IncomingRequest;
  } | null>(null);

  const counts = useMemo(() => {
    return {
      pending: requests.filter((r) => r.status === 'PENDING').length,
      accepted: requests.filter((r) => r.status === 'ACCEPTED').length,
      rejected: requests.filter((r) => r.status === 'REJECTED').length,
    };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    let filtered =
      activeFilter === 'ALL'
        ? [...requests]
        : requests.filter((request) => request.status === activeFilter);

    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => a.timestamp - b.timestamp);
        break;

      case 'title':
        filtered.sort((a, b) =>
          a.resourceTitle.localeCompare(b.resourceTitle),
        );
        break;

      case 'requester':
        filtered.sort((a, b) =>
          a.requesterName.localeCompare(b.requesterName),
        );
        break;

      case 'newest':
      default:
        filtered.sort((a, b) => b.timestamp - a.timestamp);
        break;
    }

    return filtered;
  }, [requests, activeFilter, sortBy]);

  const handleConfirmAction = () => {
    if (!modal) return;

    const newStatus: RequestStatus =
      modal.type === 'ACCEPT' ? 'ACCEPTED' : 'REJECTED';

    setRequests((current) =>
      current.map((request) =>
        request.id === modal.request.id
          ? { ...request, status: newStatus }
          : request,
      ),
    );

    setModal(null);
  };

  const getWhatsAppLink = (number: string, request: IncomingRequest) => {
    const message = encodeURIComponent(
      `Hi ${request.requesterName}, this is regarding your request for "${request.resourceTitle}" on CampusShelf.`,
    );

    return `https://wa.me/${number}?text=${message}`;
  };

  const getStatusClasses = (status: RequestStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-tertiary-fixed/70 text-on-tertiary-fixed border-tertiary-fixed';
      case 'ACCEPTED':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'REJECTED':
        return 'bg-surface-container text-on-surface-variant border-outline-variant';
    }
  };

  const getDealClasses = (dealType: DealType) => {
    switch (dealType) {
      case 'Sell':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'Rent':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Exchange':
        return 'bg-tertiary-fixed/70 text-on-tertiary-fixed border-tertiary-fixed';
      case 'Free Resource':
        return 'bg-surface-container text-on-surface-variant border-outline-variant';
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8fc] text-on-surface">
      <Header activePath="/requests" />

      <main className="pt-16">
        {/* ARCHIVAL STRIP */}
        <div className="w-full border-b border-outline-variant/60 bg-[#faf7f2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
            <span className="font-label-stamp text-xs font-bold tracking-[0.16em] text-on-surface-variant uppercase">
              REQUESTS // INCOMING
            </span>

            <span className="hidden sm:block font-label-stamp text-xs tracking-[0.12em] text-primary">
              CAMPUS EXCHANGE PROTOCOL
            </span>
          </div>
        </div>

        {/* HERO */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 bg-surface-container border border-outline-variant rounded-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  inbox
                </span>
                <span className="font-label-stamp text-xs font-bold tracking-[0.14em] uppercase">
                  YOUR REQUEST DESK
                </span>
              </div>

              <h1 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95] uppercase max-w-4xl">
                INCOMING REQUESTS.
                <br />
                <span className="text-primary relative inline-block">
                  GET IT MOVING.
                  <span className="absolute left-0 right-0 -bottom-2 h-1 bg-primary rounded-full rotate-[-1deg]" />
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base sm:text-lg text-on-surface-variant leading-relaxed">
                Review requests sent for resources you have listed.
                Accept or reject each request, then coordinate the
                hand-off directly with the requester.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded shadow-sm">
                  <span className="material-symbols-outlined text-primary text-[19px]">
                    fact_check
                  </span>
                  <span className="font-label-stamp text-xs font-bold tracking-wider">
                    REVIEW
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded shadow-sm">
                  <span className="material-symbols-outlined text-primary text-[19px]">
                    check_circle
                  </span>
                  <span className="font-label-stamp text-xs font-bold tracking-wider">
                    ACCEPT
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded shadow-sm">
                  <span className="material-symbols-outlined text-primary text-[19px]">
                    chat
                  </span>
                  <span className="font-label-stamp text-xs font-bold tracking-wider">
                    WHATSAPP
                  </span>
                </div>
              </div>
            </div>

            {/* STICKY NOTE */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="relative w-full max-w-sm bg-tertiary-fixed p-6 shadow-md rounded-sm rotate-1 hover:rotate-0 transition-transform border-t-8 border-tertiary/20">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-surface-container-highest/80 border border-outline-variant/60 shadow-sm -rotate-2" />

                <div className="flex items-center justify-between pb-3 border-b border-black/10">
                  <span className="font-label-stamp text-xs uppercase tracking-wider font-bold">
                    MEMO: REQUEST DESK
                  </span>

                  <span className="material-symbols-outlined text-[18px]">
                    push_pin
                  </span>
                </div>

                <div className="py-4 space-y-2">
                  <div className="font-headline-sm text-lg font-bold tracking-tight">
                    “GOOD RESOURCES GET ATTENTION.”
                  </div>

                  <p className="text-sm text-on-tertiary-fixed/80 leading-snug">
                    Review incoming requests promptly. Once accepted,
                    continue coordination directly through WhatsApp.
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                  <span className="bg-black/10 px-2 py-1 rounded font-label-stamp text-[10px] font-bold tracking-widest">
                    PEER EXCHANGE
                  </span>

                  <span className="font-label-stamp text-xs">
                    CS ★ #REQ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS + FILTERS */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="bg-surface-container-lowest p-4 rounded border border-outline-variant/60 shadow-sm flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-headline-sm text-xl font-semibold uppercase tracking-tight">
                Incoming Requests
              </span>

              <span className="bg-primary text-white px-2.5 py-1 rounded font-label-stamp text-xs font-bold tracking-wider">
                {requests.length} ACTIVE REQUESTS
              </span>

              <div className="h-4 w-px bg-outline-variant hidden sm:block" />

              <div className="flex items-center gap-1.5 flex-wrap font-label-stamp text-xs">
                <span className="px-2 py-1 rounded bg-tertiary-fixed/60 text-on-tertiary-fixed border border-tertiary-fixed/60">
                  {counts.pending} PENDING
                </span>

                <span className="px-2 py-1 rounded bg-primary/10 text-primary font-bold border border-primary/20">
                  {counts.accepted} ACCEPTED
                </span>

                <span className="px-2 py-1 rounded bg-surface-container text-on-surface-variant border border-outline-variant/40">
                  {counts.rejected} REJECTED
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* FILTER */}
              <div className="flex items-center p-1 bg-surface-container rounded border border-outline-variant/50">
                {(['ALL', 'PENDING', 'ACCEPTED', 'REJECTED'] as const).map(
                  (filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-1.5 rounded font-label-stamp text-xs tracking-wider transition-all ${
                        activeFilter === filter
                          ? 'bg-on-surface text-surface font-bold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {filter}
                    </button>
                  ),
                )}
              </div>

              {/* SORT */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as
                        | 'newest'
                        | 'oldest'
                        | 'title'
                        | 'requester',
                    )
                  }
                  className="appearance-none bg-surface-container-lowest border border-outline-variant/80 rounded px-3 py-2 pr-9 font-label-stamp text-xs text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="newest">SORT: Newest First</option>
                  <option value="oldest">SORT: Oldest First</option>
                  <option value="title">SORT: Resource Title</option>
                  <option value="requester">SORT: Requester Name</option>
                </select>

                <span className="material-symbols-outlined absolute right-2 top-2 text-[16px] pointer-events-none text-on-surface-variant">
                  expand_more
                </span>
              </div>

              {/* EMPTY STATE QA TOGGLE */}
              <button
                type="button"
                onClick={() => setShowEmptyState((value) => !value)}
                className={`flex items-center gap-1 px-2.5 py-2 rounded border border-dashed font-label-stamp text-xs uppercase tracking-wider transition-colors ${
                  showEmptyState
                    ? 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary'
                    : 'text-on-surface-variant hover:text-primary hover:border-primary border-outline-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  preview
                </span>
                {showEmptyState ? 'SHOW REQUESTS' : 'SIMULATE EMPTY'}
              </button>
            </div>
          </div>
        </section>

        {/* REQUEST LIST */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!showEmptyState && filteredRequests.length > 0 ? (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <article
                  key={request.id}
                  className="bg-surface-container-lowest border border-outline-variant/70 rounded-md p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                    {/* IMAGE */}
                    <div className="lg:col-span-2">
                      <div className="relative aspect-[4/3] rounded overflow-hidden bg-surface-container border border-outline-variant/40">
                        <img
                          src={request.resourceImage}
                          alt={request.resourceTitle}
                          className="w-full h-full object-cover"
                        />

                        <span
                          className={`absolute top-2 left-2 px-2 py-1 rounded border font-label-stamp text-[10px] font-bold tracking-wider ${getStatusClasses(
                            request.status,
                          )}`}
                        >
                          {request.status}
                        </span>
                      </div>
                    </div>

                    {/* RESOURCE */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="font-label-stamp text-[10px] uppercase tracking-widest text-on-surface-variant">
                            {request.resourceCategory}
                          </span>

                          <h2 className="mt-1 font-headline-sm text-xl font-bold leading-tight">
                            {request.resourceTitle}
                          </h2>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded border font-label-stamp text-[10px] font-bold tracking-wider ${getDealClasses(
                            request.dealType,
                          )}`}
                        >
                          {request.dealType}
                        </span>

                        <span className="font-label-stamp text-[10px] text-on-surface-variant">
                          {request.requestedAt}
                        </span>
                      </div>

                      {request.exchangeOffer && (
                        <div className="mt-3 flex items-start gap-2 text-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-[17px] text-primary mt-0.5">
                            swap_horiz
                          </span>

                          <span>
                            <strong className="text-on-surface">
                              Offered:
                            </strong>{' '}
                            {request.exchangeOffer}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* REQUESTER */}
                    <div className="lg:col-span-3 lg:border-l lg:border-outline-variant/50 lg:pl-5">
                      <span className="font-label-stamp text-[10px] uppercase tracking-widest text-on-surface-variant">
                        REQUESTER
                      </span>

                      <div className="mt-2 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold">
                          {request.requesterInitials}
                        </div>

                        <div>
                          <div className="font-semibold">
                            {request.requesterName}
                          </div>

                          <div className="text-xs text-on-surface-variant">
                            {request.requesterCourse} ·{' '}
                            {request.requesterYear}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-surface-container-low rounded border border-outline-variant/40">
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          “{request.note}”
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="lg:col-span-3 flex flex-col gap-2">
                      {request.status === 'PENDING' && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setModal({
                                type: 'ACCEPT',
                                request,
                              })
                            }
                            className="w-full px-4 py-2.5 bg-primary text-white rounded font-label-stamp text-xs font-bold tracking-wider hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[17px]">
                              check
                            </span>
                            ACCEPT REQUEST
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setModal({
                                type: 'REJECT',
                                request,
                              })
                            }
                            className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant text-on-surface-variant rounded font-label-stamp text-xs font-bold tracking-wider hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[17px]">
                              close
                            </span>
                            REJECT
                          </button>
                        </>
                      )}

                      {request.status === 'ACCEPTED' && (
                        <>
                          <a
                            href={getWhatsAppLink(
                              request.whatsappNumber,
                              request,
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full px-4 py-2.5 bg-[#25D366] text-white rounded font-label-stamp text-xs font-bold tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[17px]">
                              chat
                            </span>
                            CONTINUE ON WHATSAPP ↗
                          </a>

                          <span className="text-[11px] text-on-surface-variant text-center">
                            Coordinate pickup, exchange or hand-off directly.
                          </span>
                        </>
                      )}

                      {request.status === 'REJECTED' && (
                        <div className="w-full px-4 py-3 bg-surface-container rounded border border-outline-variant/50 text-center">
                          <span className="material-symbols-outlined text-[19px] text-on-surface-variant">
                            block
                          </span>

                          <div className="mt-1 font-label-stamp text-[10px] font-bold tracking-wider text-on-surface-variant">
                            REQUEST REJECTED
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="my-8 p-10 sm:p-16 bg-surface-container-lowest border-2 border-dashed border-outline-variant rounded-md text-center">
              <div className="max-w-md mx-auto space-y-5">
                <span className="inline-block px-3 py-1 bg-surface-container-high rounded border border-outline-variant font-label-stamp text-[10px] text-on-surface-variant uppercase tracking-wider">
                  REQUEST DESK // EMPTY ARCHIVE
                </span>

                <div className="w-24 h-24 mx-auto text-primary flex items-center justify-center bg-surface-container rounded-full border border-outline-variant/60 shadow-inner">
                  <span className="material-symbols-outlined text-5xl">
                    menu_book
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold uppercase tracking-tight">
                    NO REQUESTS YET.
                  </h3>

                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    When someone requests one of your listed resources,
                    their request will appear here with requester details
                    and actions to accept or reject it.
                  </p>
                </div>

                <a
                  href="/list-resource"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded font-label-stamp text-xs font-bold tracking-wider hover:bg-primary-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[17px]">
                    add
                  </span>
                  LIST A RESOURCE
                </a>
              </div>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="relative overflow-hidden bg-primary text-white rounded-md p-7 sm:p-10">
            <div className="absolute -right-10 -top-10 w-40 h-40 border-2 border-white/10 rounded-full" />
            <div className="absolute -right-20 -bottom-20 w-60 h-60 border-2 border-white/10 rounded-full" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-7">
              <div>
                <span className="font-label-stamp text-[10px] tracking-[0.18em] uppercase text-white/70">
                  KEEP THE SHELF MOVING
                </span>

                <h2 className="mt-2 font-headline-lg text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                  HAVE SOMETHING TO PASS ON?
                </h2>

                <p className="mt-3 max-w-xl text-white/75 text-sm sm:text-base">
                  List your academic resources and let someone on campus
                  put them to good use.
                </p>
              </div>

              <a
                href="/list-resource"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-white text-primary rounded font-label-stamp text-xs font-bold tracking-wider hover:bg-surface-container-low transition-colors"
              >
                LIST A RESOURCE
                <span className="material-symbols-outlined text-[17px]">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* CONFIRMATION MODAL */}
      {modal && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModal(null);
            }
          }}
        >
          <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-md shadow-2xl">
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-label-stamp text-[10px] tracking-[0.16em] uppercase text-on-surface-variant">
                    REQUEST {modal.type === 'ACCEPT' ? 'APPROVAL' : 'ACTION'}
                  </span>

                  <h2 className="mt-1 font-headline-sm text-xl sm:text-2xl font-bold uppercase">
                    {modal.type === 'ACCEPT'
                      ? 'ACCEPT THIS REQUEST?'
                      : 'REJECT THIS REQUEST?'}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant"
                  aria-label="Close"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    close
                  </span>
                </button>
              </div>

              <div className="mt-5 p-4 bg-surface-container-low rounded border border-outline-variant/50">
                <div className="font-semibold">
                  {modal.request.resourceTitle}
                </div>

                <div className="mt-1 text-sm text-on-surface-variant">
                  Requested by {modal.request.requesterName}
                </div>

                <div className="mt-3">
                  <span
                    className={`inline-flex px-2 py-1 rounded border font-label-stamp text-[10px] font-bold tracking-wider ${getDealClasses(
                      modal.request.dealType,
                    )}`}
                  >
                    {modal.request.dealType}
                  </span>
                </div>
              </div>

              {modal.type === 'ACCEPT' ? (
                <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">
                  Accepting marks the request as accepted. You can then
                  continue coordination with the requester through
                  WhatsApp.
                </p>
              ) : (
                <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">
                  This will mark the incoming request as rejected. The
                  request will remain visible in your request history.
                </p>
              )}

              <div className="mt-6 flex flex-col-reverse sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="flex-1 px-4 py-2.5 bg-surface-container border border-outline-variant rounded font-label-stamp text-xs font-bold tracking-wider hover:bg-surface-container-high transition-colors"
                >
                  CANCEL
                </button>

                <button
                  type="button"
                  onClick={handleConfirmAction}
                  className={`flex-1 px-4 py-2.5 text-white rounded font-label-stamp text-xs font-bold tracking-wider transition-colors ${
                    modal.type === 'ACCEPT'
                      ? 'bg-primary hover:bg-primary-container'
                      : 'bg-secondary hover:opacity-90'
                  }`}
                >
                  {modal.type === 'ACCEPT'
                    ? 'ACCEPT REQUEST'
                    : 'REJECT REQUEST'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}