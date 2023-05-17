{
  const tasks = [];

  const addTask = (newTaskContent) => {
    tasks.push({ content: newTaskContent });

    render();
  };

  const countDoneTasks = () => {
    let count = 0;

    for (const task of tasks) {
      if (task.done) {
        count++;
      }
    }

    document.querySelector(".js-doneTaskCount").innerText = +count;
  };

  const removeTask = (index) => {
    tasks.splice(index, 1);

    render();
  };

  const toggleTaskDone = (index) => {
    tasks[index].done = !tasks[index].done;

    render();
  };

  const render = () => {
    let contentString = "";

    for (const task of tasks) {
      contentString += `
      <li class="mainContainer__li ${task.done ? "mainContainer__li--done" : ""}">
      <span class="ul__checkbox js-toggleDone ${task.done ? "ul__checkbox--done" : ""}">
        ${task.done ? "✔️" : ""}
      </span>
      ${task.content}
      <button class="removeButton js-remove">✘</button>
    </li>`;
    }

    document.querySelector(".js-list").innerHTML = contentString;

    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");
    const removeButtons = document.querySelectorAll(".js-remove");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    countDoneTasks();
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addTask(newTaskContent);

    document.querySelector(".js-newTask").focus();
    document.querySelector(".js-form").reset();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
