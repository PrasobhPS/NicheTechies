import { useEffect, useState } from 'react';

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

export default function useExternalScripts() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!window.tailwind) {
          await loadScript('https://cdn.tailwindcss.com');
          window.tailwind.config = {
            theme: {
              extend: {
                colors: {
                  navy: {
                    950: '#070e1b',
                    900: '#0a1120',
                    850: '#0b1426',
                    800: '#0f192d',
                    700: '#16243f',
                  },
                  techBlue: {
                    400: '#3a5075',
                    500: '#253b61',
                    600: '#1a2b4b',
                  },
                },
                fontFamily: {
                  heading: ['Plus Jakarta Sans', 'sans-serif'],
                  body: ['Inter', 'sans-serif'],
                },
              },
            },
          };
        }

        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');
        if (window.gsap && window.ScrollTrigger) {
          window.gsap.registerPlugin(window.ScrollTrigger);
        }
        await loadScript('/js/main.js');

        if (!cancelled) setReady(true);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
