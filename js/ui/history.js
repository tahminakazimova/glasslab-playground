import state from "../state.js";
import dom from "../dom.js";
import { getFavorites, saveFavorites } from "../storage.js";

export function initializeHistory() {
    renderHistoryAndFavorites();

    window.addEventListener("glasslab:update", () => {
        renderHistoryAndFavorites();
    });
}

export function renderHistoryAndFavorites() {
    const historyContainer = dom.historyList || document.getElementById("historyList");
    const favoritesContainer = dom.favoritesList || document.getElementById("favoritesList");

    const favoritesData = getFavorites() || [];

    const updateContainer = (container) => {
        if (!container) return;

        if (favoritesData.length === 0) {
            container.innerHTML = `<div class="empty-state">No saved designs yet. Click "Favorite" to save!</div>`;
            return;
        }

        container.innerHTML = "";
        
        [...favoritesData].reverse().forEach((fav) => {
            const item = document.createElement("div");
            item.className = "history-item";
            item.innerHTML = `
                <div class="history-item-info">
                    <span class="history-item-title">Saved Design</span>
                    <span class="history-item-time">Blur: ${fav.glass.blur}px, Opacity: ${Math.round(fav.glass.opacity * 100)}%</span>
                </div>
                <div class="history-item-actions">
                    <button class="btn-apply" title="Apply Design">⚡ Apply</button>
                    <button class="btn-delete" title="Delete" style="background: none; border: none; cursor: pointer; padding: 4px;">🗑️</button>
                </div>
            `;

            item.querySelector(".btn-apply").addEventListener("click", () => {
                state.glass = { ...fav.glass };
                state.shadow = { ...fav.shadow };
                
                state.ui.selectedPreset = fav.preset || null;

                window.dispatchEvent(new CustomEvent("glasslab:update"));
                window.dispatchEvent(new CustomEvent("glasslab:tabChanged", { detail: state.ui.activeTab }));
            });

            item.querySelector(".btn-delete").addEventListener("click", () => {
                const updatedFavs = favoritesData.filter(f => f.id !== fav.id);
                saveFavorites(updatedFavs);
                renderHistoryAndFavorites();
            });

            container.appendChild(item);
        });
    };

    updateContainer(historyContainer);
    updateContainer(favoritesContainer);
}