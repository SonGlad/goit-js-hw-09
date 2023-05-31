function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

const refs = {
    btnStartEl: document.querySelector("button[data-start]"),
    btnStopEl: document.querySelector("button[data-stop]"),
};
const INTERVAL_DELAY = 1000;
let intervalId = null;


refs.btnStartEl.addEventListener('click', startColorSwitcher);
refs.btnStopEl.addEventListener('click', stopColorSwitcher);


function startColorSwitcher(){
    if(intervalId){
        return;  
      }
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, INTERVAL_DELAY);
    refs.btnStartEl.disabled = true;
    refs.btnStopEl.disabled = false;
};

function stopColorSwitcher(){
    if(intervalId){
        clearInterval(intervalId);
        refs.btnStartEl.disabled = false;
        refs.btnStopEl.disabled = true;
        intervalId = null;
    }
};