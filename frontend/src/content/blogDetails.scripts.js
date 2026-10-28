document.addEventListener('DOMContentLoaded', () => {
      // 1. Reading Progress Bar
      const progressBar = document.getElementById('reading-progress-bar');
      const updateReadingProgress = () => {
        if (!progressBar) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const progress = (window.scrollY / totalHeight) * 100;
          progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
        }
      };
      window.addEventListener('scroll', updateReadingProgress, { passive: true });
      updateReadingProgress();

      // 2. Table of Contents Scroll Spy
      const tocLinks = document.querySelectorAll('.toc-list .toc-link');
      const sections = Array.from(tocLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

      const updateTocSpy = () => {
        const scrollPos = window.scrollY + 120;
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

      // Smooth TOC Anchor Scroll with Offset
      tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            const offset = 90;
            const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
          }
        });
      });

      // 3. Copy Code Block Functionality
      const copyCodeBtn = document.getElementById('btn-copy-code');
      if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
          const codeEl = document.querySelector('.article-code-block code');
          if (codeEl) {
            navigator.clipboard.writeText(codeEl.innerText).then(() => {
              const label = copyCodeBtn.querySelector('span');
              if (label) label.textContent = 'Copied!';
              showToast('Code snippet copied to clipboard!');
              setTimeout(() => {
                if (label) label.textContent = 'Copy';
              }, 2200);
            }).catch(() => {
              showToast('Unable to copy code snippet.');
            });
          }
        });
      }

      // 4. Copy Article Link with Toast
      const copyLinkBtn = document.getElementById('btn-copy-link');
      const toast = document.getElementById('share-toast');
      const toastMsg = document.getElementById('toast-message');
      let toastTimer = null;

      function showToast(msg) {
        if (!toast) return;
        if (toastMsg) toastMsg.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.classList.remove('show');
        }, 2500);
      }

      if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', (e) => {
          e.preventDefault();
          navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Article link copied to clipboard!');
          }).catch(() => {
            showToast('Article link copied!');
          });
        });
      }
    });