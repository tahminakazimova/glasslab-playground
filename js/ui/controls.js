import state from "../state.js";
import dom from "../dom.js";

export function initializeControls() {
    const controlsContainer = dom.controls;
    if (!controlsContainer) return;

    if (state.ui.activeTab === "glass") {
        renderGlassControls(controlsContainer);
    } else if (state.ui.activeTab === "shadow") {
        renderShadowControls(controlsContainer);
    } else if (state.ui.activeTab === "radius") {
        renderRadiusControls(controlsContainer);
    } else if (state.ui.activeTab === "background") {
        controlsContainer.innerHTML = `<p class="info-text">Select a background gradient from the options below.</p>`;
    }

    setupTabEvents();
}

function setupTabEvents() {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => {
        const newTab = tab.cloneNode(true);
        tab.parentNode.replaceChild(newTab, tab);

        newTab.addEventListener("click", (e) => {
            const targetTab = e.currentTarget.dataset.tab;
            state.ui.activeTab = targetTab;

            document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
            newTab.classList.add("active");

            window.dispatchEvent(new CustomEvent("glasslab:tabChanged", { detail: targetTab }));

            initializeControls();
        });
    });
}

function renderGlassControls(container) {
    container.innerHTML = `
        <div class="control-group">
            <label>Glass Color</label>
            <input type="color" id="glassColor" value="${state.glass.color}">
        </div>

        <div class="control-group">
            <label>Opacity (${Math.round(state.glass.opacity * 100)}%)</label>
            <input type="range" id="glassOpacity" min="0" max="1" step="0.01" value="${state.glass.opacity}">
        </div>

        <div class="control-group">
            <label>Blur (${state.glass.blur}px)</label>
            <input type="range" id="glassBlur" min="0" max="100" step="1" value="${state.glass.blur}">
        </div>

        <div class="control-group">
            <label>Border Width (${state.glass.borderWidth}px)</label>
            <input type="range" id="borderWidth" min="0" max="20" step="1" value="${state.glass.borderWidth}">
        </div>

        <div class="control-group">
            <label>Border Color</label>
            <input type="color" id="borderColor" value="${state.glass.borderColor}">
        </div>

        <div class="control-group">
            <label>Border Opacity (${Math.round(state.glass.borderOpacity * 100)}%)</label>
            <input type="range" id="borderOpacity" min="0" max="1" step="0.01" value="${state.glass.borderOpacity}">
        </div>
    `;

    document.getElementById("glassColor").addEventListener("input", (e) => {
        state.glass.color = e.target.value;
        triggerUpdate();
    });

    document.getElementById("glassOpacity").addEventListener("input", (e) => {
        state.glass.opacity = parseFloat(e.target.value);
        triggerUpdate();
        initializeControls(); 
    });

    document.getElementById("glassBlur").addEventListener("input", (e) => {
        state.glass.blur = parseInt(e.target.value);
        triggerUpdate();
        initializeControls();
    });

    document.getElementById("borderWidth").addEventListener("input", (e) => {
        state.glass.borderWidth = parseInt(e.target.value);
        triggerUpdate();
        initializeControls();
    });

    document.getElementById("borderColor").addEventListener("input", (e) => {
        state.glass.borderColor = e.target.value;
        triggerUpdate();
    });

    document.getElementById("borderOpacity").addEventListener("input", (e) => {
        state.glass.borderOpacity = parseFloat(e.target.value);
        triggerUpdate();
        initializeControls();
    });
}

function renderShadowControls(container) {
    container.innerHTML = `
        <div class="control-group">
            <label>Shadow Color</label>
            <input type="color" id="shadowColor" value="${state.shadow.color}">
        </div>

        <div class="control-group">
            <label>Offset X (${state.shadow.x}px)</label>
            <input type="range" id="shadowX" min="-100" max="100" step="1" value="${state.shadow.x}">
        </div>

        <div class="control-group">
            <label>Offset Y (${state.shadow.y}px)</label>
            <input type="range" id="shadowY" min="-100" max="100" step="1" value="${state.shadow.y}">
        </div>

        <div class="control-group">
            <label>Blur Radius (${state.shadow.blur}px)</label>
            <input type="range" id="shadowBlur" min="0" max="100" step="1" value="${state.shadow.blur}">
        </div>

        <div class="control-group">
            <label>Spread Radius (${state.shadow.spread}px)</label>
            <input type="range" id="shadowSpread" min="-50" max="50" step="1" value="${state.shadow.spread}">
        </div>

        <div class="control-group">
            <label>Shadow Opacity (${Math.round(state.shadow.opacity * 100)}%)</label>
            <input type="range" id="shadowOpacity" min="0" max="1" step="0.01" value="${state.shadow.opacity}">
        </div>

        <div class="control-group checkbox-group">
            <label for="shadowInset">Inset Shadow</label>
            <input type="checkbox" id="shadowInset" ${state.shadow.inset ? "checked" : ""}>
        </div>
    `;

    document.getElementById("shadowColor").addEventListener("input", (e) => {
        state.shadow.color = e.target.value;
        triggerUpdate();
    });

    document.getElementById("shadowX").addEventListener("input", (e) => {
        state.shadow.x = parseInt(e.target.value);
        triggerUpdate();
        initializeControls();
    });

    document.getElementById("shadowY").addEventListener("input", (e) => {
        state.shadow.y = parseInt(e.target.value);
        triggerUpdate();
        initializeControls();
    });

    document.getElementById("shadowBlur").addEventListener("input", (e) => {
        state.shadow.blur = parseInt(e.target.value);
        triggerUpdate();
        initializeControls();
    });

    document.getElementById("shadowSpread").addEventListener("input", (e) => {
        state.shadow.spread = parseInt(e.target.value);
        triggerUpdate();
        initializeControls();
    });

    document.getElementById("shadowOpacity").addEventListener("input", (e) => {
        state.shadow.opacity = parseFloat(e.target.value);
        triggerUpdate();
        initializeControls();
    });

    document.getElementById("shadowInset").addEventListener("change", (e) => {
        state.shadow.inset = e.target.checked;
        triggerUpdate();
    });
}

function renderRadiusControls(container) {
    container.innerHTML = `
        <div class="control-group">
            <label>Top Left (${state.glass.radiusTopLeft}px)</label>
            <input type="range" id="radiusTL" min="0" max="150" step="1" value="${state.glass.radiusTopLeft}">
        </div>

        <div class="control-group">
            <label>Top Right (${state.glass.radiusTopRight}px)</label>
            <input type="range" id="radiusTR" min="0" max="150" step="1" value="${state.glass.radiusTopRight}">
        </div>

        <div class="control-group">
            <label>Bottom Right (${state.glass.radiusBottomRight}px)</label>
            <input type="range" id="radiusBR" min="0" max="150" step="1" value="${state.glass.radiusBottomRight}">
        </div>

        <div class="control-group">
            <label>Bottom Left (${state.glass.radiusBottomLeft}px)</label>
            <input type="range" id="radiusBL" min="0" max="150" step="1" value="${state.glass.radiusBottomLeft}">
        </div>

        <button id="linkRadiusBtn" class="btn btn-secondary" style="width: 100%; margin-top: 10px;">
            🔗 Sync All Corners
        </button>
    `;

    document.getElementById("radiusTL").addEventListener("input", (e) => {
        state.glass.radiusTopLeft = parseInt(e.target.value);
        triggerUpdate();
        initializeControls();
    });

    document.getElementById("radiusTR").addEventListener("input", (e) => {
        state.glass.radiusTopRight = parseInt(e.target.value);
        triggerUpdate();
        initializeControls();
    });

    document.getElementById("radiusBR").addEventListener("input", (e) => {
        state.glass.radiusBottomRight = parseInt(e.target.value);
        triggerUpdate();
        initializeControls();
    });

    document.getElementById("radiusBL").addEventListener("input", (e) => {
        state.glass.radiusBottomLeft = parseInt(e.target.value);
        triggerUpdate();
        initializeControls();
    });

    document.getElementById("linkRadiusBtn").addEventListener("click", () => {
        const avg = Math.round(
            (state.glass.radiusTopLeft +
            state.glass.radiusTopRight +
            state.glass.radiusBottomRight +
            state.glass.radiusBottomLeft) / 4
        );
        state.glass.radiusTopLeft = avg;
        state.glass.radiusTopRight = avg;
        state.glass.radiusBottomRight = avg;
        state.glass.radiusBottomLeft = avg;
        triggerUpdate();
        initializeControls();
    });
}

function triggerUpdate() {
    window.dispatchEvent(new CustomEvent("glasslab:update"));
}