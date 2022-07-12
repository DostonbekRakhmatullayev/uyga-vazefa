let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elCount = document.querySelector(".count");
let elChecket = document.querySelector(".checket");
let elOver = document.querySelector(".over");
let elList = document.querySelector(".js-list");  
let elBtnGroupp = document.querySelector(".btn-group");    

let localTodos = JSON.parse(window.localStorage.getItem("list"))
let todos = localTodos || [];
let deletedTodos = [];

let renderTodo = (array, node) => {
  node.innerHTML = ""

  elCount.textContent = todos.length;
  elChecket.textContent = todos.filter((e) => e.isComplete).length
  elOver.textContent = todos.filter((e) => !e.isComplete).length


  array.forEach(element => {
    let newItem = document.createElement("li");
    let newButton = document.createElement("button");
    let newSpan = document.createElement("span");
    let newCheckbox = document.createElement("input");
    newSpan.textContent = element.name;
    newCheckbox.setAttribute("type", "checkbox");
    newButton.textContent = "❌";
    newButton.style.border = "0";
    newButton.style.backgroundColor = "gold";
    newSpan.style.fontWeight = "bolder"
    newButton.setAttribute("class", "deleti-btn");
    newCheckbox.setAttribute("class", "todo-check");
    newButton.dataset.todoId = element.id;
    newCheckbox.dataset.todoId = element.id;

    if(element.isComplete) {
      newSpan.style.textDecoration = "line-through";
      newCheckbox.checked = true; 
    }  
    newItem.appendChild(newCheckbox);
    newItem.appendChild(newSpan);
    newItem.appendChild(newButton);
    node.appendChild(newItem);
  })
}
renderTodo(todos, elList)

elList.addEventListener("click", function(evt) {
  if(evt.target.matches(".deleti-btn")) {
    let deletedId = evt.target.dataset.todoId;
    elList.innerHTML = "";
    let findedIndex = todos.findIndex(todo => todo.id == deletedId);
    todos.splice(findedIndex, 1);
    renderTodo(todos, elList);
    window.localStorage.setItem("list", JSON.stringify(todos))
  }
  if(evt.target.matches(".todo-check")) {
    let checkeId = evt.target.dataset.todoId;
    elList.innerHTML = "";
    let findedElement = todos.find(todo => todo.id == checkeId);
    findedElement.isComplete = !findedElement.isComplete;
    renderTodo(todos, elList);
    window.localStorage.setItem("list", JSON.stringify(todos))
  }
})

elForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  elList.innerHTML = "";
  let elInputVal = elInput.value;

  let obj = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 0,
    name: elInputVal,
    isComplete: false,
  };

  todos.push(obj);
  renderTodo(todos, elList);
  window.localStorage.setItem("list", JSON.stringify(todos))
  elInput.value = "";
})


elBtnGroupp.addEventListener("click", function(evt) {
  if(evt.target.matches(".btn-all")) {
    renderTodo(todos, elList)
  }
  if(evt.target.matches(".btn-completed")) {
    const completedTodos = todos.filter(e => e.isComplete);
    renderTodo(completedTodos, elList)
  }
  if(evt.target.matches(".btn-uncompleted")) {
    const uncompletedTodos = todos.filter(e => !e.isComplete);
    renderTodo(uncompletedTodos, elList)
  }
  if(evt.target.matches(".btn-clear")) {
    window.localStorage.removeItem("list")
    window.location.reload()
    renderTodo(todos, elList)
  }
})

let elBtn = document.querySelector(".mode");
let elBody = document.querySelector(".body");
var theme = false
function changeBg() {
  if(window.localStorage.getItem("theme") == "dark") {
    elBody.classList.add("dark");
  }else {
    elBody.classList.remove("dark");
  }
}
elBtn.addEventListener("click", function() {
  theme = !theme;
  window.localStorage.setItem("theme", theme ? "dark" : "light")
  changeBg()
})

changeBg()






