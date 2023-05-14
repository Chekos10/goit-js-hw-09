const refs = {
    startBtn : document.querySelector('button[data-start]'),
    stopBtn : document.querySelector('button[data-stop]'),
}
const DELAY_OF_SWITCH = 1000;
refs.startBtn.addEventListener('click', startChangeColor)
refs.stopBtn.addEventListener('click', stopChangeColor)
let interId = null;
function startChangeColor(event){
    event.target.disabled = "true"
        intervalId = setInterval(()=>{
            document.body.style.background = getRandomHexColor()
        },DELAY_OF_SWITCH)
}

function stopChangeColor(event){
    clearInterval(intervalId)
    refs.startBtn.disabled = ""
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

