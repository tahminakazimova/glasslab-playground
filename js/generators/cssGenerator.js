import state from "../state.js";

export function generateCSS() {
    const glass = state.glass || {};
    const gradient = state.gradient || { enabled: false };

    let backgroundStyle;

    if (gradient.enabled) {
        const c1 = hexToRGBA(gradient.color1 || "#ffffff", gradient.opacity1 ?? 0.4);
        const c2 = hexToRGBA(gradient.color2 || "#ffffff", gradient.opacity2 ?? 0.05);
        backgroundStyle = `linear-gradient(${gradient.angle ?? 135}deg, ${c1}, ${c2})`;
    } else {
        backgroundStyle = hexToRGBA(glass.color || "#ffffff", glass.opacity ?? 0.15);
    }

    const radiusStyle = `${glass.radiusTopLeft ?? 24}px ${glass.radiusTopRight ?? 24}px ${glass.radiusBottomRight ?? 24}px ${glass.radiusBottomLeft ?? 24}px`;

    return `background: ${backgroundStyle};
backdrop-filter: blur(${glass.blur ?? 16}px);
-webkit-backdrop-filter: blur(${glass.blur ?? 16}px);
border: ${glass.borderWidth ?? 1}px solid ${hexToRGBA(glass.borderColor || "#ffffff", glass.borderOpacity ?? 0.25)};
border-radius: ${radiusStyle};
box-shadow: ${generateShadow()};
`;
}

function generateShadow() {
    const shadow = state.shadow || {};
    const { x = 0, y = 8, blur = 32, spread = 0, opacity = 0.15, color = "#000000", inset = false } = shadow;
    const insetStr = inset ? "inset " : "";
    return `${insetStr}${x}px ${y}px ${blur}px ${spread}px ${hexToRGBA(color, opacity)}`;
}

function hexToRGBA(hex, alpha) {
    if (!hex) return `rgba(255, 255, 255, ${alpha ?? 1})`;
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha ?? 1})`;
}