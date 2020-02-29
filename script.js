const explore = document.querySelector("#explore");
explore.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#splash").classList.add("raise");
});

const fill1 = document.querySelector("#fill1");
const fill2 = document.querySelector("#fill2");
const from = document.querySelector("#from");
const to = document.querySelector("#to");

let fromState = "";
let toState = "";
let tonsCo2 = 0;

const options = {
    "car": "Car",
    "coal": "Coal",
    "bus": "Bus",
    "subway": "Subway",
    "computers": "Computers",
    "cheese": "Cheese",
    "chicken": "Chicken",
    "beef": "Beef",
    "lentils": "Lentils",
    "ketchup": "Ketchup"
};

// https://calculator.carbonfootprint.com/calculator.aspx?tab=6
const conversions = {
    "car": 2.91 / 10000,
    "coal": 3.45 / 10000,
    "bus": 1.69 / 10000,
    "subway": 49.63 / 1000000,
    "computers": 4.87 / 10000,
    "cheese": 4.47 / 1000,
    "chicken": 1.7 / 1000,
    "beef": 8 / 1000,
    "lentils": 2.42 / 10000,
    "ketchup": 1.02 / 1000
};

const text = {
    "car": "Driving a car for ${input} miles",
    "coal": "Generating ${input} kwh of electricity from coal",
    "bus": "Riding a bus for ${input} miles",
    "subway": "Riding a subway for ${input} miles",
    "computers": "Buying $${input} worth of computers",
    "cheese": "Eating ${input} lbs of cheese",
    "chicken": "Eating ${input} lbs of chicken",
    "beef": "Eating ${input} lbs of beef",
    "lentils": "Eating ${input} lbs of lentils",
    "ketchup": "Eating ${input} lbs of ketchup"
}

for (const option in options) {
    const optionEl = document.createElement("option");
    optionEl.setAttribute("value", option);
    optionEl.innerText = options[option];

    from.appendChild(optionEl.cloneNode(true));
    to.appendChild(optionEl);
}
from.value = "beef";

from.addEventListener("change", setFrom);
to.addEventListener("change", setTo);

setTo();
setFrom();

const from0 = document.querySelector("#from_in0");
const to0 = document.querySelector("#to_in0");
from0.value = 15;
to0.value = 412;

function setFromState(newState) {
    const from0 = document.querySelector("#from_in0");

    fromState = newState;
    from0.addEventListener("input", () => {
        tonsCo2 = conversions[fromState] * parseFloat(from0.value);
        updateTo();
    });
}

function setToState(newState) {
    toState = newState;
    updateTo();
}

function updateTo() {
    const to0 = document.querySelector("#to_in0");
    to0.value = Math.round(tonsCo2 * (1 / conversions[toState]));
}

function getText(value, fromTo) {
    const input = `<input id="${fromTo}_in0" type="number" value="0" min="0" ${fromTo == "to" ? "readonly" : ""}/>`;
    return text[value].replace("${input}", input);
}

function setFrom() {
    fill1.innerHTML = getText(from.value, "from");
    setFromState(from.value);

    const from0 = document.querySelector("#from_in0");
    from0.value = Math.round((1 / conversions[toState]) * tonsCo2);

    from0.focus();
}

function setTo() {
    let text = getText(to.value, "to");
    fill2.innerHTML = text.charAt(0).toLowerCase() + text.slice(1);
    setToState(to.value);

    const from0 = document.querySelector("#from_in0");
    if (from0) {
        from0.focus();
    }
}
