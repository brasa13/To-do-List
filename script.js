const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");

let currentPage = 1;
const limit = 5;
let totalTodos = 0;

async function getTodos(page = 1) {
  const skip = (page - 1) * limit;
  const res = await fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`)
  const data = await res.json();

  console.log('Página ${page}:', data.todos);
  console.log('Pagina ${page}:', data.todos.array);

  totalTodos = data.total;
  taskList.innerHTML = "";

  data.todos.forEach(todo => {
    createTask(todo.todo, todo.completed, todo.id);
  });

  updatePaginacao();
}

function updatePaginacao(){
  const totalPages  = Math.ceil(totalTodos / limit);
  document.getElementById("PageInfo").textContent = `Pagina ${currentPage} de ${totalPages}`;
    document.getElementById("PrevPage").disabled = currentPage === 1;
  document.getElementById("NextPage").disabled = currentPage === totalPages;
}

function createTodoAPI(text) {
  fetch('https://dummyjson.com/todos/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    todo: text,
    completed: false,
    userId: 1,
  })
})
.then(async res => {
  const data =  await res.json()
  createTask(data.todo, data.completed,data.id);
})
.then(console.log);
}

fetch('https://dummyjson.com/todos/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
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

fetch('https://dummyjson.com/todos/filter')

function createTask(text, isComplete = false, id = null) {
  console.log(text)
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

document.getElementById("PrevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getTodos(currentPage);
  }
});

document.getElementById("NextPage").addEventListener("click", () => {
  const totalPages = Math.ceil(totalTodos/ limit);
  if (currentPage < totalPages) {
    currentPage++;
    getTodos(currentPage);
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

window.onload = () => getTodos(currentPage);
