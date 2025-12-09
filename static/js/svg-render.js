// 初始化svgPanZoom实例
function initPanZoom(svgElement) {
  return svgPanZoom(svgElement, {
    zoomEnabled: true,        // 允许缩放
    panEnabled: true,         // 允许平移
    controlIconsEnabled: false, // 显示控制按钮（缩放/重置）
    mouseWheelZoomEnabled: true,
    dblClickZoomEnabled: false,
    minZoom: 0.5,
    maxZoom: 10,
    fit: true,
    center: true,
    contain: true
  });
}

// 重置svg缩放比例为1.0
function resetZoomIfNeeded(panZoomInstance) {
    const realZoom = panZoomInstance.getSizes().realZoom;
    // 如果realZoom大于1.0，说明当前svg已经被放大了，需要将重置缩放比例为1.0
    if(realZoom > 1.0) {
        const newZoom = 1.0/realZoom;
        panZoomInstance.zoom(newZoom);
    }
}

function svgRenderMain() {
  var svgElements = document.querySelectorAll('.mermaid svg');
  svgElements.forEach(function(svg) {
    const panZoomInstance = initPanZoom(svg);
    resetZoomIfNeeded(panZoomInstance);
    svg.addEventListener('dblclick', function(event) {
        panZoomInstance.reset();
        resetZoomIfNeeded(panZoomInstance);
    });
  });
}

// 等待 DOM 加载完成
document.addEventListener("DOMContentLoaded", function() {
  svgRenderMain();
});