const STORAGE_KEYS = {
    HISTORY: "glasslab_history",
    FAVORITES: "glasslab_favorites"
};

export function getHistory() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("History could not be read", e);
        return [];
    }
}

export function saveHistory(history) {
    try {
        let historyArray = Array.isArray(history) ? history : [];
        
        const trimmed = historyArray.slice(-20);
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmed));
    } catch (e) {
        console.error("History could not be saved", e);
    }
}

export function getFavorites() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Favorites could not be read", e);
        return [];
    }
}

export function saveFavorites(favorites) {
    try {
        let favoritesArray = Array.isArray(favorites) ? favorites : [];
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favoritesArray));
    } catch (e) {
        console.error("Favorites could not be saved", e);
    }
}