import Todo from "./new-todo.js";

const App = (() => {
  //Cache the DOM
  const textInput = document.querySelector(".current-text");
  const taskRemain = document.querySelector(".tasks-remain");
  const itemLeftEl = document.querySelector(".section-left").children[0];

  let todoList = [];

  const render = (_) => {
    let markup = "";
    todoList.forEach((item, index) => {
      markup += `
      <div class="current-content current" id="${index}">
            <div class="check-wrapper">
                <div class="check-bg">
                  <span class=""><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></span>
                </div>
            </div>
            <h3 class="current-text centered">${item.title}</h3>
            <span id="delete"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></span>
      </div>`;
    });

    taskRemain.innerHTML = markup;
    itemLeftEl.innerHTML = itemLefts(todoList.length);
  };

  const itemLefts = (num) => {
    return num <= 1 ? `${num} item left` : `${num} items left`;
  };

  const listeners = (_) => {
    window.addEventListener("keypress", function (e) {
      if (e.code === "Enter") {
        todoList.push(new Todo(textInput.value));
        render();
        textInput.value = "";
      }
    });

    taskRemain.addEventListener("click", function (e) {
      let index = e.target.parentElement.parentElement.id;

      taskDone(index);
      setTimeout(() => {
        render();
      }, 2000);
    });

    window.addEventListener("keypress", function (e) {
      if (e.code === "KeyP") {
        console.log(itemLeftEl);
      }
    });
  };

  const taskDone = (index) => {
    //Put the icon and the gradient
    let box = document.getElementById(index).children[0].children[0];
    let text = document.getElementById(index).children[1];

    box.classList.toggle("checked");
    console.log(box);
    addArrow(box);
    //Change the text style
    text.classList.toggle("complete");
    //Remove the task from todolist

    removeTodo(todoList, index);
  };

  const addArrow = (elem) => {
    if (elem.children[0].style.display === "flex") {
      elem.children[0].style.display = "none";
    } else {
      elem.children[0].style.display = "flex";
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

App.listeners();
App.render();
