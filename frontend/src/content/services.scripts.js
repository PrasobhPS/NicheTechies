document.addEventListener('DOMContentLoaded', () => {
      // 1. Category Filtering for Services
      const filterButtons = document.querySelectorAll('.filter-pill');
      const serviceCards = document.querySelectorAll('.service-saas-card');

      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          filterButtons.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

          const category = btn.getAttribute('data-filter') || 'all';

          serviceCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
              card.classList.remove('hidden-card');
            } else {
              card.classList.add('hidden-card');
            }
          });

          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
          }
        });
      });

      // 2. Smooth Scroll for Explore Button
      const exploreBtn = document.getElementById('btn-explore-services');
      if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById('services-grid');
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

    });