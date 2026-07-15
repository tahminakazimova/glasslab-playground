import state from "../state.js";
import dom from "../dom.js";
import { generateCSS, generateTailwind } from "../utils.js";

export function initializePreview() {
    window.addEventListener("glasslab:update", () => {
        updatePreview();
    });

    updatePreview();
}

export function updatePreview() {
    const card = dom.previewCard;
    if (!card) return;

    const cssData = generateCSS(state);
    const tailwindCode = generateTailwind(state);

    card.style.background = cssData.background;
    card.style.backdropFilter = cssData.backdropFilter;
    card.style.webkitBackdropFilter = cssData.webkitBackdropFilter;
    card.style.border = cssData.border;
    card.style.boxShadow = cssData.boxShadow;
    card.style.borderRadius = cssData.borderRadius;

    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.justifyContent = "center";
    card.style.alignItems = "center";
    card.style.textAlign = "center";

    if (dom.cssOutput) {
        dom.cssOutput.textContent = cssData.fullCode;
    }
    if (dom.tailwindOutput) {
        dom.tailwindOutput.textContent = tailwindCode;
    }

    const cardTitle = card.querySelector("h3") || card.querySelector(".card-title") || card.firstChild;
    const cardDesc = card.querySelector("p") || card.querySelector(".card-desc") || card.lastChild;

    if (cardTitle && cardTitle.style) {
        cardTitle.style.textAlign = "center";
        cardTitle.style.width = "100%";
        cardTitle.style.margin = "0 0 8px 0";
    }
    if (cardDesc && cardDesc.style) {
        cardDesc.style.textAlign = "center";
        cardDesc.style.width = "100%";
        cardDesc.style.margin = "0";
    }

    if (state.ui.selectedPreset) {
        if (cardTitle && typeof cardTitle.textContent !== "undefined") {
            cardTitle.textContent = state.ui.selectedPreset.name;
        }
        if (cardDesc && typeof cardDesc.textContent !== "undefined") {
            cardDesc.textContent = state.ui.selectedPreset.description || "Modern glassmorphism UI component.";
        }
    } else {
        if (cardTitle && typeof cardTitle.textContent !== "undefined") {
            cardTitle.textContent = "Glass Card";
        }
        if (cardDesc && typeof cardDesc.textContent !== "undefined") {
            cardDesc.textContent = "Modern glassmorphism UI component.";
        }
    }
}