

const startEl = document.querySelector("[data-start]");
const stopEl = document.querySelector("[data-stop]");
const bodyEl = document.querySelector("body");

let timerId = null;

stopEl.disabled = true;

startEl.addEventListener("click", onStartSwitchColor);
stopEl.addEventListener("click", onStopSwitchColor);

function onStartSwitchColor(event) {
  startEl.disabled = true;
  stopEl.disabled = false;
  timerId = setInterval(() => {
    return bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
 };

function onStopSwitchColor(event) { 
  stopEl.disabled = true;
  startEl.disabled = false;
  clearInterval(timerId);
};


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
