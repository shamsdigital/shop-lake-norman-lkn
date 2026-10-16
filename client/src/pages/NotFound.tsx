import { Home } from 'lucide-react';
import { Link } from 'wouter';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <main className="page-top bg-[#f8fafc] px-5 pb-20 lg:pb-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="eyebrow text-[#0b3d91]">Page not found</p>
        <h1 className="display mt-4 text-6xl font-semibold leading-none text-[#0b3d91] sm:text-7xl">404</h1>
        <h2 className="home-display mt-6 text-3xl leading-tight text-[#0f212b] sm:text-4xl">
          This page isn&apos;t in the directory.
        </h2>
        <p className="mt-5 text-base leading-7 text-[#4a5c70]">
          The link may be outdated or the page may have moved. Head back to the Lake Norman Small Business Network
          homepage to browse members and stories.
        </p>
        <Link href="/" data-slot="button" className={cn(buttonVariants({ size: 'lg' }), 'mt-10 inline-flex')}>
          <Home size={18} />
          Return home
        </Link>
      </div>
    </main>
  );
}
