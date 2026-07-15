const dom = {

    app: document.querySelector(".app"),

    sidebar: document.querySelector(".sidebar"),

    workspace: document.querySelector(".workspace"),

    rightPanel: document.querySelector(".right-panel"),

    controls: document.getElementById("controls"),

    previewCanvas: document.getElementById("previewCanvas"),

    previewCard: document.getElementById("previewCard"),

    cssOutput: document.getElementById("cssOutput"),

    tailwindOutput: document.getElementById("tailwindOutput"),

    toast: document.getElementById("toast"),

    favoriteBtn: document.getElementById("favoriteBtn"),

    resetBtn: document.getElementById("resetBtn"),

    copyCssBtn: document.getElementById("copyCssBtn"),

    copyTailwindBtn: document.getElementById("copyTailwindBtn"),

    favoritesList: document.getElementById("favoritesList"),

    historyList: document.getElementById("historyList"),

    tabs: [...document.querySelectorAll(".tab")]

};

export default dom;