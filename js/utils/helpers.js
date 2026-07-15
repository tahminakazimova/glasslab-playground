export function clamp(value, min, max) {

    return Math.min(Math.max(value, min), max);

}

export function debounce(callback, delay = 250) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

export function throttle(callback, limit = 100) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback(...args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, limit);

    };

}

export function randomId(length = 10) {

    return Math.random()

        .toString(36)

        .substring(2, 2 + length);

}

export function deepClone(data) {

    return JSON.parse(JSON.stringify(data));

}

export function formatDate(date = new Date()) {

    return new Intl.DateTimeFormat("en-GB", {

        day: "2-digit",

        month: "short",

        hour: "2-digit",

        minute: "2-digit"

    }).format(date);

}

export function download(filename, content, type = "text/plain") {

    const blob = new Blob(

        [content],

        {

            type

        }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = filename;

    link.click();

    URL.revokeObjectURL(url);

}

export async function loadJSON(path) {

    const response = await fetch(path);

    if (!response.ok) {

        throw new Error("Failed to load JSON.");

    }

    return response.json();

}