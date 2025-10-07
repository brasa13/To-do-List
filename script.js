const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");

async function getTodos() {
  const res = await fetch("https://dummyjson.com/todos");
  const data = await res.json();
  console.log("📌 API todos:", data.todos);

  taskList.innerHTML = "";
  data.todos.slice(0,10).forEach(todo => { 
    createTask(todo.todo, todo.completed, todo.id);
  });
}

async function createTodoAPI(text) {
  fetch('https://dummyjson.com/todos/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    todo: text,
    completed: false,
    userId: 1,
  })
})
.then(res => {
  const data = res.json()
  createTask(data.todo, data.completed,data.id);
})
.then(console.log);
}

fetch('https://dummyjson.com/todos/1', {
  method: 'PUT',
  headers: { 'Content-Typed': 'application/json' },
  body: JSON.stringify({
    completed: false,
  })
})
.then(res => res.json())
.then(console.log);

async function deleteTodoAPI(id, li) {
  const res = await fetch(`https://dummyjson.com/todos/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  console.log("🗑️ Removido na API:", data);
  li.remove();
}

function createTask(text, isComplete = false, id = null) {
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
    if (id) updateTodoAPI(id, li.classList.contains("completa"));
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => {
    if (id) deleteTodoAPI(id, li);
  };
   
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.classList.add("edit-btn");
  editBtn.onclick = () => {
    if (id) editTodoAPI(id, li);
  };
  li.appendChild(editBtn);
  document.querySelector("#taskList").appendChild(li);

  btns.appendChild(doneBtn);
  btns.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btns);
  taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    createTodoAPI(text);
    taskInput.value = "";
  }
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const text = taskInput.value.trim();
    if (text) {
      createTodoAPI(text);
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

window.onload = getTodos;
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");

async function getTodos() {
  const res = await fetch("https://dummyjson.com/todos");
  const data = await res.json();
  console.log("📌 API todos:", data.todos);

  taskList.innerHTML = "";
  data.todos.slice(0,10).forEach(todo => { 
    createTask(todo.todo, todo.completed, todo.id);
  });
}

async function createTodoAPI(text) {
  fetch('https://dummyjson.com/todos/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    todo: text,
    completed: false,
    userId: 1,
  })
})
.then(res => {
  const data = res.json()
  createTask(data.todo, data.completed,data.id);
})
.then(console.log);
}

fetch('https://dummyjson.com/todos/1', {
  method: 'PUT',
  headers: { 'Content-Typed': 'application/json' },
  body: JSON.stringify({
    completed: false,
  })
})
.then(res => res.json())
.then(console.log);

async function deleteTodoAPI(id, li) {
  const res = await fetch(`https://dummyjson.com/todos/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  console.log("🗑️ Removido na API:", data);
  li.remove();
}

function createTask(text, isComplete = false, id = null) {
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
    if (id) updateTodoAPI(id, li.classList.contains("completa"));
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => {
    if (id) deleteTodoAPI(id, li);
  };
   
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.classList.add("edit-btn");
  editBtn.onclick = () => {
    if (id) editTodoAPI(id, li);
  };
  li.appendChild(editBtn);
  document.querySelector("#taskList").appendChild(li);

  btns.appendChild(doneBtn);
  btns.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btns);
  taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    createTodoAPI(text);
    taskInput.value = "";
  }
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const text = taskInput.value.trim();
    if (text) {
      createTodoAPI(text);
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

window.onload = getTodos;
