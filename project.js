//Fitur to-do list
//1. Tambah to-do
//2. Tandai selesai atau belum selesai
//3. Hapus to-do
//4. Lihat daftar to-do

//variabel dengan localstorage agar data tidak hilang saat refresh.
let todos = JSON.parse(localStorage.getItem("todos")) || []; //array kosong untuk menyimpan semua todo
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1; //untuk menghitung Id unik, akan terus bertambah jika ada todo baru

// fungsi untuk menyimpan
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("nextId", JSON.stringify(nextId));
}

function addTodo(text) {
  todos.push({ id: nextId++, text: text, completed: false });
  saveTodos();
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.completed = !todo.completed; //! membalik nilai boolean
  saveTodos();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
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
  todoList.innerHTML = ""; //mengosongkan daftar
  todos.forEach((t) => {
    //perulangan data, arrow function dengan t sebagai parameter.
    const li = document.createElement("li"); //membuat list

    const span = document.createElement("span");
    span.textContent = t.text;
    if (t.completed) span.style.textDecoration = "line-through";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.textContent = t.completed ? "Batal" : "Selesai"; //ternary operator, untuk mengecek true atau false.
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
    li.appendChild(span); //appendChild merupakan method DOM.
    li.appendChild(toggleBtn);
    li.appendChild(btnDelete);
    todoList.appendChild(li);
  });
}

// addBtn.addEventListener("click", () => {
//   const text = todoInput.value.trim();
//   if (text === "") return;

//   addTodo(text);
//   todoInput.value = "";
//   render();
// });

function handleAdd() {
  const text = todoInput.value.trim();
  if (text === "") return;

  addTodo(text);
  todoInput.value = "";
  render();
}

addBtn.addEventListener("click", handleAdd);
todoInput.addEventListener("keydown", (e) => {
  //keydown, merupakan event saat sebuah tombol keyboard di klik.
  if (e.key === "Enter") handleAdd();
});

// tampilkan data ketika halaman dibuka
render();
// addTodo("Belajar Js");
// addTodo("Belajar Bahasa ");
// addTodo("Add Product List ");
// toggleTodo(2);
// showTodo();
