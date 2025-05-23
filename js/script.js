const imageEl = document.getElementById("shampoo-image");
const buttonEl = document.getElementById("next-button");

const imagePaths = [];
for (let i = 1; i <= 30; i++) {
  imagePaths.push(`images/shampoo${i}.png`);
}

// Shuffle utility (Fisher-Yates)
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

buttonEl.addEventListener("click", () => {
  currentIndex++;

  // If we've reached the end of the queue, reshuffle and start again
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

// Info panel behavior
const infoButton = document.getElementById("info-button");
const infoPanel = document.getElementById("info-panel");
const closeButton = document.getElementById("close-info");

infoButton.addEventListener("click", () => {
  infoPanel.style.display = "block";
});

closeButton.addEventListener("click", () => {
  infoPanel.style.display = "none";
});

// Close panel if clicking outside the box
infoPanel.addEventListener("click", (e) => {
  if (!e.target.closest(".info-box")) {
    infoPanel.style.display = "none";
  }
});

// Toggle expand/collapse on image click
imageEl.addEventListener("click", () => {
    imageEl.classList.toggle("expanded");
  });
  
  // Optional: clicking outside also closes (if desired later)
  // window.addEventListener("click", (e) => {
  //   if (imageEl.classList.contains("expanded") && !e.target.closest("#shampoo-image")) {
  //     imageEl.classList.remove("expanded");
  //   }
  // });