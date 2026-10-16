import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Business } from '@/lib/businesses';

export function MemberCard({ business, index }: { business: Business; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const fallbackLetter = business.business_name.trim().charAt(0).toUpperCase();

  const inner = (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#dce4ee] bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0b3d91]/35 hover:shadow-lg"
    >
      <div className="relative aspect-[1.75/1] overflow-hidden bg-[#f4f7fb] p-2 sm:p-2.5">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-white">
          {!imageFailed ? (
            <img
              src={business.visiting_card_image_url}
              onError={() => setImageFailed(true)}
              alt={`${business.business_name} business card`}
              width={350}
              height={200}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full flex-col justify-between bg-[#0b3d91] p-5 text-white">
              <div className="flex items-start justify-between">
                <span className="eyebrow text-[#a8c0e0]">LKN / {business.category}</span>
                <span className="display text-5xl leading-none">{fallbackLetter}</span>
              </div>
              <div>
                <div className="eyebrow mb-2 text-[#a8c0e0]">Card image unavailable</div>
                <div className="display text-xl leading-tight">{business.business_name}</div>
              </div>
            </div>
          )}
        </div>
        <span
          className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold tracking-[.12em] text-[#0b3d91] shadow-sm backdrop-blur-sm"
          aria-hidden
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-1 flex-col border-t border-[#eef2f7] p-4">
        <span className="inline-flex w-fit rounded-full bg-[#e8eef5] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[#0b3d91]">
          {business.category}
        </span>
        <h3 className="display mt-3 text-lg font-semibold leading-snug text-[#0b3d91]">{business.business_name}</h3>
        <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#4a5c70] transition-colors group-hover:text-[#0b3d91]">
          View member details
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </p>
      </div>
    </article>
  );

  return business.business_url ? (
    <a href={business.business_url} target="_blank" rel="noreferrer" aria-label={`Visit ${business.business_name}`} className="block h-full">
      {inner}
    </a>
  ) : (
    <div className="h-full">{inner}</div>
  );
}
