import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
const input = document.getElementById("datetime-picker");

const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let timerId = null;
startBtn.disabled = true;
startBtn.addEventListener('click', countdown);
let selectedDates, startDay, startHour, startMinute, startSecond;
let startDate = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: startDate,
  minuteIncrement: 1,
  onClose(selectedDate) {
    selectedDates = selectedDate;
    console.log(selectedDates);
    let differentMs = selectedDates[0] - startDate;
    startDay = convertMs(differentMs)['days'];
    startHour = convertMs(differentMs)['hours'];
    startMinute = convertMs(differentMs)['minutes'];
    startSecond = convertMs(differentMs)['seconds'];
    updateText(dataDays, startDay);
    updateText(dataHours, startHour);
    updateText(dataMinutes, startMinute);
    updateText(dataSeconds, startSecond);
    console.log(convertMs(differentMs));
    if (differentMs < 0) {
      Notify.failure("Please choose a date in the future");
      // window.alert("Please choose a date in the future");
    } else {
      startBtn.disabled = false;
    }
  },
};
flatpickr(input, options);
function updateText(dataTime, timeLabel, v) {
  dataTime.textContent = addLeadingZero(timeLabel);
  console.log(v)
}
function countdown() {
  const today = new Date();
  let differentMs = selectedDates[0] - today;
  console.log(convertMs(differentMs));
  console.log({'differentMs':differentMs})
  clearInterval(timerId);
  timerId = setInterval(timer, 1000);
  function timer() {
    // console.log({'differentMs':differentMs})
    let timerValues = convertMs(differentMs);

    if((differentMs > 86399999) && (timerValues['hours'] === 23) && (timerValues['minutes'] === 59) && (timerValues['seconds'] === 59)) updateText(dataDays, timerValues['days'], 'd');
    if((differentMs > 3599999) && (timerValues['minutes'] === 59) && (timerValues['seconds'] === 59)) updateText(dataHours, timerValues['hours'], 'h');
    if((differentMs > 59999) && (timerValues['seconds'] === 59)) updateText(dataMinutes, timerValues['minutes'], 'm');
    updateText(dataSeconds, timerValues['seconds'], 's');
    if (differentMs < 1000) {
      clearInterval(timerId);
    }
    differentMs -= 1000;
  }

  
}
function addLeadingZero(value) {
  return (value > 9) ? value : value.toString().padStart(2, '0');
}


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
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}