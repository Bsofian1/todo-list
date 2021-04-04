import Todo from "./new-todo.js";
import Dragg from "./dragg.js"

const App = (() => {
  //Cache the DOM
  const textInput = document.querySelector(".current-text");
  const taskRemain = document.querySelector(".tasks-remain");
  const buttonCheck = document.querySelector(".check-bg")
  const itemLeftEl = document.querySelector(".section-left").children[0];
  const buttonCenterEl = document.querySelector(".section-center");
  const deleteTask = document.getElementById(".delete")
  const buttonRightEl= document.querySelector(".section-right")
 
 

  let todoList = [];
  let idCount = 0;

  const maybePluralize = (count, suffix = "s") =>
    `${count} item${count !== 1 ? suffix : ""} left`;

  const renderTodo = (_) => {
    let markup = "";
    todoList.forEach((item, index) => {
      if (item.complete === false) {
        markup += `<div class="current-content current draggable" draggable= "true" id="${index}">
        <div class="check-wrapper">
            <div class="check-bg">
              <span class=""><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></span>
            </div>
        </div>
        <h3 class="current-text centered">${item.title}</h3>
        <div class="delete">
        <span id="delete"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></span>
        </div>
      </div>`;
      } else {
        markup += `<div class="current-content current draggable" draggable= "true" id="${index}">
        <div class="check-wrapper">
            <div class="check-bg checked">
              <span class="cross"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></span>
            </div>
        </div>
        <h3 class="current-text centered complete">${item.title}</h3>
        <div class="delete">
        <span id="delete"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></span>
        </div>
      </div>`;
      }
    });
    taskRemain.innerHTML = markup;
  };

  const renderTodoComplete = (_) => {
    let markup = "";
    todoList.forEach((item, index) => {
      if (item.complete === true) {
        markup += `<div class="current-content current draggable" draggable= "true" id="${index}">
        <div class="check-wrapper">
            <div class="check-bg checked">
              <span class="cross"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></span>
            </div>
        </div>
        <h3 class="current-text centered complete">${item.title}</h3>
        <div class="delete">
        <span id="delete"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></span>
        </div>
      </div>`;
      }
    });
    taskRemain.innerHTML = markup;
  };

  const renderTodoActive = (_) => {
    let markup = "";
    todoList.forEach((item, index) => {
      if (item.complete === false) {
        markup += `<div class="current-content current draggable" draggable= "true" id="${index}">
        <div class="check-wrapper">
            <div class="check-bg">
              <span class=""><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></span>
            </div>
        </div>
        <h3 class="current-text centered">${item.title}</h3>
        <div class="delete">
        <span id="delete"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></span>
        </div>
      </div>`;
      }
    });
    taskRemain.innerHTML = markup;
  };

  const renderAll = (_) => {
    let left = todoList.length;
    itemLeftEl.innerHTML = maybePluralize(left);
    renderTodo();
  };

  const renderComplete = (_) => {
    let left = todoList.filter((item) => item.complete === true).length;
    renderTodoComplete();
    itemLeftEl.innerHTML = maybePluralize(left);
  };

  const renderActive = (_) => {
    let left = todoList.filter((item) => item.complete === false).length;
    renderTodoActive();
    itemLeftEl.innerHTML = maybePluralize(left);
  };

  const renderItemLeft = (result) => {
    if (result === "all") {
      renderAll();
    } else if (result === "completed") {
      renderComplete();
    } else if (result === "active") {
      renderActive();
    }
  };

  const render = (_) => {
    renderTodo();
    renderItemLeft();
    
  };

  const listeners = (_) => {
    window.addEventListener("keypress", function (e) {
      if (e.code === "Enter") {
        todoList.push(new Todo(textInput.value, idCount));
        idCount++;
        render();
        textInput.value = "";
        
      }
    });

    taskRemain.addEventListener("click", function (e) {
      
      if(e.target.className === "check-bg" || e.target.className === "check-bg checked"){
        let index = e.target.parentElement.parentElement.id;
        isCompleted(index);
        render()
      
      }else if(e.target.className === "delete"){
        let indexDelete = e.target.parentElement.id
        removeTodo(todoList, indexDelete)
        render()
      }

      
    });



    buttonCenterEl.addEventListener("click", function(e){
      renderItemLeft(e.target.className)
    })

    buttonRightEl.addEventListener("click", ()=> {
      todoList.forEach((item, index) => {
        if(item.complete === true){
          todoList.splice(index, 1)
        }
      })
      renderTodo();
    })

  };

  // Toggle the complete task state
  const isCompleted = (index) => {
    if (todoList[index].complete == true) {
      todoList[index].complete = false;
    } else {
      todoList[index].complete = true;
    }
  };

  const removeTodo = (arr, index) => {
    arr.splice(index, 1);
  };

  return {
    listeners,
    render,
  };
})();


App.render();
App.listeners();

