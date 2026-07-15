import state from "../state.js";

export function generateCSS() {

    const { glass, shadow } = state;

    return `background: rgba(255,255,255,${glass.opacity});
backdrop-filter: blur(${glass.blur}px);
-webkit-backdrop-filter: blur(${glass.blur}px);
border: 1px solid rgba(255,255,255,${glass.borderOpacity});
border-radius: ${glass.radius}px;
box-shadow: ${generateShadow()};
`;
}

function generateShadow() {

    const {
        x,
        y,
        blur,
        spread,
        opacity,
        color
    } = state.shadow;

    return `${x}px ${y}px ${blur}px ${spread}px ${hexToRGBA(
        color,
        opacity
    )}`;
}

function hexToRGBA(hex, alpha) {

    const value = hex.replace("#", "");

    const r = parseInt(value.substring(0, 2), 16);

    const g = parseInt(value.substring(2, 4), 16);

    const b = parseInt(value.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;

}