{
  const tasks = [];

  const render = () => {
    let contentString = "";

    for (const task of tasks) {
      contentString += `
        <li class="mainContainer__li 
        ${task.done ? "mainContainer__li--done" : ""}"
        >
        <span class="ul__checkbox"></span>
        ${task.content}
        </li>
        `;
    }

    document.querySelector(".js-list").innerHTML = contentString;
  };

  const addTask = (newTaskContent) => {
    tasks.push({ content: newTaskContent });

    render();
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
