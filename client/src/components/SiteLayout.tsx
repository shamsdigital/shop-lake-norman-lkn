/* LKNSBN brand: royal blue, white, Inter-only masthead and footer. */
import { useState, type CSSProperties } from 'react';
import { Link, useLocation } from 'wouter';
import { Mail, Menu, Phone, X, ArrowUpRight, MapPin } from 'lucide-react';
import { ScrollToTop } from '@/components/ScrollToTop';
import { cn } from '@/lib/utils';

function isRouteActive(location: string, href: string) {
  if (href === '/') return location === '/';
  return location === href || location.startsWith(`${href}/`);
}

const navItems = [
  { href: '/members', label: 'MEMBERS' },
  { href: '/stories', label: 'STORIES' },
  { href: '/about', label: 'ABOUT' },
];

const footerInternal: { href: string; label: string; hash?: boolean }[] = [
  { href: '/', label: 'Homepage' },
  { href: '/#faq', label: 'FAQ', hash: true },
  { href: '/members', label: 'Member Directory' },
  { href: '/stories', label: 'Stories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const footerExternal: { href: string; label: string }[] = [
  { href: 'https://www.lknsbn.com/contribute-to-community-outreach/', label: 'Community Chest' },
  { href: 'https://www.facebook.com/groups/LakeNormanSmallBusiness/', label: 'Facebook Group' },
  { href: 'https://www.facebook.com/groups/shoplakenorman/', label: 'Facebook Local Shop' },
];

const contactHref = '/contact';

const desktopNavLinkClass = (active: boolean) =>
  cn(
    'text-xs uppercase tracking-widest transition-colors',
    active ? 'font-bold text-blue-900' : 'font-semibold text-slate-600 hover:text-slate-900',
  );

const contactCtaClass =
  'inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-xs font-semibold uppercase tracking-wider shadow-sm transition-opacity hover:opacity-90 !text-white';

const contactCtaStyle: CSSProperties = {
  backgroundColor: '#0b3d91',
  color: '#ffffff',
};

const footerLinkClass = 'flex min-h-11 items-center py-2 text-sm text-[#ffffff] hover:text-[#a8c0e0]';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const contactActive = isRouteActive(location, contactHref);

  return (
    <div className="flex min-h-screen flex-col bg-[#ffffff] text-[#0b3d91]">
      <ScrollToTop />
      <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link href="/" className="focus-ring flex shrink-0 items-center" onClick={() => setMobileMenuOpen(false)}>
            <img
              src="/branding-assets/shop-lake-norman-logo-dark.png"
              alt="LKNSBN"
              className="block h-11 w-auto object-contain"
              width={200}
              height={48}
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active = isRouteActive(location, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={desktopNavLinkClass(active)}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={contactHref}
              className={cn(contactCtaClass, contactActive && 'ring-2 ring-blue-200 ring-offset-2')}
              style={contactCtaStyle}
              aria-current={contactActive ? 'page' : undefined}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href={contactHref}
              className="inline-flex min-h-11 items-center justify-center rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-xs !text-white"
              style={contactCtaStyle}
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center p-2 text-slate-700 hover:text-blue-900"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="space-y-3 border-b border-slate-200 bg-white px-4 pt-2 pb-6 md:hidden" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const active = isRouteActive(location, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block min-h-11 py-2 text-sm font-semibold tracking-wide',
                    active ? 'font-bold text-blue-900' : 'text-slate-700 hover:text-blue-900',
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={contactHref}
              onClick={() => setMobileMenuOpen(false)}
              className="block min-h-11 py-2 text-sm font-bold tracking-wide text-blue-900"
              aria-current={contactActive ? 'page' : undefined}
            >
              CONTACT
            </Link>
          </nav>
        )}
      </header>
      <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden pt-16 sm:pt-20">{children}</div>
      <footer className="mt-auto bg-[#0b3d91] text-[#ffffff]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8 md:py-12">
          <div>
            <div className="eyebrow mb-4 text-[#a8c0e0]">Lake Norman Small Business Network</div>
            <h2 className="display max-w-md text-4xl leading-[.98]">Find the people behind the places you love.</h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#c5d4e8]">A free network. No dues, no substitutions, and no formal rules. Cornelius, NC and the communities around the lake.</p>
          </div>
          <div>
            <div className="eyebrow mb-4 text-[#a8c0e0]">Quick links</div>
            {footerInternal.map((item) =>
              item.hash ? (
                <a key={item.href} href={item.href} className={footerLinkClass}>{item.label}</a>
              ) : (
                <Link key={item.href} href={item.href} className={footerLinkClass}>{item.label}</Link>
              ),
            )}
            {footerExternal.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className={cn(footerLinkClass, 'gap-1')}>
                {item.label}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
          <div>
            <div className="eyebrow mb-4 text-[#a8c0e0]">Contacts</div>
            <p className="min-h-11 py-2 text-sm leading-6 text-[#c5d4e8]">Jim Vogel — Network Chair</p>
            <a href="mailto:lknsbn@yahoo.com" className={cn(footerLinkClass, 'gap-2')}>
              <Mail size={15} className="shrink-0" />
              lknsbn@yahoo.com
            </a>
            <a href="tel:7048006152" className={cn(footerLinkClass, 'gap-2')}>
              <Phone size={15} className="shrink-0" />
              +1 704 800 6152
            </a>
            <p className="flex min-h-11 gap-2 py-2 text-sm leading-6 text-[#c5d4e8]">
              <MapPin size={15} className="mt-0.5 shrink-0" />
              Cornelius, Davidson, Mooresville, Huntersville &amp; beyond.
            </p>
            <Link href={contactHref} className={footerLinkClass}>Contact the network</Link>
          </div>
        </div>
        <div className="border-t border-white/15 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-[11px] text-[#9eb0c8] sm:flex-row sm:items-center">
            <span>© {new Date().getFullYear()} Lake Norman Small Business Network • Cornelius NC</span>
            <a
              href="https://alianzaconnects.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[#c5d4e8] transition hover:border-white/40 hover:text-white"
            >
              Website maintained by Alianza
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, dek, image, imageAlt }: { eyebrow: string; title: string; dek: string; image?: string; imageAlt?: string }) {
  return (
    <section className="page-top mx-auto max-w-[1380px] px-5 pb-10 lg:px-10 lg:pb-12">
      <div className={cn(image && 'grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16')}>
        <div className="max-w-3xl">
          <div className="eyebrow mb-4 text-[#0b3d91]">{eyebrow}</div>
          <h1 className="display text-4xl font-semibold leading-[1.05] text-[#0b3d91] sm:text-5xl lg:text-[3.25rem]">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#4a5c70]">{dek}</p>
        </div>
        {image && (
          <figure className="overflow-hidden rounded-lg border border-[#cdd7e4] bg-white shadow-sm">
            <img
              src={image}
              alt={imageAlt ?? ''}
              width={1000}
              height={800}
              loading="lazy"
              decoding="async"
              className="aspect-[5/4] w-full object-cover"
            />
          </figure>
        )}
      </div>
    </section>
  );
}
