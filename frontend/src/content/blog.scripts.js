(() => {
      const tabButtons = document.querySelectorAll('.blog-filter-tabs .tab-btn');
      const blogCards = Array.from(document.querySelectorAll('.blog-grid .blog-card'));
      const searchInput = document.getElementById('blog-search-input');
      const clearSearchBtn = document.getElementById('blog-search-clear');
      const emptyState = document.getElementById('blog-empty-state');
      const emptyDesc = document.getElementById('empty-desc');
      const searchFeedback = document.getElementById('search-feedback');
      const feedbackText = document.getElementById('feedback-text');
      const resetFiltersBtn = document.getElementById('btn-reset-filters');
      const emptyResetBtn = document.getElementById('btn-empty-reset');

      // Pagination elements
      const paginationWrap = document.getElementById('blog-pagination');
      const paginationPages = document.getElementById('pagination-pages');
      const prevPageBtn = document.getElementById('btn-prev-page');
      const nextPageBtn = document.getElementById('btn-next-page');

      const ITEMS_PER_PAGE = 6;
      let currentPage = 1;
      let currentCategory = 'all';
      let currentQuery = '';

      function filterAndPaginate(resetPage = false) {
        if (resetPage) {
          currentPage = 1;
        }

        const query = currentQuery.trim().toLowerCase();

        // 1. Identify matching cards
        const matchingCards = blogCards.filter(card => {
          const category = card.getAttribute('data-category') || '';
          const title = (card.querySelector('.blog-card-title')?.textContent || '').toLowerCase();
          const excerpt = (card.querySelector('.blog-card-excerpt')?.textContent || '').toLowerCase();
          const tag = (card.querySelector('.meta-tag')?.textContent || '').toLowerCase();

          const matchesCategory = currentCategory === 'all' || category === currentCategory;
          const matchesQuery = !query || title.includes(query) || excerpt.includes(query) || tag.includes(query);

          return matchesCategory && matchesQuery;
        });

        const totalMatching = matchingCards.length;
        const totalPages = Math.ceil(totalMatching / ITEMS_PER_PAGE) || 1;

        if (currentPage > totalPages) {
          currentPage = totalPages;
        }
        if (currentPage < 1) {
          currentPage = 1;
        }

        // 2. Hide all cards, then reveal only those for the current page
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        blogCards.forEach(card => card.classList.add('hidden-card'));

        matchingCards.forEach((card, index) => {
          if (index >= startIndex && index < endIndex) {
            card.classList.remove('hidden-card');
          }
        });

        // 3. Render Pagination
        renderPagination(totalPages, totalMatching);

        // 4. Clear search button visibility
        if (query.length > 0) {
          clearSearchBtn.classList.add('visible');
        } else {
          clearSearchBtn.classList.remove('visible');
        }

        // 5. Search feedback bar
        if (query.length > 0 || currentCategory !== 'all') {
          searchFeedback.classList.add('active');
          if (query.length > 0 && currentCategory !== 'all') {
            feedbackText.innerHTML = `Showing <strong>${totalMatching}</strong> result${totalMatching === 1 ? '' : 's'} for "<strong>${escapeHtml(query)}</strong>" in selected category`;
          } else if (query.length > 0) {
            feedbackText.innerHTML = `Showing <strong>${totalMatching}</strong> result${totalMatching === 1 ? '' : 's'} for "<strong>${escapeHtml(query)}</strong>"`;
          } else {
            feedbackText.innerHTML = `Showing <strong>${totalMatching}</strong> article${totalMatching === 1 ? '' : 's'} in selected category`;
          }
        } else {
          searchFeedback.classList.remove('active');
        }

        // 6. Empty state
        if (totalMatching === 0) {
          emptyState.classList.add('active');
          if (query) {
            emptyDesc.textContent = `We couldn't find any articles matching "${query}". Try different search terms or clear your filters.`;
          } else {
            emptyDesc.textContent = "We haven't published articles in this category yet. Check back soon!";
          }
        } else {
          emptyState.classList.remove('active');
        }
      }

      function renderPagination(totalPages, totalMatching) {
        if (!paginationWrap || !paginationPages) return;

        if (totalPages <= 1 || totalMatching === 0) {
          paginationWrap.classList.add('hidden-pagination');
          return;
        }

        paginationWrap.classList.remove('hidden-pagination');
        paginationPages.innerHTML = '';

        // Previous button state
        if (prevPageBtn) {
          prevPageBtn.disabled = currentPage === 1;
        }

        // Next button state
        if (nextPageBtn) {
          nextPageBtn.disabled = currentPage === totalPages;
        }

        // Build numbered page buttons
        for (let i = 1; i <= totalPages; i++) {
          const pageBtn = document.createElement('button');
          pageBtn.type = 'button';
          pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
          pageBtn.textContent = i;
          pageBtn.setAttribute('aria-label', `Page ${i}`);
          if (i === currentPage) {
            pageBtn.setAttribute('aria-current', 'page');
          }

          pageBtn.addEventListener('click', () => {
            if (currentPage !== i) {
              currentPage = i;
              filterAndPaginate(false);
              scrollToGrid();
            }
          });

          paginationPages.appendChild(pageBtn);
        }
      }

      function scrollToGrid() {
        const gridSection = document.querySelector('.blog-filter-section');
        if (gridSection) {
          gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      function escapeHtml(str) {
        return str.replace(/[&<>"']/g, m => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#039;'
        }[m]));
      }

      function resetAll() {
        currentCategory = 'all';
        currentQuery = '';
        if (searchInput) searchInput.value = '';
        tabButtons.forEach(b => {
          const isAll = b.getAttribute('data-filter') === 'all';
          b.classList.toggle('active', isAll);
          b.setAttribute('aria-selected', isAll ? 'true' : 'false');
        });
        filterAndPaginate(true);
      }

      // Prev & Next handlers
      prevPageBtn?.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          filterAndPaginate(false);
          scrollToGrid();
        }
      });

      nextPageBtn?.addEventListener('click', () => {
        const matching = blogCards.filter(card => {
          const category = card.getAttribute('data-category') || '';
          const title = (card.querySelector('.blog-card-title')?.textContent || '').toLowerCase();
          const excerpt = (card.querySelector('.blog-card-excerpt')?.textContent || '').toLowerCase();
          const tag = (card.querySelector('.meta-tag')?.textContent || '').toLowerCase();
          const query = currentQuery.trim().toLowerCase();
          return (currentCategory === 'all' || category === currentCategory) &&
            (!query || title.includes(query) || excerpt.includes(query) || tag.includes(query));
        });
        const totalPages = Math.ceil(matching.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
          currentPage++;
          filterAndPaginate(false);
          scrollToGrid();
        }
      });

      // Tab button clicks
      tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          tabButtons.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
          currentCategory = btn.getAttribute('data-filter') || 'all';
          filterAndPaginate(true);
        });
      });

      // Search input typing
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          currentQuery = e.target.value;
          filterAndPaginate(true);
        });
      }

      // Clear search button click
      if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
          searchInput.value = '';
          currentQuery = '';
          searchInput.focus();
          filterAndPaginate(true);
        });
      }

      // Reset filters button clicks
      resetFiltersBtn?.addEventListener('click', resetAll);
      emptyResetBtn?.addEventListener('click', resetAll);

      // Initial run
      filterAndPaginate(true);
    })();