//song1//
const card = document.getElementById("lutherCard");
const audio = document.getElementById("lutherAudio");
card.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

//song2//
const song2Card = document.getElementById("song2Card");
const song2Audio = document.getElementById("song2Audio");
song2Card.addEventListener("click", () => {
    if (song2Audio.paused) {
        song2Audio.play();
    } else {
        song2Audio.pause();
    }
});

//song3//
const song3Card = document.getElementById("song3Card");
const song3Audio = document.getElementById("song3Audio");
song3Card.addEventListener("click", () => {
    if (song3Audio.paused) {
        song3Audio.play();
    } else {
        song3Audio.pause();
    }
});

