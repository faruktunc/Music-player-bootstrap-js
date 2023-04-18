const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration-time");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const musicUl=document.querySelector("ul");
const heroImage=document.querySelector("#bg-img");


const player = new MusicPlayer(musicList);


window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
});
prev.addEventListener("click", () => {
    prevMusic();
})
function prevMusic() {
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

next.addEventListener("click", () => {
    nextMusic();
})
function nextMusic() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
   // heroImage.style.backgroundImage=`url('img/${music.img}')`;
   document.body.style.backgroundImage=`url('img/${music.img}')`;
}


play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
})

function pauseMusic() {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}
function playMusic() {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
    isPlayingNow();
}


const calculateTime = (topSeconds) => {
    const dakika = Math.floor(topSeconds / 60);
    const saniye = Math.floor(topSeconds % 60);
    const duzenliSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
    const result = `${dakika}:${duzenliSaniye}`;

    return result;
}
audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});
progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;

});

let muteState = "unmuted";
let rememberVolume = 100;
volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    volume.classList = value > 0 ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark";
    muteState = value == 0 ? "mute" : "unmuted";
    rememberVolume = value < 20 ? 25 : value;
});
volume.addEventListener("click", () => {
    if (muteState == "unmuted") {
        audio.muted = true;
        muteState = "mute";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        audio.volume = rememberVolume / 100;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = rememberVolume; // daha sonra sonkalan volume olarak değiştirilecek;
    }
})

const displayMusicList = (list) => {
    for (let i = 0; i < list.length; i++) {
        let liTag = `<li li-index=${i} onclick="selectedMusic(this)"class="list-group-item d-flex justify-content-between align-items-center">
        <span>${list[i].getName()}</span>
        <span id="music-${i}" class="badge bg-primary rounded-pill">3:40</span>
        <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
        </li>`;
        musicUl.insertAdjacentHTML("beforeend",liTag);
      
        let liAudioDuration= musicUl.querySelector(`#music-${i}`);
        let liAudioTag= musicUl.querySelector(`.music-${i}`);
        liAudioTag.addEventListener("loadeddata",() =>{
            liAudioDuration.innerText=calculateTime(liAudioTag.duration);
        })
     
    }
}

const selectedMusic = (li) =>{
    player.index=  li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}

const isPlayingNow=()=>{
    for (let li of musicUl.querySelectorAll("li")) {
        if(li.classList.contains("playing")){
            li.classList.remove("playing");
        }
        if(li.getAttribute("li-index")==player.index){
            li.classList.add("playing");
        }
    }
}
audio.addEventListener("ended",() => nextMusic())