// 防抖函数（避免滚动时频繁触发）
function debounce(fn, delay = 100) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 移除所有目录项高亮
function removeAllActive(tocItems) {
  tocItems.forEach(item => item.classList.remove('active'));
}

// 高亮对应目录项
function highlightTocItem (sectionId, tocItems) {
  removeAllActive(tocItems);
  const activeTocItem = document.querySelector(`#TableOfContents a[href="#${sectionId}"]`);
  if (activeTocItem) {
    activeTocItem.classList.add('active');
    // 自动滚动tocContainer使高亮项可见
    // 使用 behavior: 'auto' 避免触发滚动事件导致无限循环
    const tocContainer = document.querySelector('.tocContainer');
    if (tocContainer) {
      activeTocItem.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    }
  }
}

// 交叉观察器处理
function observerProcess(sections, tocItems) {
  const updateActiveToc = debounce(() => {
    // 找到视口顶部最接近的可见标题
    let topSection = null;
    let minOffset = Infinity;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      // 选择在视口内或上方的标题，取离视口顶部最近的那个
      if (rect.top <= 80) {
        // heading 在视口顶部附近或上方
        const offset = rect.top >= 0 ? rect.top : -rect.top; // 正面在视口内，负面上方
        if (offset < minOffset) {
          minOffset = offset;
          topSection = section;
        }
      } else if (!topSection && rect.top > 0 && rect.top < minOffset) {
        // 没有找到视口上方的，找最上面的那个在视口内的
        minOffset = rect.top;
        topSection = section;
      }
    });

    // 如果没找到，用第一个可见的 heading
    if (!topSection && sections.length > 0) {
      topSection = sections[0];
    }

    if (topSection) {
      highlightTocItem(topSection.id, tocItems);
    }
  }, 50);

  const observer = new IntersectionObserver((entries) => {
    updateActiveToc();
  }, {
    root: null,
    rootMargin: '0px 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  // 监听文章滚动，手动检查当前可见标题
  const scrollContainer = document.querySelector('.singleMain');
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', updateActiveToc, { passive: true });
  }
}


// 目录项点击跳转
function tocJump(tocItems) {
  tocItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      // 获取滚动容器
      const scrollContainer = document.querySelector('.singleMain');
      // 平滑滚动到对应章节
      scrollContainer.scrollTo({
        behavior: 'smooth',
        top: targetSection.offsetTop - 80
      });
    });
  });
}

// 初始化：页面加载时高亮第一个章节
function initActiveToc(tocItems) {
  removeAllActive(tocItems);
  if (tocItems.length > 0) {
    tocItems[0].classList.add('active');
  }
}

function tocRenderMain(){
  // 获取目录链接
  const tocItems = document.querySelectorAll('#TableOfContents a');

  // 获取所有标题元素
  const sections = document.querySelectorAll(
    '.singleArticle .content h1, ' +
    '.singleArticle .content h2, ' +
    '.singleArticle .content h3, ' +
    '.singleArticle .content h4, ' +
    '.singleArticle .content h5'
  );
  // 初始化：页面加载时高亮第一个章节
  initActiveToc(tocItems);
  // 处理交叉观察器
  observerProcess(sections, tocItems);
  // 处理点击跳转
  tocJump(tocItems);
}

document.addEventListener('DOMContentLoaded', function() {
  tocRenderMain();
});
