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
  }
}

// 交叉观察器处理
function observerProcess(sections, tocItems) {
  // 创建交叉观察器实现目录高亮
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        debounce(highlightTocItem)(entry.target.id, tocItems);
      }
    });
  }, {
    root: null, // 视口作为根元素
    rootMargin: '0px 0px -90% 0px', // 当标题进入中间区域时触发
    threshold: 0.1 // 触发回调的阈值（0.1表示10%可见）
  });

  // 观察所有标题元素
  sections.forEach(section => {
    observer.observe(section);
  });
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
