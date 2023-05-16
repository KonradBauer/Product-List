{
  const tasks = [
    {
      content: "L",
      done: false,
    },
    {
      content: "Lorem ipsum dolor sit ametaaaaaaaaaaa",
      done: false,
    },
    {
      content: "Lorem ipsum dolor sit ametaaaaaaaaaaa",
      done: false,
    },
  ];

  const render = () => {
    let contentString = "";

    for (const task of tasks) {
      contentString += `
        <li class="mainContainer__li">
        <span class="ul__checkbox"></span>${task.content}</li>
        `;
    }

    document.querySelector(".js-list").innerHTML = contentString;
  };

  const init = () => {
    render();
  };

  init();
}
