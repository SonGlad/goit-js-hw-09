import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

// Extra Styles Import \\

import "flatpickr/dist/flatpickr.min.css";

// \\

const refs = {
    inputEl: document.querySelector("#datetime-picker"),
    btnStartEl: document.querySelector('button[data-start]'),
    spanDaysEl: document.querySelector('span[data-days]'),
    spanHoursEL: document.querySelector('span[data-hours]'),
    spanMinutEL: document.querySelector('span[data-minutes]'),
    spanSeconEL: document.querySelector('span[data-seconds]'),

    divTimeEl: document.querySelector(".timer"),
    divFieldEl: document.querySelectorAll(".field"),
};

applyNewStylesForDivTimer();
    
refs.btnStartEl.disabled = true;
refs.btnStartEl.addEventListener('click', () => {
    timer.start();
});


// Options for flatpickr\\
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date();
        const chosenDate = selectedDates[0];
        if (chosenDate <= currentDate) {
            Notiflix.Notify.warning('Please choose a date in the future');
            refs.btnStartEl.disabled = true;
        } else {
            refs.btnStartEl.disabled = false;
        }
    }}; 
flatpickr(refs.inputEl, options);
    
    
const timer = {
    intervalId: null,
    isActive: false,
    start() {
        if(this.isActive){
            return;
        }
        const startTime = flatpickr
        .parseDate(refs.inputEl.value, 'Y-m-d H:i:S');
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            const time = convertMs(deltaTime);
            spanUpdateAccodringToCklock(time);
            if (deltaTime <= 0) {
                clearInterval(this.intervalId);
                spanUpdateAccodringToCklock(convertMs(0));
              }        
        },1000);
    },
};   


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};


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
    //   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
    //   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
    //   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
};


function spanUpdateAccodringToCklock({days, hours, minutes, seconds}){
    refs.spanDaysEl.textContent = `${days}`;
    refs.spanHoursEL.textContent = `${hours}`;
    refs.spanMinutEL.textContent = `${minutes}`;
    refs.spanSeconEL.textContent = `${seconds}`;
};


function applyNewStylesForDivTimer(){ 
    refs.divTimeEl.style.display = "flex";
    refs.divTimeEl.style.gap = "10px";
        
    refs.divFieldEl.forEach(element => {
        element.style.display = "flex";
        element.style.flexDirection = "column";
        element.style.alignItems = "center";
        element.style.justifyContent = "center";
    
        const divFirstChild = element.firstElementChild;
        divFirstChild.style.fontSize = "34px";
    
        const divLastChild = element.lastElementChild;
        divLastChild.style.fontWeight = "600";
        divLastChild.style.textTransform = "uppercase";
        divLastChild.style.fontSize = "13px";
    });
};