//Fitur to-do list
//1. Tambah to-do
//2. Tandai selesai atau belum selesai
//3. Hapus to-do
//4. Lihat daftar to-do

//variabel
let todos = []; //array kosong untuk menyimpan semua todo
let nextId = 1; //untuk menghitung Id unik, akan terus bertambah jika ada todo baru

function addTodo(text) {
  todos.push({ id: nextId++, text: text, completed: false });
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.completed = !todo.completed;
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
}

function showTodo() {
  todos.forEach((t) => {
    console.log(`${t.id}. [${t.completed ? "X" : " "}] ${t.text}`);
  });
}

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

// console.log(todoInput, addBtn, todoList);

function render() {
  todoList.innerHTML = "";
  todos.forEach((t) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = t.text;
    if (t.completed) span.style.textDecoration = "line-through";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.textContent = t.completed ? "Batal" : "Selesai";
    toggleBtn.addEventListener("click", () => {
      toggleTodo(t.id);
      render();
    });

    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.textContent = "Hapus";
    btnDelete.addEventListener("click", () => {
      deleteTodo(t.id);
      render();
    });
    li.appendChild(span);
    li.appendChild(toggleBtn);
    li.appendChild(btnDelete);
    todoList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (text === "") return;

  addTodo(text);
  todoInput.value = "";
  render();
});

// addTodo("Belajar Js");
// addTodo("Belajar Bahasa ");
// addTodo("Add Product List ");
// toggleTodo(2);
// showTodo();
