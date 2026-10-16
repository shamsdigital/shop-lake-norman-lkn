/* LKNSBN brand: member listings as a readable local guide in royal blue and Inter. */
import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowDown, ArrowUpRight, Check, Search, X } from 'lucide-react';
import { MemberCard } from '@/components/MemberCard';
import { PageMeta } from '@/components/PageMeta';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { businesses, categories, type Business } from '@/lib/businesses';
import { trpc } from '@/lib/trpc';

function formatCategoryLabel(label: string) {
  return label === 'All categories' ? 'All' : label;
}

function categoryChipClass(active: boolean) {
  return cn(buttonVariants({ variant: 'chip', size: 'chip' }), active && 'border-primary bg-primary text-white hover:text-white');
}

function letterChipClass(active: boolean) {
  return cn(buttonVariants({ variant: 'ghost', size: 'letter' }), active && 'bg-primary text-white hover:bg-primary hover:text-white');
}

export default function Members() {
  const storedCards = trpc.cards.list.useQuery().data ?? [];
  const allBusinesses = useMemo<Business[]>(
    () => [
      ...businesses,
      ...storedCards.map((card) => ({
        business_name: card.businessName,
        business_url: card.businessUrl ?? '',
        visiting_card_image_url: card.imageUrl,
        category: card.category,
      })),
    ],
    [storedCards],
  );
  const allCategories = useMemo(
    () => Array.from(new Set([...categories, ...storedCards.map((card) => card.category)])).sort(),
    [storedCards],
  );
  const [category, setCategory] = useState('All categories');
  const [letter, setLetter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(24);

  const sorted = useMemo(
    () => [...allBusinesses].sort((a, b) => a.business_name.localeCompare(b.business_name)),
    [allBusinesses],
  );
  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return sorted.filter((business) => {
      const matchesCategory = category === 'All categories' || business.category === category;
      const matchesLetter = letter === 'All' || business.business_name.trim().toUpperCase().startsWith(letter);
      const matchesSearch =
        !query ||
        business.business_name.toLowerCase().includes(query) ||
        business.category.toLowerCase().includes(query);
      return matchesCategory && matchesLetter && matchesSearch;
    });
  }, [sorted, category, letter, searchQuery]);

  const visibleBusinesses = filtered.slice(0, visibleCount);
  const activeFilterCount =
    Number(category !== 'All categories') + Number(letter !== 'All') + Number(searchQuery.trim().length > 0);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const resetPaging = () => setVisibleCount(24);
  const clearFilters = () => {
    setCategory('All categories');
    setLetter('All');
    setSearchQuery('');
    resetPaging();
  };

  return (
    <main className="page-shell page-content page-top min-w-0">
      <PageMeta
        title="Member Directory — Shop Lake Norman LKN"
        description="Browse business cards from Lake Norman Small Business Network members. Filter by name, category, or letter and visit local shops and pros across Cornelius, Davidson, Mooresville, and Huntersville."
      />

      <div className="mx-auto w-full max-w-[1380px] min-w-0 px-5 lg:px-10">
        <p className="eyebrow text-[#0b3d91]">Member directory</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
          <h1 className="display text-4xl font-semibold leading-[1.02] text-[#0b3d91] sm:text-5xl lg:text-6xl">
            Meet the members.
          </h1>
          <span
            className="inline-flex items-center rounded-full border border-blue-200/60 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-900"
          >
            {allBusinesses.length} in the network
          </span>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#4a5c70]">
          {allBusinesses.length} local shops, makers, and pros across Cornelius, Davidson, Mooresville, Huntersville
          &amp; Lake Norman.
        </p>

        <div id="members" className="mt-8 min-w-0 scroll-mt-24 space-y-5">
          <div className="relative min-w-0">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7a8b9c]" aria-hidden />
            <Input
              id="member-search"
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                resetPaging();
              }}
              placeholder="Search members by business name..."
              className="w-full border-[#cdd7e4] bg-white pl-9 text-[#0b3d91] placeholder:text-[#9aabc0]"
            />
          </div>

          <div className="w-full min-w-0 overflow-hidden">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[#7a8b9c]">Category</p>
            <div
              className="-mx-4 flex max-w-full gap-1.5 overflow-x-auto px-4 py-2 whitespace-nowrap no-scrollbar sm:mx-0 sm:px-0"
              role="group"
              aria-label="Filter by category"
            >
              <Button
                type="button"
                variant="chip"
                size="chip"
                onClick={() => {
                  setCategory('All categories');
                  resetPaging();
                }}
                aria-pressed={category === 'All categories'}
                className={categoryChipClass(category === 'All categories')}
              >
                {formatCategoryLabel('All categories')}
              </Button>
              {allCategories.map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant="chip"
                  size="chip"
                  onClick={() => {
                    setCategory(item);
                    resetPaging();
                  }}
                  aria-pressed={category === item}
                  className={categoryChipClass(category === item)}
                >
                  {formatCategoryLabel(item)}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-3 min-w-0">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#7a8b9c]">Starts with</p>
              <p className="text-[11px] text-[#4a5c70]">
                Showing <span className="font-semibold text-[#0b3d91]">{Math.min(visibleCount, filtered.length)}</span> of{' '}
                <span className="font-semibold text-[#0b3d91]">{filtered.length}</span>
              </p>
            </div>
            <div className="flex max-w-full flex-wrap gap-px overflow-hidden" role="group" aria-label="Filter by first letter">
              <Button
                type="button"
                variant="ghost"
                size="letter"
                onClick={() => {
                  setLetter('All');
                  resetPaging();
                }}
                aria-pressed={letter === 'All'}
                className={letterChipClass(letter === 'All')}
              >
                All
              </Button>
              {letters.map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant="ghost"
                  size="letter"
                  onClick={() => {
                    setLetter(item);
                    resetPaging();
                  }}
                  aria-pressed={letter === item}
                  className={letterChipClass(letter === item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>

          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#e8eef5] px-2 py-0.5 text-[10px] font-semibold text-[#0b3d91]">
                <Check size={11} /> {activeFilterCount} active
              </span>
              <Button type="button" variant="link" size="sm" onClick={clearFilters} className="text-[11px]">
                Clear filters <X size={12} />
              </Button>
            </div>
          )}

          {filtered.length > 0 ? (
            <>
              <div className="mb-6 mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleBusinesses.map((business, index) => (
                  <MemberCard key={`${business.category}-${business.business_name}-${index}`} business={business} index={index} />
                ))}
              </div>
              <div className="flex flex-col items-center justify-center gap-4 py-10 sm:flex-row">
                {visibleCount < filtered.length && (
                  <Button variant="outline" size="lg" onClick={() => setVisibleCount((current) => current + 24)}>
                    Load 24 more <ArrowDown size={15} />
                  </Button>
                )}
                <Link href="/about" data-slot="button" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
                  About the network
                </Link>
              </div>
            </>
          ) : (
            <div className="mb-6 mt-3 border border-dashed border-[#cdd7e4] py-16 text-center">
              <div className="display text-3xl text-[#0b3d91]">No members found.</div>
              <p className="mt-2 text-sm text-[#4a5c70]">Try a different search, category, or letter.</p>
              <Button variant="link" className="mt-5" onClick={clearFilters}>
                Reset filters <ArrowUpRight size={14} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
