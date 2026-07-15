import dom from "../dom.js";

import { renderGlassSliders } from "./sliders.js";
import { renderShadowSliders } from "./shadow.js";
import { updatePreview } from "./preview.js";

export function initializeTabs() {

    dom.tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            if (tab.classList.contains("active")) return;

            dom.tabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            renderTab(tab.dataset.tab);

        });

    });

}

function renderTab(tabName) {

    switch (tabName) {

        case "glass":
            renderGlassSliders(updatePreview);
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

}

function renderRadiusPanel() {

    dom.controls.innerHTML = `

        <div class="control-group fade-in">

            <label>

                Border Radius

            </label>

            <p class="empty-text">

                Radius editor will be available in the next update.

            </p>

        </div>

    `;

}

function renderBackgroundPanel() {

    dom.controls.innerHTML = `

        <div class="control-group fade-in">

            <label>

                Background Presets

            </label>

            <p class="empty-text">

                Background selector will be available in the next update.

            </p>

        </div>

    `;

}