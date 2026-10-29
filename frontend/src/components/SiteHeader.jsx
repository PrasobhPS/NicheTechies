import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/blog', label: 'Blog' },
  { to: '/careers', label: 'Careers' },
];

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu on browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setIsMenuOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Lock body scroll and handle escape key when mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header" id="site-header">
      <div className="header-container">
        <Link to="/" className="brand-logo" aria-label="Niche Techies Home" onClick={closeMenu}>
          <img src="/assets/images/logo.png" alt="Niche Techies" className="brand-logo-img" />
        </Link>

        <nav className="nav-desktop" aria-label="Main Navigation">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/contact" className="btn-talk" id="btn-header-talk" onClick={closeMenu}>
            <span>Get in Touch</span>
            <ArrowIcon />
          </Link>

          <button
            type="button"
            className={`mobile-menu-btn${isMenuOpen ? ' open' : ''}`}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            data-menu-bound="true"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`nav-mobile-drawer${isMenuOpen ? ' open' : ''}`}>
        <div className="mobile-links">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/services" onClick={closeMenu}>Services</Link>
          <Link to="/case-studies" onClick={closeMenu}>Case Studies</Link>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <Link to="/careers" onClick={closeMenu}>Careers</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </div>
        <div>
          <Link to="/contact" className="btn-talk w-full justify-center" onClick={closeMenu}>
            <span>Get in Touch</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}
