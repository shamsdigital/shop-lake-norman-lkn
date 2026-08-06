/* LKNSBN brand: info pages use calm reading columns, visible rules, and practical next steps. */
import { Mail, ArrowUpRight, MapPin, Clock } from 'lucide-react';
import { Link } from 'wouter';
import { PageIntro } from '@/components/SiteLayout';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const contactEmail = 'lknsbn@yahoo.com';

export function About() { return <main><PageIntro eyebrow="About the network" title="Small business is a local language." dek="The Lake Norman Small Business Network exists to help neighbors find, support, and celebrate the independent businesses that give this area its character." image="/branding-assets/lkn-network-meeting.jpg" imageAlt="Local business owners meeting around Lake Norman"/><section className="mx-auto grid max-w-[1120px] gap-12 border-t border-[#cdd7e4] px-5 py-14 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-20"><div><div className="eyebrow text-[#0b3d91]">What we believe</div><div className="display mt-5 text-4xl leading-tight text-[#0b3d91]">A directory is useful. A community is lasting.</div></div><div className="space-y-6 text-base leading-8 text-[#4a5c70]"><p>The LKNSBN is a free network for small businesses across Cornelius, Davidson, Mooresville, Huntersville, Concord, Troutman, North Mecklenburg, and the communities around Lake Norman.</p><p>We meet, share referrals, show up for one another, and make it easier for local customers to discover the people behind the places they love. No dues. No substitutions. No formal rules—just a commitment to keeping the local economy connected.</p><p>This directory is our digital front door: a simple place to browse the cards, click through to a member’s website, and choose close.</p></div></section><section className="bg-[#e8eef5] paper-noise"><div className="mx-auto grid max-w-[1120px] gap-8 px-5 py-14 sm:grid-cols-3 lg:px-10 lg:py-18"><div><div className="eyebrow text-[#0b3d91]">01 / Discover</div><h3 className="display mt-3 text-3xl text-[#0b3d91]">Find your next favorite.</h3><p className="mt-3 text-sm leading-6 text-[#4a5c70]">Search the e-rolodex by name, category, or the first letter of a business.</p></div><div><div className="eyebrow text-[#0b3d91]">02 / Support</div><h3 className="display mt-3 text-3xl text-[#0b3d91]">Choose close.</h3><p className="mt-3 text-sm leading-6 text-[#4a5c70]">Click through to a member’s own website and take the next step directly with them.</p></div><div><div className="eyebrow text-[#0b3d91]">03 / Connect</div><h3 className="display mt-3 text-3xl text-[#0b3d91]">Show up locally.</h3><p className="mt-3 text-sm leading-6 text-[#4a5c70]">Join the conversation through the network’s gatherings and community links.</p></div></div></section></main>; }

export function Contact() {
  return (
    <main>
      <PageIntro
        eyebrow="Contact the network"
        title="Have a question? Let’s talk local."
        dek="The quickest way to reach us is a direct email — membership questions, listing updates, or anything about the network."
      />
      <section className="mx-auto max-w-[1120px] border-t border-[#cdd7e4] px-5 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
          <div className="rounded-lg border border-[#cdd7e4] bg-[#f8fafc] p-8 sm:p-10 lg:p-12">
            <div className="eyebrow text-[#0b3d91]">Reach out</div>
            <h2 className="display mt-4 max-w-lg text-4xl font-semibold leading-tight text-[#0b3d91] sm:text-5xl">
              Send us an email. We read every note.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#4a5c70]">
              Tap the button below to open your email app with our address ready to go. It&apos;s the fastest way to get a reply from the network.
            </p>
            <a
              href={`mailto:${contactEmail}?subject=${encodeURIComponent('Lake Norman Small Business Network inquiry')}`}
              data-slot="button"
              className={cn(buttonVariants({ size: 'lg' }), 'mt-8 w-full sm:w-auto sm:min-w-[240px]')}
            >
              <Mail size={18} />
              Email the network
            </a>
            <p className="mt-4 text-sm text-[#7a8b9c]">
              Or copy the address:{' '}
              <a href={`mailto:${contactEmail}`} className="font-semibold text-[#0b3d91] underline decoration-[#6b8fc4] underline-offset-4">
                {contactEmail}
              </a>
            </p>
          </div>

          <aside className="space-y-8">
            <div>
              <div className="flex items-center gap-2 text-[#0b3d91]">
                <Clock size={16} />
                <div className="eyebrow">When we gather</div>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#4a5c70]">
                The network meets Wednesdays at 9 a.m. and gathers for member-sponsored events throughout the month.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#0b3d91]">
                <MapPin size={16} />
                <div className="eyebrow">Around the lake</div>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#4a5c70]">
                Cornelius, Davidson, Mooresville, Huntersville, and neighboring communities.
              </p>
            </div>
            <div className="border-t border-[#cdd7e4] pt-8">
              <div className="eyebrow text-[#0b3d91]">Good to mention</div>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[#4a5c70]">
                <li>Your business name and town</li>
                <li>Whether you&apos;re asking about membership or a listing update</li>
                <li>Your website, if you&apos;d like to be added to the network</li>
              </ul>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.13em] text-[#0b3d91] hover:underline">
              See who&apos;s in the network <ArrowUpRight size={15} />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
