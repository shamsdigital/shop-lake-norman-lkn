/* LKNSBN brand: info pages use calm reading columns, visible rules, and practical next steps. */
import { Mail, ArrowRight, MapPin, Clock } from 'lucide-react';
import { Link } from 'wouter';
import { PageMeta } from '@/components/PageMeta';
import { PageIntro } from '@/components/SiteLayout';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { businesses } from '@/lib/businesses';

const contactEmail = 'lknsbn@yahoo.com';
const memberCountLabel = `${businesses.length}+`;

const pillars = [
  {
    number: '01',
    title: 'Discover',
    headline: 'Find your next favorite.',
    body: 'Search the e-rolodex by name, category, or the first letter of a business.',
  },
  {
    number: '02',
    title: 'Support',
    headline: 'Choose close.',
    body: 'Click through to a member’s own website and take the next step directly with them.',
  },
  {
    number: '03',
    title: 'Connect',
    headline: 'Show up locally.',
    body: 'Join the conversation through the network’s gatherings and community links.',
  },
];

export function About() {
  return (
    <main className="page-shell page-content">
      <PageMeta
        title="About — Shop Lake Norman LKN"
        description="Learn about the Lake Norman Small Business Network: a free, inclusive community helping neighbors find and support independent businesses around Cornelius, Davidson, Mooresville, and Huntersville."
      />

      <div className="flex flex-1 flex-col">
        <PageIntro
          eyebrow="About the network"
          title="Small business is a local language."
          dek="The Lake Norman Small Business Network exists to help neighbors find, support, and celebrate the independent businesses that give this area its character."
          image="/branding-assets/lkn-network-meeting.jpg"
          imageAlt="Local business owners meeting around Lake Norman"
        />

        <section className="mx-auto grid max-w-[1120px] gap-10 border-t border-[#cdd7e4] px-5 py-10 md:py-14 lg:grid-cols-[.85fr_1.15fr] lg:px-10">
          <div>
            <div className="eyebrow text-[#0b3d91]">What we believe</div>
            <h2 className="display mt-4 text-3xl leading-tight text-[#0b3d91] sm:text-4xl">
              A directory is useful. A community is lasting.
            </h2>
            <ul className="mt-6 space-y-3 text-sm font-medium text-[#4a5c70]">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0b3d91]" />
                Established 2014
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0b3d91]" />
                Weekly meetings at H2 Public House
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0b3d91]" />
                {memberCountLabel} members in the e-rolodex
              </li>
            </ul>
            <Link href="/members" data-slot="button" className={cn(buttonVariants({ size: 'lg' }), 'mt-8')}>
              Browse member directory
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-6 text-base leading-8 text-[#4a5c70]">
            <p>
              The LKNSBN is a free network for small businesses across Cornelius, Davidson, Mooresville, Huntersville,
              Concord, Troutman, North Mecklenburg, and the communities around Lake Norman.
            </p>
            <p>
              We meet, share referrals, show up for one another, and make it easier for local customers to discover the
              people behind the places they love. No dues. No substitutions. No formal rules—just a commitment to keeping
              the local economy connected.
            </p>
            <p>
              This directory is our digital front door: a simple place to browse the cards, click through to a member’s
              website, and choose close.
            </p>
          </div>
        </section>

        <section className="border-t border-[#cdd7e4] bg-[#f4f8fb] pb-10 pt-10 md:pb-12 md:pt-12">
          <div className="mx-auto grid max-w-[1120px] gap-5 px-5 sm:grid-cols-3 lg:px-10">
            {pillars.map((pillar) => (
              <article
                key={pillar.number}
                className="rounded-lg border border-[#cdd7e4] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="inline-flex rounded-full bg-[#e8eef5] px-2.5 py-0.5 text-[10px] font-semibold tracking-[.12em] text-[#0b3d91]">
                  {pillar.number} / {pillar.title}
                </span>
                <h3 className="display mt-4 text-2xl text-[#0b3d91]">{pillar.headline}</h3>
                <p className="mt-3 text-sm leading-6 text-[#4a5c70]">{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export function Contact() {
  return (
    <main className="page-top">
      <PageMeta
        title="Contact — Shop Lake Norman LKN"
        description="Contact the Lake Norman Small Business Network by email for membership questions, listing updates, and community information around Lake Norman, NC."
      />

      <div className="page-content mx-auto w-full max-w-5xl px-4 sm:px-6">
        <header className="mb-8 max-w-2xl">
          <div className="eyebrow text-[#0b3d91]">Contact the network</div>
          <h1 className="display mt-3 text-4xl font-semibold leading-[1.08] text-[#0b3d91] sm:text-5xl">
            Have a question? Let&apos;s talk local.
          </h1>
        </header>

        <div className="grid items-stretch gap-8 md:grid-cols-2">
          <article className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
            <div>
              <div className="eyebrow text-[#0b3d91]">Reach out</div>
              <h2 className="display mt-4 text-2xl font-semibold leading-tight text-[#0b3d91] sm:text-3xl">
                Send us an email. We read every note.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#4a5c70]">
                We typically reply within a few business days. Email is the fastest way to reach the network for
                membership questions, listing updates, and general inquiries.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent('Lake Norman Small Business Network inquiry')}`}
                data-slot="button"
                className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-auto')}
              >
                <Mail size={18} />
                Email the network
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-4 block text-sm font-semibold text-[#0b3d91] underline decoration-[#6b8fc4] underline-offset-4 hover:text-[#082e6e]"
              >
                {contactEmail}
              </a>
            </div>
          </article>

          <article className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/70 p-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-[#0b3d91]">
                  <Clock size={16} />
                  <div className="eyebrow">When we gather</div>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#4a5c70]">
                  Weekly Wednesdays at 9 a.m. at H2 Public House, 19906 N. Cove Rd. Suite A, Cornelius — plus member-sponsored
                  events throughout the month.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[#0b3d91]">
                  <MapPin size={16} />
                  <div className="eyebrow">Communities served</div>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#4a5c70]">
                  Cornelius, Davidson, Mooresville, Huntersville &amp; surrounding Lake Norman communities.
                </p>
              </div>
              <div>
                <div className="eyebrow text-[#0b3d91]">What to include</div>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4a5c70]">
                  <li>Your business name and town</li>
                  <li>Whether you&apos;re asking about membership or a listing update</li>
                  <li>Your website, if you&apos;d like to be added to the network</li>
                </ul>
              </div>
            </div>
            <Link
              href="/members"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0b3d91] hover:underline"
            >
              See who&apos;s in the network
              <ArrowRight size={15} />
            </Link>
          </article>
        </div>
      </div>
    </main>
  );
}
