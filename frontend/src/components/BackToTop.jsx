export default function BackToTop() {
  return (
    <button type="button" className="back-to-top" id="back-to-top" aria-label="Back to top" title="Back to top">
      <svg className="progress-ring" width="48" height="48" viewBox="0 0 48 48">
        <circle className="progress-ring-bg" cx="24" cy="24" r="21" />
        <circle className="progress-ring-fill" cx="24" cy="24" r="21" />
      </svg>
      <span className="back-to-top-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </span>
    </button>
  );
}
