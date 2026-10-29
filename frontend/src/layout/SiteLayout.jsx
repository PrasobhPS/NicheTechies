import React from 'react';
import { Outlet } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import BackToTop from '../components/BackToTop';
import useExternalScripts from '../hooks/useExternalScripts';

export default function SiteLayout() {
  const scriptsReady = useExternalScripts();

  if (!scriptsReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-600 font-body">
        Loading…
      </div>
    );
  }

  return (
    <div className="site-root">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
