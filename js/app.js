import Todo from "./new-todo.js";

const App = (() => {
  //Cache the DOM
  const textInput = document.querySelector(".current-text");
  const taskRemain = document.querySelector(".tasks-remain");

  let todoList = [];

  const render = (_) => {
    let markup = "";
    todoList.forEach((item) => {
      markup += `
      <div class="current-content current">
            <div class="check-wrapper">
                <div class="check-bg">
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></span>
                </div>
            </div>
            <h3 class="current-text centered">${item.title}</h3>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></span>
      </div>`;
    });

    taskRemain.innerHTML= markup;
  };

  const listeners = (_) => {
    window.addEventListener("keypress", function (e) {
      if (e.code === "Enter") {
        todoList.push(new Todo(textInput.value));
        render()
        textInput.value ="" ;
      }
    });
  };

  return {
    listeners,
    render,
  };
})();


App.listeners();
App.render()
