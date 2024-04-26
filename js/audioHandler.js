export function playMainTheme() {
    mainTheme.volume = 0.2;
    mainTheme.play();
}

export function activateSoundBtn() {
    soundButton.addEventListener("click", activateSound);
}

function activateSound() {
    if (soundOn) {
        mainTheme.pause();
        soundOn = false;
        soundButton.innerHTML = "&#128263;";
    } else {
        playMainTheme();
        soundOn = true;
        soundButton.innerHTML = "&#128264;";
    }
}

var soundOn = false;
var mainTheme = new Audio("audio/Battle-Vampire.mp3");
var soundButton = document.getElementById("sound-button");
