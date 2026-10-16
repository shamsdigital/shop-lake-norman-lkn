import { useEffect } from 'react';

const DEFAULT_TITLE = 'Lake Norman Small Business Network | Shop Lake Norman';
const DEFAULT_DESCRIPTION =
  'Free small business directory and networking group serving Cornelius, Davidson, Mooresville, Huntersville, and the Lake Norman community.';

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description);
    }
    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaProperty('twitter:title', title);
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', description);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      if (meta) {
        meta.setAttribute('content', DEFAULT_DESCRIPTION);
      }
      setMetaProperty('og:title', DEFAULT_TITLE);
      setMetaProperty('og:description', DEFAULT_DESCRIPTION);
      setMetaProperty('twitter:title', DEFAULT_TITLE);
      if (twitterDesc) {
        twitterDesc.setAttribute('content', DEFAULT_DESCRIPTION);
      }
    };
  }, [title, description]);

  return null;
}

