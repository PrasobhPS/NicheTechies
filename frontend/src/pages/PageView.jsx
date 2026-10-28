import { useEffect } from 'react';
import StaticPage from '../components/StaticPage';
import pages from './pageRegistry';

function decodeTitle(title) {
  const el = document.createElement('textarea');
  el.innerHTML = title;
  return el.value;
}

export default function PageView({ pageKey }) {
  const page = pages[pageKey];

  useEffect(() => {
    if (page?.title) {
      document.title = decodeTitle(page.title);
    }
  }, [page]);

  if (!page) {
    return null;
  }

  return (
    <StaticPage
      html={page.html}
      inlineScript={page.inlineScript}
      bodyClass={page.bodyClass}
      extraCss={page.css}
    />
  );
}
