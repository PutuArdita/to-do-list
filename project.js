//Fitur to-do list
//1. Tambah to-do
//2. Tandai selesai atau belum selesai
//3. Hapus to-do
//4. Lihat daftar to-do

//variabel
let todos = [];
let nextId = 1;

function addTodo(text) {
  todos.push({ id: nextId++, text: text, completed: false });
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.completed = !todo.completed;
}

addTodo("Belajar Js");
addTodo("Belajar Bahasa ");
addTodo("Add Product List ");
toggleTodo(2);
console.log(todos);
