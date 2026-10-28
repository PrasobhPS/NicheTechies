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
  return (
    <header className="site-header" id="site-header">
      <div className="header-container">
        <Link to="/" className="brand-logo" aria-label="Niche Techies Home">
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
          <Link to="/contact" className="btn-talk" id="btn-header-talk">
            <span>Get in Touch</span>
            <ArrowIcon />
          </Link>

          <button type="button" className="mobile-menu-btn" aria-label="Toggle Navigation Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav-mobile-drawer">
        <div className="mobile-links">
          <Link to="/#home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/case-studies">Case Studies</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <Link to="/contact" className="btn-talk w-full justify-center">
            <span>Get in Touch</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}
