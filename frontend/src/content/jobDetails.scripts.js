(() => {
      // 1. Smooth Apply Button Scroll
      const heroApplyBtn = document.getElementById('btn-hero-apply');
      if (heroApplyBtn) {
        heroApplyBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById('apply-section');
          if (target) {
            const offset = 90;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
            // Highlight name input
            const nameInput = document.getElementById('apply-name');
            if (nameInput) setTimeout(() => nameInput.focus(), 600);
          }
        });
      }

      // 2. Share Job Button (Clipboard Copy)
      const shareBtn = document.getElementById('btn-share-job');
      if (shareBtn) {
        shareBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(window.location.href).then(() => {
            const span = shareBtn.querySelector('span');
            const original = span ? span.textContent : '';
            if (span) span.textContent = 'Link Copied!';
            setTimeout(() => {
              if (span) span.textContent = original;
            }, 2000);
          });
        });
      }

      // 3. File Upload Drag & Drop Feedback
      const resumeInput = document.getElementById('apply-resume');
      const fileNameDisplay = document.getElementById('file-name-display');
      const dropzone = document.getElementById('file-dropzone');

      if (resumeInput && fileNameDisplay) {
        resumeInput.addEventListener('change', () => {
          if (resumeInput.files && resumeInput.files[0]) {
            fileNameDisplay.textContent = 'Selected: ' + resumeInput.files[0].name;
            fileNameDisplay.style.display = 'block';
          }
        });
      }

      // 4. Job Application Form Submission Simulation
      const applyForm = document.getElementById('job-apply-form');
      const successBox = document.getElementById('apply-success-box');
      const submitBtn = document.getElementById('btn-submit-apply');

      if (applyForm && successBox) {
        applyForm.addEventListener('submit', (e) => {
          e.preventDefault();
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Submitting Application...</span>';
          }

          setTimeout(() => {
            applyForm.style.display = 'none';
            successBox.style.display = 'block';
          }, 800);
        });
      }
    })();
