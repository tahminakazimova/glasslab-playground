import state from "../state.js";

import dom from "../dom.js";

import { saveFavorite, getFavorites } from "../storage.js";

import { deepClone } from "../utils/helpers.js";

import { showSuccess } from "./toast.js";

export function initializeFavorites() {

    renderFavorites();

    dom.favoriteBtn.addEventListener("click", () => {

        addCurrentDesign();

    });

}

function addCurrentDesign() {

    const design = {

        glass: deepClone(state.glass),

        shadow: deepClone(state.shadow),

        background: deepClone(state.background),

        createdAt: Date.now()

    };

    saveFavorite(design);

    renderFavorites();

    showSuccess("Added to favorites");

}

export function renderFavorites() {

    const favorites = getFavorites();

    state.favorites = favorites;

    if (!dom.favoritesList) return;

    if (favorites.length === 0) {

        dom.favoritesList.innerHTML = `

            <p class="empty-text">

                No favorites yet.

            </p>

        `;

        return;

    }

    dom.favoritesList.innerHTML = favorites

        .map((item, index) => {

            return `

                <div class="favorite-item" data-index="${index}">

                    <div>

                        <strong>

                            Favorite ${index + 1}

                        </strong>

                        <small>

                            Blur ${item.glass.blur}px

                        </small>

                    </div>

                    <button class="load-favorite">

                        Load

                    </button>

                </div>

            `;

        })

        .join("");

    bindFavoriteEvents();

}

function bindFavoriteEvents() {

    document

        .querySelectorAll(".load-favorite")

        .forEach((button, index) => {

            button.addEventListener("click", () => {

                loadFavorite(index);

            });

        });

}

function loadFavorite(index) {

    const item = state.favorites[index];

    if (!item) return;

    state.glass = deepClone(item.glass);

    state.shadow = deepClone(item.shadow);

    state.background = deepClone(item.background);

    window.dispatchEvent(

        new CustomEvent("glasslab:update")

    );

    showSuccess("Favorite loaded");

}