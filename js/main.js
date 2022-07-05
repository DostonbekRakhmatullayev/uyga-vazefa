let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let count = document.querySelector(".count");
let checket = document.querySelector(".checket");
let over = document.querySelector(".over");
let elList = document.querySelector(".js-list"); 

let todos = [];
let deletedTodos = [];

let renderTodo = (array, node) => {
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

elList.addEventListener("click", function(evt) {
  if(evt.target.matches(".deleti-btn")) {
    let deletedId = evt.target.dataset.todoId;
    elList.innerHTML = "";
    let findedIndex = todos.findIndex(todo => todo.id == deletedId);
    todos.splice(findedIndex, 1);
    todoCheck(todos);
    todoOver(todos);
    todoCount(todos.length);
    renderTodo(todos, elList);
  }
  if(evt.target.matches(".todo-check")) {
    let checkeId = evt.target.dataset.todoId;
    elList.innerHTML = "";
    let findedElement = todos.find(todo => todo.id == checkeId);
    findedElement.isComplete = !findedElement.isComplete;
    todoCheck(todos);
    todoOver(todos);
    renderTodo(todos, elList);
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
  todoCount(todos.length); 
  todoOver(todos);
  renderTodo(todos, elList);
  elInput.value = "";
})

const todoCount = num => { 
  count.textContent = num
}

const todoCheck = arr => { 
  let count = 0;
  for(let e of arr) {
    if(e.isComplete) {
      count += 1;
    }
  }
  checket.textContent = count;  
}


const todoOver = arr => { 
  let count = 0;
  for(let e of arr) {
    if(!e.isComplete) {
      count += 1;
    }
  }
  over.textContent = count;  
}








