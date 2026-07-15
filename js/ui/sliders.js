import state from "../state.js";
import dom from "../dom.js";

const sliders = [
    {
        key: "blur",
        label: "Blur",
        min: 0,
        max: 50,
        step: 1,
        unit: "px"
    },
    {
        key: "opacity",
        label: "Opacity",
        min: 0,
        max: 1,
        step: .01,
        unit: ""
    },
    {
        key: "borderOpacity",
        label: "Border Opacity",
        min: 0,
        max: 1,
        step: .01,
        unit: ""
    },
    {
        key: "radius",
        label: "Border Radius",
        min: 0,
        max: 60,
        step: 1,
        unit: "px"
    }
];

export function renderGlassSliders(onChange) {

    dom.controls.innerHTML = "";

    sliders.forEach(slider => {

        const group = createSlider(slider);

        const input = group.querySelector("input");

        const value = group.querySelector(".slider-value");

        input.addEventListener("input", e => {

            const currentValue = Number(e.target.value);

            state.glass[slider.key] = currentValue;

            value.textContent = `${currentValue}${slider.unit}`;

            onChange();

        });

        dom.controls.append(group);

    });

}

function createSlider(slider) {

    const wrapper = document.createElement("div");

    wrapper.className = "control-group fade-in";

    wrapper.innerHTML = `

        <label>

            <span>${slider.label}</span>

            <span class="slider-value">

                ${state.glass[slider.key]}${slider.unit}

            </span>

        </label>

        <input
            type="range"
            min="${slider.min}"
            max="${slider.max}"
            step="${slider.step}"
            value="${state.glass[slider.key]}"
        >

    `;

    return wrapper;

}