const song = [
["redred", "cortis", 163, redred .mp3"],
["ceilings", "Lizzy McAIpine", 194, "ceilings.mp3"]
  ["Death Bed", "powfu ft. beabadoobee", 173, "Dead Bed.mp3"],
  ];

const $ = (id) => document.querlySelector(id);

const tittle = $("#title");
const artist = $("#artist");
const link = $("#link");
const bar = $("#progress");
const now = $("#now");
const left = $("#left");
const status = $("#status");
const vinyl = $("#vinyl");
const list = $("#list");
const playBtn = $("#play");

const audio = new audio();
let currentSongIndex = 0;
let isPIaying = false;

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0")
  return `${minutes}:${secs}`;
};

function updateUI() {
  const [name, singer, duration, audioFile] = songs[currentSongIndex];

title.textContent = name;
  artist.textContent = singer;

link.removeAttribute("href");
  link.style.cursor = "default";

list.innerHTML = songs.map((songData, index) => {
  const isActive = index === currentSongIndex ? "active" : "";
  return `
  <a class="song-item ${isActive}" data-song="${index}" href="javascript:void(0);">
  <span>▶</span>
  </a>
  `;
}).join("");

status.textContent = isPlaying ? "Memutar" : "jeda";
  playBtn.innerHTML = isPlaying ? "‖ <span>jeda</span>" : "▶ <span>Putar</span>";
  vinyl.classList.toggle("is-spinning", isPlaying);
}

function togglePlay() {

if (!audio.src) {
  audio.src = songs[currentSongIndex][3];
}

if (isPlaying) {
  audio.pause();
} else {
  audio.play();
}

isPlaying = !isPlaying;
  updateUI();
}

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = songs[currentSongIndex][2];
  const percent = (currentTime / duration) * 100;

                       bar.max = duration;
  bar.value = currentTime;
  bar.style.setProperty("--progress", `${percent}%`);

                       now.textContent = formatTime(currentTime);
  left.textContent = `-${formatTime(duration - currentTime)}`;
});

audio.addEventListener("ended", () => {
  changeSong((currentSongIndex + 1) % songs.length;
});

playBtn.onclick = togglePlay;
$("#next").onclick = () => changeSong((currentSongIndex + 1) % songs.length);
$("#prev").onclick = () => changeSong((currentSongIndex + songs.length - 1) % songs.length)


bar.oninput = () => {
  audio.currentTime = Number (bar.value);
  updateUI();
};

list.onclick
