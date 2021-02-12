const jsToDoList = document.querySelector(".js-todoList");
const jsToDoList_input = jsToDoList.querySelector("input");
const ul = document.querySelector("ul");

const CURRENTLIST = "currentList";

let toDos = [];

function deleteList() {
  const target_li = event.target.parentNode; // targetbutton클릭한(target) delBtn의 상위 요소 li(parentNode)
  ul.removeChild(target_li);
  const cleanList = toDos.filter((toDo) => {
    return toDo.id !== parseInt(target_li.id);
  });
  toDos = cleanList;
  saveList();
}

function saveList() {
  localStorage.setItem(CURRENTLIST, JSON.stringify(toDos));
}

function paintList(text) {
  const li = document.createElement("li");
  const newId = toDos.length + 1;
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  span.innerText = text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteList);
  li.id = newId;
  if (li.id > 8) {
    alert("Too much work to do is hard to concentrate.");
  } else {
    li.appendChild(delBtn);
    li.appendChild(span);
    ul.appendChild(li);
    const toDoObj = {
      text,
      id: newId,
    };
    toDos.push(toDoObj);
    saveList();
  }
}

function handleList() {
  event.preventDefault();
  const submitList = jsToDoList_input.value;
  paintList(submitList);
  jsToDoList_input.value = "";
}

function loadedList() {
  const loadedList = localStorage.getItem(CURRENTLIST);
  if (loadedList !== null) {
    const parsedList = JSON.parse(loadedList);
    parsedList.forEach((toDo) => {
      paintList(toDo.text);
    });
  }
}

function init() {
  loadedList();
  jsToDoList.addEventListener("submit", handleList);
}

init();
