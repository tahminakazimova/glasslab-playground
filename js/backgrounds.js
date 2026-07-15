import state from "./state.js";

import dom from "./dom.js";

import { loadJSON } from "./utils/helpers.js";

let backgrounds = [];

export async function initializeBackgrounds() {

    try {

        backgrounds = await loadJSON("./data/backgrounds.json");

        renderBackgroundSelector();

        applyBackground(state.background.id);

    }

    catch (error) {

        console.error("Backgrounds couldn't be loaded.", error);

    }

}

function renderBackgroundSelector() {

    const container = document.getElementById("controls");

    if (!container) return;

    if (state.ui.activeTab !== "background") return;

    container.innerHTML = "";

    backgrounds.forEach(background => {

        const button = document.createElement("button");

        button.className = "background-item";

        button.dataset.id = background.id;

        button.textContent = background.name;

        if (background.id === state.background.id) {

            button.classList.add("active");

        }

        button.addEventListener("click", () => {

            applyBackground(background.id);

        });

        container.appendChild(button);

    });

}

export function applyBackground(id) {

    const background = backgrounds.find(item => item.id === id);

    if (!background) return;

    state.background.id = background.id;

    state.background.name = background.name;

    dom.previewCanvas.style.background = background.value;

    document.querySelectorAll(".background-item")

        .forEach(button => {

            button.classList.toggle(

                "active",

                Number(button.dataset.id) === id

            );

        });

}

export function getBackgrounds() {

    return backgrounds;

}

window.addEventListener("glasslab:tabChanged", event => {

    state.ui.activeTab = event.detail;

    if (event.detail === "background") {

        renderBackgroundSelector();

    }

});