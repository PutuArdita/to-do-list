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
