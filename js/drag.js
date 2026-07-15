import dom from "./dom.js";

export function initializeDrag() {
    const card = dom.previewCard;
    const canvas = dom.previewCanvas;
    
    if (!card || !canvas) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let transformX = 0;
    let transformY = 0;

    card.style.cursor = "grab";

    card.addEventListener("mousedown", (e) => {
        if (e.target.closest("button, input, select, textarea")) return;
        
        isDragging = true;
        card.style.cursor = "grabbing";
        
        startX = e.clientX - transformX;
        startY = e.clientY - transformY;
        
        card.style.transition = "none"; 
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        
        transformX = e.clientX - startX;
        transformY = e.clientY - startY;
        
        const canvasRect = canvas.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const maxX = (canvasRect.width - cardRect.width) / 2 + 50;
        const maxY = (canvasRect.height - cardRect.height) / 2 + 50;

        transformX = Math.max(-maxX, Math.min(maxX, transformX));
        transformY = Math.max(-maxY, Math.min(maxY, transformY));

        card.style.transform = `translate(${transformX}px, ${transformY}px)`;
    });

    window.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        card.style.cursor = "grab";
        card.style.transition = "transform 0.25s ease"; 
    });

    window.addEventListener("glasslab:resetPosition", () => {
        transformX = 0;
        transformY = 0;
        card.style.transform = "translate(0px, 0px)";
    });
}