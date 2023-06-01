import flatpickr from "flatpickr";

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

refs.btnStartEl,addEventListener('ckilck', startTimer);

flatpickr('#datetime-picker',{
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
}});
    
function startTimer(){};

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
