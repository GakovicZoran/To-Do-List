"use strict";

//////////// Elements ///////////

// Blur element
const loadText = document.querySelector(".counter");
const bckg = document.querySelector(".section-toDoList");

// Forms elements
const form = document.getElementById("toDoForm");
const todoInput = document.getElementById("input");
const todoButton = document.querySelector(".button-add");
const todosList = document.getElementById("todos");

// Sort btn element
const filterOption = document.querySelector(".select-toDo");

// Progress elements
const progress = document.querySelector(".progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");
const trophyIcon = document.querySelector(".fa-trophy ");

///////////// Blur effect ///////////////

let load = 0;

const blurring = function () {
  load++;

  if (load > 99) {
    clearInterval(int);
  }
  loadText.textContent = `${load}%`;

  //   Number opacity
  loadText.style.opacity = scale(load, 0, 100, 1, 0);

  //   Blur filter
  bckg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
};

let int = setInterval(blurring, 15);

const scale = function (number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

///////////// Form functionality ///////////////

const addTodo = function (e) {
  e.preventDefault();

  // Create DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create list
  const newTodo = document.createElement("li");
  newTodo.textContent = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Append to list
  todosList.appendChild(todoDiv);

  // Clear todo input value
  todoInput.value = "";
};

// Deleting functionality
const deleteCheck = function (e) {
  const item = e.target;

  // Delete TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // Check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
};

/////////////// Filter options ///////////////////
const filterTodo = function (e) {
  const todos = todosList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

// Event listener
todoButton.addEventListener("click", addTodo);
todosList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

/////////////// Wave effect //////////////

// The wave effect elements
const label = document.querySelector(".form-control label");

label.innerHTML = label.innerText
  .split("")
  .map(
    (letter, i) => `<span style="transition-delay:${i * 50}ms">${letter}</span>`
  )
  .join("");

/////////////// Progress bar////////////////

let currentActive = 1;

//  Next button

next.addEventListener("click", () => {
  currentActive++;

  if (currentActive > circles.length) {
    currentActive = circles.length;
  }

  update();
});

prev.addEventListener("click", () => {
  currentActive--;

  if (currentActive < 1) {
    currentActive = 1;
  }
  update();
});

// Updating circles
function update() {
  circles.forEach((circle, i) => {
    if (i < currentActive) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  const active = document.querySelectorAll(".active");

  progress.style.width =
    ((active.length - 1) / (circles.length - 1)) * 84.5 + "%";

  if (currentActive === 1) {
    prev.disabled = true;
  } else if (currentActive === circles.length) {
    trophyIcon.style.color = "#f0e68c";
    trophyIcon.style.fontSize = "60px";
    next.disabled = true;
  } else {
    trophyIcon.style.color = "#ccccff";
    trophyIcon.style.fontSize = "45px";
    prev.disabled = false;
    next.disabled = false;
  }
}
