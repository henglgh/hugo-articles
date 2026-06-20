document.addEventListener("DOMContentLoaded", function() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const tabsHeader = document.getElementById('tabsHeader');
  const prevBtn = document.getElementById('tabsPrevBtn');
  const nextBtn = document.getElementById('tabsNextBtn');

  if (tabsHeader && prevBtn && nextBtn) {
    const scrollAmount = 220;

    function checkOverflow() {
      const hasHorizontalScroll = tabsHeader.scrollWidth > tabsHeader.clientWidth + 1;
      return hasHorizontalScroll;
    }

    function showNavButtons() {
      prevBtn.style.cssText = 'display: flex !important; opacity: 1; pointer-events: auto;';
      nextBtn.style.cssText = 'display: flex !important; opacity: 1; pointer-events: auto;';
      tabsHeader.style.paddingLeft = '';
      tabsHeader.style.paddingRight = '';
    }

    function hideNavButtons() {
      prevBtn.style.cssText = 'display: none !important;';
      nextBtn.style.cssText = 'display: none !important;';
      tabsHeader.style.paddingLeft = '0';
      tabsHeader.style.paddingRight = '0';
    }

    function updateNavButtons() {
      const hasOverflow = checkOverflow();

      if (!hasOverflow) {
        hideNavButtons();
      } else {
        showNavButtons();

        const isAtStart = tabsHeader.scrollLeft <= 5;
        const isAtEnd = tabsHeader.scrollLeft >= tabsHeader.scrollWidth - tabsHeader.clientWidth - 5;

        if (isAtStart) {
          prevBtn.style.opacity = '0.3';
          prevBtn.style.pointerEvents = 'none';
        }

        if (isAtEnd) {
          nextBtn.style.opacity = '0.3';
          nextBtn.style.pointerEvents = 'none';
        }
      }
    }

    prevBtn.addEventListener('click', function() {
      tabsHeader.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', function() {
      tabsHeader.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });

    let resizeTimeout;
    let scrollTimeout;

    tabsHeader.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        requestAnimationFrame(updateNavButtons);
      }, 16);
    });

    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateNavButtons, 100);
    });

    const initChecks = [0, 50, 100, 200, 500];
    initChecks.forEach(function(delay) {
      setTimeout(updateNavButtons, delay);
    });
  }

  const ITEMS_PER_PAGE = 10;
  let paginationStates = {};

  function initPagination(pane) {
    const entries = pane.querySelectorAll('.content-entry');
    if (entries.length <= ITEMS_PER_PAGE) return null;

    const paneId = pane.getAttribute('data-tab-content') || Math.random().toString();
    const state = {
      currentPage: 1,
      totalPages: Math.ceil(entries.length / ITEMS_PER_PAGE),
      totalItems: entries.length
    };

    paginationStates[paneId] = state;
    entries.forEach((entry, index) => {
      entry.dataset.pageIndex = index + 1;
    });

    createPaginationControls(pane, paneId);
    updatePaginationDisplay(pane, state);

    return state;
  }

  function createPaginationControls(pane, paneId) {
    let controls = pane.querySelector('.pagination-controls');
    if (!controls) {
      controls = document.createElement('div');
      controls.className = 'pagination-controls';
      controls.innerHTML = `
        <button class="pagination-prev" title="上一页">‹</button>
        <span class="pagination-info"></span>
        <button class="pagination-next" title="下一页">›</button>
      `;
      pane.appendChild(controls);

      controls.querySelector('.pagination-prev').addEventListener('click', function() {
        changePage(pane, paneId, -1);
      });

      controls.querySelector('.pagination-next').addEventListener('click', function() {
        changePage(pane, paneId, 1);
      });
    }
  }

  function updatePaginationDisplay(pane, state) {
    const entries = pane.querySelectorAll('.content-entry');
    const start = (state.currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    entries.forEach(entry => {
      const index = parseInt(entry.dataset.pageIndex);
      if (index > start && index <= end) {
        entry.style.display = '';
      } else {
        entry.style.display = 'none';
      }
    });

    const infoEl = pane.querySelector('.pagination-info');
    if (infoEl) {
      infoEl.textContent = `${state.currentPage} / ${state.totalPages}`;
    }

    const prevBtn = pane.querySelector('.pagination-prev');
    const nextBtn = pane.querySelector('.pagination-next');

    if (prevBtn) {
      prevBtn.disabled = state.currentPage === 1;
      prevBtn.style.opacity = state.currentPage === 1 ? '0.3' : '1';
      prevBtn.style.cursor = state.currentPage === 1 ? 'not-allowed' : 'pointer';
    }

    if (nextBtn) {
      nextBtn.disabled = state.currentPage === state.totalPages;
      nextBtn.style.opacity = state.currentPage === state.totalPages ? '0.3' : '1';
      nextBtn.style.cursor = state.currentPage === state.totalPages ? 'not-allowed' : 'pointer';
    }
  }

  function changePage(pane, paneId, direction) {
    const state = paginationStates[paneId];
    if (!state) return;

    const newPage = state.currentPage + direction;
    if (newPage < 1 || newPage > state.totalPages) return;

    state.currentPage = newPage;
    updatePaginationDisplay(pane, state);

    pane.scrollTop = 0;
  }

  function resetPaginationState(paneId) {
    if (paginationStates[paneId]) {
      paginationStates[paneId].currentPage = 1;
      const pane = document.querySelector(`[data-tab-content="${paneId}"]`);
      if (pane) {
        updatePaginationDisplay(pane, paginationStates[paneId]);
      }
    }
  }

  window.initTabPagination = function(pane) {
    return initPagination(pane);
  };

  window.resetTabPagination = function(paneId) {
    resetPaginationState(paneId);
  };

  window.paginationStates = paginationStates;

  tabPanes.forEach(function(pane) {
    initPagination(pane);
  });

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tag = this.getAttribute('data-tag');

      if (window.homeSearchSwitchToTab) {
        window.homeSearchSwitchToTab(tag);
      } else {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        this.classList.add('active');
        const targetPane = document.querySelector(`[data-tab-content="${tag}"]`);
        if (targetPane) {
          targetPane.classList.add('active');
          resetPaginationState(tag);
          const state = paginationStates[tag];
          if (state) {
            updatePaginationDisplay(targetPane, state);
          }
        }
      }
    });
  });
});