// 等待 DOM 加载完成
document.addEventListener("DOMContentLoaded", function() {
  // 假设你只想选择由 Mermaid 渲染的 SVG
  var svgElements = document.querySelectorAll('.mermaid svg');
  svgElements.forEach(function(svg) {
    // 在这里可以添加你的缩放逻辑
    const panZoomInstance = svgPanZoom(svg, {
      zoomEnabled: true,        // 允许缩放
      panEnabled: true,         // 允许平移
      controlIconsEnabled: false, // 显示控制按钮（缩放/重置）
      mouseWheelZoomEnabled: true,
      dblClickZoomEnabled: false,
      minZoom: 0.5,
      maxZoom: 10,
      fit: false,
      center: false
    });
    panZoomInstance.zoom(0.8);
    panZoomInstance.center();
    svg.addEventListener('dblclick', function(event) {
        panZoomInstance.reset();
        panZoomInstance.zoom(0.8);
        panZoomInstance.center();
    });
  }); 
});