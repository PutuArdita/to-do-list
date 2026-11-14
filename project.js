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

addTodo("Belajar Js");
addTodo("Belajar Bahasa ");
addTodo("Add Product List ");
toggleTodo(2);
showTodo();
