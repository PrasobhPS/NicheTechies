// 1. Mobile Menu Drawer Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navDrawer = document.querySelector('.nav-mobile-drawer');
    const contactMobileLinks = document.querySelectorAll('.mobile-links a');

    if (mobileMenuBtn && navDrawer) {
      mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileMenuBtn.classList.toggle('open');
        navDrawer.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      contactMobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenuBtn.classList.remove('open');
          navDrawer.classList.remove('open');
          document.body.style.overflow = '';
        });
      });

      document.addEventListener('click', (e) => {
        if (navDrawer.classList.contains('open') && !navDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          mobileMenuBtn.classList.remove('open');
          navDrawer.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    // 2. FAQ Accordion Toggle
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.faq-item');
        const isOpen = item.classList.contains('is-open');

        // Close other accordion items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
            otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // 3. Form Submission Simulation with feedback
    function handleFormSubmit() {
      const submitBtn = document.getElementById('btn-submit-message');
      const originalHTML = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Sending Message...</span>
      `;

      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Message Sent Successfully!</span>
        `;
        submitBtn.style.backgroundColor = '#16a34a';

        setTimeout(() => {
          document.getElementById('contact-page-form').reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
          submitBtn.style.backgroundColor = '';
        }, 3500);
      }, 1000);
    }

    // 3b. Interactive Service Chips & Mobile Dropdown Sync
    const serviceChips = document.querySelectorAll('.service-chip');
    const serviceSelect = document.getElementById('service-select-dropdown');
    const hiddenServiceInput = document.getElementById('selected-service-input');

    if (serviceChips.length > 0) {
      serviceChips.forEach(chip => {
        chip.addEventListener('click', () => {
          const val = chip.getAttribute('data-service');
          serviceChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          if (hiddenServiceInput) hiddenServiceInput.value = val;
          if (serviceSelect) serviceSelect.value = val;
        });
      });
    }

    if (serviceSelect) {
      serviceSelect.addEventListener('change', () => {
        const val = serviceSelect.value;
        if (hiddenServiceInput) hiddenServiceInput.value = val;
        serviceChips.forEach(chip => {
          if (chip.getAttribute('data-service') === val) {
            chip.classList.add('active');
          } else {
            chip.classList.remove('active');
          }
        });
      });
    }

    // 4. Back to Top Button Behavior
    const backToTopBtn = document.getElementById('back-to-top');
    const progressCircle = document.querySelector('.progress-ring-fill');

    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

        if (scrollTop > 300) {
          backToTopBtn.classList.add('is-visible');
        } else {
          backToTopBtn.classList.remove('is-visible');
        }

        if (progressCircle) {
          const circumference = 2 * Math.PI * 21; // r = 21 -> 131.95
          const offset = circumference - (progress * circumference);
          progressCircle.style.strokeDasharray = `${circumference}`;
          progressCircle.style.strokeDashoffset = `${offset}`;
        }
      });

      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // 5. Sticky Header Effect
    const siteHeader = document.getElementById('site-header');
    const contactHero = document.querySelector('.contact-hero-section');
    if (siteHeader) {
      const handleScroll = () => {
        const threshold = contactHero ? (contactHero.offsetHeight - 90) : 40;
        if (window.scrollY > threshold) {
          siteHeader.classList.add('is-sticky');
        } else {
          siteHeader.classList.remove('is-sticky');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }