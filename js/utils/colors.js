export function hexToRgb(hex) {

    const value = hex.replace("#", "");

    return {

        r: parseInt(value.substring(0, 2), 16),

        g: parseInt(value.substring(2, 4), 16),

        b: parseInt(value.substring(4, 6), 16)

    };

}

export function hexToRgba(hex, opacity = 1) {

    const { r, g, b } = hexToRgb(hex);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;

}

export function rgbToHex(r, g, b) {

    return "#" + [r, g, b]

        .map(x => x.toString(16).padStart(2, "0"))

        .join("");

}

export function randomColor() {

    return "#" + Math.floor(Math.random() * 16777215)

        .toString(16)

        .padStart(6, "0");

}