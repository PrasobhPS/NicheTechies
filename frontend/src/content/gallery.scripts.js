document.addEventListener('DOMContentLoaded', () => {
      // Interactive Lightbox Logic
      const cards = Array.from(document.querySelectorAll('.bento-card'));
      const lightbox = document.getElementById('gallery-lightbox');
      const lightboxImg = document.getElementById('lightbox-image');
      const lightboxTitle = document.getElementById('lightbox-title');
      const lightboxSub = document.getElementById('lightbox-sub');
      const closeBtn = document.getElementById('lightbox-close');
      const backdrop = document.getElementById('lightbox-backdrop');
      const prevBtn = document.getElementById('lightbox-prev');
      const nextBtn = document.getElementById('lightbox-next');

      let currentIndex = 0;

      function openLightbox(index) {
        if (index < 0 || index >= cards.length) return;
        currentIndex = index;

        const card = cards[currentIndex];
        const fullSrc = card.getAttribute('data-full');

        lightboxImg.src = fullSrc;
        lightboxImg.alt = `Niche Techies Office photo ${currentIndex + 1}`;
        lightboxTitle.textContent = `Office Moment`;
        lightboxSub.textContent = `Photo ${currentIndex + 1} of ${cards.length}`;

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      function showPrev() {
        if (cards.length <= 1) return;
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        openLightbox(currentIndex);
      }

      function showNext() {
        if (cards.length <= 1) return;
        currentIndex = (currentIndex + 1) % cards.length;
        openLightbox(currentIndex);
      }

      cards.forEach((card, idx) => {
        card.addEventListener('click', () => openLightbox(idx));
      });

      if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
      if (backdrop) backdrop.addEventListener('click', closeLightbox);
      if (prevBtn) prevBtn.addEventListener('click', showPrev);
      if (nextBtn) nextBtn.addEventListener('click', showNext);

      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
      });
    });