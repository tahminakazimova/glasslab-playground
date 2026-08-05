import state from "./state.js";
import dom from "./dom.js";
import { initializeControls } from "./ui/controls.js";
import { initializePreview, updatePreview } from "./ui/preview.js";
import { initializeHistory } from "./ui/history.js";
import { initializeDrag } from "./drag.js";
import { initializeCopyButtons } from "./ui/copy.js";
import { saveFavorites, getFavorites } from "./storage.js";
import { showToast } from "./ui/toast.js";

document.addEventListener("DOMContentLoaded", () => {
    try {
        console.log("🚀 App initializing...");
        
        initializeControls();
        initializePreview();
        initializeHistory();
        initializeDrag();
        initializeCopyButtons();

        if (dom && dom.resetBtn) {
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
                if (state.gradient) {
                    state.gradient.enabled = false;
                }
                
                window.dispatchEvent(new CustomEvent("glasslab:update"));
                window.dispatchEvent(new CustomEvent("glasslab:resetPosition"));
                
                initializeControls(); 
                showToast("Settings reset to default");
            });
        }

        if (dom && dom.favoriteBtn) {
            dom.favoriteBtn.addEventListener("click", () => {
                const currentFavs = getFavorites() || [];
                const newFav = {
                    id: Date.now(),
                    glass: { ...state.glass },
                    gradient: state.gradient ? { ...state.gradient } : null,
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
    } catch (err) {
        console.error("❌ App Initialization Error:", err);
    }
});