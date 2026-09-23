import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Business } from '@/lib/businesses';

export function MemberCard({ business, index }: { business: Business; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const fallbackLetter = business.business_name.trim().charAt(0).toUpperCase();
  const inner = (
    <article className="group overflow-hidden border border-[#cdd7e4] bg-[#ffffff] transition duration-200 hover:-translate-y-1 hover:border-[#0b3d91] hover:shadow-[0_16px_30px_rgba(11,61,145,.12)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e0e7f0] p-3">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden border border-[#cdd7e4] bg-[#ffffff]">
          {!imageFailed ? (
            <img
              src={business.visiting_card_image_url}
              onError={() => setImageFailed(true)}
              alt={`${business.business_name} business card`}
              loading={index < 8 ? 'eager' : 'lazy'}
              className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.035]"
            />
          ) : (
            <div className="flex h-full w-full flex-col justify-between bg-[#0b3d91] p-5 text-[#ffffff]">
              <div className="flex items-start justify-between">
                <span className="eyebrow text-[#a8c0e0]">LKN / {business.category}</span>
                <span className="display text-6xl leading-none text-white">{fallbackLetter}</span>
              </div>
              <div>
                <div className="eyebrow mb-2 text-[#a8c0e0]">Card image unavailable</div>
                <div className="display text-2xl leading-tight">{business.business_name}</div>
              </div>
            </div>
          )}
        </div>
        <span className="absolute left-5 top-5 bg-[#ffffff]/90 px-2 py-1 eyebrow text-[9px] text-[#0b3d91]">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="border-t border-[#dce4ee] p-4">
        <div className="eyebrow mb-2 text-[9px] text-[#0b3d91]">{business.category}</div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="display text-[21px] font-semibold leading-tight text-[#0b3d91]">{business.business_name}</h3>
          {business.business_url && <ExternalLink size={15} className="mt-1 shrink-0 text-[#0b3d91]" />}
        </div>
        <div className="mt-3 text-xs text-[#7a8b9c]">View member details</div>
      </div>
    </article>
  );
  return business.business_url ? (
    <a href={business.business_url} target="_blank" rel="noreferrer" aria-label={`Visit ${business.business_name}`}>
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}
