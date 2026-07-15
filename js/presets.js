import state from "./state.js";

let presetsList = [
    {
        id: "classic-glass",
        name: "Classic Glass",
        description: "Standard glassmorphism style with balanced blur and opacity.",
        glass: {
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
        },
        shadow: {
            x: 0,
            y: 8,
            blur: 32,
            spread: 0,
            opacity: 0.15,
            color: "#000000",
            inset: false
        }
    },
    {
        id: "apple-visionos",
        name: "Apple VisionOS",
        description: "Apple's custom visionOS glassmorphism style.",
        glass: {
            color: "#ffffff",
            opacity: 0.18,
            blur: 32,
            borderWidth: 1,
            borderOpacity: 0.28,
            borderColor: "#ffffff",
            radiusTopLeft: 24,
            radiusTopRight: 24,
            radiusBottomRight: 24,
            radiusBottomLeft: 24
        },
        shadow: {
            x: 0,
            y: 24,
            blur: 60,
            spread: -6,
            opacity: 0.22,
            color: "#000000",
            inset: false
        }
    },
    {
        id: "windows-acrylic",
        name: "Windows Acrylic",
        description: "Microsoft's Fluent Design Acrylic texture.",
        glass: {
            color: "#1a1a1a",
            opacity: 0.6,
            blur: 30,
            borderWidth: 1,
            borderOpacity: 0.15,
            borderColor: "#ffffff",
            radiusTopLeft: 8,
            radiusTopRight: 8,
            radiusBottomRight: 8,
            radiusBottomLeft: 8
        },
        shadow: {
            x: 0,
            y: 4,
            blur: 16,
            spread: 0,
            opacity: 0.3,
            color: "#000000",
            inset: false
        }
    },
    {
        id: "soft-glass",
        name: "Soft Glass",
        description: "Gentle look with high blur and low border impact.",
        glass: {
            color: "#ffffff",
            opacity: 0.08,
            blur: 20,
            borderWidth: 1,
            borderOpacity: 0.1,
            borderColor: "#ffffff",
            radiusTopLeft: 30,
            radiusTopRight: 30,
            radiusBottomRight: 30,
            radiusBottomLeft: 30
        },
        shadow: {
            x: 0,
            y: 10,
            blur: 40,
            spread: 0,
            opacity: 0.1,
            color: "#000000",
            inset: false
        }
    },
    {
        id: "dark-card",
        name: "Dark Card",
        description: "Elegant dark mode glassmorphism card.",
        glass: {
            color: "#0d0d0d",
            opacity: 0.45,
            blur: 12,
            borderWidth: 1,
            borderOpacity: 0.15,
            borderColor: "#333333",
            radiusTopLeft: 16,
            radiusTopRight: 16,
            radiusBottomRight: 16,
            radiusBottomLeft: 16
        },
        shadow: {
            x: 0,
            y: 12,
            blur: 24,
            spread: -4,
            opacity: 0.5,
            color: "#000000",
            inset: false
        }
    },
    {
        id: "neumorphism-light",
        name: "Neumorphism Light",
        description: "Soft light neumorphism alternative look.",
        glass: {
            color: "#f0f0f0",
            opacity: 0.9,
            blur: 0,
            borderWidth: 0,
            borderOpacity: 0,
            borderColor: "#ffffff",
            radiusTopLeft: 20,
            radiusTopRight: 20,
            radiusBottomRight: 20,
            radiusBottomLeft: 20
        },
        shadow: {
            x: 9,
            y: 9,
            blur: 16,
            spread: 0,
            opacity: 0.2,
            color: "#a3b1c6",
            inset: false
        }
    },
    {
        id: "floating-card",
        name: "Floating Card",
        description: "Card with heavy shadow to create floating effect.",
        glass: {
            color: "#ffffff",
            opacity: 0.25,
            blur: 10,
            borderWidth: 1,
            borderOpacity: 0.3,
            borderColor: "#ffffff",
            radiusTopLeft: 12,
            radiusTopRight: 12,
            radiusBottomRight: 12,
            radiusBottomLeft: 12
        },
        shadow: {
            x: 0,
            y: 30,
            blur: 60,
            spread: -10,
            opacity: 0.4,
            color: "#000000",
            inset: false
        }
    },
    {
        id: "minimal",
        name: "Minimal",
        description: "Clean, flat look with thin borders.",
        glass: {
            color: "#ffffff",
            opacity: 0.02,
            blur: 8,
            borderWidth: 1,
            borderOpacity: 0.08,
            borderColor: "#ffffff",
            radiusTopLeft: 16,
            radiusTopRight: 16,
            radiusBottomRight: 16,
            radiusBottomLeft: 16
        },
        shadow: {
            x: 0,
            y: 2,
            blur: 8,
            spread: 0,
            opacity: 0.05,
            color: "#000000",
            inset: false
        }
    }
];

export async function initializePresets() {
    return Promise.resolve(presetsList);
}

export function renderPresetSelector(container) {
    if (!container) return;

    container.innerHTML = ""; 

    const wrapper = document.createElement("div");
    wrapper.className = "presets-grid";

    presetsList.forEach(preset => {
        const item = document.createElement("div");
        item.className = "preset-item";
        if (state.ui.selectedPreset && state.ui.selectedPreset.id === preset.id) {
            item.classList.add("active");
        }

        item.innerHTML = `
            <div class="preset-name">${preset.name}</div>
            <div class="preset-desc">${preset.id}</div>
        `;

        item.addEventListener("click", () => {
            document.querySelectorAll(".preset-item").forEach(el => el.classList.remove("active"));
            item.classList.add("active");

            state.glass = { ...preset.glass };
            state.shadow = { ...preset.shadow };
            
            state.ui.selectedPreset = {
                id: preset.id,
                name: preset.name,
                description: preset.description
            };

            window.dispatchEvent(new CustomEvent("glasslab:update"));
            
            const controlsContainer = document.getElementById("controls");
            if (controlsContainer) {
                window.dispatchEvent(new CustomEvent("glasslab:tabChanged", { detail: state.ui.activeTab }));
            }
        });

        wrapper.appendChild(item);
    });

    container.appendChild(wrapper);
}