import state from "../state.js";
import dom from "../dom.js";

const shadowSliders = [
    {
        key: "x",
        label: "Offset X",
        min: -100,
        max: 100,
        step: 1,
        unit: "px"
    },
    {
        key: "y",
        label: "Offset Y",
        min: -100,
        max: 100,
        step: 1,
        unit: "px"
    },
    {
        key: "blur",
        label: "Blur",
        min: 0,
        max: 120,
        step: 1,
        unit: "px"
    },
    {
        key: "spread",
        label: "Spread",
        min: -50,
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
    }
];

export function renderShadowSliders(onChange) {

    dom.controls.innerHTML = "";

    shadowSliders.forEach(item => {

        const group = createSlider(item);

        const input = group.querySelector("input");

        const value = group.querySelector(".slider-value");

        input.addEventListener("input", e => {

            const currentValue = Number(e.target.value);

            state.shadow[item.key] = currentValue;

            value.textContent = `${currentValue}${item.unit}`;

            onChange();

        });

        dom.controls.append(group);

    });

    dom.controls.append(createColorPicker(onChange));

}

function createSlider(item) {

    const wrapper = document.createElement("div");

    wrapper.className = "control-group fade-in";

    wrapper.innerHTML = `

        <label>

            <span>${item.label}</span>

            <span class="slider-value">

                ${state.shadow[item.key]}${item.unit}

            </span>

        </label>

        <input
            type="range"
            min="${item.min}"
            max="${item.max}"
            step="${item.step}"
            value="${state.shadow[item.key]}"
        >

    `;

    return wrapper;

}

function createColorPicker(onChange) {

    const wrapper = document.createElement("div");

    wrapper.className = "control-group fade-in";

    wrapper.innerHTML = `

        <label>

            <span>Shadow Color</span>

            <span>${state.shadow.color}</span>

        </label>

        <input
            type="color"
            value="${state.shadow.color}"
        >

    `;

    const input = wrapper.querySelector("input");

    const value = wrapper.querySelector("label span:last-child");

    input.addEventListener("input", e => {

        state.shadow.color = e.target.value;

        value.textContent = e.target.value;

        onChange();

    });

    return wrapper;

}