const cover = document.getElementById("cover");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");

const playBtn = document.getElementById("play-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");
const songList = document.getElementById("song-list");

const songs = [
    {
        title: "Background Music",
        artist: "JonasBlakewood",
        src: "songs/jonasblakewood-background-music-618629.mp3",
        cover: "img/imgi_1_16-18-30-283_200x200.png"
    },
    {
        title: "Elevator On Hold Music",
        artist: "vjgalaxy",
        src: "songs/audiodollar-on-hold-music-371876.mp3",
        cover: "img/imgi_1_17-53-42-443_200x200.jpg"
    },
    {
        title: "On Hold Music",
        artist: "AudioDollar",
        src: "songs/vjgalaxy-elevator-on-hold-music-570976.mp3",
        cover: "img/imgi_56_11-08-41-358_200x200.png"
    }
];


// ===============================
// 3. Create Audio Object
// ===============================

const audio = new Audio();

let currentSongIndex = 0;
let isShuffle = false;


// ===============================
// 4. Load Song
// ===============================

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    cover.src = song.cover;

    audio.src = song.src;

    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
}


// ===============================
// 5. Play Song
// ===============================

function playSong() {
    cover.classList.add("playing");
    audio.play();

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}


// ===============================
// 6. Pause Song
// ===============================

function pauseSong() {
    cover.classList.remove("playing");
    audio.pause();

    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}


// ===============================
// 7. Play / Pause Button
// ===============================

playBtn.addEventListener("click", () => {

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }

});

shuffleBtn.addEventListener("click", () => {

    isShuffle = !isShuffle;

    shuffleBtn.classList.toggle("active");

});


 // ===============================
 // 8. Next Song
 // ===============================

nextBtn.addEventListener("click", () => {

    if (isShuffle) {

        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentSongIndex && songs.length > 1);

        currentSongIndex = randomIndex;

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }

    }

    loadSong(currentSongIndex);
    createPlaylist();
    playSong();

});


// ===============================
// 10. Update Progress Bar
// ===============================

audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const progressPercent =
            (audio.currentTime / audio.duration) * 100;

        progress.value = progressPercent;

        currentTime.textContent = formatTime(audio.currentTime);
        duration.textContent = formatTime(audio.duration);

    }

});


// ===============================
// 11. Format Time
// ===============================

function formatTime(time) {

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;

}


// ===============================
// 12. Change Song Position
// ===============================

progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


// ===============================
// 13. Volume Control
// ===============================

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

audio.volume = volume.value;


// ===============================
// 14. Create Playlist
// ===============================

function createPlaylist() {

    songList.innerHTML = "";

    songs.forEach((song, index) => {

        const songItem = document.createElement("div");

        songItem.classList.add("song-item");
        if (index === currentSongIndex) {
    songItem.classList.add("active");
}

        songItem.innerHTML = `
            <div>
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        `;

        songItem.addEventListener("click", () => {

            currentSongIndex = index;
            loadSong(currentSongIndex);
            createPlaylist();
            playSong();

        });

        songList.appendChild(songItem);

    });

}


// ===============================
// 15. Auto Play Next Song
// ===============================

audio.addEventListener("ended", () => {

    nextBtn.click();

});


// ===============================
// 16. Initialize Player
// ===============================

loadSong(currentSongIndex);

createPlaylist();
