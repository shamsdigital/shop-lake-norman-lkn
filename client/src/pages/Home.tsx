/* LKNSBN brand: member listings as a readable local guide in royal blue and Inter. */
import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowDown, ArrowUpRight, Check, ExternalLink, X } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { businesses, categories, type Business } from '@/lib/businesses';
import { trpc } from '@/lib/trpc';

function Card({ business, index }: { business: Business; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const fallbackLetter = business.business_name.trim().charAt(0).toUpperCase();
  const inner = <article className="group overflow-hidden border border-[#cdd7e4] bg-[#ffffff] transition duration-200 hover:-translate-y-1 hover:border-[#0b3d91] hover:shadow-[0_16px_30px_rgba(11,61,145,.12)]">
    <div className="relative aspect-[4/3] overflow-hidden bg-[#e0e7f0] p-3">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden border border-[#cdd7e4] bg-[#ffffff]">
        {!imageFailed ? <img src={business.visiting_card_image_url} onError={() => setImageFailed(true)} alt={`${business.business_name} business card`} loading={index < 8 ? 'eager' : 'lazy'} className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.035]" /> : <div className="flex h-full w-full flex-col justify-between bg-[#0b3d91] p-5 text-[#ffffff]"><div className="flex items-start justify-between"><span className="eyebrow text-[#a8c0e0]">LKN / {business.category}</span><span className="display text-6xl leading-none text-white">{fallbackLetter}</span></div><div><div className="eyebrow mb-2 text-[#a8c0e0]">Card image unavailable</div><div className="display text-2xl leading-tight">{business.business_name}</div></div></div>}
      </div>
      <span className="absolute left-5 top-5 bg-[#ffffff]/90 px-2 py-1 eyebrow text-[9px] text-[#0b3d91]">{String(index + 1).padStart(2, '0')}</span>
    </div>
    <div className="border-t border-[#dce4ee] p-4"><div className="eyebrow mb-2 text-[9px] text-[#0b3d91]">{business.category}</div><div className="flex items-start justify-between gap-3"><h3 className="display text-[21px] font-semibold leading-tight text-[#0b3d91]">{business.business_name}</h3>{business.business_url && <ExternalLink size={15} className="mt-1 shrink-0 text-[#0b3d91]" />}</div><div className="mt-3 text-xs text-[#7a8b9c]">View member details</div></div>
  </article>;
  return business.business_url ? <a href={business.business_url} target="_blank" rel="noreferrer" aria-label={`Visit ${business.business_name}`}>{inner}</a> : <div>{inner}</div>;
}

function formatCategoryLabel(label: string) {
  return label === 'All categories' ? 'All' : label;
}

function categoryChipClass(active: boolean) {
  return cn(buttonVariants({ variant: 'chip', size: 'chip' }), active && 'border-primary bg-primary text-white hover:text-white');
}

function letterChipClass(active: boolean) {
  return cn(buttonVariants({ variant: 'ghost', size: 'letter' }), active && 'bg-primary text-white hover:bg-primary hover:text-white');
}

function selectCategory(setCategory: (value: string) => void, setVisibleCount: (value: number | ((current: number) => number)) => void, value: string) {
  setCategory(value);
  setVisibleCount(24);
}

function selectLetter(setLetter: (value: string) => void, setVisibleCount: (value: number | ((current: number) => number)) => void, value: string) {
  setLetter(value);
  setVisibleCount(24);
}

export default function Home() {
  const storedCards = trpc.cards.list.useQuery().data ?? [];
  const allBusinesses = useMemo<Business[]>(() => [...businesses, ...storedCards.map((card) => ({ business_name: card.businessName, business_url: card.businessUrl ?? '', visiting_card_image_url: card.imageUrl, category: card.category }))], [storedCards]);
  const allCategories = useMemo(() => Array.from(new Set([...categories, ...storedCards.map(card => card.category)])).sort(), [storedCards]);
  const [category, setCategory] = useState('All categories');
  const [letter, setLetter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(24);

  const sorted = useMemo(() => [...allBusinesses].sort((a, b) => a.business_name.localeCompare(b.business_name)), [allBusinesses]);
  const filtered = useMemo(() => sorted.filter((business) => (category === 'All categories' || business.category === category) && (letter === 'All' || business.business_name.trim().toUpperCase().startsWith(letter))), [sorted, category, letter]);
  const visibleBusinesses = filtered.slice(0, visibleCount);
  const activeFilterCount = Number(category !== 'All categories') + Number(letter !== 'All');
  const clearFilters = () => { setCategory('All categories'); setLetter('All'); setVisibleCount(24); };
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return <main>
    <section className="border-b border-[#cdd7e4] bg-[#f8fafc]">
      <div className="mx-auto max-w-[1380px] px-5 py-10 lg:px-10 lg:py-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="max-w-xl">
            <p className="eyebrow mb-4 text-[#0b3d91]">Lake Norman Small Business Network</p>
            <h1 className="display text-4xl font-bold leading-[1.08] tracking-[-.04em] text-[#0b3d91] sm:text-5xl lg:text-[3.35rem]">
              Find local.<br />
              <span className="text-[#4a5c70]">Choose close.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#4a5c70]">
              Browse business cards from local shops, makers, and pros around the lake. Search by name or trade, then visit their website directly.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#4a5c70]">
              <li><span className="font-semibold text-[#0b3d91]">{allBusinesses.length}</span> local businesses</li>
              <li>Together since <span className="font-semibold text-[#0b3d91]">2014</span></li>
              <li>Free to browse</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#members" data-slot="button" className={cn(buttonVariants({ size: 'lg' }))}>
                See who&apos;s here <ArrowDown size={16} />
              </a>
              <Link href="/about" data-slot="button" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}>
                About the network
              </Link>
            </div>
          </div>

          <div>
            <figure className="overflow-hidden rounded-lg border border-[#cdd7e4] bg-white shadow-sm">
              <img
                src="/branding-assets/lkn-intro-story.jpg"
                alt="Local professionals and small businesses connected around Lake Norman"
                className="aspect-[5/4] w-full object-cover"
              />
              <figcaption className="border-t border-[#cdd7e4] bg-white px-4 py-3 text-sm leading-6 text-[#4a5c70]">
                Cornelius, Davidson, Mooresville, Huntersville &amp; communities around the lake.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section id="members" className="scroll-mt-20 bg-[#ffffff] px-5 py-16 lg:px-10 lg:py-24"><div className="mx-auto max-w-[1380px]"><div className="mb-10 grid gap-8 border-b border-[#cdd7e4] pb-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><h2 className="display max-w-3xl text-5xl font-semibold leading-[.95] text-[#0b3d91] sm:text-7xl">Meet the members.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-[#4a5c70]">Every card belongs to someone in the network. Pick a category or letter, then click through to their site.</p></div><div className="border-l border-[#cdd7e4] pl-5 lg:min-w-[190px]"><div className="display text-4xl text-[#0b3d91]">{allBusinesses.length}</div><div className="eyebrow mt-1 text-[#7a8b9c]">in the network</div></div></div>

      <div className="rounded-lg border border-[#cdd7e4] bg-[#f3f6fa] p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#cdd7e4] pb-3">
          <p className="text-xs font-semibold text-[#0b3d91]">Find a business</p>
          <p className="text-[11px] text-[#4a5c70]">
            Showing <span className="font-semibold text-[#0b3d91]">{Math.min(visibleCount, filtered.length)}</span> of{' '}
            <span className="font-semibold text-[#0b3d91]">{filtered.length}</span>
          </p>
        </div>

        <div className="mt-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[#7a8b9c]">Category</p>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
            <Button type="button" variant="chip" size="chip" onClick={() => selectCategory(setCategory, setVisibleCount, 'All categories')} aria-pressed={category === 'All categories'} className={categoryChipClass(category === 'All categories')}>
              {formatCategoryLabel('All categories')}
            </Button>
            {allCategories.map(item => (
              <Button key={item} type="button" variant="chip" size="chip" onClick={() => selectCategory(setCategory, setVisibleCount, item)} aria-pressed={category === item} className={categoryChipClass(category === item)}>
                {formatCategoryLabel(item)}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-3 border-t border-[#cdd7e4] pt-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[#7a8b9c]">Starts with</p>
          <div className="flex flex-wrap gap-0.5" role="group" aria-label="Filter by first letter">
            <Button type="button" variant="ghost" size="letter" onClick={() => selectLetter(setLetter, setVisibleCount, 'All')} aria-pressed={letter === 'All'} className={letterChipClass(letter === 'All')}>All</Button>
            {letters.map(item => (
              <Button key={item} type="button" variant="ghost" size="letter" onClick={() => selectLetter(setLetter, setVisibleCount, item)} aria-pressed={letter === item} className={letterChipClass(letter === item)}>{item}</Button>
            ))}
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#cdd7e4] pt-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#d6e2f0] px-2 py-0.5 text-[10px] font-semibold text-[#0b3d91]">
              <Check size={11} /> {activeFilterCount} active
            </span>
            <Button type="button" variant="link" size="sm" onClick={clearFilters} className="text-[11px]">
              Clear filters <X size={12} />
            </Button>
          </div>
        )}
      </div>

      {filtered.length > 0 ? <><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visibleBusinesses.map((business, index) => <Card key={`${business.category}-${business.business_name}-${index}`} business={business} index={index}/>)}</div>{visibleCount < filtered.length && <div className="mt-10 text-center"><Button variant="outline" size="lg" onClick={() => setVisibleCount(current => current + 24)}>Load 24 more <ArrowDown size={15}/></Button></div>}</> : <div className="mt-5 border border-dashed border-[#cdd7e4] py-20 text-center"><div className="display text-3xl text-[#0b3d91]">No members found.</div><p className="mt-2 text-sm text-[#4a5c70]">Try a different category or letter.</p><Button variant="link" className="mt-5" onClick={clearFilters}>Reset filters <ArrowUpRight size={14}/></Button></div>}
    </div></section>
  </main>;
}
