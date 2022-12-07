import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    inputEl: document.querySelector("#datetime-picker"),
    btnStartEl: document.querySelector("[data-start]"),
    daysEl: document.querySelector("[data-days]"),
    hoursEl: document.querySelector("[data-hours]"),
    minutesEl: document.querySelector("[data-minutes]"),
    secondsEl: document.querySelector("[data-seconds]"),
};


let timerId = null;
let chooseDate = null;

refs.btnStartEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] - new Date() <= 0) {
      refs.btnStartEl.disabled = true;
      Notify.failure("Please choose a date in the future");
} else {
      refs.btnStartEl.disabled = false;
    }
  },
};

flatpickr(refs.inputEl, options);

refs.btnStartEl.addEventListener("click", onTimer);

function onTimer() {
  refs.inputEl.disabled = true;
  refs.btnStartEl.disabled = true;

    timerId = setInterval(() => {
    chooseDate = new Date(refs.inputEl.value) - new Date();
    updateTimer(chooseDate);
    if (chooseDate < 1000) {
        clearInterval(timerId);
    
      refs.inputEl.disabled = false;
    }
  }, 1000);
}


function addLeadingZero(value) { 
    return String(value).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };

    
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function updateTimer(value) {
  const { days, hours, minutes, seconds } = convertMs(value);
    refs.daysEl.textContent = days;
    refs.hoursEl.textContent = hours;
    refs.minutesEl.textContent = minutes;
    refs.secondsEl.textContent = seconds;
}