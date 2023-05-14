import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    timerShow: document.querySelector(".timer"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]")

}
console.log(refs.days)
refs.timerShow.style["display"] = "flex"
refs.timerShow.style["gap"] = "8px"
refs.startBtn.disabled = 'true'
refs.startBtn.addEventListener("click", handleTimer);
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
function handleTimer(){
    refs.startBtn.disabled = "true"
    setInterval(()=>{ 
        let now = Date.now()
        const interval = futureDate-now
        const {days, hours, minutes, seconds} = convertMs(interval)
        refs.days.textContent = days
        refs.hours.textContent = hours
        refs.hours.textContent = minutes
        refs.seconds.textContent = seconds
    },STEP_OF_TIME)
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

