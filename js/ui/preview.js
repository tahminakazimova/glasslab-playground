import state from "../state.js";
import dom from "../dom.js";

export function initializePreview() {
    window.addEventListener("glasslab:update", () => {
        updatePreview();
    });
}

export function updatePreview() {
    const previewCard = dom.previewCard || document.getElementById("previewCard");
    const cssCode = dom.cssCode || document.getElementById("cssCode");
    const tailwindCode = dom.tailwindCode || document.getElementById("tailwindCode");

    if (!previewCard) return;

    const g = state.glass;
    const grad = state.gradient || {};
    const s = state.shadow || { x: 0, y: 8, blur: 32, spread: 0, opacity: 0.15, color: "#000000", inset: false };

    let bgValue = "";
    let bgTailwind = "";

    if (grad.enabled) {
        const c1 = hexToRgba(grad.color1 || "#ffffff", grad.opacity1 ?? 0.4);
        const c2 = hexToRgba(grad.color2 || "#ffffff", grad.opacity2 ?? 0.05);
        const angle = grad.angle ?? 135;
        bgValue = `linear-gradient(${angle}deg, ${c1}, ${c2})`;
        bgTailwind = `bg-[linear-gradient(${angle}deg,${c1.replace(/\s+/g, '')},${c2.replace(/\s+/g, '')})]`;
    } else {
        const glassRgba = hexToRgba(g.color || "#ffffff", g.opacity ?? 0.15);
        bgValue = glassRgba;
        bgTailwind = `bg-[${glassRgba.replace(/\s+/g, '')}]`;
    }

    const borderRgba = hexToRgba(g.borderColor || "#ffffff", g.borderOpacity ?? 0.25);
    const borderCss = `${g.borderWidth ?? 1}px solid ${borderRgba}`;

    const radiusCss = `${g.radiusTopLeft ?? 24}px ${g.radiusTopRight ?? 24}px ${g.radiusBottomRight ?? 24}px ${g.radiusBottomLeft ?? 24}px`;

    const shadowRgba = hexToRgba(s.color || "#000000", s.opacity ?? 0.15);
    const insetStr = s.inset ? "inset " : "";
    const shadowCss = `${insetStr}${s.x ?? 0}px ${s.y ?? 8}px ${s.blur ?? 32}px ${s.spread ?? 0}px ${shadowRgba}`;

    previewCard.style.background = bgValue;
    previewCard.style.backdropFilter = `blur(${g.blur ?? 16}px)`;
    previewCard.style.webkitBackdropFilter = `blur(${g.blur ?? 16}px)`;
    previewCard.style.border = borderCss;
    previewCard.style.borderRadius = radiusCss;
    previewCard.style.boxShadow = shadowCss; 

    if (cssCode) {
        cssCode.textContent = 
`background: ${bgValue};
backdrop-filter: blur(${g.blur ?? 16}px);
-webkit-backdrop-filter: blur(${g.blur ?? 16}px);
border: ${borderCss};
border-radius: ${radiusCss};
box-shadow: ${shadowCss};`;
    }

    if (tailwindCode) {
        const shadowTw = shadowCss.replace(/\s+/g, '_');
        tailwindCode.textContent = 
`rounded-[${radiusCss.replace(/\s+/g, '_')}]
backdrop-blur-[${g.blur ?? 16}px]
${bgTailwind}
border-[${g.borderWidth ?? 1}px] border-[${borderRgba.replace(/\s+/g, '')}]
shadow-[${shadowTw}]`;
    }
}

function hexToRgba(hex, alpha) {
    if (!hex) return `rgba(255, 255, 255, ${alpha})`;
    let c = hex.replace("#", "");
    if (c.length === 3) {
        c = c.split("").map(char => char + char).join("");
    }
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}