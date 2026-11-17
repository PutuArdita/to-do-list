// list file
// data and localstorage
let lists = JSON.parse(localStorage.getItem("lists")) || [];
let nextListId = JSON.parse(localStorage.getItem("nextListId")) || 1;
let nextTodoId = JSON.parse(localStorage.getItem("nextTodoId")) || 1;

function saveLists() {
  localStorage.setItem("lists", JSON.stringify(lists));
  localStorage.setItem("nextListId", JSON.stringify(nextListId));
  localStorage.setItem("nextTodoId", JSON.stringify(nextTodoId));
}

// FUNCTION LIST
function addList(title) {
  lists.push({ id: nextListId++, title: title, todos: [] });
  saveLists();
}

function deleteList(listId) {
  lists = lists.filter((l) => l.id !== listId);
  saveLists();
}

// function showLists() {
//   lists.forEach((l) => {
//     console.log(`${l.id}. ${l.title} (${l.todos.length} todo)`);
//   });
// }

// FUNCTION TODO
function addTodo(listId, text) {
  const list = lists.find((l) => l.id === listId);
  if (list) list.todos.push({ id: nextTodoId++, text: text, completed: false });
  saveLists();
}

function toggleTodo(listId, todoId) {
  const list = lists.find((l) => l.id === listId);
  if (!list) return;

  const todo = list.todos.find((t) => t.id === todoId);
  if (todo) todo.completed = !todo.completed;
  saveLists();
}

function deleteTodo(listId, todoId) {
  const list = lists.find((l) => l.id === listId);
  if (list) list.todos = list.todos.filter((t) => t.id !== todoId);
  saveLists();
}

// ELEMENT DOM
const listInput = document.getElementById("listInput");
const addListBtn = document.getElementById("addListBtn");
const listContainer = document.getElementById("listContainer");

// HANDLE ADD LIST
function handleAddList() {
  const title = listInput.value.trim();
  if (title === "") return;

  addList(title);
  listInput.value = "";
  render();
}

addListBtn.addEventListener("click", handleAddList);
listInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleAddList();
});

// RENDER FUNCTION
function render() {
  listContainer.innerHTML = "";

  // looping
  lists.forEach((list) => {
    const card = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = list.title;

    const deleteListBtn = document.createElement("button");
    deleteListBtn.type = "button";
    deleteListBtn.textContent = "Hapus Daftar";
    deleteListBtn.addEventListener("click", () => {
      deleteList(list.id);
      render();
    });

    const todoInput = document.createElement("input");
    todoInput.type = "text";
    todoInput.placeholder = "Tambah todo...";

    const addTodoBtn = document.createElement("button");
    addTodoBtn.type = "button";
    addTodoBtn.textContent = "Tambah";

    function handleAddTodo() {
      const text = todoInput.value.trim();
      if (text === "") return;

      addTodo(list.id, text);
      render();
    }

    addTodoBtn.addEventListener("click", handleAddTodo);
    todoInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleAddTodo();
    });

    const ul = document.createElement("ul");

    // nested loop (perulangan bersarang)
    list.todos.forEach((t) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = t.text;
      if (t.completed) span.style.textDecoration = "line-through";

      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.textContent = t.completed ? "Batal" : "Selesai";
      toggleBtn.addEventListener("click", () => {
        toggleTodo(list.id, t.id);
        render();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.textContent = "Hapus";
      deleteBtn.addEventListener("click", () => {
        deleteTodo(list.id, t.id);
        render();
      });

      li.appendChild(span);
      li.appendChild(toggleBtn);
      li.appendChild(deleteBtn);
      ul.appendChild(li);
    });

    card.appendChild(title);
    card.appendChild(deleteListBtn);
    card.appendChild(todoInput);
    card.appendChild(addTodoBtn);
    card.appendChild(ul);
    listContainer.appendChild(card);
  });
}

// DATA OTOMATIS TAMPIL KETIKA DI REFRESH
render();
