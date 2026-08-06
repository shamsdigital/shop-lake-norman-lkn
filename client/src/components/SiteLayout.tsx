/* Carolina Editorial: masthead as civic wayfinding; warm paper, ink, lake-blue active states. */
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ArrowUpRight, MapPin } from 'lucide-react';

const nav = [
  { href: '/', label: 'Directory' },
  { href: '/stories', label: 'Stories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  return (
    <div className="min-h-screen bg-[#f7f3eb] text-[#1f3040]">
      <header className="sticky top-0 z-40 border-b border-[#d8cfbf] bg-[#f7f3eb]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-4 lg:px-10">
          <Link href="/" className="focus-ring flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src="/manus-storage/lkn-monogram_de379116.png" alt="" className="h-10 w-10 object-contain" />
            <span className="leading-none">
              <span className="display block text-[18px] font-semibold tracking-[-.04em]">Shop Lake Norman</span>
              <span className="eyebrow mt-1 block text-[#2d6f8f]">Local business index</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {nav.map((item) => {
              const active = item.href === '/' ? location === '/' : location.startsWith(item.href);
              return <Link key={item.href} href={item.href} className={`focus-ring eyebrow relative py-2 text-[11px] transition-colors hover:text-[#2d6f8f] ${active ? 'text-[#2d6f8f]' : 'text-[#53616b]'}`}>{item.label}{active && <span className="absolute inset-x-0 -bottom-[1px] h-px bg-[#2d6f8f]" />}</Link>;
            })}
          </nav>
          <button className="focus-ring inline-flex h-10 w-10 items-center justify-center md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {open && <nav className="border-t border-[#d8cfbf] px-5 py-4 md:hidden" aria-label="Mobile navigation">{nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="eyebrow block border-b border-[#e4dccf] py-4 text-[#53616b]">{item.label}</Link>)}</nav>}
      </header>
      {children}
      <footer className="mt-24 bg-[#203746] text-[#f7f3eb]">
        <div className="mx-auto grid max-w-[1380px] gap-12 px-5 py-14 lg:grid-cols-[1.4fr_.7fr_.7fr] lg:px-10">
          <div><div className="eyebrow mb-4 text-[#9dc5d4]">Lake Norman Small Business Network</div><h2 className="display max-w-md text-4xl leading-[.98]">Find the people behind the places you love.</h2><p className="mt-5 max-w-sm text-sm leading-7 text-[#c8d4d7]">A free local index for discovering and supporting the independent businesses that make Lake Norman feel like home.</p></div>
          <div><div className="eyebrow mb-4 text-[#9dc5d4]">Explore</div>{nav.map(item => <Link key={item.href} href={item.href} className="flex items-center gap-1 py-1 text-sm text-[#f7f3eb] hover:text-[#9dc5d4]">{item.label}<ArrowUpRight size={13}/></Link>)}</div>
          <div><div className="eyebrow mb-4 text-[#9dc5d4]">Gather</div><p className="flex gap-2 text-sm leading-6 text-[#c8d4d7]"><MapPin size={15} className="mt-1 shrink-0"/>Cornelius, Davidson, Mooresville, Huntersville & beyond.</p><a href="mailto:lknsbn@yahoo.com" className="mt-4 block text-sm text-[#f7f3eb] underline decoration-[#6fa9bf] underline-offset-4">lknsbn@yahoo.com</a></div>
        </div>
        <div className="border-t border-white/15 px-5 py-4 lg:px-10"><div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-2 text-[11px] text-[#9fb0b6] sm:flex-row"><span>© {new Date().getFullYear()} Lake Norman Small Business Network</span><span>Website designed and maintained by Get Visual Business Solutions, Holly Springs NC</span></div></div>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, dek }: { eyebrow: string; title: string; dek: string }) {
  return <section className="mx-auto max-w-[1380px] px-5 pb-14 pt-16 lg:px-10 lg:pb-20 lg:pt-24"><div className="max-w-3xl"><div className="eyebrow mb-5 text-[#2d6f8f]">{eyebrow}</div><h1 className="display text-5xl font-semibold leading-[.95] text-[#203746] sm:text-7xl">{title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[#53616b]">{dek}</p></div></section>;
}
