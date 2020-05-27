const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full__screen');
const togglePlay = () => {
  if(video.paused){
    video.play();
  }else {
    video.pause();
  }
}

const updateButton = () => {
  // if(video.paused){
  //   toggle.textContent = '►';
  // }else{
  //   toggle.textContent = '❚ ❚';
  // }

  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

// const skip = (event) => {
//  video.currentTime += parseFloat(event.target.dataset.skip);
// }

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
 }

function handleRangeUpdate() {
  // get the value and name from the element
  // const name = this.name;
  // const value = this.value;

  // update video property that is the same as the element name
  // video[name] = value

  // simplified version
  video[this.name] = this.value
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  //find the offsetX of the click, find teh totally width of the progress bar
  // use values to calculate percentage value for how far to move the video 
  // multiply by video duration to get the exact second to move the video.currentTime to
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}

function handleFullScreen() {
  console.log("clicked")
  video.requestFullscreen();
}
// Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fullScreen.addEventListener('click', handleFullScreen);