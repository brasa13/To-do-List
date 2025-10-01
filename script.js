const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList .task").forEach(task => {
    tasks.push({
      text: task.querySelector("span").textContent,
      completa: task.classList.contains("completa")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTask(task.text, task.completa));
}

function createTask(text, isComplete = false) {
  const li = document.createElement("li");
  li.classList.add("task");
  if (isComplete) li.classList.add("completa");

  const span = document.createElement("span");
  span.textContent = text;

  const btns = document.createElement("div");
  btns.classList.add("btns");

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✔";
  doneBtn.classList.add("done-btn");
  doneBtn.onclick = () => {
    li.classList.toggle("completa");
    saveTasks();
    applyFilter();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  btns.appendChild(doneBtn);
  btns.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btns);
  taskList.appendChild(li);

  saveTasks();
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    createTask(text);
    taskInput.value = "";
  }
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const text = taskInput.value.trim();
    if (text) {
      createTask(text);
      taskInput.value = "";
    }
  }
});

filter.addEventListener("change", applyFilter);

function applyFilter() {
  const tasks = taskList.childNodes;
  tasks.forEach(task => {
    if (task.nodeType === 1) {
      switch (filter.value) {
        case "todos":
          task.style.display = "flex";
          break;
        case "concluidos":
          task.style.display = task.classList.contains("completa") ? "flex" : "none";
          break;
      }
    }
  });
}

function reload() {
  taskList.innerHTML = "";
  loadTasks();
}
window.onload = loadTasks;
