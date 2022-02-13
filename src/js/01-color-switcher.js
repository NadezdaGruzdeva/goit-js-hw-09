

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
startBtn.addEventListener('click', partyBody);
stopBtn.addEventListener('click', boringBody);

document.body.classList.add('body-switcher');
document.querySelectorAll('button').forEach(buttons => {
    buttons.classList.add('button-switcher');
})
   
document.querySelectorAll('p').forEach(ps => {
    ps.classList.add('p-switcher');
})
    
    
var myInterval;
function setBodyColor() {
    
    document.body.style.backgroundColor = getRandomHexColor();
}
function partyBody() {

    myInterval = setInterval(setBodyColor, 1000);
    
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function boringBody() {
    
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    clearInterval(myInterval);
    
}


