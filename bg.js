const body = document.querySelector("body");

const countImageNumber = 3;
const image = new Image();

function paintImg(num) {
  image.src = `images/${num}.jpg`;
  image.classList.add("background");
  image.addEventListener("load", loadImg);
}

function loadImg() {
  body.appendChild(image);
}
function getRandomNumber() {
  const randomNumber = Math.floor(Math.random() * countImageNumber);
  return randomNumber;
}

function init() {
  const imgNumber = getRandomNumber() + 1;
  paintImg(imgNumber);
}

init();
