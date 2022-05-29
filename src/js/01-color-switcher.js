const startBtn = document.querySelector('button[data-start]');
const bodyEl = document.querySelector('body');
const stopBtn = document.querySelector('button[data-stop]');


startBtn.addEventListener('click', startBtnClick);
stopBtn.addEventListener('click', stopBtnClick);

let timerId = null;
stopBtn.disabled = true;


function startBtnClick() {
    console.log('клик');
  startBtn.disabled = true;
  stopBtn.disabled = false;
 timerId = setInterval(() => {
    bodyEl.style.background = getRandomHexColor();
  }, 1000)
};


function stopBtnClick() {
    console.log('клик stop');
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;

};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}