import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function runInlineScript(source) {
  if (!source?.trim()) return;
  const script = document.createElement('script');
  script.text = source;
  document.body.appendChild(script);
  script.remove();
}

export default function StaticPage({ html, inlineScript, bodyClass, extraCss = [] }) {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = bodyClass;
    document.documentElement.lang = 'en';
  }, [bodyClass]);

  useEffect(() => {
    const links = extraCss.map((file) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `/css/${file}`;
      link.dataset.nichePageCss = 'true';
      document.head.appendChild(link);
      return link;
    });

    return () => {
      links.forEach((link) => link.remove());
    };
  }, [extraCss]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const onClick = (event) => {
      const anchor = event.target.closest('a[href]');
      if (!anchor || anchor.target === '_blank') return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      if (href.startsWith('/#')) {
        event.preventDefault();
        const id = href.slice(2);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/');
          requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }));
        }
        return;
      }

      if (href.startsWith('/') && !href.includes('#')) {
        event.preventDefault();
        navigate(href);
      }
    };

    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [html, navigate]);

  useEffect(() => {
    runInlineScript(inlineScript);
    window.initNicheGlobalSite?.();
    window.scrollTo(0, 0);
  }, [html, inlineScript]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />;
}
