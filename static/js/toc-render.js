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

// 收缩所有目录项
function collapseAllToc() {
  const allNestedUls = document.querySelectorAll('#TableOfContents ul ul');
  allNestedUls.forEach(ul => {
    ul.style.display = 'none';
  });

  const allLis = document.querySelectorAll('#TableOfContents li');
  allLis.forEach(li => li.classList.remove('expanded'));
}

// 展开指定项的所有父级
function expandToItem(tocLink) {
  if (!tocLink) return;

  // 从当前链接向上查找所有父级 li
  let current = tocLink.parentElement;
  while (current) {
    if (current.tagName === 'LI') {
      current.classList.add('expanded');
      // 找到这个 li 的子 ul 并显示
      const childUl = current.querySelector(':scope > ul');
      if (childUl) {
        childUl.style.display = 'block';
      }
    }
    current = current.parentElement;
  }
}

// 高亮对应目录项并自动展开
function highlightTocItem(sectionId, tocItems) {
  // 只移除高亮，不收缩
  removeAllActive(tocItems);

  const activeLink = document.querySelector(`#TableOfContents a[href="#${sectionId}"]`);
  
  if (activeLink) {
    activeLink.classList.add('active');
    
    // 自动展开到当前高亮的项
    expandToItem(activeLink);

    // 自动滚动使高亮项可见
    const tocContainer = document.querySelector('.tocContainer');
    if (tocContainer) {
      activeLink.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    }
  }
}

// 交叉观察器处理（只用于高亮，不控制展开/收缩）
function observerProcess(sections, tocItems) {
  const updateActiveToc = debounce(() => {
    let topSection = null;
    let minOffset = Infinity;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      
      if (rect.top <= 80) {
        const offset = rect.top >= 0 ? rect.top : -rect.top;
        if (offset < minOffset) {
          minOffset = offset;
          topSection = section;
        }
      } else if (!topSection && rect.top > 0 && rect.top < minOffset) {
        minOffset = rect.top;
        topSection = section;
      }
    });

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

  const scrollContainer = document.querySelector('.singleMain');
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', updateActiveToc, { passive: true });
  }
}

// 切换目录项的展开/收缩状态
function toggleTocItem(tocLink) {
  if (!tocLink) return;

  const parentLi = tocLink.parentElement;
  if (!parentLi || parentLi.tagName !== 'LI') return;

  // 检查是否有子级 ul
  const childUl = parentLi.querySelector(':scope > ul');
  if (!childUl) {
    // 没有子级，执行正常的跳转逻辑
    return false;
  }

  // 有子级，切换展开/收缩状态
  if (parentLi.classList.contains('expanded')) {
    // 当前是展开的，执行收缩
    parentLi.classList.remove('expanded');
    parentLi.classList.add('collapsing');
    
    // 添加收缩动画
    childUl.style.animation = 'slideUp 0.3s ease forwards';
    
    // 动画结束后隐藏元素
    setTimeout(() => {
      childUl.style.display = 'none';
      parentLi.classList.remove('collapsing');
    }, 300);
    
    return true; // 表示已处理，阻止默认行为
  } else {
    // 当前是收缩的，执行展开
    parentLi.classList.add('expanded');
    childUl.style.display = 'block';
    
    // 添加展开动画效果
    childUl.style.animation = 'none';
    childUl.offsetHeight; // 触发重排
    childUl.style.animation = 'slideDown 0.3s ease';
    
    return true; // 表示已处理，阻止默认行为
  }
}

// 目录项点击处理（支持展开/收缩 + 跳转）
function tocJump(tocItems) {
  tocItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // 先尝试切换展开/收缩
      const isToggled = toggleTocItem(item);
      
      if (isToggled) {
        // 如果是展开/收缩操作，阻止默认跳转
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      
      // 否则执行正常的跳转逻辑
      e.preventDefault();
      const targetId = item.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      const scrollContainer = document.querySelector('.singleMain');
      if (scrollContainer && targetSection) {
        scrollContainer.scrollTo({
          behavior: 'smooth',
          top: targetSection.offsetTop - 80
        });
        
        // 跳转后高亮并展开到目标项
        setTimeout(() => {
          highlightTocItem(targetId, tocItems);
        }, 300);
      }
    });
  });
}

// 初始化：页面加载时高亮第一个章节并自动展开
function initActiveToc(tocItems) {
  removeAllActive(tocItems);
  // 高亮并展开第一个章节
  if (tocItems.length > 0) {
    tocItems[0].classList.add('active');
    expandToItem(tocItems[0]);
  }
}

// 主函数
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
  
  // 初始化：页面加载时高亮第一个章节并自动展开
  initActiveToc(tocItems);
  
  // 处理交叉观察器（高亮当前章节 + 自动展开）
  observerProcess(sections, tocItems);
  
  // 处理点击跳转和手动展开/收缩
  tocJump(tocItems);
  
  console.log('[TOC] 目录初始化完成（支持滚动自动展开），共', tocItems.length, '个目录项,', sections.length, '个章节');
}

document.addEventListener('DOMContentLoaded', function() {
  tocRenderMain();
});