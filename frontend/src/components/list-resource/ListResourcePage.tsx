import { useEffect, useMemo, useRef, useState } from 'react';
import { Header } from '../home/Header';
import { Footer } from '../home/Footer';

type ListingType = 'SELL' | 'RENT' | 'EXCHANGE' | 'FREE RESOURCE';

const programs = [
  'B.Tech',
  'BCA',
  'BBA',
  'MBA',
  'MCA',
  'B.Pharm',
  'M.Pharm',
  'Design',
  'Other',
];

const resourceTypes = [
  'Notes',
  'Textbooks',
  'Reference Books',
  'PYQs',
  'Lab Manuals',
  'Materials / Stationery',
  'Other',
];

const listingOptions: {
  type: ListingType;
  icon: string;
  description: string;
  label: string;
}[] = [
  {
    type: 'SELL',
    icon: 'sell',
    description: 'Set a price and pass the resource to another campus user.',
    label: 'Set your price',
  },
  {
    type: 'RENT',
    icon: 'hourglass_bottom',
    description: 'Lend the resource for a defined period and get it back.',
    label: 'Set rental terms',
  },
  {
    type: 'EXCHANGE',
    icon: 'swap_horiz',
    description: 'Swap this resource for another useful academic resource.',
    label: 'Resource swap',
  },
  {
    type: 'FREE RESOURCE',
    icon: 'volunteer_activism',
    description: 'Give the resource away to another student or faculty member.',
    label: 'No price',
  },
];

interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

export function ListResourcePage() {
  const [listingType, setListingType] =
    useState<ListingType>('SELL');

  const [title, setTitle] = useState('');
  const [program, setProgram] = useState('B.Tech');
  const [resourceType, setResourceType] = useState('Textbooks');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rentalTerms, setRentalTerms] = useState('');
  const [lookingFor, setLookingFor] = useState('');

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const [images, setImages] = useState<UploadedImage[]>([]);

  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const descriptionCount = description.length;

  const primaryImage = images[0]?.url;

  const listingLabel = useMemo(() => {
    switch (listingType) {
      case 'SELL':
        return 'FOR SALE';
      case 'RENT':
        return 'FOR RENT';
      case 'EXCHANGE':
        return 'EXCHANGE';
      case 'FREE RESOURCE':
        return 'FREE RESOURCE';
    }
  }, [listingType]);

  const displayPrice = useMemo(() => {
    if (listingType === 'FREE RESOURCE') {
      return 'FREE';
    }

    if (listingType === 'EXCHANGE') {
      return 'SWAP';
    }

    if (!price) {
      return '₹—';
    }

    return `₹${price}`;
  }, [listingType, price]);

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.url);
      });
    };
  }, [images]);

  const addTag = () => {
    const trimmed = tagInput.trim().replace(/^#/, '');

    if (!trimmed) return;

    if (
      tags.some(
        (tag) => tag.toLowerCase() === trimmed.toLowerCase(),
      )
    ) {
      setTagInput('');
      return;
    }

    if (tags.length >= 8) return;

    setTags((current) => [...current, trimmed]);
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags((current) =>
      current.filter((tag) => tag !== tagToRemove),
    );
  };

  const handleTagKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }

    if (
      event.key === 'Backspace' &&
      !tagInput &&
      tags.length > 0
    ) {
      setTags((current) => current.slice(0, -1));
    }
  };

  const handleImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) return;

    const availableSlots = 5 - images.length;

    const selectedFiles = files.slice(0, availableSlots);

    const newImages = selectedFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages((current) => [...current, ...newImages]);

    event.target.value = '';
  };

  const removeImage = (id: string) => {
    setImages((current) => {
      const imageToRemove = current.find(
        (image) => image.id === id,
      );

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }

      return current.filter((image) => image.id !== id);
    });
  };

  const setPrimaryImage = (id: string) => {
    setImages((current) => {
      const selected = current.find((image) => image.id === id);

      if (!selected) return current;

      return [
        selected,
        ...current.filter((image) => image.id !== id),
      ];
    });
  };

  const validateForm = () => {
    if (!title.trim()) {
      alert('Please enter a resource title.');
      return false;
    }

    if (!program) {
      alert('Please select a program/course.');
      return false;
    }

    if (!resourceType) {
      alert('Please select a resource type.');
      return false;
    }

    if (!description.trim()) {
      alert('Please add a short description of the resource.');
      return false;
    }

    if (
      (listingType === 'SELL' ||
        listingType === 'RENT') &&
      (!price || Number(price) <= 0)
    ) {
      alert(
        listingType === 'SELL'
          ? 'Please enter a selling price.'
          : 'Please enter a rental price.',
      );
      return false;
    }

    if (
      listingType === 'RENT' &&
      !rentalTerms.trim()
    ) {
      alert('Please enter the rental terms.');
      return false;
    }

    if (
      listingType === 'EXCHANGE' &&
      !lookingFor.trim()
    ) {
      alert(
        'Please tell other users what you would like in exchange.',
      );
      return false;
    }

    return true;
  };

  const handlePublish = () => {
    setDraftSaved(false);

    if (!validateForm()) return;

    setIsPublishing(true);

    window.setTimeout(() => {
      setIsPublishing(false);
      setPublished(true);
    }, 900);
  };

  const handleSaveDraft = () => {
    setPublished(false);
    setDraftSaved(true);

    window.setTimeout(() => {
      setDraftSaved(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#fbf8fc] text-[#1b1b1e]">
      <Header activePath="/list-resource" />

      <main className="pt-16">
        {/* =====================================================
            PAGE CANVAS
        ====================================================== */}
        <div className="relative w-full overflow-hidden bg-[#fbf8fc] pb-16">
          {/* Subtle paper grid */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <svg
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="paper-ruled-grid"
                  width="48"
                  height="48"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 48 0 L 0 0 0 48"
                    fill="none"
                    opacity="0.25"
                    stroke="#1b1b1e"
                    strokeDasharray="2 3"
                    strokeWidth="0.3"
                  />
                </pattern>
              </defs>

              <rect
                width="100%"
                height="100%"
                fill="url(#paper-ruled-grid)"
              />
            </svg>
          </div>

          <div className="relative mx-auto max-w-[1280px] px-4 pt-6 sm:px-6 md:px-10">
            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="relative pb-12 pt-6">
              <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                {/* Hero text */}
                <div className="space-y-4 lg:col-span-8">
                  <div className="inline-flex items-center gap-2 rounded bg-[#ffdad6] px-2.5 py-1 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em] text-[#410002]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#bb0112]" />
                    <span>// PASS IT ON</span>
                    <span className="font-bold text-[#bb0112]">
                      ✦
                    </span>
                    <span className="text-[#93000b]">
                      CAMPUS RESOURCE DESK
                    </span>
                  </div>

                  <div className="relative">
                    <h1 className="font-['Space_Grotesk'] text-[2.5rem] font-bold uppercase leading-[1.08] tracking-[-0.03em] text-[#1b1b1e] sm:text-[3rem] md:text-[3.5rem]">
                      List a Resource.
                      <br />

                      <span className="relative inline-block text-[#00288e]">
                        Keep it moving.

                        <svg
                          className="absolute -bottom-3 left-0 h-4 w-full overflow-visible text-[#00288e]"
                          fill="none"
                          viewBox="0 0 340 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 11C60 4 140 3.5 332 9C240 14 110 13 18 13.5"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                          />

                          <path
                            d="M280 4C305 6.5 330 8.5 336 10"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                          />
                        </svg>
                      </span>
                    </h1>
                  </div>

                  <p className="max-w-2xl pt-2 font-['Plus_Jakarta_Sans'] text-lg leading-7 text-[#444653]">
                    Have a textbook, notes, calculator, lab manual,
                    or other useful academic material? Put it back
                    into circulation on campus instead of letting it
                    gather shelf dust.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-1 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em] text-[#444653]">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#00288e]">
                        school
                      </span>
                      Campus resource sharing
                    </span>

                    <span className="text-[#c4c5d5]">•</span>

                    <span className="inline-flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#735c00]">
                        recycle
                      </span>
                      Keep resources moving
                    </span>

                    <span className="text-[#c4c5d5]">•</span>

                    <span className="inline-flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#bb0112]">
                        handshake
                      </span>
                      Connect through CampusShelf
                    </span>
                  </div>
                </div>

                {/* Sticky note */}
                <div className="relative flex justify-center lg:col-span-4 lg:justify-end">
                  <div className="relative w-full max-w-[280px] rotate-[-2deg] rounded-lg bg-[#ffe083] p-6 text-[#231b00] shadow-[4px_6px_0px_#1b1b1e] transition-transform duration-200 hover:rotate-0">
                    <div className="pointer-events-none absolute -top-3.5 left-1/2 h-6 w-28 -translate-x-1/2 rotate-[1.5deg] rounded-sm bg-[#e4e1e6]/80 shadow-sm backdrop-blur-sm" />

                    <div className="flex items-center justify-between pb-3">
                      <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em]">
                        MEMO // NOTE
                      </span>

                      <span className="text-sm font-bold text-[#735c00]">
                        ✦
                      </span>
                    </div>

                    <p className="font-['Space_Grotesk'] text-xl font-bold leading-snug tracking-tight">
                      &quot;GOOD MATERIAL
                      <br />
                      DESERVES A
                      <br />
                      SECOND READER.&quot;
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-[#574500]/20 pt-3 font-['Space_Grotesk'] text-xs">
                      <span>— CAMPUS ARCHIVE</span>

                      <span className="material-symbols-outlined text-base">
                        local_library
                      </span>
                    </div>
                  </div>

                  <div className="absolute -bottom-10 right-10 hidden rotate-[14deg] font-['Space_Grotesk'] text-xs font-bold text-[#444653] xl:block">
                    help a batchmate ↘
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================
                MAIN TWO COLUMN LAYOUT
            ====================================================== */}
            <div className="grid grid-cols-1 items-start gap-8 pt-4 lg:grid-cols-12">
              {/* =================================================
                  LEFT COLUMN
              ================================================== */}
              <div className="space-y-10 lg:col-span-7">
                {/* =================================================
                    SECTION 01
                ================================================== */}
                <section className="space-y-6 rounded-xl bg-white p-6 shadow-[2px_3px_0px_#1b1b1e] sm:p-8">
                  <div className="border-b border-[#c4c5d5]/40 pb-4">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em] text-[#bb0112]">
                        01 // ABOUT YOUR RESOURCE
                      </span>

                      <span className="font-['Space_Grotesk'] text-xs text-[#444653]">
                        REQUIRED FIELDS
                      </span>
                    </div>

                    <h2 className="font-['Space_Grotesk'] text-2xl font-semibold uppercase tracking-tight">
                      Tell us what you&apos;re passing on.
                    </h2>

                    <p className="mt-1 font-['Plus_Jakarta_Sans'] text-sm leading-5 text-[#444653]">
                      Add the information other campus users need
                      to find and understand your resource.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Resource title */}
                    <div>
                      <label
                        htmlFor="resource-title"
                        className="mb-1.5 block font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em]"
                      >
                        Resource Title{' '}
                        <span className="text-[#bb0112]">*</span>
                      </label>

                      <div className="relative">
                        <input
                          id="resource-title"
                          type="text"
                          value={title}
                          onChange={(event) =>
                            setTitle(event.target.value)
                          }
                          placeholder="e.g. Clean Code, Engineering Mathematics Notes"
                          className="w-full rounded-lg bg-[#f6f2f7] px-4 py-3 pr-12 font-['Plus_Jakarta_Sans'] text-base outline-none transition-all placeholder:text-[#757684] focus:bg-white focus:shadow-[2px_2px_0px_#1e40af]"
                        />

                        <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-lg text-[#757684]">
                          menu_book
                        </span>
                      </div>
                    </div>

                    {/* Program + resource type */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="resource-program"
                          className="mb-1.5 block font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em]"
                        >
                          Program / Course{' '}
                          <span className="text-[#bb0112]">*</span>
                        </label>

                        <div className="relative">
                          <select
                            id="resource-program"
                            value={program}
                            onChange={(event) =>
                              setProgram(event.target.value)
                            }
                            className="w-full cursor-pointer appearance-none rounded-lg bg-[#f6f2f7] px-4 py-3 pr-10 font-['Plus_Jakarta_Sans'] text-base outline-none transition-all focus:bg-white focus:shadow-[2px_2px_0px_#1e40af]"
                          >
                            {programs.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>

                          <span className="pointer-events-none material-symbols-outlined absolute right-3.5 top-3.5 text-lg">
                            expand_more
                          </span>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="resource-type"
                          className="mb-1.5 block font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em]"
                        >
                          Resource Type{' '}
                          <span className="text-[#bb0112]">*</span>
                        </label>

                        <div className="relative">
                          <select
                            id="resource-type"
                            value={resourceType}
                            onChange={(event) =>
                              setResourceType(event.target.value)
                            }
                            className="w-full cursor-pointer appearance-none rounded-lg bg-[#f6f2f7] px-4 py-3 pr-10 font-['Plus_Jakarta_Sans'] text-base outline-none transition-all focus:bg-white focus:shadow-[2px_2px_0px_#1e40af]"
                          >
                            {resourceTypes.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>

                          <span className="pointer-events-none material-symbols-outlined absolute right-3.5 top-3.5 text-lg">
                            category
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <div className="mb-1.5 flex items-center justify-between gap-4">
                        <label
                          htmlFor="description"
                          className="block font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em]"
                        >
                          Description &amp; Condition{' '}
                          <span className="text-[#bb0112]">*</span>
                        </label>

                        <span className="shrink-0 font-['Space_Grotesk'] text-xs text-[#444653]">
                          {descriptionCount} / 500
                        </span>
                      </div>

                      <textarea
                        id="description"
                        value={description}
                        maxLength={500}
                        onChange={(event) =>
                          setDescription(event.target.value)
                        }
                        rows={5}
                        placeholder="Describe the condition, important details, included material, annotations, etc."
                        className="w-full resize-none rounded-lg bg-[#f6f2f7] p-4 font-['Plus_Jakarta_Sans'] text-base leading-relaxed outline-none transition-all placeholder:text-[#757684] focus:bg-white focus:shadow-[2px_2px_0px_#1e40af]"
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="mb-1.5 block font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em]">
                        Subject Tags
                      </label>

                      <div className="flex flex-wrap items-center gap-2 rounded-lg bg-[#f6f2f7] p-2.5">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded bg-white px-2.5 py-1 font-['Space_Grotesk'] text-xs font-bold uppercase text-[#00288e] shadow-[1px_1px_0px_#1b1b1e]"
                          >
                            #{tag}

                            <button
                              type="button"
                              aria-label={`Remove ${tag}`}
                              onClick={() =>
                                removeTag(tag)
                              }
                              className="flex items-center text-[#444653] transition-colors hover:text-[#bb0112]"
                            >
                              <span className="material-symbols-outlined text-xs">
                                close
                              </span>
                            </button>
                          </span>
                        ))}

                        <input
                          type="text"
                          value={tagInput}
                          onChange={(event) =>
                            setTagInput(event.target.value)
                          }
                          onKeyDown={handleTagKeyDown}
                          onBlur={addTag}
                          placeholder="+ Add tag..."
                          className="min-w-[120px] flex-1 bg-transparent px-2 py-1 font-['Plus_Jakarta_Sans'] text-sm outline-none placeholder:text-[#757684]"
                        />
                      </div>

                      <p className="mt-1.5 font-['Plus_Jakarta_Sans'] text-sm text-[#444653]">
                        Press{' '}
                        <span className="rounded bg-[#f0edf1] px-1.5 py-0.5 font-['Space_Grotesk'] text-xs font-bold">
                          Enter
                        </span>{' '}
                        to add a tag.
                      </p>
                    </div>
                  </div>
                </section>

                {/* =================================================
                    SECTION 02
                ================================================== */}
                <section className="space-y-6 rounded-xl bg-white p-6 shadow-[2px_3px_0px_#1b1b1e] sm:p-8">
                  <div className="border-b border-[#c4c5d5]/40 pb-4">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em] text-[#bb0112]">
                        02 // CHOOSE YOUR LISTING
                      </span>

                      <span className="font-['Space_Grotesk'] text-xs text-[#444653]">
                        PASS IT ON
                      </span>
                    </div>

                    <h2 className="font-['Space_Grotesk'] text-2xl font-semibold uppercase tracking-tight">
                      How do you want to pass it on?
                    </h2>

                    <p className="mt-1 font-['Plus_Jakarta_Sans'] text-sm leading-5 text-[#444653]">
                      Choose how another campus user can receive
                      your resource.
                    </p>
                  </div>

                  {/* Listing options */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {listingOptions.map((option) => {
                      const selected =
                        listingType === option.type;

                      return (
                        <button
                          key={option.type}
                          type="button"
                          onClick={() =>
                            setListingType(option.type)
                          }
                          className={`relative cursor-pointer rounded-xl p-4 text-left transition-all hover:-translate-y-0.5 ${
                            selected
                              ? 'bg-[#dde1ff]/70 text-[#1b1b1e] shadow-[3px_3px_0px_#1e40af]'
                              : 'bg-[#f6f2f7] shadow-[2px_2px_0px_#1b1b1e] hover:bg-[#f0edf1]'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className={`material-symbols-outlined text-xl ${
                                  selected
                                    ? 'text-[#00288e]'
                                    : 'text-[#1b1b1e]'
                                }`}
                              >
                                {option.icon}
                              </span>

                              <span
                                className={`font-['Space_Grotesk'] text-lg font-bold ${
                                  selected
                                    ? 'text-[#00288e]'
                                    : 'text-[#1b1b1e]'
                                }`}
                              >
                                {option.type}
                              </span>
                            </div>

                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-full ${
                                selected
                                  ? 'bg-[#00288e] text-white'
                                  : 'bg-[#e4e1e6]'
                              }`}
                            >
                              {selected && (
                                <span className="material-symbols-outlined text-sm">
                                  check
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="mt-2 font-['Plus_Jakarta_Sans'] text-sm leading-5 text-[#444653]">
                            {option.description}
                          </p>

                          <span
                            className={`mt-3 inline-block rounded px-2 py-0.5 font-['Space_Grotesk'] text-xs font-bold uppercase ${
                              selected
                                ? 'bg-[#dde1ff] text-[#001453]'
                                : option.type ===
                                    'EXCHANGE'
                                  ? 'bg-[#ffe083] text-[#231b00]'
                                  : option.type ===
                                      'FREE RESOURCE'
                                    ? 'bg-[#ffdad6] text-[#410002]'
                                    : 'bg-[#f0edf1] text-[#444653]'
                            }`}
                          >
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic listing fields */}
                  <div className="space-y-4 rounded-xl bg-[#f6f2f7] p-5">
                    {(listingType === 'SELL' ||
                      listingType === 'RENT') && (
                      <div>
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                          <label
                            htmlFor="resource-price"
                            className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em]"
                          >
                            {listingType === 'SELL'
                              ? 'Selling Price'
                              : 'Rental Price'}{' '}
                            (₹ INR)
                            <span className="text-[#bb0112]">
                              {' '}
                              *
                            </span>
                          </label>

                          <span className="rounded bg-[#dde1ff] px-2 py-0.5 font-['Space_Grotesk'] text-xs font-bold text-[#001453]">
                            Enter your amount
                          </span>
                        </div>

                        <div className="mt-3 flex items-center gap-3">
                          <div className="relative max-w-[240px] flex-1">
                            <span className="absolute left-3.5 top-2.5 font-['Space_Grotesk'] text-xl font-bold">
                              ₹
                            </span>

                            <input
                              id="resource-price"
                              type="number"
                              min="0"
                              value={price}
                              onChange={(event) =>
                                setPrice(
                                  event.target.value,
                                )
                              }
                              placeholder="450"
                              className="w-full rounded-lg bg-white py-2.5 pl-9 pr-4 font-['Space_Grotesk'] text-xl font-bold outline-none transition-all focus:shadow-[2px_2px_0px_#1e40af]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {listingType === 'RENT' && (
                      <div>
                        <label
                          htmlFor="rental-terms"
                          className="mb-1.5 block font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em]"
                        >
                          Rental Terms
                        </label>

                        <input
                          id="rental-terms"
                          type="text"
                          value={rentalTerms}
                          onChange={(event) =>
                            setRentalTerms(
                              event.target.value,
                            )
                          }
                          placeholder="e.g. ₹100 per month, return within 30 days"
                          className="w-full rounded-lg bg-white px-4 py-3 font-['Plus_Jakarta_Sans'] text-sm outline-none focus:shadow-[2px_2px_0px_#1e40af]"
                        />
                      </div>
                    )}

                    {listingType === 'EXCHANGE' && (
                      <div>
                        <label
                          htmlFor="looking-for"
                          className="mb-1.5 block font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em]"
                        >
                          Looking For
                        </label>

                        <input
                          id="looking-for"
                          type="text"
                          value={lookingFor}
                          onChange={(event) =>
                            setLookingFor(
                              event.target.value,
                            )
                          }
                          placeholder="e.g. Operating System book or scientific calculator"
                          className="w-full rounded-lg bg-white px-4 py-3 font-['Plus_Jakarta_Sans'] text-sm outline-none focus:shadow-[2px_2px_0px_#1e40af]"
                        />
                      </div>
                    )}

                    {listingType === 'FREE RESOURCE' && (
                      <div className="flex items-start gap-3 rounded-lg bg-[#ffe083]/50 p-4">
                        <span className="material-symbols-outlined text-[#735c00]">
                          volunteer_activism
                        </span>

                        <div>
                          <p className="font-['Space_Grotesk'] text-sm font-bold uppercase">
                            Free Resource
                          </p>

                          <p className="mt-1 font-['Plus_Jakarta_Sans'] text-sm leading-5 text-[#444653]">
                            This resource will be listed without
                            a price so another campus user can
                            request it.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* =================================================
                  RIGHT COLUMN
              ================================================== */}
              <div className="space-y-10 lg:col-span-5">
                {/* =================================================
                    SECTION 03 — PHOTOS
                ================================================== */}
                <section className="space-y-5 rounded-xl bg-white p-6 shadow-[2px_3px_0px_#1b1b1e] sm:p-7">
                  <div className="border-b border-[#c4c5d5]/40 pb-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em] text-[#bb0112]">
                        03 // SHOW IT OFF
                      </span>

                      <span className="font-['Space_Grotesk'] text-xs text-[#444653]">
                        {images.length} / 5
                      </span>
                    </div>

                    <h2 className="font-['Space_Grotesk'] text-2xl font-semibold uppercase tracking-tight">
                      Add resource photos.
                    </h2>

                    <p className="mt-1 font-['Plus_Jakarta_Sans'] text-sm leading-5 text-[#444653]">
                      Add clear photos of the cover, condition,
                      pages, or included material.
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/heic"
                    multiple
                    className="hidden"
                    onChange={handleImageSelect}
                  />

                  {/* Upload zone */}
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="group w-full cursor-pointer rounded-xl bg-[#f6f2f7]/70 p-6 text-center transition-all hover:bg-[#f0edf1]"
                  >
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#dde1ff] text-[#00288e] shadow-[1px_1px_0px_#1b1b1e]">
                      <span className="material-symbols-outlined text-2xl">
                        add_a_photo
                      </span>
                    </div>

                    <p className="font-['Space_Grotesk'] text-lg font-bold uppercase tracking-tight">
                      Drag &amp; Drop or Click to Upload
                    </p>

                    <p className="mx-auto mt-1 max-w-xs font-['Plus_Jakarta_Sans'] text-sm leading-5 text-[#444653]">
                      JPG, PNG, WebP, or HEIC. Up to 5 photos.
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1.5 rounded bg-[#00288e] px-3 py-1.5 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[2px_2px_0px_#1b1b1e]">
                      <span className="material-symbols-outlined text-sm">
                        upload_file
                      </span>
                      Select From Files
                    </span>
                  </button>

                  {/* Uploaded gallery */}
                  {images.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em]">
                        Uploaded Photos
                      </span>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {images.map((image, index) => (
                          <div
                            key={image.id}
                            className={`group relative rounded-lg bg-white p-2 shadow-[2px_2px_0px_#1b1b1e] ${
                              index % 2 === 0
                                ? 'rotate-[-1.5deg]'
                                : 'rotate-[1.5deg]'
                            }`}
                          >
                            <div className="absolute -top-2 left-1/2 z-10 h-3.5 w-8 -translate-x-1/2 rounded-sm bg-[#ffe083]/90" />

                            <div className="relative aspect-[4/3] overflow-hidden rounded bg-[#eae7eb]">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeImage(image.id)
                                }
                                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#bb0112] shadow-sm"
                                aria-label="Remove image"
                              >
                                <span className="material-symbols-outlined text-sm">
                                  close
                                </span>
                              </button>
                            </div>

                            <div className="mt-2 text-center">
                              {index === 0 ? (
                                <span className="inline-block rounded bg-[#00288e] px-1.5 py-0.5 font-['Space_Grotesk'] text-[10px] font-bold uppercase text-white">
                                  PRIMARY
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPrimaryImage(
                                      image.id,
                                    )
                                  }
                                  className="font-['Space_Grotesk'] text-[10px] font-bold uppercase text-[#00288e] hover:underline"
                                >
                                  Set primary
                                </button>
                              )}

                              <p className="mt-1 truncate font-['Space_Grotesk'] text-[10px] text-[#444653]">
                                {image.name}
                              </p>
                            </div>
                          </div>
                        ))}

                        {images.length < 5 && (
                          <button
                            type="button"
                            onClick={() =>
                              fileInputRef.current?.click()
                            }
                            className="flex min-h-[150px] flex-col items-center justify-center rounded-lg bg-[#f6f2f7] text-center transition-colors hover:bg-[#f0edf1]"
                          >
                            <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#eae7eb] text-[#444653]">
                              <span className="material-symbols-outlined text-base">
                                add
                              </span>
                            </div>

                            <span className="font-['Space_Grotesk'] text-[10px] font-bold uppercase text-[#444653]">
                              + Add Photo
                            </span>

                            <span className="mt-0.5 font-['Plus_Jakarta_Sans'] text-[9px] text-[#757684]">
                              {5 - images.length}{' '}
                              available
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </section>

                {/* =================================================
                    SECTION 04 — PREVIEW
                ================================================== */}
                <section className="relative space-y-4 rounded-xl bg-white p-6 shadow-[3px_4px_0px_#1b1b1e] sm:p-7">
                  <div className="flex items-center justify-between border-b border-[#c4c5d5]/40 pb-2">
                    <div>
                      <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em] text-[#bb0112]">
                        04 // QUICK PREVIEW
                      </span>

                      <h3 className="font-['Space_Grotesk'] text-xl font-semibold uppercase tracking-tight">
                        Resource Card Preview
                      </h3>
                    </div>

                    <span className="rounded bg-[#ffe083] px-2 py-1 font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-[0.08em] text-[#231b00]">
                      LIVE
                    </span>
                  </div>

                  <div className="hidden items-center gap-1.5 rotate-[-1deg] font-['Space_Grotesk'] text-xs font-bold text-[#00288e] sm:flex">
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>

                    <span>
                      Preview updates as you fill the form
                    </span>
                  </div>

                  {/* Preview card */}
                  <div className="relative overflow-hidden rounded-xl bg-white shadow-[2px_3px_0px_#1b1b1e]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#eae7eb]">
                      {primaryImage ? (
                        <img
                          src={primaryImage}
                          alt="Resource preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-[#757684]">
                          <span className="material-symbols-outlined text-4xl">
                            menu_book
                          </span>

                          <span className="mt-2 font-['Space_Grotesk'] text-xs font-bold uppercase">
                            Resource photo preview
                          </span>
                        </div>
                      )}

                      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                        <span className="rounded bg-[#00288e] px-2 py-0.5 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[1px_1px_0px_#1b1b1e]">
                          {resourceType}
                        </span>

                        <span className="rounded bg-white px-2 py-0.5 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em] text-[#1b1b1e] shadow-[1px_1px_0px_#1b1b1e]">
                          {program}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3">
                        <div className="rounded bg-white/95 px-2.5 py-1 font-['Space_Grotesk'] text-lg font-bold shadow-[2px_2px_0px_#1b1b1e]">
                          {displayPrice}{' '}
                          <span className="font-['Space_Grotesk'] text-xs font-normal uppercase text-[#bb0112]">
                            · {listingLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 p-4">
                      <div className="flex items-center justify-between gap-3 font-['Space_Grotesk'] text-xs font-bold uppercase text-[#444653]">
                        <span>
                          {program} · {resourceType}
                        </span>

                        <span className="text-[#735c00]">
                          CAMPUS LISTING
                        </span>
                      </div>

                      <h4 className="line-clamp-2 font-['Space_Grotesk'] text-lg font-bold leading-snug">
                        {title.trim()
                          ? title
                          : 'Your resource title will appear here'}
                      </h4>

                      <p className="line-clamp-3 font-['Plus_Jakarta_Sans'] text-sm leading-5 text-[#444653]">
                        {description.trim()
                          ? description
                          : 'Add a description so other campus users can understand the condition and contents of your resource.'}
                      </p>

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {tags.slice(0, 4).map((tag, index) => (
                            <span
                              key={tag}
                              className={`rounded px-1.5 py-0.5 font-['Space_Grotesk'] text-[10px] font-bold uppercase ${
                                index === 3
                                  ? 'bg-[#ffe083] text-[#231b00]'
                                  : 'bg-[#f0edf1] text-[#444653]'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#dde1ff] font-['Space_Grotesk'] text-[10px] font-bold text-[#00288e]">
                            YOU
                          </div>

                          <span className="font-['Space_Grotesk'] text-xs font-medium text-[#1b1b1e]">
                            Your CampusShelf listing
                          </span>
                        </div>

                        <span className="flex items-center gap-0.5 font-['Space_Grotesk'] text-xs font-bold text-[#00288e]">
                          Preview ↗
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-lg bg-[#ffe083]/40 p-3">
                    <span className="material-symbols-outlined text-base text-[#735c00]">
                      sticky_note_2
                    </span>

                    <p className="font-['Plus_Jakarta_Sans'] text-xs leading-5 text-[#4e3e00]">
                      <strong>CampusShelf note:</strong>{' '}
                      Only list academic resources and material
                      that you are permitted to share.
                    </p>
                  </div>
                </section>
              </div>
            </div>

            {/* =====================================================
                PUBLISH SECTION
            ====================================================== */}
            <section className="relative mt-14 w-full overflow-hidden rounded-2xl bg-[#00288e] p-8 text-white shadow-[4px_6px_0px_#1b1b1e] sm:p-10">
              <div className="absolute left-0 right-0 top-0 h-2 bg-[#bb0112]" />

              <div className="pointer-events-none absolute -bottom-10 -right-8 select-none font-['Space_Grotesk'] text-[120px] font-bold uppercase tracking-tighter text-white opacity-10">
                CS
              </div>

              <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-2xl space-y-3">
                  <div className="inline-flex items-center gap-2 rounded bg-[#ffe083] px-2.5 py-1 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em] text-[#231b00] shadow-sm">
                    <span className="material-symbols-outlined text-sm">
                      check_circle
                    </span>

                    <span>
                      {published
                        ? 'PUBLISHED'
                        : 'READY TO CIRCULATE?'}
                    </span>
                  </div>

                  <h2 className="font-['Space_Grotesk'] text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
                    {published
                      ? 'Resource ready for the shelf.'
                      : 'Put it back into circulation.'}
                  </h2>

                  <p className="font-['Plus_Jakarta_Sans'] text-base leading-6 text-[#a8b8ff]">
                    {published
                      ? 'Your frontend listing flow is complete. Database publishing will be connected in the backend phase.'
                      : 'Once published, this resource will become part of your campus resource collection. Other users can discover it and send requests.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-1 font-['Space_Grotesk'] text-xs font-bold uppercase text-white/80">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#ffe083]">
                        edit_document
                      </span>
                      Edit later
                    </span>

                    <span>•</span>

                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#ffe083]">
                        handshake
                      </span>
                      Coordinate directly
                    </span>

                    <span>•</span>

                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#ffe083]">
                        school
                      </span>
                      Campus only
                    </span>
                  </div>
                </div>

                <div className="flex min-w-[240px] flex-col gap-3.5">
                  <button
                    type="button"
                    disabled={isPublishing}
                    onClick={handlePublish}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-['Space_Grotesk'] text-lg font-bold uppercase tracking-[0.08em] shadow-[3px_3px_0px_#1b1b1e] transition-all ${
                      published
                        ? 'bg-[#ffe083] text-[#231b00]'
                        : 'bg-white text-[#00288e] hover:bg-[#fbf8fc] hover:shadow-[1px_1px_0px_#1b1b1e]'
                    } disabled:cursor-not-allowed disabled:opacity-70`}
                  >
                    {isPublishing ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-lg">
                          sync
                        </span>
                        <span>CHECKING...</span>
                      </>
                    ) : published ? (
                      <>
                        <span className="material-symbols-outlined text-lg">
                          done_all
                        </span>
                        <span>PUBLISHED</span>
                      </>
                    ) : (
                      <>
                        <span>PUBLISH RESOURCE</span>
                        <span className="material-symbols-outlined text-lg">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1e40af] px-6 py-3 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#173bab]"
                  >
                    <span className="material-symbols-outlined text-sm">
                      bookmark
                    </span>

                    <span>
                      {draftSaved
                        ? 'DRAFT SAVED'
                        : 'SAVE AS DRAFT'}
                    </span>
                  </button>
                </div>
              </div>
            </section>

            {/* Motto */}
            <div className="mb-4 mt-8 text-center">
              <p className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] text-[#444653] opacity-70">
                &quot;Knowledge is not meant to sit on high
                shelves; pass it into hands that build.&quot;
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}