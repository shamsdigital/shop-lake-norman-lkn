/* Homepage adapted from the LKNSBN landing design. The site header stays as-is. */
import { useMemo, type ReactNode } from 'react';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { MemberCard } from '@/components/MemberCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { businesses, type Business } from '@/lib/businesses';
import { trpc } from '@/lib/trpc';

const sectionImage = '/home/hero-meeting.png';

const images = {
  hero: sectionImage,
  hashtags: '/home/hashtags.png',
  events: sectionImage,
  important: '/home/important.png',
};

const rules = [
  'No application to join',
  'No fees',
  'No industry limits',
  'No membership categories',
  'No requirements beyond living in the region',
  'No mandatory attendance',
  'No referral requirements',
];

const faqs = [
  {
    id: 'what',
    question: 'What is the Lake Norman Small Business Network (LKNSBN)?',
    answer: (
      <>
        <p>
          The LKNSBN is the only free and inclusive regional networking group in the Charlotte / Lake Norman region of North Carolina. We have about 8,500 online members, small businesses, and solopreneurs represented on our main Facebook group page. We offer opportunities to connect and interact with no long-term commitments, fees, obligations, or formal rules. The LKNSBN is free. Success is a team sport. Members include financial analysts, HVAC companies, business coaches, realtors, web designers, banks, restaurant owners, and photographers who share their time, stories, and contacts.
        </p>
        <p className="mt-4">
          <a href="https://www.lknsbn.com/" className="font-semibold text-[#0b3d91] underline decoration-[#7ec1f3] underline-offset-4" target="_blank" rel="noreferrer">
            LKNSBN.com
          </a>
        </p>
        <p className="mt-4">
          All members can have their business cards on our website after they have attended meetings for at least two consecutive Weekly Wednesdays. After those two meetings, give a business card to Jim Vogel or Dennis Heskett and we will make sure your information gets added.
        </p>
      </>
    ),
  },
  {
    id: 'where',
    question: 'Where does the LKNSBN meet?',
    answer: (
      <p>
        The LKNSBN has Weekly Wednesday meetings at 9:00 a.m. every Wednesday at H2 Public House, 19906 N. Cove Rd. Suite A, Cornelius. Typically each attendee gets a 30-second intro in front of the group. Tell us who you are, what you do, and where you are located. We do not sell in our meetings. We use the time to learn about and connect with each other.
      </p>
    ),
  },
  {
    id: 'fridays',
    question: 'First Friday Socials',
    answer: (
      <p>
        First Friday Socials are at Bin 110 at 5:30 p.m. The address is 19712 One Norman Boulevard, Suite 110, Cornelius. It is a sponsored event, and we typically use a few minutes to discuss LKNSBN community projects and charitable causes, including our quarterly blood drive. Please mingle and have fun. Light hors d’oeuvres are served.
      </p>
    ),
  },
  {
    id: 'grow',
    question: 'How does the LKNSBN help grow and promote local businesses?',
    answer: (
      <>
        <p>
          We have two highly engaging Facebook shopping and advertising pages: Shop Lake Norman and Catawba Avenue LKN. On these sites you can promote your business, a special sale, or an event.
        </p>
        <p className="mt-4">
          <a href="https://www.facebook.com/groups/shoplakenormanlkn" className="font-semibold text-[#0b3d91] underline decoration-[#7ec1f3] underline-offset-4" target="_blank" rel="noreferrer">
            Shop Lake Norman on Facebook
          </a>
        </p>
        <p className="mt-4">
          Repeat attendance, especially at Weekly Wednesday meetings, gives members a chance to become a Know, Like, Trust professional. Within about 90–120 days you will begin to hear people mentioning you and your business to others. It is all about the referral network.
        </p>
      </>
    ),
  },
  {
    id: 'facebook',
    question: 'LKNSBN Main Facebook Page',
    answer: (
      <p>
        This main page is where members post shout-outs to other members who have been helpful or done something great. Members can also share a one-day free event or a charitable event. The secret of the LKNSBN is referral and partnering networks, and that begins with relationships. Admins monitor the page and remove any post that is selling or promoting a business. No selling. Joining is easy, free, and inclusive. First join the Facebook pages, then come to a meeting. Everyone is welcome. Now in our 11th year, the LKNSBN is the heart of small business across the lake. Welcome aboard.
      </p>
    ),
  },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#0b3d91]">{children}</p>;
}

export default function Home() {
  const storedCards = trpc.cards.list.useQuery().data ?? [];
  const preview = useMemo<Business[]>(() => {
    const all: Business[] = [
      ...businesses,
      ...storedCards.map((card) => ({
        business_name: card.businessName,
        business_url: card.businessUrl ?? '',
        visiting_card_image_url: card.imageUrl,
        category: card.category,
      })),
    ];
    return [...all].sort((a, b) => a.business_name.localeCompare(b.business_name)).slice(0, 12);
  }, [storedCards]);

  return (
    <main className="bg-white text-[#0f212b]">
      <section className="mx-auto grid max-w-[1380px] items-center gap-10 px-5 py-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:px-10 lg:py-20">
        <div>
          <p className="text-sm font-semibold tracking-[.08em] text-[#0b3d91]">(LKNSBN) 2026</p>
          <h1 className="home-display mt-4 text-5xl leading-[1.02] text-[#0f212b] sm:text-6xl lg:text-7xl">
            Lake Norman Small
            <br />
            Business Network
          </h1>
          <ul className="mt-8 space-y-4 text-base leading-7 text-[#3d4c5c] sm:text-lg">
            <li className="flex gap-3">
              <ChevronRight className="mt-1 shrink-0 text-[#0b3d91]" size={18} />
              <span>Our main meetings are at the H2 Public House in Cornelius every Wednesday (Weekly Wednesdays at 9 a.m.)</span>
            </li>
            <li className="flex gap-3">
              <ChevronRight className="mt-1 shrink-0 text-[#0b3d91]" size={18} />
              <span>Please sign up at the meetings for our text and email notifications.</span>
            </li>
            <li className="flex gap-3">
              <ChevronRight className="mt-1 shrink-0 text-[#0b3d91]" size={18} />
              <span>No mobile information is shared with third parties or affiliates for marketing or promotional purposes.</span>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://www.facebook.com/groups/LakeNormanSmallBusiness/" target="_blank" rel="noreferrer" data-slot="button" className={cn(buttonVariants({ size: 'lg' }))}>
              Facebook
            </a>
            <a href="https://www.facebook.com/groups/shoplakenorman/" target="_blank" rel="noreferrer" data-slot="button" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}>
              Facebook Shop Local
            </a>
          </div>
        </div>
        <figure className="overflow-hidden rounded-lg border border-[#cdd7e4] bg-[#f4f8fb]">
          <img src={images.hero} alt="Lake Norman Small Business Network members meeting together" className="aspect-[5/4] w-full object-cover" />
        </figure>
      </section>

      <section className="relative isolate overflow-hidden bg-[#0f212b] text-white">
        <img src={images.hashtags} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-[#0f212b]/55" />
        <div className="relative mx-auto max-w-[1380px] px-5 py-16 lg:px-10 lg:py-24">
          <p className="home-display text-3xl leading-tight sm:text-5xl">#IntheMix26 #BeofServicetoOthers</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">
            #Denver #Cornelius #Davidson #Mooresville #Huntersville #Concord #Troutman #NorthMeck
          </p>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/85 sm:text-lg">
            Our organization has no dues, no substitutions needed, and no formal rules. The LKNSBN is free.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 py-14 lg:px-10 lg:py-20">
        <SectionLabel>Contributions and sponsorships</SectionLabel>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#3d4c5c]">
          Contact <a href="mailto:lknsbn@yahoo.com" className="font-semibold text-[#0b3d91] underline decoration-[#7ec1f3] underline-offset-4">lknsbn@yahoo.com</a> for info. Note our service Facebook pages:
        </p>
        <ul className="mt-6 space-y-3 text-base leading-7">
          <li>
            <a href="https://www.facebook.com/groups/812647097021022" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-[#0b3d91] hover:underline">
              <ChevronRight size={16} /> LKNSBN Skilled Trades Education Partnership
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/groups/helpwantedlkn" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-[#0b3d91] hover:underline">
              <ChevronRight size={16} /> ISO LKN FB page is now help wanted lkn
            </a>
          </li>
        </ul>
      </section>

      <section className="bg-[#f4f8fb]">
        <div className="mx-auto grid max-w-[1380px] items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
          <div>
            <SectionLabel>Event information</SectionLabel>
            <h2 className="home-display mt-3 text-4xl leading-tight text-[#0f212b] sm:text-5xl">The most up-to-date event information</h2>
            <p className="mt-5 text-base leading-7 text-[#3d4c5c]">
              Find it on the main{' '}
              <a href="https://www.facebook.com/groups/LakeNormanSmallBusiness/" target="_blank" rel="noreferrer" className="font-semibold text-[#0b3d91] underline decoration-[#7ec1f3] underline-offset-4">
                LKNSBN Facebook page
              </a>
              .
            </p>
            <div className="mt-8 space-y-5 text-base leading-7 text-[#3d4c5c]">
              <p>
                <span className="font-semibold text-[#0f212b]">Weekly Wednesdays, 9 a.m.</span>
                <br />
                Lake Norman Small Business Network (LKNSBN)
                <br />
                Weekly Wednesdays (masks optional)
                <br />
                H2 Public House, 19906 North Cove Road, Suite A, Cornelius
                <br />
                <a href="tel:9802315936" className="font-semibold text-[#0b3d91]">980 231 5936</a>
              </p>
              <p>
                <span className="font-semibold text-[#0f212b]">First Friday</span>
                <br />
                Now at H2 Public House, 19906 N. Cove, Suite A, Cornelius, NC 28031.
                <br />
                <a href="tel:9802315936" className="font-semibold text-[#0b3d91]">980 231 5936</a>
              </p>
            </div>
          </div>
          <figure className="overflow-hidden rounded-lg border border-[#cdd7e4] bg-white">
            <img src={images.events} alt="Members gathered at an LKNSBN event" className="aspect-[4/3] w-full object-cover" />
          </figure>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1380px] items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
        <div>
          <SectionLabel>Important</SectionLabel>
          <h2 className="home-display mt-3 text-4xl leading-tight sm:text-5xl">Posting on the main group page</h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-[#3d4c5c]">
            <p>Any single-day event may be posted on the Facebook group page. These can be free, paid, or non-profit.</p>
            <p>Please no marketing or selling on this main group page at all. Your post will be deleted.</p>
            <p>Remember, if your business is your post in any way, you are selling or advertising. Again, the post will be deleted when it is discovered. Only professionals with a first and last name can join LKNSBN. No business names as members, please.</p>
            <p>There are a lot of networking groups across the region and they all have great advantages for businesses and professionals. Many cost money and have a multitude of requirements, commitments, and exclusions.</p>
          </div>
        </div>
        <figure className="overflow-hidden rounded-lg border border-[#cdd7e4] bg-[#f4f8fb]">
          <img src={images.important} alt="LKNSBN, 12 years of community" className="aspect-[4/3] w-full object-cover" />
        </figure>
      </section>

      <section id="biz" className="scroll-mt-24 border-t border-[#cdd7e4] bg-white">
        <div className="mx-auto max-w-[1380px] px-5 py-14 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <SectionLabel>Business cards</SectionLabel>
              <h2 className="home-display mt-3 text-4xl leading-tight sm:text-5xl">Meet the members.</h2>
              <p className="mt-4 text-base leading-7 text-[#3d4c5c]">
                Click on a biz card in our e-rolodex and go immediately to an LKNSBN member’s website.
              </p>
            </div>
            <Link href="/members" data-slot="button" className={cn(buttonVariants({ size: 'lg' }), 'shrink-0')}>
              See all
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {preview.map((business, index) => (
              <MemberCard key={`${business.category}-${business.business_name}-${index}`} business={business} index={index} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/members" data-slot="button" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}>
              See all members
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8fb]">
        <div className="mx-auto grid max-w-[1380px] gap-10 px-5 py-14 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-20">
          <div>
            <SectionLabel>Rules</SectionLabel>
            <h2 className="home-display mt-3 text-4xl leading-[1.05] sm:text-5xl">
              We lead networking groups in being in the know.
            </h2>
          </div>
          <ul className="divide-y divide-[#cdd7e4] border-y border-[#cdd7e4]">
            {rules.map((rule) => (
              <li key={rule} className="flex items-center gap-3 py-4 text-lg text-[#0f212b]">
                <ChevronRight className="shrink-0 text-[#0b3d91]" size={18} />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 py-14 lg:px-10 lg:py-20">
        <h2 className="home-display max-w-4xl text-4xl leading-[1.05] sm:text-6xl">Our relationships are priceless.</h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-base leading-7 text-[#3d4c5c]">
            <p className="text-lg font-semibold text-[#0f212b]">Know, Like, Trust (KLT) professionals</p>
            <p>
              And we have a free membership business card website, four popular marketing Facebook group pages, LinkedIn, X, weekly and monthly meetings, and special events that make a difference in building business, alliances, and partnerships that allow opportunities and forever relationships.
            </p>
            <p>
              Our Facebook group page is a community bulletin board for events, shout-outs, info sharing, the calendar, masterminding, incubation, small business articles, links to help us get better, and more.
            </p>
            <p>Maximize our pages by showing up at events. It is that easy. No selling and no ISO on the main group page. Thank you.</p>
            <p>
              Contact the LKNSBN Chair: Jim Vogel{' '}
              <a href="mailto:lknsbn@yahoo.com" className="font-semibold text-[#0b3d91] underline decoration-[#7ec1f3] underline-offset-4">lknsbn@yahoo.com</a>{' '}
              for further information.
              <br />
              Text <a href="tel:7048006152" className="font-semibold text-[#0b3d91]">704 800 6152</a>
            </p>
          </div>
          <div className="space-y-8">
            <div className="rounded-lg border border-[#cdd7e4] bg-[#f4f8fb] p-6">
              <p className="text-sm font-semibold uppercase tracking-[.14em] text-[#0b3d91]">No spam here</p>
              <p className="mt-3 text-base leading-7 text-[#3d4c5c]">
                Please refrain from marketing, advertising, and selling on this page. Use our marketing and shopping pages.
              </p>
            </div>
            <div>
              <p className="text-sm text-[#5b5b5b]">https://www.lknsbn.com/</p>
              <a href="https://www.lknsbn.com/" target="_blank" rel="noreferrer" data-slot="button" className={cn(buttonVariants({ size: 'lg' }), 'mt-3')}>
                Go
              </a>
            </div>
            <div>
              <p className="text-lg font-semibold text-[#0f212b]">Marketing info</p>
              <p className="mt-3 text-base leading-7 text-[#3d4c5c]">
                Put your ads, apps, marketing, and self-promos on the following group marketing page. This is the place to advertise what you do.
              </p>
              <a href="https://www.facebook.com/groups/shoplakenormanlkn" target="_blank" rel="noreferrer" className="mt-3 inline-block break-all text-sm font-semibold text-[#0b3d91] underline decoration-[#7ec1f3] underline-offset-4">
                https://www.facebook.com/groups/shoplakenormanlkn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-[#cdd7e4] bg-[#f4f8fb]">
        <div className="mx-auto max-w-[900px] px-5 py-14 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[.16em] text-[#0b3d91]">2026 LKNSBN FAQs</p>
          <h2 className="home-display mt-3 text-4xl leading-tight sm:text-5xl">Frequently asked questions</h2>
          <Accordion type="single" collapsible defaultValue="what" className="mt-8">
            {faqs.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-[#cdd7e4]">
                <AccordionTrigger className="home-display py-5 text-left text-xl font-normal text-[#0f212b] hover:no-underline sm:text-2xl">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-7 text-[#3d4c5c]">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
}
