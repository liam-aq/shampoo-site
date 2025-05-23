// 📱 Fix 100vh on mobile using real viewport height
function setRealViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setRealViewportHeight);
window.addEventListener('orientationchange', setRealViewportHeight);
setRealViewportHeight();

// Grab DOM elements
const imageEl = document.getElementById("shampoo-image");
const buttonEl = document.getElementById("next-button");

// Generate list of images
const imagePaths = [];
for (let i = 1; i <= 30; i++) {
  imagePaths.push(`images/shampoo${i}.png`);
}

// Shuffle utility
function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let shuffledQueue = shuffle(imagePaths);
let currentIndex = 0;

// Show the first image
imageEl.src = shuffledQueue[currentIndex];

// Next image button
buttonEl.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= shuffledQueue.length) {
    shuffledQueue = shuffle(imagePaths);
    currentIndex = 0;
  }

  imageEl.src = shuffledQueue[currentIndex];
});

// Preload all images
imagePaths.forEach(path => {
  const img = new Image();
  img.src = path;
});

// Info panel logic
const infoButton = document.getElementById("info-button");
const infoPanel = document.getElementById("info-panel");
const closeButton = document.getElementById("close-info");

infoButton.addEventListener("click", () => {
  infoPanel.style.display = "block";
});

closeButton.addEventListener("click", () => {
  infoPanel.style.display = "none";
});

infoPanel.addEventListener("click", (e) => {
  if (!e.target.closest(".info-box")) {
    infoPanel.style.display = "none";
  }
});

// Click-to-zoom on shampoo bottle
imageEl.addEventListener("click", () => {
  imageEl.classList.toggle("expanded");
});