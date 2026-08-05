import state from "../state.js";
import dom from "../dom.js";
import { generateCSS } from "../generators/cssGenerator.js";
import { generateTailwind } from "../generators/tailwindGenerator.js";

export function initializePreview() {
    window.addEventListener("glasslab:update", () => {
        updatePreview();
    });
}

export function updatePreview() {
    const card = dom.previewCard || document.getElementById("previewCard");
    if (!card) return;

    const glass = state.glass || {};
    const gradient = state.gradient || { enabled: false };

    if (gradient.enabled) {
        const c1 = hexToRGBA(gradient.color1 || "#ffffff", gradient.opacity1 ?? 0.4);
        const c2 = hexToRGBA(gradient.color2 || "#ffffff", gradient.opacity2 ?? 0.05);
        card.style.background = `linear-gradient(${gradient.angle ?? 135}deg, ${c1}, ${c2})`;
    } else {
        card.style.background = hexToRGBA(glass.color || "#ffffff", glass.opacity ?? 0.15);
    }

    card.style.backdropFilter = `blur(${glass.blur ?? 16}px)`;
    card.style.webkitBackdropFilter = `blur(${glass.blur ?? 16}px)`;
    card.style.border = `${glass.borderWidth ?? 1}px solid ${hexToRGBA(glass.borderColor || "#ffffff", glass.borderOpacity ?? 0.25)}`;
    card.style.borderRadius = `${glass.radiusTopLeft ?? 24}px ${glass.radiusTopRight ?? 24}px ${glass.radiusBottomRight ?? 24}px ${glass.radiusBottomLeft ?? 24}px`;

    const cssCode = document.getElementById("cssOutput");
    const tailwindCode = document.getElementById("tailwindOutput");

    if (cssCode) cssCode.textContent = generateCSS();
    if (tailwindCode) tailwindCode.textContent = generateTailwind();
}

function hexToRGBA(hex, alpha) {
    if (!hex) return `rgba(255, 255, 255, ${alpha ?? 1})`;
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha ?? 1})`;
}