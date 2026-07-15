export function hexToRgb(hex) {
    if (!hex || typeof hex !== 'string') {
        return { r: 255, g: 255, b: 255 };
    }

    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
}

export function generateCSS(state) {
    const glassColor = state.glass.color || "#ffffff";
    const borderColor = state.glass.borderColor || "#ffffff";
    const shadowColor = state.shadow.color || "#000000";

    const rgb = hexToRgb(glassColor);
    const borderRgb = hexToRgb(borderColor);
    const shadowRgb = hexToRgb(shadowColor);

    const bg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${state.glass.opacity ?? 0.15})`;
    const backdropBlur = `blur(${state.glass.blur ?? 16}px)`;
    const border = `${state.glass.borderWidth ?? 1}px solid rgba(${borderRgb.r}, ${borderRgb.g}, ${borderRgb.b}, ${state.glass.borderOpacity ?? 0.25})`;
    
    const shadowInset = state.shadow.inset ? "inset " : "";
    const shadow = `${shadowInset}${state.shadow.x ?? 0}px ${state.shadow.y ?? 8}px ${state.shadow.blur ?? 32}px ${state.shadow.spread ?? 0}px rgba(${shadowRgb.r}, ${shadowRgb.g}, ${shadowRgb.b}, ${state.shadow.opacity ?? 0.15})`;

    const borderRadius = `${state.glass.radiusTopLeft ?? 24}px ${state.glass.radiusTopRight ?? 24}px ${state.glass.radiusBottomRight ?? 24}px ${state.glass.radiusBottomLeft ?? 24}px`;

    return {
        background: bg,
        backdropFilter: backdropBlur,
        webkitBackdropFilter: backdropBlur,
        border: border,
        boxShadow: shadow,
        borderRadius: borderRadius,
        fullCode: `background: ${bg};\nbackdrop-filter: ${backdropBlur};\n-webkit-backdrop-filter: ${backdropBlur};\nborder: ${border};\nbox-shadow: ${shadow};\nborder-radius: ${borderRadius};`
    };
}

export function generateTailwind(state) {
    const glassColor = state.glass.color || "#ffffff";
    const borderColor = state.glass.borderColor || "#ffffff";
    const shadowColor = state.shadow.color || "#000000";

    const rgb = hexToRgb(glassColor);
    const borderRgb = hexToRgb(borderColor);
    const shadowRgb = hexToRgb(shadowColor);

    const bgClass = `bg-[rgba(${rgb.r},${rgb.g},${rgb.b},${state.glass.opacity ?? 0.15})]`;
    const blurClass = `backdrop-blur-[${state.glass.blur ?? 16}px]`;
    const borderClass = `border-[${state.glass.borderWidth ?? 1}px] border-[rgba(${borderRgb.r},${borderRgb.g},${borderRgb.b},${state.glass.borderOpacity ?? 0.25})]`;
    
    const shadowInset = state.shadow.inset ? "inset_" : "";
    const shadowClass = `shadow-[${shadowInset}${state.shadow.x ?? 0}px_${state.shadow.y ?? 8}px_${state.shadow.blur ?? 32}px_${state.shadow.spread ?? 0}px_rgba(${shadowRgb.r},${shadowRgb.g},${shadowRgb.b},${state.shadow.opacity ?? 0.15})]`;
    
    const radiusClass = `rounded-[${state.glass.radiusTopLeft ?? 24}px_${state.glass.radiusTopRight ?? 24}px_${state.glass.radiusBottomRight ?? 24}px_${state.glass.radiusBottomLeft ?? 24}px]`;

    return `class="${bgClass} ${blurClass} ${borderClass} ${shadowClass} ${radiusClass}"`;
}