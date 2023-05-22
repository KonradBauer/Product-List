{
  const tasks = [];

  const products = [
    {
      id: 0,
      productIndex: 0,
      name: "iPhone 6s Plus 16GB",
      price: 1000,
      promoPrice: 649,
      currency: "$",
      image: "images/img1.png",
    },
    {
      id: 1,
      productIndex: 1,
      name: "iPad 32GB",
      price: 800,
      promoPrice: 600,
      currency: "$",
      image: "images/img2.png",
    },
    {
      id: 2,
      productIndex: 2,
      name: "MacBook Pro",
      price: 8000,
      promoPrice: "",
      currency: "PLN",
      image: "images/img3.png",
    },
  ];

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

    document.querySelector(".js-doneTaskCount").innerText = count;
  };

  const removeTask = (index) => {
    tasks.splice(index, 1);

    render();
  };

  const toggleTaskDone = (index) => {
    tasks[index].done = !tasks[index].done;

    render();
  };

  const renderTodosList = () => {
    let contentString = "";

    for (const task of tasks) {
      contentString += `
      <li class="mainContainer__li">
      <span class="ul__checkbox js-toggleDone ${task.done ? "ul__checkbox--done" : ""}">
      ${task.done ? "✔" : ""}
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
  };

  const renderProductsTable = () => {
    const tableBody = document.querySelector(".js-tableBody");

    const tableRows = products.map((product) => {
      return `
      <tr class="table__headerRow">
        <td class="table__headerRow tableData">${product.id}</td>
        <td class="table__headerRow">${product.name}</td>
        <td class="table__headerRow">${product.promoPrice}</td>
        <td class="table__headerRow">${product.price}</td>
        <td class="table__headerRow">${product.currency}</td>
      </tr>
    `;
    });

    tableBody.innerHTML = tableRows.join("");
  };

  const renderTilesProductsData = () => {
    const tileBody = document.querySelector(".js-tile");

    const tileContent = products.map((product, productIndex) => {
      if (product.promoPrice === "") {
        return `
        <div class="tileRendered">
          <div productIndex=${productIndex} onclick="openModal(${productIndex})">
            <div class="discount-percentage">
              <span class="ribbon"></span>
            </div>
            <h3 class="content__title">${product.name}</h3>
            <img src="${product.image}" />
            <p class="content__price">${product.price} ${product.currency}</p>
          </div>
          </div>
        `;
      } else {
        return `
        <div class="tileRendered">
          <div productIndex=${productIndex} onclick="openModal(${productIndex})">
            <div class="discount-percentage">
              <span class="ribbon"></span>
            </div>
            <h3 class="content__title">${product.name}</h3>
            <img src="${product.image}" />
            <p class="content__price">${product.promoPrice} ${product.currency}</p>
            <p class="content__promoPrice">${product.price} ${product.currency}</p>
          </div>
          </div>
        `;
      }
    });

    tileBody.innerHTML = tileContent.join("");
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
  const renderModalData = (product) => {
    const modalTitle = document.querySelector(".modalTitle");
    const modalImage = document.querySelector(".modalImage");
    const modalNameInput = document.querySelector(".modalInput");
    const modalPriceInput = document.querySelectorAll(".modalInput")[1];
    const modalPromoPriceInput = document.querySelectorAll(".modalInput")[2];
    const modalCurrencySelect = document.querySelector(".modalSelect");

    modalTitle.innerText = `Edycja produktu: ${product.name}`;
    modalImage.src = product.image;
    modalNameInput.value = product.name;
    modalPriceInput.value = product.price;
    modalPromoPriceInput.value = product.promoPrice;
    modalCurrencySelect.value = product.currency;
  };

  const openModalButton = document.querySelector(".openModalButton");
  const closeModalButton = document.querySelector(".denyModalButton");
  const modalContainer = document.querySelector(".modalContainer");

  openModalButton.addEventListener("click", () => {
    modalContainer.style.width = "100%";

    const productIndex = parseInt(openModalButton.getAttribute("productIndex"));
    const product = products[productIndex];

    renderModalData(product);
  });

  closeModalButton.addEventListener("click", () => {
    modalContainer.style.width = "0";
  });

  const updateProduct = () => {
    const nameInput = document.querySelector(".modalInput");
    const priceInput = document.querySelectorAll(".modalInput")[1];
    const promoPriceInput = document.querySelectorAll(".modalInput")[2];
    const currencySelect = document.querySelector(".modalSelect");

    const updatedProduct = {
      ...products[productIndex],
      name: nameInput.value,
      price: parseFloat(priceInput.value),
      promoPrice: parseFloat(promoPriceInput.value),
      currency: currencySelect.value,
    };

    products[productIndex] = updatedProduct;

    closeModal();
  };

  const render = () => {
    renderTodosList();
    countDoneTasks();
    renderProductsTable();
    renderTilesProductsData();
  };

  const saveModalButton = document.querySelector(".saveModalButton");
  saveModalButton.addEventListener("click", updateProduct);

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
