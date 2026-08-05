import dom from "../dom.js";
import { renderGlassSliders } from "./sliders.js";
import { renderShadowSliders } from "./shadow.js";
import { renderGradientSliders } from "./gradient.js";
import { updatePreview } from "./preview.js";

export function initializeControls() {
    const tabs = dom.tabs || document.querySelectorAll("[data-tab]");
    
    if (tabs && tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(item => item.classList.remove("active"));
                tab.classList.add("active");
                renderSelectedTab(tab.dataset.tab);
            });
        });
    }

    renderGlassSliders(updatePreview);
}

function renderSelectedTab(tabName) {
    switch (tabName) {
        case "glass":
            renderGlassSliders(updatePreview);
            break;
        case "gradient":
            renderGradientSliders(updatePreview);
            break;
        case "shadow":
            renderShadowSliders(updatePreview);
            break;
        case "radius":
            renderEmptyPanel("Border Radius editor will be available in the next update.");
            break;
        case "background":
            renderEmptyPanel("Background selector will be available in the next update.");
            break;
        default:
            renderGlassSliders(updatePreview);
    }
}

function renderEmptyPanel(message) {
    const container = dom.controls || document.getElementById("controls");
    if (container) {
        container.innerHTML = `
            <div class="control-group fade-in">
                <p class="empty-text" style="color: #8a99ad; font-size: 13px; padding: 10px 0;">${message}</p>
            </div>
        `;
    }
}