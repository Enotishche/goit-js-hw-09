import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelayForm = document.querySelector('[name="delay"]');
const delayStepForm = document.querySelector('[name="step"]');
const amountForm =  document.querySelector('[name="amount"]');
const formEl = document.querySelector(".form");


formEl.addEventListener("click", onSubmitForm)

function onSubmitForm(event) { 
  event.preventDefault();
  
  const firstStep = Number (firstDelayForm.value);
  const step = Number (delayStepForm.value);
  const amount = Number (amountForm.value);
  let delay = firstStep;

  for (let position = 1; position <= amount; position += 1) {
    
    createPromise(position, delay)
      .then(({ position, delay }) => Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
      .catch(({ position, delay }) => Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`))
    delay += step;
  }
}



function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
   if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


  
  
