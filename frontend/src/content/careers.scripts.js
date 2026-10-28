// 1. Job Filtering by Department and Location
    const filterDept = document.getElementById('filter-dept');
    const filterLocation = document.getElementById('filter-location');
    const jobRows = document.querySelectorAll('.job-row');
    const jobsCount = document.getElementById('jobs-count');
    const noJobsFound = document.getElementById('no-jobs-found');

    function filterJobs() {
      const selectedDept = filterDept.value;
      const selectedLocation = filterLocation.value;
      let visibleCount = 0;

      jobRows.forEach(row => {
        const rowDept = row.getAttribute('data-dept');
        const rowLocation = row.getAttribute('data-location');

        const matchDept = (selectedDept === 'all' || rowDept === selectedDept);
        const matchLocation = (selectedLocation === 'all' || rowLocation === selectedLocation);

        if (matchDept && matchLocation) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      jobsCount.textContent = `(${visibleCount})`;
      if (visibleCount === 0) {
        noJobsFound.classList.add('is-visible');
      } else {
        noJobsFound.classList.remove('is-visible');
      }
    }

    if (filterDept && filterLocation) {
      filterDept.addEventListener('change', filterJobs);
      filterLocation.addEventListener('change', filterJobs);
    }

    // 2. Application Modal
    const applyModal = document.getElementById('apply-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDept = document.getElementById('modal-dept');
    const applyJobInput = document.getElementById('apply-job-input');
    const applyDeptInput = document.getElementById('apply-dept-input');
    const applicationForm = document.getElementById('career-application-form');

    function openApplyModal(title, dept) {
      modalTitle.textContent = title;
      modalDept.textContent = dept.toUpperCase();
      applyJobInput.value = title;
      applyDeptInput.value = dept;
      applyModal.classList.add('is-open');
      applyModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeApplyModal() {
      applyModal.classList.remove('is-open');
      applyModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (modalClose) {
      modalClose.addEventListener('click', closeApplyModal);
    }

    if (applyModal) {
      applyModal.addEventListener('click', (e) => {
        if (e.target === applyModal) {
          closeApplyModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && applyModal && applyModal.classList.contains('is-open')) {
        closeApplyModal();
      }
    });

    if (applicationForm) {
      applicationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const applicantName = document.getElementById('applicant-name').value;
        const job = applyJobInput.value;
        alert(`Thank you, ${applicantName}! Your application for "${job}" has been received. Our talent team will get back to you shortly.`);
        closeApplyModal();
        applicationForm.reset();
      });
    }

    // Sticky Header Scroll
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
      const handleHeaderScroll = () => {
        if (window.scrollY > 40) {
          siteHeader.classList.add('is-sticky');
        } else {
          siteHeader.classList.remove('is-sticky');
        }
      };
      window.addEventListener('scroll', handleHeaderScroll, { passive: true });
      handleHeaderScroll();
    }

    // 3. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileDrawer = document.querySelector('.nav-mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-links a');
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileBtn.classList.toggle('open');
        mobileDrawer.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileBtn.classList.remove('open');
          mobileDrawer.classList.remove('open');
          document.body.style.overflow = '';
        });
      });

      document.addEventListener('click', (e) => {
        if (mobileDrawer.classList.contains('open') && !mobileDrawer.contains(e.target) && !mobileBtn.contains(e.target)) {
          mobileBtn.classList.remove('open');
          mobileDrawer.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    // 4. Back to Top Scroll Behavior
    const backToTopBtn = document.getElementById('back-to-top');
    const progressCircle = document.getElementById('progress-circle');
    const circumference = 2 * Math.PI * 21; // r = 21

    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;

      if (scrollPos > 300) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }

      if (scrollTotal > 0 && progressCircle) {
        const scrollFraction = scrollPos / scrollTotal;
        const offset = circumference - (scrollFraction * circumference);
        progressCircle.style.strokeDashoffset = offset;
      }
    });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }