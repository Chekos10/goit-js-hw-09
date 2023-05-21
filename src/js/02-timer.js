import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    timerShow: document.querySelector(".timer"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
    dataPicker: document.getElementById("datetime-picker"),
}
console.log(refs.dataPicker)
refs.timerShow.style["display"] = "flex"
refs.timerShow.style["gap"] = "8px"
refs.startBtn.disabled = 'true'
refs.startBtn.addEventListener("click", updateFaceClock);
const STEP_OF_TIME = 1000;
const currentDate = Date.now();
let futureDate = null;


flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        futureDate = selectedDates[0].getTime()
        if(futureDate<currentDate){
            refs.startBtn.disabled = "true"
            window.alert("Please choose a date in the future")
            return;
        }
        refs.startBtn.disabled = ''
    },
})
function updateFaceClock(){
    refs.startBtn.disabled = "true"
    refs.dataPicker.disabled = "true"
    const timerId = setInterval(()=>{ 
        let now = Date.now()
        const interval = futureDate-now
        const {days, hours, minutes, seconds} = convertMs(interval)
        if(futureDate <= now){
            return clearInterval(timerId)
        }
        refs.days.textContent = days
        refs.hours.textContent = hours
        refs.minutes.textContent = minutes
        refs.seconds.textContent = seconds

    },STEP_OF_TIME)
}


function pad(value){
    return String(value).padStart( 2, '0')
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

