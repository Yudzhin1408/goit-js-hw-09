// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const refs = {
   inputEl: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("button[data-start]"),
  daysEl: document.querySelector("span[data-days]"),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};


let deltaTime = 0;
let timer = null;

refs.startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const valueSelectedDate = selectedDates[0].getTime();
        if (valueSelectedDate < Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future')
        }
        else {
            Notiflix.Notify.success("Great! Let's go to start!");
            refs.startBtn.disabled = false;
        };
    },
};

flatpickr("#datetime-picker", options);




refs.startBtn.addEventListener('click', startBtnClick);

function startBtnClick() {
    deltaTime = new Date(refs.inputEl.value);
    refs.inputEl.disabled = true;
    makeTimeInterval();
    timer=setInterval(makeTimeInterval,1000)
};

function makeTimeInterval() {
   const currentTime = Date.now();
  let count = convertMs(deltaTime.getTime() - currentTime);
  refs.daysEl.innerHTML = addLeadingZero(count.days);
  refs.hoursEl.innerHTML = addLeadingZero(count.hours);
  refs.minutesEl.innerHTML = addLeadingZero(count.minutes);
  refs.secondsEl.innerHTML = addLeadingZero(count.seconds);
  refs.startBtn.disabled = true;
  if (deltaTime.getTime() - currentTime <= 1000) {
    clearInterval(timer);
    refs.startBtn.disabled = false;
    refs.inputEl.setAttribute('readonly', false);
  }
};


// разница между конечной и текущей датой в миллисекундах.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};


function addLeadingZero(param) {
  return String(param).padStart(2, '0')
}






