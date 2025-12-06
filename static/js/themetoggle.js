function setTheme(mode) {
    localStorage.setItem("theme-storage", mode);
    const iconElement = document.getElementById("theme-icon");

    if (mode === "dark") {
        document.getElementById("darkModeStyle").disabled = false;
        document.getElementById("codeDarkStyle").disabled = false;
        iconElement.setAttribute("data-feather", "moon");
    } else if (mode === "light") {
        document.getElementById("darkModeStyle").disabled = true;
        document.getElementById("codeDarkStyle").disabled = true;
        iconElement.setAttribute("data-feather", "sun");
    }

    iconElement.setAttribute('stroke-width', '3');
    feather.replace();
}

// 更新mermaid图表主题
function setMermaidChartTheme(mode) {
    if (typeof mermaid !== 'undefined') {
        // 重置所有mermaidBlocks
        restoreMermaidBlocks();
        // 重新渲染所有mermaid图表
        initMermaidConfig(mode);
        mermaid.run();
    }
}

function toggleTheme() {
    if (localStorage.getItem("theme-storage") === "light") {
        setTheme("dark");
        setMermaidChartTheme("dark");
    } else if (localStorage.getItem("theme-storage") === "dark") {
        setTheme("light");
        setMermaidChartTheme("default");
    }
}

var savedTheme = localStorage.getItem("theme-storage") || "light";
setTheme(savedTheme);
