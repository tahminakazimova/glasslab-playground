const state = {
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
    },
    background: {
        id: 1,
        name: "Dark Space"
    },
    ui: {
        activeTab: "glass",
        selectedPreset: null
    },
    history: [],
    favorites: []
};

export default state;