const Dragg = ((_) => {
  const init = (_) => {
    const containerEl = document.querySelector(".tasks-remain");
    const draggables = document.querySelectorAll(".draggable");

    //Add the dragging class
    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
      });
    });

    //Main logic for drag an element
    containerEl.addEventListener("dragover", (e) => {
      const afterElem = getDragAfterElement(containerEl, e.clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElem == null) {
        containerEl.appendChild(draggable);
      } else {
        containerEl.insertBefore(draggable, afterElem);
      }
    });
  };

  //Return the element after
  const getDragAfterElement = (container, y) => {
    const draggablesElem = [
      ...container.querySelectorAll(".draggable:not(.dragging)"),
    ];

    return draggablesElem.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        let offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  };

  return {
    init,
  };
})();

export default Dragg;
