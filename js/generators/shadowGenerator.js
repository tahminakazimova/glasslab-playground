import state from "../state.js";

export function getShadowString() {

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

export function getShadowObject() {

    return {
        ...state.shadow
    };

}

export function setShadow(shadow) {

    state.shadow = {

        ...state.shadow,

        ...shadow

    };

}

function hexToRGBA(hex, alpha) {

    const value = hex.replace("#", "");

    const r = parseInt(value.substring(0, 2), 16);

    const g = parseInt(value.substring(2, 4), 16);

    const b = parseInt(value.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;

}