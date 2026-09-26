import React, { useState } from 'react';
import type { ResourceItem } from '../../data/mockResources';

interface ResourceCardProps {
    resource: ResourceItem;
    onViewResource: (resource: ResourceItem) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
    resource,
    onViewResource,
}) => {
    const [wishlisted, setWishlisted] = useState(false);

    const isFree = resource.dealType === 'Free Pass-it-On';
    const isArchived = resource.isArchived;

    const listingLabel =
        resource.dealType === 'For Sale'
            ? 'FOR SALE'
            : resource.dealType === 'Term Rental'
                ? 'FOR RENT'
                : resource.dealType === 'Exchange / Swap'
                    ? 'EXCHANGE'
                    : 'FREE RESOURCE';

    return (
        <article
            className={`group relative overflow-hidden border border-[#c4c5d5]/70 bg-[#fffdf9] transition-all duration-300 hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(0,40,142,0.12)] ${isArchived ? 'opacity-70' : ''
                }`}
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f0edf1]">
                <img
                    src={resource.image}
                    alt={resource.title}
                    onError={(e) => {
                        e.currentTarget.src = resource.imageFallback;
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Resource type */}
                <div className="absolute left-3 top-3">
                    <span className="bg-[#fbf8fc]/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1e40af] shadow-sm">
                        {resource.category}
                    </span>
                </div>

                {/* Wishlist */}
                {!isArchived && (
                    <button
                        type="button"
                        aria-label={
                            wishlisted
                                ? 'Remove from wishlist'
                                : 'Add to wishlist'
                        }
                        onClick={() =>
                            setWishlisted((value) => !value)
                        }
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#fbf8fc]/95 text-[#18181b] shadow-sm transition hover:scale-105"
                    >
                        <span
                            className={`material-symbols-outlined text-[20px] ${wishlisted ? 'text-[#bb0112]' : ''
                                }`}
                            style={
                                wishlisted
                                    ? {
                                        fontVariationSettings:
                                            "'FILL' 1",
                                    }
                                    : undefined
                            }
                        >
                            favorite
                        </span>
                    </button>
                )}

                {/* Archived */}
                {isArchived && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#18181b]/25">
                        <span className="rotate-[-3deg] border-2 border-[#bb0112] bg-[#fbf8fc] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#bb0112]">
                            CLAIMED
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#444653]">
                        {listingLabel}
                    </span>

                    {resource.badge && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#bb0112]">
                            {resource.badge}
                        </span>
                    )}
                </div>

                <h3 className="font-headline-sm text-lg font-bold leading-tight text-[#1b1b1e]">
                    {resource.title}
                </h3>

                <p className="mt-1 text-xs font-medium text-[#444653]">
                    {resource.course} ·{' '}
                    {resource.subtitle
                        .split('·')
                        .slice(1)
                        .join('·')
                        .trim()}
                </p>

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#444653]">
                    {resource.description}
                </p>

                <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#c4c5d5]/50 pt-4">
                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#444653]">
                            {isFree ? 'Listing' : resource.dealType}
                        </p>

                        <p className="mt-0.5 font-headline-sm text-lg font-bold text-[#1e40af]">
                            {resource.priceDisplay}
                        </p>
                    </div>

                    <button
                        type="button"
                        disabled={isArchived}
                        onClick={() =>
                            !isArchived && onViewResource(resource)
                        }
                        className={`group/button flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${isArchived
                                ? 'cursor-not-allowed text-[#999]'
                                : 'text-[#1b1b1e] hover:text-[#1e40af]'
                            }`}
                    >
                        View Resource

                        {!isArchived && (
                            <span className="material-symbols-outlined text-base transition-transform group-hover/button:translate-x-1">
                                arrow_forward
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </article>
    );
};