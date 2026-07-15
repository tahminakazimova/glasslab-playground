import state from "./state.js";
import dom from "./dom.js";
import { initializeControls } from "./ui/controls.js";
import { initializePreview, updatePreview } from "./ui/preview.js";
import { initializePresets, renderPresetSelector } from "./presets.js";
import { initializeBackgrounds } from "./backgrounds.js";
import { initializeHistory } from "./ui/history.js";
import { initializeDrag } from "./drag.js";
import { initializeCopyButtons } from "./ui/copy.js";
import { saveFavorites, getFavorites } from "./storage.js";
import { showToast } from "./ui/toast.js";

document.addEventListener("DOMContentLoaded", async () => {
    await initializePresets();
    await initializeBackgrounds();

    initializeControls();
    initializePreview();
    initializeHistory();
    initializeDrag();
    initializeCopyButtons();

    const presetsContainer = document.getElementById("presetsContainer");
    if (presetsContainer) {
        renderPresetSelector(presetsContainer);
    }

    if (dom.resetBtn) {
        dom.resetBtn.addEventListener("click", () => {
            state.glass = {
                color: "#ffffff",
                opacity: 0.15,
                blur: 16,
                borderWidth: 1,
                borderOpacity: 0.25,
                borderColor: "#ffffff",
                radiusTopLeft: 24,
                radiusTopRight: 24,
                radiusBottomRight: 24,
                radiusBottomLeft: 24
            };
            state.shadow = {
                x: 0,
                y: 8,
                blur: 32,
                spread: 0,
                opacity: 0.15,
                color: "#000000",
                inset: false
            };
            state.ui.selectedPreset = null;
            
            window.dispatchEvent(new CustomEvent("glasslab:update"));
            window.dispatchEvent(new CustomEvent("glasslab:resetPosition"));
            
            initializeControls(); 
            showToast("Settings reset to default");
        });
    }

    if (dom.favoriteBtn) {
        dom.favoriteBtn.addEventListener("click", () => {
            const currentFavs = getFavorites() || [];
            const newFav = {
                id: Date.now(),
                glass: { ...state.glass },
                shadow: { ...state.shadow },
                background: { ...state.background }
            };
            currentFavs.push(newFav);
            saveFavorites(currentFavs);
            showToast("Design saved to favorites!");
            
            window.dispatchEvent(new CustomEvent("glasslab:update"));
        });
    }

    updatePreview();
});