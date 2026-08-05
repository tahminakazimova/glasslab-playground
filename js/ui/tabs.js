import dom from "./dom.js";
import { renderGlassSliders } from "./ui/sliders.js";
import { renderShadowSliders } from "./ui/shadow.js";
import { renderGradientSliders } from "./ui/gradient.js";
import { updatePreview } from "./ui/preview.js";

export function initializeTabs() {
    const tabs = dom.tabs || document.querySelectorAll("[data-tab]");
    if (!tabs || tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            if (tab.classList.contains("active")) return;

            tabs.forEach(item => item.classList.remove("active"));
            tab.classList.add("active");

            renderTab(tab.dataset.tab);
        });
    });
}

function renderTab(tabName) {
    try {
        switch (tabName) {
            case "glass":
                renderGlassSliders(updatePreview);
                break;

            case "gradient":
                if (typeof renderGradientSliders === "function") {
                    renderGradientSliders(updatePreview);
                } else {
                    console.error("renderGradientSliders tapılmadı!");
                }
                break;

            case "shadow":
                renderShadowSliders(updatePreview);
                break;

            case "radius":
                renderRadiusPanel();
                break;

            case "background":
                renderBackgroundPanel();
                break;

            default:
                renderGlassSliders(updatePreview);
        }
    } catch (err) {
        console.error("Tab render xətası:", err);
    }
}

function renderRadiusPanel() {
    const controls = dom.controls || document.getElementById("controls");
    if (controls) {
        controls.innerHTML = `
            <div class="control-group fade-in">
                <label>Border Radius</label>
                <p class="empty-text">Radius editor will be available in the next update.</p>
            </div>
        `;
    }
}

function renderBackgroundPanel() {
    const controls = dom.controls || document.getElementById("controls");
    if (controls) {
        controls.innerHTML = `
            <div class="control-group fade-in">
                <label>Background Presets</label>
                <p class="empty-text">Background selector will be available in the next update.</p>
            </div>
        `;
    }
}