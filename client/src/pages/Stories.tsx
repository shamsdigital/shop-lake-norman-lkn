/* LKNSBN brand: long-form stories use a narrow reading measure, quiet metadata rail, and archival imagery. */
import { Link, useRoute } from 'wouter';
import { ArrowLeft, ArrowUpRight, CalendarDays } from 'lucide-react';

const sponsors = ['Tara Attwood — New Penn Financial','Jim Vogel — I.M.U. Social Media','Regis Murphy — Helen Adams Realty, The Positive Real Estate Agent','Shelia Brabham Brumlow — OhanaKey','Brian and Tricia Sisson — The Range','Kimberly Fulford — Regency On Time Advantage (Regency OTA)','Trina Goodman — Social Teigh & Social Media Management','Jim Mooney — Keller Williams','Ravena Sapna Mahtani — Zija International','Anette Powell — Lip Sense by SeneGence International','Douglas Marion — Advanced Wealth Solutions','Chris Villani — Performance Coaching Unleashed','Danielle Ratliff — Serenity Now','Jodie Moyes — US Health Advisors','Katie Muir Stankiewicz — Willow Equine','Lori Yotes DiDonato — Untangled Salon','Matt Swanson — MS Digital Solutions','Rob Bennett — Charlotte Cycleboats','Jeannie DeSena — De Sena Words and Pictures','Todd Kofoed — Bigg Time Carpet & Upholstery','Cori Stuart — Right at Home','Bill Albert — Right at Home','John Burak — Majestik Home & Lawn','Kim Snyder — High Caliber Realtors','Charlie Elmers — PostNet Cornelius','Juan Zambrano — Photography','Kris Kane — Bank of the Ozarks','Lynn Alberts — The Lynn Project','Rob Debreczeni — Total Office Group','Wendy Lloyd — Coaching What Matters','Tim Pfeiffer — My Reputation Ninja','Karen Dortschy — Haute Dauge Portraits','Andy Piatt — Experimac','Maria Kemp — Beyond Decadence','Teri Tetta Lippy — Eleven Lakes Brewing','Dana and Chris Pape — Papemore Real Estate','Gary Nowicki — Zija International','Jen Dabiero — Gymboree','John McHugh — Ocaid Photography','Jose Lopez — Lopez Drywall','Leslie Costello — Avon','Marguerite White — Holly Receptionist','Sara Sleik — Concierge of LKN','Shawn Cooper — Tutor Doctor','Sheri Bowman — Bank of the Ozarks','Sylvia Moneti — Brain Balance','Todd Little — Little Heating and Cooling'];

const introStoryImage = '/branding-assets/lkn-network-meeting.jpg';
const holidayStoryImage = '/branding-assets/lkn-holiday-gathering.jpg';

function ArticleShell({ children, title, eyebrow, dek, date, image }: { children: React.ReactNode; title: string; eyebrow: string; dek: string; date: string; image: string }) {
  return <main><div className="mx-auto max-w-[1380px] px-5 pb-10 pt-14 lg:px-10 lg:pt-20"><Link href="/stories" className="eyebrow inline-flex items-center gap-2 text-[#0b3d91] hover:underline"><ArrowLeft size={14}/> Back to stories</Link><div className="mt-12 grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><div className="eyebrow mb-5 text-[#0b3d91]">{eyebrow}</div><h1 className="display text-5xl font-semibold leading-[.92] text-[#0b3d91] sm:text-7xl">{title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-[#4a5c70]">{dek}</p></div><img src={image} alt="" className="aspect-[1.65/1] w-full object-cover" /></div></div><div className="mx-auto grid max-w-[1120px] gap-12 px-5 pb-24 pt-12 lg:grid-cols-[180px_1fr] lg:px-10"><aside className="rule pt-4"><div className="eyebrow text-[#0b3d91]">Filed under</div><div className="mt-3 text-sm text-[#4a5c70]">Lake Norman Small Business Networking</div><div className="mt-7 flex items-center gap-2 text-xs text-[#4a5c70]"><CalendarDays size={14}/>{date}</div></aside><article className="prose prose-lg max-w-3xl prose-headings:font-sans prose-headings:tracking-tight prose-headings:text-[#0b3d91] prose-p:leading-8 prose-p:text-[#4a5c70] prose-a:text-[#0b3d91]">{children}</article></div></main>;
}

export function StoriesIndex() {
  return (
    <main className="mx-auto max-w-[1380px] px-5 pb-24 pt-16 lg:px-10 lg:pt-24">
      <div className="max-w-2xl">
        <div className="eyebrow mb-5 text-[#0b3d91]">From around the lake</div>
        <h1 className="display text-6xl font-semibold leading-[.9] text-[#0b3d91]">Stories from the network.</h1>
        <p className="mt-6 text-lg leading-8 text-[#4a5c70]">Notes on the gatherings, people, and small-business spirit that keep Lake Norman connected.</p>
      </div>
      <div className="mt-16 grid gap-7 lg:grid-cols-2">
        <Link href="/lknsbn-annual-holiday-party/" className="group border border-[#cdd7e4] bg-[#ffffff] p-4 transition hover:-translate-y-1 hover:border-[#0b3d91]">
          <img src={holidayStoryImage} alt="Warm holiday gathering table" className="aspect-[1.55/1] w-full object-cover" />
          <div className="p-4">
            <div className="eyebrow text-[#0b3d91]">Holiday cheer · December 2017</div>
            <h2 className="display mt-3 text-4xl font-semibold leading-none text-[#0b3d91]">A thank-you to our holiday sponsors</h2>
            <p className="mt-4 text-sm leading-6 text-[#4a5c70]">The fine professionals who helped make the annual holiday party and Rotary Club of Davidson Christmas Tree Fund possible.</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.13em] text-[#0b3d91]">Read the story <ArrowUpRight size={15}/></span>
          </div>
        </Link>
        <Link href="/introducing-lnsbn/" className="group border border-[#cdd7e4] bg-[#ffffff] p-4 transition hover:-translate-y-1 hover:border-[#0b3d91]">
          <img src={introStoryImage} alt="Local business owners meeting around Lake Norman" className="aspect-[1.55/1] w-full object-cover" />
          <div className="p-4">
            <div className="eyebrow text-[#0b3d91]">Where it started · September 2014</div>
            <h2 className="display mt-3 text-4xl font-semibold leading-none text-[#0b3d91]">How weekly Wednesdays began</h2>
            <p className="mt-4 text-sm leading-6 text-[#4a5c70]">The original invitation to connect weekly, show up locally, and build a stronger small-business community around the lake.</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.13em] text-[#0b3d91]">Read the story <ArrowUpRight size={15}/></span>
          </div>
        </Link>
      </div>
    </main>
  );
}

export function HolidayStory() {
  return (
    <ArticleShell
      eyebrow="Holiday cheer · December 2017"
      title="LKNSBN Annual Holiday Party SPONSORS"
      dek="These fine professionals contributed to the 2017 Rotary Club of Davidson Christmas Tree Fund and the annual LKNSBN Christmas Holiday Party at Bayne Brewing Company."
      date="December 8, 2017"
      image={holidayStoryImage}
    >
      <p>There is a particular kind of momentum that comes from a local business community choosing to show up for one another. In 2017, members of the Lake Norman Small Business Network came together to support the Rotary Club of Davidson Christmas Tree Fund and celebrate the season at Bayne Brewing Company.</p>
      <h2>With gratitude</h2>
      <p>We’re grateful to every professional who contributed time, energy, and resources to make the evening possible. Their names represent the generosity and connective spirit that makes this network feel like more than a list of names.</p>
      <div className="not-prose mt-8 grid gap-3 sm:grid-cols-2">{sponsors.map((sponsor) => <div key={sponsor} className="border-l-2 border-[#0b3d91] bg-[#e8eef5] px-4 py-3 text-sm leading-6 text-[#4a5c70]">{sponsor}</div>)}</div>
      <p className="mt-10">Thank you for helping make Lake Norman a place where small businesses can grow together.</p>
    </ArticleShell>
  );
}

export function BlogRoute() {
  const [, params] = useRoute('/blogs/:slug');
  return params?.slug === 'introducing-lnsbn' ? <Introducing/> : <HolidayStory/>;
}

export function Introducing() {
  return (
    <ArticleShell
      eyebrow="Where it started · September 2014"
      title="Introducing the Lake Norman Small Business Network"
      dek="A weekly invitation to connect, support, and make the local business community around the lake a little stronger."
      date="September 29, 2014"
      image={introStoryImage}
    >
      <p>The Lake Norman Small Business Network (LKNSBN) meets “Weekly Wednesdays” at 9 a.m. at Brick Row in Cornelius. Brick Row is located at 19725 Oak St. Unit 9, Cornelius NC 28031.</p>
      <p>Our “First Fridays” of every month are at Bin 110, 19712 W. Catawba Avenue, Cornelius, NC 28031. Our “Final Thursdays” of every month are sponsored by our members.</p>
      <h2>Come find your people</h2>
      <p>D9 Brewing Company, 11138 Treynorth Drive, Cornelius NC 28031, is another place the network gathers. For additional information, contact Jim Vogel at <a href="tel:9805330771">980 533 0771</a> or <a href="mailto:lknsbn@yahoo.com">lknsbn@yahoo.com</a>.</p>
      <p>Explore the community through the links below, then browse the member listings to meet the people and businesses keeping Lake Norman moving:</p>
      <ul>
        <li><a href="https://www.facebook.com/groups/LakeNormanSmallBusiness/" target="_blank" rel="noreferrer">Lake Norman Small Business Network on Facebook</a></li>
        <li><a href="https://www.facebook.com/groups/shoplakenorman/" target="_blank" rel="noreferrer">Shop Lake Norman</a></li>
        <li><a href="https://www.facebook.com/groups/shopcatawbaavenue/" target="_blank" rel="noreferrer">Shop Catawba Avenue</a></li>
        <li><a href="https://www.facebook.com/LKNSBNCommunityBloodDrive/" target="_blank" rel="noreferrer">LKNSBN Community Blood Drive</a></li>
      </ul>
      <h2>Your LKNSBN Board of Directors</h2>
      <p>Douglas Marion, Associate Chair<br/>Jim Vogel, Chair<br/>Regis Murphy, Secretary</p>
    </ArticleShell>
  );
}
