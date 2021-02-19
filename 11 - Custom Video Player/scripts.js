const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let mousedown = false;

function togglePlay() {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

function updateButton() {
  const icon = video.paused ?  '►' : '❚ ❚'
  toggle.textContent = icon;
}

function handleSkip(skip) {
  video.currentTime += skip;
}

function handleRangeSlider(property, value) {
  video[property] = value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

player.addEventListener('mousedown', () => mousedown = true)
player.addEventListener('mouseup', () => mousedown = false)
video.addEventListener('timeupdate', handleProgress);


video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

skipButtons.forEach(b => {
  const skip = Number(b.dataset.skip)
  b.addEventListener('click', () => handleSkip(skip))
})

ranges.forEach(range => range.addEventListener('click', () => {
  handleRangeSlider(range.name, range.value)
}));
ranges.forEach(range => range.addEventListener('mousemove', () => {
  if (mousedown) {
    handleRangeSlider(range.name, range.value)
  }
}));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
  if (mousedown) {
    scrub(e)
  }
});