const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");

function createTask(text) {
  const li = document.createElement("li");
  li.classList.add("task");

  const span = document.createElement("span");
  span.textContent = text;

  const btns = document.createElement("div");
  btns.classList.add("btns");

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✔";
  doneBtn.classList.add("done-btn");
  doneBtn.onclick = () => {
    li.classList.toggle("completa");
    applyFilter();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => li.remove();

  btns.appendChild(doneBtn);
  btns.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btns);
  taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    createTask(text);
    taskInput.value = "";
  }
});

filter.addEventListener("change", applyFilter);

function applyFilter() {
  const tasks = taskList.childNodes;
  tasks.forEach(task => {
    switch (filter.value) {
      case "todos":
        task.style.display = "flex";
        break;
      case "concluidos":
        task.style.display = task.classList.contains("completa") ? "flex" : "none";
        break;
    }
  });
}

const input = document.querySelector('#taskInput');

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const text = input.value.trim();
    if (text) {
      createTask(text);
      input.value = "";
    }
  }
});
