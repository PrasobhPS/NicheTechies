import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function runInlineScript(source) {
  if (!source || !source.trim()) return;

  const origAddEventListener = document.addEventListener;
  const deferredHandlers = [];

  document.addEventListener = function (type, listener, options) {
    if (type === 'DOMContentLoaded' && document.readyState !== 'loading') {
      deferredHandlers.push(listener);
      return;
    }
    return origAddEventListener.call(document, type, listener, options);
  };

  try {
    const script = document.createElement('script');
    script.text = source;
    document.body.appendChild(script);
    script.remove();
  } finally {
    document.addEventListener = origAddEventListener;
  }

  deferredHandlers.forEach((handler) => {
    try {
      if (typeof handler === 'function') {
        handler(new Event('DOMContentLoaded'));
      } else if (handler && typeof handler.handleEvent === 'function') {
        handler.handleEvent(new Event('DOMContentLoaded'));
      }
    } catch (e) {
      console.error('Error executing deferred script handler:', e);
    }
  });
}

export default function StaticPage(props) {
  const { html, inlineScript, bodyClass } = props || {};
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (bodyClass) {
      document.body.className = bodyClass;
    }
    document.documentElement.lang = 'en';
  }, [bodyClass]);

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
    window.scrollTo(0, 0);

    if (inlineScript) {
      runInlineScript(inlineScript);
    }

    window.initNicheGlobalSite?.();

    const rafId = requestAnimationFrame(() => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    });

    const root = containerRef.current;
    if (root) {
      const images = root.querySelectorAll('img');
      images.forEach((img) => {
        if (!img.complete) {
          img.addEventListener('load', () => window.ScrollTrigger?.refresh(), { once: true });
        }
      });
    }

    return () => cancelAnimationFrame(rafId);
  }, [html, inlineScript]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html || '' }} />;
}
