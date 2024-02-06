const body = document.querySelector("body");
const btn = document.querySelector(".btn");
const iconn = document.querySelector(".icon_moon");

btn.addEventListener("click", () => {
  body.classList.toggle("darkmode");

  if (body.classList.contains("darkmode")) {
    iconn.classList.remove(".icon_moon");
  }
});

const task_input = document.getElementById("task_input");

let todo_tasks = [];

function addTask() {
  const taskValue = task_input.value;
  todo_tasks.push(taskValue);
  localStorage.setItem("tasks", JSON.stringify(todo_tasks)); //localstorage შენახვა
  const gettodoTasksItem = JSON.parse(localStorage.getItem("tasks")); // localstorage წამოღება
  // console.log(todo_tasks);

  const tasks_container = document.querySelector(".tasks");
  tasks_container.innerHTML = "";
  gettodoTasksItem.forEach((el,i) => {
    const ul = document.createElement("ul");
    tasks_container.appendChild(ul);
    ul.innerHTML = `
  <div class="div"  >
  <input id="check" type="checkbox"  ${ el.isChecked ? 'checked' : null} onchange="check(${i})" /> 
  <li class="licheck" style="list-style: none">${el}</li>
  <button class="deleteitem" onclick="deleteItem(${el})">X</button>
  </div>
  `;

    const checks = document.getElementById("check");
    const licheck = document.querySelector(".licheck");

    checks.addEventListener("click",() => {
      if (checks.checked) {
        licheck.style.textDecoration = "line-through";
        licheck.style.color = 'gray';
      } else {
        licheck.style.textDecoration = "none";
        licheck.style.color = 'black';
      }
    });
    task_input.value = "";
  });

  


}

function enterClick() {
  task_input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      if (task_input.value === "") {
        //თუ ცარიელია დაწეროს Please enter a valid task
        const error = document.getElementById("error");
        error.textContent = "Please enter a valid task!";
        error.style.display = "block";
        error.style.color = "red";
        error.style.fontSize = "20px";
      } else {
        addTask();
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", enterClick);


function updateStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const del = document.querySelector(".deleteItem");

   function deleteItem(el) {
     todo_tasks.splice(el);
      updateStorage(todo_tasks);
      myFunction()
   };




// function deleteItem(task) {
//   todo_tasks = todo_tasks.splice((item) => item !== task);
//   updateStorage("todo_tasks");
// }
