// 替换p为div
function replacePWithDiv(img, index) {
  // 获取父级p标签
  const parentP = img.parentElement;
  // 创建新的div
  const div = document.createElement('div');
  // 复制p的所有属性和内容
  div.innerHTML = parentP.innerHTML;
  // 添加id
  div.id = 'image-container-' + index;
  // 添加class
  div.className = 'image-container';
  //获取img的naturalHeight 
  const naturalHeight = img.naturalHeight;
  // 计算新的高度
  const newHeight = naturalHeight > window.innerHeight * 0.5 ? window.innerHeight * 0.5 : naturalHeight;
  // 设置div的高度
  div.style.height = newHeight + 'px';
  // 替换p为div
  parentP.parentNode.replaceChild(div, parentP);
}

// 初始化 Viewer
function viewerProcess(index) {
  // 初始化 Viewer
  const viewer = new Viewer(document.getElementById('image-container-' + index), {
    zoomRatio: 0.1, // 缩放步长
    maxZoomRatio: 5, // 最大缩放倍数
    minZoomRatio: 0.2, // 最小缩放倍数
    toolbar: true, // 显示工具栏（缩放、旋转等）
    title: true // 显示图片标题
  });
}

function initImageStyle(img) {
  // 设置img的宽度为100%
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'contain';
  img.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
  // 选择所有的img标签
  const images = document.querySelectorAll('p > img');
  // 替换所有img标签的父级标签p
  images.forEach((img, index) => {
    // 初始化图片样式
    initImageStyle(img);
    // 替换p为div
    replacePWithDiv(img, index);
    // 初始化 Viewer
    viewerProcess(index);
  });
});