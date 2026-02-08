let timeLeft = 1500;
let timerId = null;

function updateDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    document.getElementById('timer').textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function toggleTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        document.getElementById('startBtn').textContent = "Start";
    } else {
        document.getElementById('startBtn').textContent = "Pause";
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerId);
                document.getElementById('alarmSound').play();
                alert("Time's up!");
            }
        }, 1000);
    }
}

function setCustomTime() {
    let val = document.getElementById('userMinutes').value;
    if (val > 0) { timeLeft = val * 60; updateDisplay(); }
}

function addTask() {
    let input = document.getElementById('taskInput');
    if (!input.value) return;
    let li = document.createElement('li');
    li.style.margin = "10px 0";
    li.innerHTML = `${input.value} <button onclick="this.parentElement.remove()" style="float:right">X</button>`;
    document.getElementById('taskList').appendChild(li);
    input.value = "";
}const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicSource = document.getElementById('musicSource');
const trackSelect = document.getElementById('trackSelect');
const volumeSlider = document.getElementById('volumeSlider');

function toggleMusic() {
    if (music.paused) {
        music.play();
        musicBtn.textContent = "Pause";
        musicBtn.style.background = "#ffb74d"; // Change color when playing
    } else {
        music.pause();
        musicBtn.textContent = "Play";
        musicBtn.style.background = "#FFD54F";
    }
}

function changeTrack() {
    const wasPlaying = !music.paused;
    musicSource.src = trackSelect.value;
    music.load(); // Reload the audio element with the new file
    if (wasPlaying) {
        music.play();
    }
}

function adjustVolume() {
    music.volume = volumeSlider.value;
}

// Ensure volume is set correctly on load
window.onload = () => {
    music.volume = volumeSlider.value;
};