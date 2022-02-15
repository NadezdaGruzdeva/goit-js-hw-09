import { Notify } from 'notiflix/build/notiflix-notify-aio';



const delayInput = document.querySelector('input[name="delay"]');
const stepDelayInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const btnSubmit = document.querySelector('button[type="submit"]');
btnSubmit.addEventListener('click', start);
let timerId = null;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    return Promise.resolve({ 'position': position, 'delay': delay });
  } else {
    // Reject
    return Promise.reject({ 'position': position, 'delay': delay });
  }
}
  
function start(evt) {
  evt.preventDefault();
  const delay = delayInput.value;
  const stepDelay = stepDelayInput.value;
  let position = amountInput.value;
  console.log({'position': position, 'delay': delay, 'stepDelay': stepDelay})
  setTimeout(() => {
    clearInterval(timerId);
    timerId = setInterval(() => {

      createPromise(position, stepDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      position--;
      if (position === 0) { clearInterval(timerId); }
    }, stepDelay)
  }, delay);
}

