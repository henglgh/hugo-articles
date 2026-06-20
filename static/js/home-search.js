document.addEventListener("DOMContentLoaded", function() {
  const homeSearchInput = document.querySelector('.search-line-input');
  const tabsContainer = document.querySelector('.tabs-container');
  const tabsContent = document.querySelector('.tabs-content');
  const tabsWrapper = document.querySelector('.tabs-wrapper');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const noResultsMsg = document.querySelector('.search-no-results');

  let isSearching = false;
  let originalActiveTag = null;
  let isSearchFocused = false;
  let searchResultsContainer = null;

  if (homeSearchInput && tabsContainer) {
    homeSearchInput.addEventListener('focus', function() {
      const activeBtn = document.querySelector('.tab-btn.active');
      if (activeBtn) {
        originalActiveTag = activeBtn.getAttribute('data-tag');
      }
      enterFocusMode();

      if (this.value.trim() !== '') {
        createSearchResultsContainer();
        isSearching = true;
        searchAllTabs(this.value.toLowerCase().trim());
      }
    });

    homeSearchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();

      if (query === '') {
        clearSearchResults();
        isSearching = false;
        return;
      }

      if (!isSearching) {
        createSearchResultsContainer();
        isSearching = true;
      }

      searchAllTabs(query);
    });

    homeSearchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        this.value = '';
        this.dispatchEvent(new Event('input'));
        this.blur();
      }
    });

    homeSearchInput.addEventListener('blur', function(e) {
      setTimeout(() => {
        if (!homeSearchInput.contains(document.activeElement)) {
          exitFocusMode();
        }
      }, 150);
    });
  }

  document.addEventListener('click', function(e) {
    if (homeSearchInput && !homeSearchInput.contains(e.target)) {
      if (isSearchFocused || isSearching) {
        exitFocusMode();
      }
    }
  });

  function createSearchResultsContainer() {
    if (!searchResultsContainer) {
      hideFocusHint();
      searchResultsContainer = document.createElement('div');
      searchResultsContainer.className = 'search-results-container';
      searchResultsContainer.innerHTML = '<div class="search-no-results">没有找到匹配的文章</div>';
      tabsContent.appendChild(searchResultsContainer);
    }
  }

  function removeSearchResultsContainer() {
    if (searchResultsContainer && searchResultsContainer.parentNode) {
      searchResultsContainer.parentNode.removeChild(searchResultsContainer);
      searchResultsContainer = null;
    }
  }

  function enterFocusMode() {
    isSearchFocused = true;
    tabsContainer.classList.add('search-active');

    if (tabsWrapper) {
      tabsWrapper.style.display = 'none';
    }

    tabPanes.forEach(pane => {
      pane.style.display = 'none';
      pane.classList.remove('active');
      const paginationControls = pane.querySelector('.pagination-controls');
      if (paginationControls) {
        paginationControls.style.display = 'none';
      }
    });

    showFocusHint();
  }

  function exitFocusMode() {
    isSearchFocused = false;
    isSearching = false;

    if (homeSearchInput) {
      homeSearchInput.value = '';
    }

    hideFocusHint();
    removeSearchResultsContainer();

    if (tabsWrapper) {
      tabsWrapper.style.display = '';
    }

    tabPanes.forEach(pane => {
      const paginationControls = pane.querySelector('.pagination-controls');
      if (paginationControls) {
        paginationControls.style.display = '';
      }
    });

    resetToNormalView();

    if (tabsContainer) {
      tabsContainer.classList.remove('search-active');
    }
  }

  function clearSearchResults() {
    removeSearchResultsContainer();
    showFocusHint();
  }

  function showFocusHint() {
    if (!isSearching && tabsContent) {
      let hint = tabsContent.querySelector('.search-focus-hint');
      if (!hint) {
        hint = document.createElement('div');
        hint.className = 'search-focus-hint';
        hint.textContent = '输入关键词搜索文章...';
        tabsContent.appendChild(hint);
      }
    }
  }

  function hideFocusHint() {
    if (tabsContent) {
      const hint = tabsContent.querySelector('.search-focus-hint');
      if (hint) {
        hint.parentNode.removeChild(hint);
      }
    }
  }

  function searchAllTabs(query) {
    let allResults = [];
    let seenTitles = new Set();

    tabPanes.forEach(pane => {
      const entries = pane.querySelectorAll('.content-entry');

      entries.forEach(entry => {
        const titleElement = entry.querySelector('.content-title a');
        if (titleElement) {
          const titleText = titleElement.textContent.trim();
          const titleLower = titleText.toLowerCase();

          if (titleLower.includes(query)) {
            const linkUrl = titleElement.getAttribute('href');
            const timeElement = entry.querySelector('.content-time');
            const timeText = timeElement ? timeElement.textContent.trim() : '';

            if (!seenTitles.has(titleText)) {
              seenTitles.add(titleText);
              allResults.push({
                title: titleText,
                url: linkUrl,
                time: timeText
              });
            }
          }
        }
      });
    });

    displaySearchResults(allResults);
  }

  function displaySearchResults(results) {
    if (!searchResultsContainer) return;

    let resultsHTML = '';

    if (results.length === 0) {
      resultsHTML = '<div class="search-no-results visible">没有找到匹配的文章</div>';
    } else {
      results.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));

      results.forEach(result => {
        resultsHTML += `
          <section class="content-entry">
            <span class="content-title"><a href="${result.url}">${highlightMatch(result.title)}</a></span>
            <time class="content-time">${result.time}</time>
          </section>
        `;
      });
    }

    searchResultsContainer.innerHTML = resultsHTML;
  }

  function highlightMatch(text, query) {
    return text;
  }

  function resetToNormalView() {
    tabPanes.forEach(pane => {
      pane.classList.remove('has-results');
      pane.classList.remove('active');
      delete pane.dataset.hasResults;
      pane.style.display = '';

      const entries = pane.querySelectorAll('.content-entry');
      entries.forEach(entry => {
        entry.style.display = '';
        delete entry.dataset.matchesSearch;
      });
    });

    tabBtns.forEach(btn => {
      btn.classList.remove('has-matches');
    });

    if (originalActiveTag) {
      switchToTab(originalActiveTag);
      originalActiveTag = null;
    } else {
      const firstTab = tabBtns[0];
      if (firstTab) {
        switchToTab(firstTab.getAttribute('data-tag'));
      }
    }
  }

  function switchToTab(tag) {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));

    const targetBtn = document.querySelector(`[data-tag="${tag}"]`);
    const targetPane = document.querySelector(`[data-tab-content="${tag}"]`);

    if (targetBtn) targetBtn.classList.add('active');

    if (targetPane) {
      targetPane.classList.add('active');
      targetPane.style.display = '';

      if (window.resetTabPagination && window.paginationStates) {
        window.resetTabPagination(tag);
        const state = window.paginationStates[tag];
        if (state) {
          const entries = targetPane.querySelectorAll('.content-entry');
          const start = (state.currentPage - 1) * 10;
          const end = start + 10;

          entries.forEach(entry => {
            const index = parseInt(entry.dataset.pageIndex);
            if (index > start && index <= end) {
              entry.style.display = '';
            } else {
              entry.style.display = 'none';
            }
          });
        }
      }
    }
  }

  window.homeSearchSwitchToTab = function(tag) {
    if (!isSearching && !isSearchFocused) {
      originalActiveTag = tag;
    }
    switchToTab(tag);
  };
});