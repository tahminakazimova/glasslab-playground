import state from "../state.js";
import dom from "../dom.js";

export function renderGradientSliders(onUpdate) {
    const container = dom.controls || document.getElementById("controls");
    if (!container) return;

    const grad = state.gradient || {
        enabled: false,
        color1: "#ffffff",
        opacity1: 0.4,
        color2: "#ffffff",
        opacity2: 0.05,
        angle: 135
    };

    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 18px; padding: 4px 0;" class="fade-in">
            
            <!-- Enable Gradient Switch -->
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <label for="gradientEnable" style="cursor: pointer; font-size: 13px; font-weight: 500; color: #fff;">Enable Gradient</label>
                <input type="checkbox" id="gradientEnable" ${grad.enabled ? "checked" : ""} style="cursor: pointer; width: 16px; height: 16px;">
            </div>

            <div id="gradientControlsWrapper" style="display: ${grad.enabled ? 'flex' : 'none'}; flex-direction: column; gap: 16px;">
                
                <!-- Color 1 -->
                <div style="display: flex; flex-direction: column; gap: 6px;">
                    <label for="gradColor1" style="font-size: 12px; color: #8a99ad;">Color 1</label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input type="color" id="gradColor1" value="${grad.color1 || '#ffffff'}" style="width: 36px; height: 36px; border: none; border-radius: 8px; cursor: pointer; background: transparent; padding: 0;">
                        <span id="gradColor1Hex" style="font-size: 12px; color: #8a99ad; font-family: monospace;">${(grad.color1 || '#ffffff').toUpperCase()}</span>
                    </div>
                </div>

                <!-- Color 1 Opacity -->
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <label for="gradOpacity1" style="font-size: 12px; color: #8a99ad; margin: 0;">Color 1 Opacity</label>
                        <span id="gradOpacity1Val" style="font-size: 12px; color: #fff; font-weight: 500;">${Math.round((grad.opacity1 ?? 0.4) * 100)}%</span>
                    </div>
                    <input type="range" id="gradOpacity1" min="0" max="1" step="0.01" value="${grad.opacity1 ?? 0.4}" style="width: 100%; margin: 0;">
                </div>

                <!-- Color 2 -->
                <div style="display: flex; flex-direction: column; gap: 6px;">
                    <label for="gradColor2" style="font-size: 12px; color: #8a99ad;">Color 2</label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input type="color" id="gradColor2" value="${grad.color2 || '#ffffff'}" style="width: 36px; height: 36px; border: none; border-radius: 8px; cursor: pointer; background: transparent; padding: 0;">
                        <span id="gradColor2Hex" style="font-size: 12px; color: #8a99ad; font-family: monospace;">${(grad.color2 || '#ffffff').toUpperCase()}</span>
                    </div>
                </div>

                <!-- Color 2 Opacity -->
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <label for="gradOpacity2" style="font-size: 12px; color: #8a99ad; margin: 0;">Color 2 Opacity</label>
                        <span id="gradOpacity2Val" style="font-size: 12px; color: #fff; font-weight: 500;">${Math.round((grad.opacity2 ?? 0.05) * 100)}%</span>
                    </div>
                    <input type="range" id="gradOpacity2" min="0" max="1" step="0.01" value="${grad.opacity2 ?? 0.05}" style="width: 100%; margin: 0;">
                </div>

                <!-- Angle -->
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <label for="gradAngle" style="font-size: 12px; color: #8a99ad; margin: 0;">Angle</label>
                        <span id="gradAngleVal" style="font-size: 12px; color: #fff; font-weight: 500;">${grad.angle ?? 135}°</span>
                    </div>
                    <input type="range" id="gradAngle" min="0" max="360" step="1" value="${grad.angle ?? 135}" style="width: 100%; margin: 0;">
                </div>

            </div>
        </div>
    `;

    const enableCheckbox = container.querySelector("#gradientEnable");
    const wrapper = container.querySelector("#gradientControlsWrapper");

    enableCheckbox.addEventListener("change", (e) => {
        state.gradient.enabled = e.target.checked;
        wrapper.style.display = state.gradient.enabled ? "flex" : "none";
        onUpdate();
    });

    container.querySelector("#gradColor1").addEventListener("input", (e) => {
        const val = e.target.value;
        state.gradient.color1 = val;
        container.querySelector("#gradColor1Hex").textContent = val.toUpperCase();
        onUpdate();
    });

    container.querySelector("#gradOpacity1").addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        state.gradient.opacity1 = val;
        container.querySelector("#gradOpacity1Val").textContent = `${Math.round(val * 100)}%`;
        onUpdate();
    });

    container.querySelector("#gradColor2").addEventListener("input", (e) => {
        const val = e.target.value;
        state.gradient.color2 = val;
        container.querySelector("#gradColor2Hex").textContent = val.toUpperCase();
        onUpdate();
    });

    container.querySelector("#gradOpacity2").addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        state.gradient.opacity2 = val;
        container.querySelector("#gradOpacity2Val").textContent = `${Math.round(val * 100)}%`;
        onUpdate();
    });

    container.querySelector("#gradAngle").addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        state.gradient.angle = val;
        container.querySelector("#gradAngleVal").textContent = `${val}°`;
        onUpdate();
    });
}