/* LKNSBN brand: royal blue, white, Inter-only masthead and footer. */
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
    <div className="min-h-screen bg-[#ffffff] text-[#0b3d91]">
      <header className="sticky top-0 z-40 border-b border-[#cdd7e4] bg-[#ffffff]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-4 lg:px-10">
          <Link href="/" className="focus-ring flex items-center gap-3" onClick={() => setOpen(false)}>
            <img
              src="/branding-assets/shop-lake-norman-logo-dark.png"
              alt="LKNSBN — Shop Lake Norman"
              className="h-14 w-auto object-contain sm:h-16"
            />
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {nav.map((item) => {
              const active = item.href === '/' ? location === '/' : location.startsWith(item.href);
              return <Link key={item.href} href={item.href} className={`focus-ring eyebrow relative py-2 text-[11px] transition-colors hover:text-[#0b3d91] ${active ? 'text-[#0b3d91]' : 'text-[#4a5c70]'}`}>{item.label}{active && <span className="absolute inset-x-0 -bottom-[1px] h-px bg-[#0b3d91]" />}</Link>;
            })}
          </nav>
          <button className="focus-ring inline-flex h-10 w-10 items-center justify-center md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {open && <nav className="border-t border-[#cdd7e4] px-5 py-4 md:hidden" aria-label="Mobile navigation">{nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="eyebrow block border-b border-[#dce4ee] py-4 text-[#4a5c70]">{item.label}</Link>)}</nav>}
      </header>
      {children}
      <footer className="mt-24 bg-[#0b3d91] text-[#ffffff]">
        <div className="mx-auto grid max-w-[1380px] gap-12 px-5 py-14 lg:grid-cols-[1.4fr_.7fr_.7fr] lg:px-10">
          <div><div className="eyebrow mb-4 text-[#a8c0e0]">Lake Norman Small Business Network</div><h2 className="display max-w-md text-4xl leading-[.98]">Find the people behind the places you love.</h2><p className="mt-5 max-w-sm text-sm leading-7 text-[#c5d4e8]">A free local index for discovering and supporting the independent businesses that make Lake Norman feel like home.</p></div>
          <div><div className="eyebrow mb-4 text-[#a8c0e0]">Explore</div>{nav.map(item => <Link key={item.href} href={item.href} className="flex items-center gap-1 py-1 text-sm text-[#ffffff] hover:text-[#a8c0e0]">{item.label}<ArrowUpRight size={13}/></Link>)}</div>
          <div><div className="eyebrow mb-4 text-[#a8c0e0]">Gather</div><p className="flex gap-2 text-sm leading-6 text-[#c5d4e8]"><MapPin size={15} className="mt-1 shrink-0"/>Cornelius, Davidson, Mooresville, Huntersville & beyond.</p><a href="mailto:lknsbn@yahoo.com" className="mt-4 block text-sm text-[#ffffff] underline decoration-[#6b8fc4] underline-offset-4">lknsbn@yahoo.com</a></div>
        </div>
        <div className="border-t border-white/15 px-5 py-4 lg:px-10"><div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-2 text-[11px] text-[#9eb0c8] sm:flex-row"><span>© {new Date().getFullYear()} Lake Norman Small Business Network</span><span>Website designed and maintained by Get Visual Business Solutions, Holly Springs NC</span></div></div>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, dek }: { eyebrow: string; title: string; dek: string }) {
  return <section className="mx-auto max-w-[1380px] px-5 pb-14 pt-16 lg:px-10 lg:pb-20 lg:pt-24"><div className="max-w-3xl"><div className="eyebrow mb-5 text-[#0b3d91]">{eyebrow}</div><h1 className="display text-5xl font-semibold leading-[.95] text-[#0b3d91] sm:text-7xl">{title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[#4a5c70]">{dek}</p></div></section>;
}
