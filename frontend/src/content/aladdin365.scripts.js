document.addEventListener('DOMContentLoaded', () => {
      // 1. Back to Top Ring & Scroll Progress
      const backToTopBtn = document.getElementById('back-to-top');
      const progressRingFill = document.querySelector('.progress-ring-fill');
      const circumference = 2 * Math.PI * 21; // r=21 -> ~131.95

      if (progressRingFill) {
        progressRingFill.style.strokeDasharray = `${circumference} ${circumference}`;
        progressRingFill.style.strokeDashoffset = circumference;
      }

      const onScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;

        // Back to top button visibility & ring
        if (backToTopBtn) {
          if (scrollTop > 350) {
            backToTopBtn.classList.add('visible');
          } else {
            backToTopBtn.classList.remove('visible');
          }

          if (progressRingFill) {
            const offset = circumference - (scrollPercent * circumference);
            progressRingFill.style.strokeDashoffset = offset;
          }
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

      // 3. Scrollspy Table of Contents Navigation
      const tocLinks = document.querySelectorAll('#project-toc-list a');
      const sections = Array.from(tocLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

      const updateTocSpy = () => {
        const scrollPos = window.scrollY + 140;
        let currentSectionId = '';

        sections.forEach(sec => {
          if (sec && sec.offsetTop <= scrollPos) {
            currentSectionId = sec.getAttribute('id');
          }
        });

        if (currentSectionId) {
          tocLinks.forEach(link => {
            const matches = link.getAttribute('href') === '#' + currentSectionId;
            link.classList.toggle('active', matches);
          });
        }
      };

      window.addEventListener('scroll', updateTocSpy, { passive: true });
      updateTocSpy();

      // Smooth TOC Anchor Scroll with Header Offset
      tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            const offset = 85;
            const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
          }
        });
      });
    });