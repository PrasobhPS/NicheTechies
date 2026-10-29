document.addEventListener('DOMContentLoaded', () => {
      // 1. Sticky Header
      const header = document.querySelector('.site-header');
      if (header) {
        const handleScroll = () => {
          if (window.scrollY > 40) {
            header.classList.add('is-sticky');
          } else {
            header.classList.remove('is-sticky');
          }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
      }



      // 3. Smooth Scroll to Section for Hero Explore Button
      const scrollBtn = document.getElementById('hero-scroll-btn');
      if (scrollBtn) {
        scrollBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById('cases-section');
          if (target) {
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      }

      // 4. Category Filtering Engine
      const filterButtons = document.querySelectorAll('.category-pill-btn');
      const caseCards = Array.from(document.querySelectorAll('.case-card'));
      const matchingCountEl = document.getElementById('matching-count');
      const emptyStateEl = document.getElementById('cases-empty-state');
      const btnResetCases = document.getElementById('btn-reset-cases');

      let activeFilter = 'all';

      function applyFilter(category) {
        activeFilter = category;
        let visibleCount = 0;

        caseCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden-card');
            visibleCount++;
          } else {
            card.classList.add('hidden-card');
          }
        });

        // Update feedback count
        if (matchingCountEl) {
          matchingCountEl.textContent = visibleCount;
        }

        // Toggle Empty State
        if (emptyStateEl) {
          if (visibleCount === 0) {
            emptyStateEl.classList.add('active');
          } else {
            emptyStateEl.classList.remove('active');
          }
        }
      }

      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          filterButtons.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
          const bar = btn.closest('.category-pills-list') || btn.parentElement;
          if (bar) {
            const targetScroll = btn.offsetLeft - (bar.clientWidth / 2) + (btn.offsetWidth / 2);
            bar.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
          }

          const category = btn.getAttribute('data-filter') || 'all';
          applyFilter(category);
        });
      });

      // Reset Button in Empty State
      if (btnResetCases) {
        btnResetCases.addEventListener('click', () => {
          const allBtn = document.querySelector('.category-pill-btn[data-filter="all"]');
          if (allBtn) {
            allBtn.click();
          }
        });
      }

      // 5. Back to Top Progress Ring
      const backToTopBtn = document.getElementById('back-to-top');
      const progressRing = document.querySelector('.progress-ring-fill');

      if (backToTopBtn && progressRing) {
        const radius = 21;
        const circumference = 2 * Math.PI * radius; // ~131.95
        progressRing.style.strokeDasharray = `${circumference}`;
        progressRing.style.strokeDashoffset = `${circumference}`;

        const updateBackToTop = () => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;

          if (scrollY > 300) {
            backToTopBtn.classList.add('is-visible');
            backToTopBtn.classList.add('visible');
          } else {
            backToTopBtn.classList.remove('is-visible');
            backToTopBtn.classList.remove('visible');
          }

          if (docHeight > 0) {
            const scrollPercent = Math.min(Math.max(scrollY / docHeight, 0), 1);
            const offset = circumference - (scrollPercent * circumference);
            progressRing.style.strokeDashoffset = offset;
          }
        };

        window.addEventListener('scroll', updateBackToTop, { passive: true });
        updateBackToTop();

        backToTopBtn.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }
    });