import state from "../state.js";

export function generateTailwind() {

    const { glass, shadow } = state;

    const classes = [];

    classes.push(`rounded-[${glass.radius}px]`);

    classes.push(`backdrop-blur-[${glass.blur}px]`);

    classes.push(`bg-white/[${Math.round(glass.opacity * 100)}]`);

    classes.push(
        `border border-white/[${Math.round(glass.borderOpacity * 100)}]`
    );

    classes.push(
        `shadow-[${buildShadow(shadow)}]`
    );

    return classes.join("\n");

}

function buildShadow(shadow) {

    return `${shadow.x}px_${shadow.y}px_${shadow.blur}px_${shadow.spread}px_rgba(${hexToRGB(shadow.color)},${shadow.opacity})`;

}

function hexToRGB(hex) {

    const value = hex.replace("#", "");

    const r = parseInt(value.substring(0, 2), 16);

    const g = parseInt(value.substring(2, 4), 16);

    const b = parseInt(value.substring(4, 6), 16);

    return `${r},${g},${b}`;

}