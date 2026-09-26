import { useMemo, useState } from 'react';
import { Header } from '../home/Header';

type ListingType = 'Sell' | 'Rent' | 'Exchange' | 'Free Resource';

type ListingStatus = 'Active' | 'Reserved' | 'Completed';

type RequestStatus = 'Pending' | 'Accepted' | 'Rejected';

interface ListedResource {
  id: number;
  title: string;
  category: string;
  listingType: ListingType;
  price?: string;
  status: ListingStatus;
  requests: number;
  image: string;
}

interface RequestedResource {
  id: number;
  title: string;
  category: string;
  owner: string;
  requestType: ListingType;
  status: RequestStatus;
  requestedAt: string;
  image: string;
}

interface ProfileData {
  name: string;
  phone: string;
  program: string;
  year: string;
  whatsapp: string;
  campusId: string;
}

interface Preference {
  id: number;
  title: string;
  description: string;
  enabled: boolean;
}

const initialProfile: ProfileData = {
  name: 'Aryan Pagar',
  phone: '+91 98765 43210',
  program: 'B.Tech Computer Science & Engineering',
  year: '2nd Year (Semester 4)',
  whatsapp: '+91 98765 43210',
  campusId: 'CS-ARYAN-2048',
};

const initialPreferences: Preference[] = [
  {
    id: 1,
    title: 'New requests',
    description: 'Get notified when someone requests one of your resources.',
    enabled: true,
  },
  {
    id: 2,
    title: 'Request updates',
    description: 'Get updates when your resource requests are accepted or rejected.',
    enabled: true,
  },
  {
    id: 3,
    title: 'Wishlist updates',
    description: 'Get notified when a saved resource becomes available.',
    enabled: true,
  },
  {
    id: 4,
    title: 'CampusShelf updates',
    description: 'Receive important platform announcements.',
    enabled: false,
  },
];

const initialListings: ListedResource[] = [
  {
    id: 1,
    title: 'Data Structures & Algorithms in C++',
    category: 'Textbook',
    listingType: 'Sell',
    price: '₹450',
    status: 'Active',
    requests: 3,
    image:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Engineering Mathematics III Notes',
    category: 'Notes',
    listingType: 'Free Resource',
    status: 'Active',
    requests: 2,
    image:
      'https://images.unsplash.com/photo-1453738773917-9c3eff1db985?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Digital Electronics Lab Manual',
    category: 'Lab Manual',
    listingType: 'Exchange',
    status: 'Reserved',
    requests: 1,
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: 'Operating Systems',
    category: 'Reference Book',
    listingType: 'Rent',
    price: '₹150 / term',
    status: 'Completed',
    requests: 4,
    image:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80',
  },
];

const initialRequests: RequestedResource[] = [
  {
    id: 1,
    title: 'Computer Networks',
    category: 'Textbook',
    owner: 'Vivek More',
    requestType: 'Sell',
    status: 'Pending',
    requestedAt: '2 hours ago',
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Discrete Mathematics Notes',
    category: 'Notes',
    owner: 'Siddharth Mehta',
    requestType: 'Free Resource',
    status: 'Accepted',
    requestedAt: 'Yesterday',
    image:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Physics Volume 1',
    category: 'Reference Book',
    owner: 'Aditya Shah',
    requestType: 'Exchange',
    status: 'Rejected',
    requestedAt: '3 days ago',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80',
  },
];

function listingTypeClass(type: ListingType) {
  switch (type) {
    case 'Sell':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Rent':
      return 'bg-violet-50 text-violet-700 border-violet-200';
    case 'Exchange':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Free Resource':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  }
}

function statusClass(status: ListingStatus | RequestStatus) {
  switch (status) {
    case 'Active':
    case 'Accepted':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';

    case 'Pending':
      return 'bg-amber-50 text-amber-700 border-amber-200';

    case 'Reserved':
      return 'bg-blue-50 text-blue-700 border-blue-200';

    case 'Completed':
      return 'bg-slate-100 text-slate-700 border-slate-200';

    case 'Rejected':
      return 'bg-red-50 text-red-700 border-red-200';
  }
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: string;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-[#d9d5df] bg-white p-5 shadow-[0_8px_25px_rgba(20,20,40,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <span className="material-symbols-outlined text-[22px]">{icon}</span>
        </div>

        <div>
          <div className="text-2xl font-bold text-[#1b1b1e]">{value}</div>
          <div className="text-sm text-[#66636d]">{label}</div>
        </div>
      </div>
    </div>
  );
}

export function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [preferences, setPreferences] =
    useState<Preference[]>(initialPreferences);

  const [listings] = useState<ListedResource[]>(initialListings);
  const [requests] = useState<RequestedResource[]>(initialRequests);

  const [activeSection, setActiveSection] = useState<
    'listings' | 'requests'
  >('listings');

  const [editOpen, setEditOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editForm, setEditForm] = useState(profile);
  const [whatsappNumber, setWhatsappNumber] = useState(profile.whatsapp);

  const listingCount = listings.length;
  const requestCount = requests.length;

  const pendingRequests = useMemo(
    () => requests.filter((request) => request.status === 'Pending').length,
    [requests],
  );

  const activeListings = useMemo(
    () => listings.filter((listing) => listing.status === 'Active').length,
    [listings],
  );

  function togglePreference(id: number) {
    setPreferences((current) =>
      current.map((preference) =>
        preference.id === id
          ? { ...preference, enabled: !preference.enabled }
          : preference,
      ),
    );
  }

  function openEditProfile() {
    setEditForm(profile);
    setEditOpen(true);
  }

  function saveProfile() {
    setProfile(editForm);
    setEditOpen(false);
  }

  function openWhatsappModal() {
    setWhatsappNumber(profile.whatsapp);
    setWhatsappOpen(true);
  }

  function saveWhatsapp() {
    setProfile((current) => ({
      ...current,
      whatsapp: whatsappNumber,
    }));

    setWhatsappOpen(false);
  }

  function copyCampusId() {
    navigator.clipboard?.writeText(profile.campusId);
    window.alert('CampusShelf ID copied.');
  }

  function handleDeleteAccount() {
    setDeleteOpen(false);
    window.alert(
      'Account deletion is a prototype action. Backend account deletion will be connected later.',
    );
  }

  function openListing(id: number) {
    window.alert(`Listing #${id} will open in the listing manager once backend functionality is connected.`);
  }

  function openRequest(id: number) {
    window.alert(`Request #${id} will open in the request details once backend functionality is connected.`);
  }

  return (
    <div className="min-h-screen bg-[#fbf8fc] text-[#1b1b1e]">
      <Header activePath="/profile" />

      {/* Archival strip */}
      <div className="border-b border-[#d9d5df] bg-[#f0edf1] px-5 py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[#68656d]">
          <span>PROFILE // CAMPUS EXCHANGE PROTOCOL</span>

          <span className="hidden items-center gap-2 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            CAMPUS ACCOUNT ACTIVE
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#d9d5df] bg-[#fbf8fc]">
        <div className="absolute left-[8%] top-10 hidden rotate-[-8deg] text-blue-700 opacity-60 md:block">
          <span className="material-symbols-outlined text-4xl">school</span>
        </div>

        <div className="absolute right-[10%] top-16 hidden rotate-[8deg] text-red-600 opacity-60 md:block">
          <span className="material-symbols-outlined text-4xl">
            auto_stories
          </span>
        </div>

        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="max-w-4xl">
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
              // YOUR CAMPUSSHELF PROFILE
            </p>

            <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              YOUR CAMPUS.
              <br />
              YOUR RESOURCES.
              <br />
              <span className="text-blue-700">YOUR ACTIVITY.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#5e5b64] sm:text-lg">
              Manage your profile, see the resources you have listed, and keep
              track of resources you have requested from other campus users.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {/* Profile identity */}
        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-[#d9d5df] bg-white p-6 shadow-[0_10px_35px_rgba(20,20,40,0.05)] sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-700 text-2xl font-black text-white">
                  AP
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-black">{profile.name}</h2>

                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                      <span className="material-symbols-outlined text-[14px]">
                        verified
                      </span>
                      VERIFIED
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-[#69666f]">
                    {profile.program}
                  </p>

                  <p className="mt-1 text-sm text-[#69666f]">
                    {profile.year}
                  </p>

                  <p className="mt-3 font-mono text-xs text-[#77737c]">
                    {profile.phone}
                  </p>
                </div>
              </div>

              <button
                onClick={openEditProfile}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#cfcbd5] px-4 py-2.5 text-sm font-bold transition hover:bg-[#f6f2f7]"
              >
                <span className="material-symbols-outlined text-[18px]">
                  edit
                </span>
                Edit Profile
              </button>
            </div>

            <div className="mt-7 border-t border-[#e7e3e9] pt-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#85818a]">
                    Program
                  </p>
                  <p className="mt-1 text-sm font-semibold">{profile.program}</p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#85818a]">
                    Academic Year
                  </p>
                  <p className="mt-1 text-sm font-semibold">{profile.year}</p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#85818a]">
                    CampusShelf ID
                  </p>

                  <button
                    onClick={copyCampusId}
                    className="mt-1 inline-flex items-center gap-2 font-mono text-sm font-bold text-blue-700 hover:underline"
                  >
                    {profile.campusId}
                    <span className="material-symbols-outlined text-[16px]">
                      content_copy
                    </span>
                  </button>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#85818a]">
                    WhatsApp
                  </p>

                  <button
                    onClick={openWhatsappModal}
                    className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
                  >
                    {profile.whatsapp}
                    <span className="material-symbols-outlined text-[16px]">
                      edit
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <StatCard
              icon="inventory_2"
              value={listingCount}
              label="My listed resources"
            />

            <StatCard
              icon="send"
              value={requestCount}
              label="Resources I requested"
            />

            <StatCard
              icon="pending_actions"
              value={pendingRequests}
              label="Pending requests"
            />
          </div>
        </section>

        {/* CampusShelf activity */}
        <section className="mt-12">
          <div className="mb-6">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              // MY CAMPUSSHELF
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
              YOUR RESOURCE ACTIVITY.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#69666f]">
              See what you have listed on CampusShelf and the resources you
              have requested from other students or faculty.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-7 flex flex-wrap gap-2 border-b border-[#d9d5df]">
            <button
              onClick={() => setActiveSection('listings')}
              className={`relative px-5 py-3 text-sm font-bold transition ${
                activeSection === 'listings'
                  ? 'text-blue-700'
                  : 'text-[#6d6972] hover:text-[#1b1b1e]'
              }`}
            >
              My Listings
              <span className="ml-2 rounded-full bg-[#f0edf1] px-2 py-0.5 text-xs">
                {listingCount}
              </span>

              {activeSection === 'listings' && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blue-700" />
              )}
            </button>

            <button
              onClick={() => setActiveSection('requests')}
              className={`relative px-5 py-3 text-sm font-bold transition ${
                activeSection === 'requests'
                  ? 'text-blue-700'
                  : 'text-[#6d6972] hover:text-[#1b1b1e]'
              }`}
            >
              My Requests
              <span className="ml-2 rounded-full bg-[#f0edf1] px-2 py-0.5 text-xs">
                {requestCount}
              </span>

              {activeSection === 'requests' && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blue-700" />
              )}
            </button>
          </div>

          {/* Listings */}
          {activeSection === 'listings' && (
            <div className="space-y-4">
              {listings.map((listing) => (
                <article
                  key={listing.id}
                  className="group overflow-hidden rounded-2xl border border-[#d9d5df] bg-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(20,20,40,0.08)]"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="h-52 shrink-0 overflow-hidden bg-[#f0edf1] sm:h-auto sm:w-52">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${listingTypeClass(
                              listing.listingType,
                            )}`}
                          >
                            {listing.listingType}
                          </span>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${statusClass(
                              listing.status,
                            )}`}
                          >
                            {listing.status}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-black tracking-[-0.02em]">
                          {listing.title}
                        </h3>

                        <p className="mt-1 text-sm text-[#6b6870]">
                          {listing.category}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-5 text-sm">
                          {listing.price && (
                            <div>
                              <span className="text-[#89858e]">Price</span>
                              <p className="font-bold">{listing.price}</p>
                            </div>
                          )}

                          <div>
                            <span className="text-[#89858e]">Requests</span>
                            <p className="font-bold">
                              {listing.requests} incoming
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        <button
                          onClick={() => openListing(listing.id)}
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            visibility
                          </span>
                          View Listing
                        </button>

                        <button
                          onClick={() =>
                            (window.location.href = '/requests')
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-[#cfcbd5] px-4 py-2.5 text-sm font-bold transition hover:bg-[#f6f2f7]"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            inbox
                          </span>
                          View Requests
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              <div className="flex justify-center pt-3">
                <button
                  onClick={() =>
                    (window.location.href = '/list-resource')
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-700 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    add
                  </span>
                  List Another Resource
                </button>
              </div>
            </div>
          )}

          {/* Requested resources */}
          {activeSection === 'requests' && (
            <div className="space-y-4">
              {requests.map((request) => (
                <article
                  key={request.id}
                  className="group overflow-hidden rounded-2xl border border-[#d9d5df] bg-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(20,20,40,0.08)]"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="h-52 shrink-0 overflow-hidden bg-[#f0edf1] sm:h-auto sm:w-52">
                      <img
                        src={request.image}
                        alt={request.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${listingTypeClass(
                              request.requestType,
                            )}`}
                          >
                            {request.requestType}
                          </span>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${statusClass(
                              request.status,
                            )}`}
                          >
                            {request.status}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-black tracking-[-0.02em]">
                          {request.title}
                        </h3>

                        <p className="mt-1 text-sm text-[#6b6870]">
                          {request.category}
                        </p>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div>
                            <span className="text-xs text-[#89858e]">
                              Requested from
                            </span>
                            <p className="text-sm font-bold">
                              {request.owner}
                            </p>
                          </div>

                          <div>
                            <span className="text-xs text-[#89858e]">
                              Requested
                            </span>
                            <p className="text-sm font-bold">
                              {request.requestedAt}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        <button
                          onClick={() => openRequest(request.id)}
                          className="inline-flex items-center gap-2 rounded-xl border border-[#cfcbd5] px-4 py-2.5 text-sm font-bold transition hover:bg-[#f6f2f7]"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            visibility
                          </span>
                          View Request
                        </button>

                        {request.status === 'Accepted' && (
                          <button
                            onClick={() =>
                              window.open(
                                `https://wa.me/?text=${encodeURIComponent(
                                  `Hi ${request.owner}, I'm following up about the CampusShelf resource "${request.title}".`,
                                )}`,
                                '_blank',
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              chat
                            </span>
                            WhatsApp
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              <div className="flex justify-center pt-3">
                <button
                  onClick={() => (window.location.href = '/browse')}
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-700 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    search
                  </span>
                  Browse More Resources
                </button>
              </div>
            </div>
          )}
        </section>

        {/* WhatsApp */}
        <section className="mt-12 rounded-3xl border border-[#d9d5df] bg-[#f0edf1] p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                // TRANSACTION COORDINATION
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Connect through WhatsApp.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#69666f]">
                Once a request is accepted, CampusShelf lets users connect
                through WhatsApp to coordinate the exchange, sale, rental, or
                free-resource handover.
              </p>
            </div>

            <button
              onClick={openWhatsappModal}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
            >
              <span className="material-symbols-outlined text-[18px]">
                phone
              </span>
              Update WhatsApp
            </button>
          </div>
        </section>

        {/* Notification preferences */}
        <section className="mt-12">
          <div className="mb-6">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              // NOTIFICATIONS
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Notification preferences.
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#d9d5df] bg-white">
            {preferences.map((preference, index) => (
              <div
                key={preference.id}
                className={`flex items-center justify-between gap-5 p-5 ${
                  index !== preferences.length - 1
                    ? 'border-b border-[#e7e3e9]'
                    : ''
                }`}
              >
                <div>
                  <h3 className="text-sm font-bold">{preference.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-[#6d6972]">
                    {preference.description}
                  </p>
                </div>

                <button
                  onClick={() => togglePreference(preference.id)}
                  aria-label={`Toggle ${preference.title}`}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                    preference.enabled ? 'bg-blue-700' : 'bg-[#c9c5cd]'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                      preference.enabled ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Security */}
        <section className="mt-12">
          <div className="mb-6">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              // ACCOUNT SECURITY
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Security controls.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <button
              onClick={() =>
                window.alert(
                  'Password change will be connected to the authentication backend later.',
                )
              }
              className="flex items-center justify-between rounded-2xl border border-[#d9d5df] bg-white p-5 text-left transition hover:border-blue-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-blue-700">
                  lock
                </span>

                <div>
                  <h3 className="text-sm font-bold">Change password</h3>
                  <p className="mt-1 text-xs text-[#77737c]">
                    Update your CampusShelf account password.
                  </p>
                </div>
              </div>

              <span className="material-symbols-outlined text-[#88848d]">
                chevron_right
              </span>
            </button>

            <button
              onClick={() =>
                window.alert(
                  'Two-factor authentication will be connected to the authentication backend later.',
                )
              }
              className="flex items-center justify-between rounded-2xl border border-[#d9d5df] bg-white p-5 text-left transition hover:border-blue-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-blue-700">
                  security
                </span>

                <div>
                  <h3 className="text-sm font-bold">
                    Two-factor authentication
                  </h3>
                  <p className="mt-1 text-xs text-[#77737c]">
                    Add an additional layer of account protection.
                  </p>
                </div>
              </div>

              <span className="material-symbols-outlined text-[#88848d]">
                chevron_right
              </span>
            </button>
          </div>
        </section>

        {/* Danger zone */}
        <section className="mt-12 rounded-2xl border border-red-200 bg-red-50/60 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-700">
                Danger Zone
              </p>

              <h3 className="mt-1 text-lg font-black">
                Delete CampusShelf account
              </h3>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-red-800/70">
                This action will permanently remove the account and associated
                activity once backend account deletion is implemented.
              </p>
            </div>

            <button
              onClick={() => setDeleteOpen(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-100"
            >
              <span className="material-symbols-outlined text-[18px]">
                delete
              </span>
              Delete Account
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#d9d5df] bg-[#f0edf1]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
                  <span className="material-symbols-outlined">school</span>
                </div>

                <span className="text-xl font-black">CampusShelf</span>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-6 text-[#6c6871]">
                A campus-only academic resource exchange platform for
                students and faculty.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em]">
                Explore
              </h3>

              <div className="mt-4 flex flex-col gap-3 text-sm text-[#66636d]">
                <a href="/browse" className="hover:text-blue-700">
                  Browse Resources
                </a>
                <a href="/list-resource" className="hover:text-blue-700">
                  List a Resource
                </a>
                <a href="/wishlist" className="hover:text-blue-700">
                  Wishlist
                </a>
                <a href="/requests" className="hover:text-blue-700">
                  Requests
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em]">
                Account
              </h3>

              <div className="mt-4 flex flex-col gap-3 text-sm text-[#66636d]">
                <a href="/notifications" className="hover:text-blue-700">
                  Notifications
                </a>
                <a href="/profile" className="hover:text-blue-700">
                  Profile
                </a>
                <a href="/about" className="hover:text-blue-700">
                  About CampusShelf
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-[#d9d5df] pt-5 text-xs text-[#7a767e]">
            © 2026 CampusShelf. Campus academic resource exchange platform.
          </div>
        </div>
      </footer>

      {/* Edit profile modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                  EDIT PROFILE
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Update your details.
                </h2>
              </div>

              <button
                onClick={() => setEditOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#f0edf1]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="mt-7 space-y-4">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#77737c]">
                  Name
                </span>

                <input
                  value={editForm.name}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-[#d1cdd6] px-4 py-3 text-sm outline-none focus:border-blue-700"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#77737c]">
                  Phone
                </span>

                <input
                  value={editForm.phone}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-[#d1cdd6] px-4 py-3 text-sm outline-none focus:border-blue-700"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#77737c]">
                  Program
                </span>

                <input
                  value={editForm.program}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      program: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-[#d1cdd6] px-4 py-3 text-sm outline-none focus:border-blue-700"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#77737c]">
                  Academic year
                </span>

                <input
                  value={editForm.year}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      year: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-[#d1cdd6] px-4 py-3 text-sm outline-none focus:border-blue-700"
                />
              </label>
            </div>

            <div className="mt-7 flex justify-end gap-2">
              <button
                onClick={() => setEditOpen(false)}
                className="rounded-xl border border-[#d1cdd6] px-5 py-3 text-sm font-bold"
              >
                Cancel
              </button>

              <button
                onClick={saveProfile}
                className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp modal */}
      {whatsappOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                  WHATSAPP
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Update contact number.
                </h2>
              </div>

              <button
                onClick={() => setWhatsappOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#f0edf1]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#68656d]">
              This number can be used to connect with other users after a
              request is accepted.
            </p>

            <label className="mt-6 block">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#77737c]">
                WhatsApp number
              </span>

              <input
                value={whatsappNumber}
                onChange={(event) => setWhatsappNumber(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#d1cdd6] px-4 py-3 text-sm outline-none focus:border-blue-700"
                placeholder="+91 98765 43210"
              />
            </label>

            <div className="mt-7 flex justify-end gap-2">
              <button
                onClick={() => setWhatsappOpen(false)}
                className="rounded-xl border border-[#d1cdd6] px-5 py-3 text-sm font-bold"
              >
                Cancel
              </button>

              <button
                onClick={saveWhatsapp}
                className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
              >
                Save Number
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete account modal */}
      {deleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-700">
              <span className="material-symbols-outlined">warning</span>
            </div>

            <h2 className="mt-5 text-2xl font-black">
              Delete your account?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#68656d]">
              This is currently a prototype. Actual account deletion will be
              connected when authentication and the backend are implemented.
            </p>

            <div className="mt-7 flex justify-end gap-2">
              <button
                onClick={() => setDeleteOpen(false)}
                className="rounded-xl border border-[#d1cdd6] px-5 py-3 text-sm font-bold"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAccount}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}