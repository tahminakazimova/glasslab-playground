import state from "../state.js";

export function generateTailwind() {
    const { glass, gradient, shadow } = state;

    const classes = [];

    classes.push(`rounded-[${glass.radiusTopLeft}px_${glass.radiusTopRight}px_${glass.radiusBottomRight}px_${glass.radiusBottomLeft}px]`);

    classes.push(`backdrop-blur-[${glass.blur}px]`);

    if (gradient && gradient.enabled) {
        const c1 = `rgba(${hexToRGB(gradient.color1)},${gradient.opacity1})`;
        const c2 = `rgba(${hexToRGB(gradient.color2)},${gradient.opacity2})`;
        classes.push(`bg-[linear-gradient(${gradient.angle}deg,${c1},${c2})]`);
    } else {
        classes.push(`bg-[rgba(${hexToRGB(glass.color)},${glass.opacity})]`);
    }

    classes.push(
        `border-[${glass.borderWidth}px] border-[rgba(${hexToRGB(glass.borderColor)},${glass.borderOpacity})]`
    );

    classes.push(
        `shadow-[${buildShadow(shadow)}]`
    );

    return classes.join("\n");
}

function buildShadow(shadow) {
    const insetStr = shadow.inset ? "inset_" : "";
    return `${insetStr}${shadow.x}px_${shadow.y}px_${shadow.blur}px_${shadow.spread}px_rgba(${hexToRGB(shadow.color)},${shadow.opacity})`;
}

function hexToRGB(hex) {
    if (!hex) return "255,255,255";
    const value = hex.replace("#", "");

    const r = parseInt(value.substring(0, 2), 16) || 0;
    const g = parseInt(value.substring(2, 4), 16) || 0;
    const b = parseInt(value.substring(4, 6), 16) || 0;

    return `${r},${g},${b}`;
}