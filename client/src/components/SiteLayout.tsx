/* LKNSBN brand: royal blue, white, Inter-only masthead and footer. */
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ArrowUpRight, MapPin } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/members', label: 'Members' },
  { href: '/stories', label: 'Stories' },
  { href: '/about', label: 'About' },
];

const footerLinks: { href: string; label: string; external?: boolean }[] = [
  { href: '/', label: 'Homepage' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/members', label: 'Members' },
  { href: '/stories', label: 'Stories' },
  { href: '/about', label: 'About' },
  { href: 'https://shoplakenormanlkn.com/', label: 'Business Directory', external: true },
  { href: 'https://www.lknsbn.com/contribute-to-community-outreach/', label: 'Community Chest', external: true },
  { href: 'https://www.facebook.com/groups/LakeNormanSmallBusiness/', label: 'Facebook Group', external: true },
  { href: 'https://www.facebook.com/groups/shoplakenorman/', label: 'Facebook Local Shop', external: true },
];

const contactHref = '/contact';

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
              const active = location === item.href || location.startsWith(`${item.href}/`);
              return <Link key={item.href} href={item.href} className={`focus-ring eyebrow relative py-2 text-[11px] transition-colors hover:text-[#0b3d91] ${active ? 'text-[#0b3d91]' : 'text-[#4a5c70]'}`}>{item.label}{active && <span className="absolute inset-x-0 -bottom-[1px] h-px bg-[#0b3d91]" />}</Link>;
            })}
            <Link href={contactHref} data-slot="button" className={cn(buttonVariants({ size: 'sm' }))}>
              Contact
            </Link>
          </nav>
          <button className="focus-ring inline-flex h-10 w-10 items-center justify-center md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {open && <nav className="border-t border-[#cdd7e4] px-5 py-4 md:hidden" aria-label="Mobile navigation">{nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="eyebrow block border-b border-[#dce4ee] py-4 text-[#4a5c70]">{item.label}</Link>)}<Link href={contactHref} data-slot="button" onClick={() => setOpen(false)} className={cn(buttonVariants({ size: 'default' }), 'mt-4 w-full')}>Contact</Link></nav>}
      </header>
      {children}
      <footer className="mt-24 bg-[#0b3d91] text-[#ffffff]">
        <div className="mx-auto grid max-w-[1380px] gap-12 px-5 py-14 lg:grid-cols-[1.2fr_.9fr_.8fr] lg:px-10">
          <div>
            <div className="eyebrow mb-4 text-[#a8c0e0]">Lake Norman Small Business Network</div>
            <h2 className="display max-w-md text-4xl leading-[.98]">Find the people behind the places you love.</h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#c5d4e8]">A free network. No dues, no substitutions, and no formal rules. Cornelius, NC and the communities around the lake.</p>
          </div>
          <div>
            <div className="eyebrow mb-4 text-[#a8c0e0]">Quick links</div>
            {footerLinks.map((item) => item.external || item.href.includes('#') ? (
              <a key={item.href} href={item.href} {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})} className="flex items-center gap-1 py-1 text-sm text-[#ffffff] hover:text-[#a8c0e0]">{item.label}<ArrowUpRight size={13}/></a>
            ) : (
              <Link key={item.href} href={item.href} className="flex items-center gap-1 py-1 text-sm text-[#ffffff] hover:text-[#a8c0e0]">{item.label}<ArrowUpRight size={13}/></Link>
            ))}
          </div>
          <div>
            <div className="eyebrow mb-4 text-[#a8c0e0]">Contacts</div>
            <p className="text-sm leading-6 text-[#c5d4e8]">E: Jim Vogel</p>
            <a href="mailto:lknsbn@yahoo.com" className="mt-1 block text-sm text-[#ffffff] underline decoration-[#6b8fc4] underline-offset-4">lknsbn@yahoo.com</a>
            <a href="tel:7048006152" className="mt-3 block text-sm text-[#ffffff]">P: +1 704 800 6152</a>
            <p className="mt-4 flex gap-2 text-sm leading-6 text-[#c5d4e8]"><MapPin size={15} className="mt-1 shrink-0"/>Cornelius, Davidson, Mooresville, Huntersville & beyond.</p>
            <Link href={contactHref} className="mt-4 inline-flex items-center gap-1 text-sm text-[#ffffff] hover:text-[#a8c0e0]">Contact<ArrowUpRight size={13}/></Link>
          </div>
        </div>
        <div className="border-t border-white/15 px-5 py-4 lg:px-10"><div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-2 text-[11px] text-[#9eb0c8] sm:flex-row"><span>© {new Date().getFullYear()} Lake Norman Small Business Network • Cornelius NC</span><a href="https://alianzaconnects.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 uppercase tracking-[.08em] text-[#9eb0c8] underline decoration-[#6b8fc4] underline-offset-4 transition hover:text-[#ffffff]"><img src="/home/hero-meeting.png" alt="Alianza" className="h-8 w-auto rounded-sm bg-white object-contain" />Website maintained by Alianza</a></div></div>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, dek, image, imageAlt }: { eyebrow: string; title: string; dek: string; image?: string; imageAlt?: string }) {
  return (
    <section className="mx-auto max-w-[1380px] px-5 pb-14 pt-16 lg:px-10 lg:pb-20 lg:pt-24">
      <div className={cn(image && 'grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16')}>
        <div className="max-w-3xl">
          <div className="eyebrow mb-5 text-[#0b3d91]">{eyebrow}</div>
          <h1 className="display text-5xl font-semibold leading-[.95] text-[#0b3d91] sm:text-7xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4a5c70]">{dek}</p>
        </div>
        {image && (
          <figure className="overflow-hidden rounded-lg border border-[#cdd7e4] bg-white shadow-sm">
            <img src={image} alt={imageAlt ?? ''} className="aspect-[5/4] w-full object-cover" />
          </figure>
        )}
      </div>
    </section>
  );
}
