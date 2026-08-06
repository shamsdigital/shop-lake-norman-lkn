/* Carolina Editorial: all routes share one calm civic masthead and a consistent reading frame. */
import { Route, Switch } from 'wouter';
import { SiteLayout } from '@/components/SiteLayout';
import Home from '@/pages/Home';
import { About, Contact } from '@/pages/InfoPages';
import { Introducing, HolidayStory, StoriesIndex, BlogRoute } from '@/pages/Stories';
import NotFound from '@/pages/NotFound';

export default function App() {
  return <SiteLayout><Switch><Route path="/" component={Home}/><Route path="/stories" component={StoriesIndex}/><Route path="/lknsbn-annual-holiday-party/" component={HolidayStory}/><Route path="/introducing-lnsbn/" component={Introducing}/><Route path="/blogs/:slug" component={BlogRoute}/><Route path="/about" component={About}/><Route path="/contact" component={Contact}/><Route component={NotFound}/></Switch></SiteLayout>;
}
