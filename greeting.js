const jsGreeting = document.querySelector(".js-greeting");
const jsGreeting_input = jsGreeting.querySelector("input");
const jsGreeting_h4 = jsGreeting.querySelector("h4");

const CURRENTUSER = "currentUser";

function paintUser(text) {
  jsGreeting_input.classList.add("hidden");
  jsGreeting_h4.classList.remove("hidden");
  jsGreeting.innerText = `Have a Fabulous day 😝, "${text}"`;
}

function saveUser(text) {
  localStorage.setItem(CURRENTUSER, text);
}

function handleUser(event) {
  event.preventDefault();
  const submitUser = jsGreeting_input.value;
  paintUser(submitUser);
  saveUser(submitUser);
}

function init() {
  const loadedUser = localStorage.getItem(CURRENTUSER);
  if (loadedUser === null) {
    jsGreeting.addEventListener("submit", handleUser);
  } else {
    paintUser(loadedUser);
  }
}

init();
