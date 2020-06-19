let countdown;
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown)
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  // allows you to display seconds starting at the initial time given;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //Check if we should stop it!
    if(secondsLeft < 0){
      clearInterval(countdown);
      return;
    } 
    // display it 
    displayTimeLeft(secondsLeft);
  }, 1000)
}

// function to display time so that you don't have to wait for set interval to run for 1 sec before displaying. 
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0': ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

// Time on clock for when the timer ends
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const min = end.getMinutes();
  endTime.textContent = `Be Back at ${hour > 12 ? hour -12 : hour}:${min < 10 ? '0': ''}${min}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
})