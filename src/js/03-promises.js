import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector(".form"),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}

refs.form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve,reject) =>{
    const shouldResolve = Math.random() > 0.3;
    setTimeout(()=>{
      if (shouldResolve) {
        resolve({position, delay})
      }else{
        reject({position,delay})
      }
    },delay)
  })
}

function onFormSubmit(event){
  event.preventDefault();
  let delay = parseInt(refs.delay.value);
  let step = parseInt(refs.step.value);
  let amount = parseInt(refs.amount.value);
  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay + step*(position-1))
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
  }
  event.currentTarget.reset();
}







