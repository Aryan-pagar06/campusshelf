import React, { useMemo, useState } from 'react';
import { Header } from '../home/Header';
import { Footer } from '../home/Footer';
import { MOCK_RESOURCES } from '../../data/mockResources';
import type { ResourceItem } from '../../data/mockResources';
import { navigateTo } from '../../lib/navigation';
import { ResourceCard } from './ResourceCard';

const COURSES = [
    'B.Tech',
    'BCA',
    'BBA',
    'MBA',
    'MCA',
    'B.Pharm',
    'M.Pharm',
    'Design',
    'Other',
] as const;

const RESOURCE_TYPES = [
    'Notes',
    'Textbooks',
    'Reference Books',
    'PYQs',
    'Lab Manuals',
    'Materials / Stationery',
    'Other',
] as const;

type SortOption =
    | 'Newest'
    | 'Oldest'
    | 'Price: Low to High'
    | 'Price: High to Low'
    | 'Most Requested';

export const BrowsePage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [course, setCourse] = useState('');
    const [resourceType, setResourceType] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('Newest');

    // Selected resource for the details modal
    const [selectedResource, setSelectedResource] =
        useState<ResourceItem | null>(null);

    const [modalWishlisted, setModalWishlisted] = useState(false);

    const filteredResources = useMemo(() => {
        let resources = [...MOCK_RESOURCES];

        const query = search.trim().toLowerCase();

        if (query) {
            resources = resources.filter((resource) => {
                const searchable = [
                    resource.title,
                    resource.category,
                    resource.course,
                    resource.subtitle,
                    resource.description,
                    resource.owner,
                    ...resource.tags,
                ]
                    .join(' ')
                    .toLowerCase();

                return searchable.includes(query);
            });
        }

        if (course) {
            resources = resources.filter(
                (resource) => resource.course === course,
            );
        }

        if (resourceType) {
            resources = resources.filter(
                (resource) => resource.category === resourceType,
            );
        }

        switch (sortBy) {
            case 'Price: Low to High':
                resources.sort((a, b) => a.numericPrice - b.numericPrice);
                break;

            case 'Price: High to Low':
                resources.sort((a, b) => b.numericPrice - a.numericPrice);
                break;

            case 'Most Requested':
                resources.sort((a, b) => b.requestsCount - a.requestsCount);
                break;

            case 'Oldest':
                resources.reverse();
                break;

            case 'Newest':
            default:
                break;
        }

        return resources;
    }, [search, course, resourceType, sortBy]);

    const clearFilters = () => {
        setSearch('');
        setCourse('');
        setResourceType('');
        setSortBy('Newest');
    };

    const hasFilters =
        search.trim() !== '' || course !== '' || resourceType !== '';

    const openResourceModal = (resource: ResourceItem) => {
        setSelectedResource(resource);
        setModalWishlisted(false);
        document.body.style.overflow = 'hidden';
    };

    const closeResourceModal = () => {
        setSelectedResource(null);
        setModalWishlisted(false);
        document.body.style.overflow = '';
    };

    const getListingLabel = (resource: ResourceItem) => {
        switch (resource.dealType) {
            case 'For Sale':
                return 'FOR SALE';

            case 'Term Rental':
                return 'FOR RENT';

            case 'Exchange / Swap':
                return 'EXCHANGE';

            default:
                return 'FREE RESOURCE';
        }
    };

    const handleWhatsApp = () => {
        if (!selectedResource) return;

        /*
         * Demo behaviour for now.
         * Later this number/message can come from the backend.
         */
        const message = encodeURIComponent(
            `Hi! I'm interested in "${selectedResource.title}" on CampusShelf. Is it still available?`,
        );

        window.open(
            `https://wa.me/?text=${message}`,
            '_blank',
            'noopener,noreferrer',
        );
    };

    return (
        <div className="min-h-screen bg-[#fbf8fc] text-[#1b1b1e]">
            <Header activePath="/browse" />

            <main className="pt-16">
                {/* HERO */}
                <section className="relative overflow-hidden border-b border-[#c4c5d5]/50 px-6 py-16 sm:px-10 lg:px-16">
                    {/* subtle doodles */}
                    <div className="pointer-events-none absolute left-[5%] top-12 hidden text-[#00288e]/20 lg:block">
                        <span className="material-symbols-outlined rotate-[-18deg] text-5xl">
                            menu_book
                        </span>
                    </div>

                    <div className="pointer-events-none absolute right-[8%] top-16 hidden text-[#bb0112]/20 lg:block">
                        <span className="material-symbols-outlined rotate-[12deg] text-5xl">
                            edit
                        </span>
                    </div>

                    <div className="mx-auto max-w-7xl">
                        <div className="max-w-4xl">
                            <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#bb0112]">
                                // CAMPUS REPOSITORY
                            </p>

                            <div className="relative inline-block">
                                <h1 className="font-headline-lg text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                                    FIND WHAT YOU NEED.
                                </h1>

                                <svg
                                    className="pointer-events-none absolute -bottom-5 left-[20%] h-7 w-[65%]"
                                    viewBox="0 0 400 40"
                                    fill="none"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M4 24 C 100 5, 280 42, 396 12"
                                        stroke="#1e40af"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#444653] sm:text-lg">
                                Browse textbooks, notes, previous-year papers, lab manuals,
                                stationery and other academic resources shared by your campus
                                community.
                            </p>
                        </div>

                        {/* SEARCH */}
                        <div className="mt-10 max-w-4xl">
                            <div className="flex items-center gap-3 border-2 border-[#1b1b1e] bg-white px-4 py-3 shadow-[4px_4px_0_#1e40af]">
                                <span className="material-symbols-outlined text-[#444653]">
                                    search
                                </span>

                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search books, notes, subjects, authors..."
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#777]"
                                />

                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch('')}
                                        className="text-[#444653] hover:text-[#bb0112]"
                                        aria-label="Clear search"
                                    >
                                        <span className="material-symbols-outlined">
                                            close
                                        </span>
                                    </button>
                                )}
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {[
                                    'Data Structures',
                                    'Mathematics',
                                    'PYQs',
                                    'Calculator',
                                ].map((term) => (
                                    <button
                                        key={term}
                                        type="button"
                                        onClick={() => setSearch(term)}
                                        className="border border-[#c4c5d5] bg-[#f6f2f7] px-3 py-1.5 text-xs font-bold text-[#444653] transition hover:border-[#1e40af] hover:text-[#1e40af]"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FILTERS */}
                <section className="sticky top-16 z-30 border-b border-[#c4c5d5]/70 bg-[#fbf8fc]/95 px-6 py-4 backdrop-blur-md sm:px-10 lg:px-16">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
                            <select
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                className="h-11 border border-[#c4c5d5] bg-white px-3 text-sm font-semibold outline-none focus:border-[#1e40af]"
                            >
                                <option value="">Program / Course</option>

                                {COURSES.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={resourceType}
                                onChange={(e) => setResourceType(e.target.value)}
                                className="h-11 border border-[#c4c5d5] bg-white px-3 text-sm font-semibold outline-none focus:border-[#1e40af]"
                            >
                                <option value="">Resource Type</option>

                                {RESOURCE_TYPES.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(e.target.value as SortOption)
                                }
                                className="h-11 border border-[#c4c5d5] bg-white px-3 text-sm font-semibold outline-none focus:border-[#1e40af]"
                            >
                                <option value="Newest">Sort By: Newest</option>
                                <option value="Oldest">Oldest</option>
                                <option value="Price: Low to High">
                                    Price: Low to High
                                </option>
                                <option value="Price: High to Low">
                                    Price: High to Low
                                </option>
                                <option value="Most Requested">
                                    Most Requested
                                </option>
                            </select>
                        </div>

                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="flex h-11 items-center justify-center gap-1.5 px-4 text-xs font-bold uppercase tracking-wider text-[#bb0112] hover:bg-[#f6f2f7]"
                            >
                                <span className="material-symbols-outlined text-base">
                                    close
                                </span>
                                Clear Filters
                            </button>
                        )}
                    </div>
                </section>

                {/* RESULTS */}
                <section className="px-6 py-12 sm:px-10 lg:px-16">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                            <div>
                                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#bb0112]">
                                    AVAILABLE NOW
                                </p>

                                <h2 className="mt-1 font-headline-sm text-2xl font-bold uppercase">
                                    {filteredResources.length} RESOURCES FOUND
                                </h2>
                            </div>

                            <p className="text-sm text-[#444653]">
                                Shared by students & faculty
                            </p>
                        </div>

                        {filteredResources.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {filteredResources.map((resource) => (
                                    <ResourceCard
                                        key={resource.id}
                                        resource={resource}
                                        onViewResource={openResourceModal}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-[#c4c5d5] bg-white px-6 py-20 text-center">
                                <span className="material-symbols-outlined text-5xl text-[#444653]/40">
                                    search_off
                                </span>

                                <h3 className="mt-4 font-headline-sm text-xl font-bold">
                                    NOTHING FOUND
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm text-[#444653]">
                                    Try another search or clear the filters to see more campus
                                    resources.
                                </p>

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-6 bg-[#1e40af] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#00288e]"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* REQUEST BANNER */}
                <section className="px-6 pb-16 sm:px-10 lg:px-16">
                    <div className="mx-auto max-w-7xl">
                        <div className="relative overflow-hidden bg-[#1e40af] px-6 py-10 text-white sm:px-10 lg:px-14">
                            <div className="absolute -right-5 -top-10 rotate-12 text-white/10">
                                <span className="material-symbols-outlined text-[160px]">
                                    menu_book
                                </span>
                            </div>

                            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                                <div>
                                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffe083]">
                                        CAN'T FIND IT?
                                    </p>

                                    <h2 className="mt-2 max-w-2xl font-headline-sm text-2xl font-bold uppercase leading-tight sm:text-3xl">
                                        Ask your campus community for the resource you need.
                                    </h2>

                                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
                                        Post a request and let other students or faculty know what
                                        you're looking for.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigateTo('/requests')}
                                    className="shrink-0 bg-[#ffe083] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#18181b] transition hover:-translate-y-0.5"
                                >
                                    Post a Request
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* ========================================================= */}
            {/* RESOURCE DETAILS MODAL                                    */}
            {/* ========================================================= */}

            {selectedResource && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#18181b]/70 p-4 backdrop-blur-sm sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeResourceModal();
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="resource-modal-title"
                        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border-2 border-[#1b1b1e] bg-[#fbf8fc] shadow-[10px_10px_0_rgba(0,40,142,0.35)] md:flex-row"
                    >
                        {/* CLOSE */}
                        <button
                            type="button"
                            onClick={closeResourceModal}
                            aria-label="Close resource details"
                            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#c4c5d5] bg-[#fbf8fc] text-[#1b1b1e] shadow-sm transition hover:scale-105 hover:text-[#bb0112]"
                        >
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </button>

                        {/* IMAGE */}
                        <div className="relative h-64 shrink-0 bg-[#f0edf1] md:h-auto md:w-[46%]">
                            <img
                                src={selectedResource.image}
                                alt={selectedResource.title}
                                onError={(event) => {
                                    event.currentTarget.src =
                                        selectedResource.imageFallback;
                                }}
                                className="h-full w-full object-cover"
                            />

                            <div className="absolute left-5 top-5">
                                <span className="bg-[#fbf8fc]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1e40af] shadow-sm">
                                    {selectedResource.category}
                                </span>
                            </div>

                            <div className="absolute bottom-5 left-5 rotate-[-2deg] bg-[#ffe083] px-4 py-3 shadow-md">
                                <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#18181b]">
                                    CAMPUSSHELF
                                </p>

                                <p className="mt-1 text-xs font-semibold text-[#18181b]">
                                    Shared by your campus.
                                </p>
                            </div>
                        </div>

                        {/* DETAILS */}
                        <div className="overflow-y-auto p-6 sm:p-8 md:w-[54%] md:p-10">
                            <div className="pr-10">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#bb0112]">
                                        {getListingLabel(selectedResource)}
                                    </span>

                                    {selectedResource.badge && (
                                        <span className="border border-[#bb0112]/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#bb0112]">
                                            {selectedResource.badge}
                                        </span>
                                    )}
                                </div>

                                <h2
                                    id="resource-modal-title"
                                    className="mt-3 font-headline-sm text-3xl font-bold uppercase leading-tight text-[#1b1b1e] sm:text-4xl"
                                >
                                    {selectedResource.title}
                                </h2>

                                <p className="mt-3 text-sm font-semibold text-[#444653]">
                                    {selectedResource.course}
                                    {' · '}
                                    {selectedResource.category}
                                    {' · '}
                                    {selectedResource.timeAgo}
                                </p>
                            </div>

                            {/* PRICE */}
                            <div className="mt-7 flex items-end justify-between gap-4 border-y border-[#c4c5d5]/60 py-5">
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#444653]">
                                        {selectedResource.dealType ===
                                            'Free Pass-it-On'
                                            ? 'LISTING'
                                            : selectedResource.dealType}
                                    </p>

                                    <p className="mt-1 font-headline-sm text-3xl font-bold text-[#1e40af]">
                                        {selectedResource.priceDisplay}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#444653]">
                                        INTEREST
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-[#1b1b1e]">
                                        {selectedResource.requestsCount}{' '}
                                        {selectedResource.requestsCount === 1
                                            ? 'request'
                                            : 'requests'}
                                    </p>
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div className="mt-7">
                                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#bb0112]">
                                    ABOUT THIS RESOURCE
                                </p>

                                <p className="mt-3 text-sm leading-7 text-[#444653]">
                                    {selectedResource.description}
                                </p>
                            </div>

                            {/* DETAILS */}
                            <div className="mt-7 grid grid-cols-2 gap-3">
                                <div className="border border-[#c4c5d5] bg-white p-4">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#777]">
                                        PROGRAM
                                    </p>

                                    <p className="mt-1 text-sm font-bold">
                                        {selectedResource.course}
                                    </p>
                                </div>

                                <div className="border border-[#c4c5d5] bg-white p-4">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#777]">
                                        TYPE
                                    </p>

                                    <p className="mt-1 text-sm font-bold">
                                        {selectedResource.category}
                                    </p>
                                </div>

                                <div className="border border-[#c4c5d5] bg-white p-4">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#777]">
                                        LISTED BY
                                    </p>

                                    <p className="mt-1 text-sm font-bold">
                                        {selectedResource.owner}
                                    </p>
                                </div>

                                <div className="border border-[#c4c5d5] bg-white p-4">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#777]">
                                        AVAILABILITY
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-[#1e40af]">
                                        {selectedResource.isArchived
                                            ? 'Claimed'
                                            : 'Available'}
                                    </p>
                                </div>
                            </div>

                            {/* TAGS */}
                            {selectedResource.tags.length > 0 && (
                                <div className="mt-7">
                                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#bb0112]">
                                        TAGS
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {selectedResource.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="border border-[#c4c5d5] bg-[#f6f2f7] px-3 py-1.5 text-xs font-semibold text-[#444653]"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ACTIONS */}
                            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setModalWishlisted(
                                            (value) => !value,
                                        )
                                    }
                                    className="flex items-center justify-center gap-2 border-2 border-[#1b1b1e] bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition hover:border-[#1e40af] hover:text-[#1e40af]"
                                >
                                    <span
                                        className="material-symbols-outlined text-lg"
                                        style={
                                            modalWishlisted
                                                ? {
                                                    fontVariationSettings:
                                                        "'FILL' 1",
                                                }
                                                : undefined
                                        }
                                    >
                                        favorite
                                    </span>

                                    {modalWishlisted
                                        ? 'Saved to Wishlist'
                                        : 'Add to Wishlist'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigateTo('/requests')
                                    }
                                    className="flex items-center justify-center gap-2 bg-[#1e40af] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#00288e]"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        send
                                    </span>

                                    Request Resource
                                </button>

                                <button
                                    type="button"
                                    onClick={handleWhatsApp}
                                    className="flex items-center justify-center gap-2 border-2 border-[#1e40af] bg-[#fbf8fc] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#1e40af] transition hover:bg-[#1e40af] hover:text-white sm:col-span-2"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        chat
                                    </span>

                                    Connect via WhatsApp
                                </button>
                            </div>

                            <p className="mt-4 text-center text-[10px] leading-relaxed text-[#777]">
                                CampusShelf does not process payments inside the
                                platform. Coordinate directly with the resource
                                owner after connecting.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrowsePage;