fetch("./tmp.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach(function (element) {
      const list = document.querySelector("#equipment-list");
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.power}</td>
        <td>
         <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
         <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
      `;
      list.appendChild(row);
    });
  });

let selectedRow = null;

function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);
}

function clearFields() {
  document.querySelector("#id").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#power").value = "";
}

document.querySelector("#equipment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.querySelector("#id").value;
  const name = document.querySelector("#name").value;
  const power = document.querySelector("#power").value;

  if (id == "" || name == "" || power == "") {
    showAlert("Заполните все поля", "danger");
  } else {
    if (selectedRow == null) {
      const list = document.querySelector("#equipment-list");
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${power}</td>
        <td>
         <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
         <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
      `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("Оборудование добавлено", "success");
    } else {
      selectedRow.children[0].textContent = id;
      selectedRow.children[1].textContent = name;
      selectedRow.children[2].textContent = power;
      selectedRow = null;
      showAlert("информация обновлена", "info");
    }
    clearFields();
  }
});

document.querySelector("#equipment-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#id").value = selectedRow.children[0].textContent;
    document.querySelector("#name").value = selectedRow.children[1].textContent;
    document.querySelector("#power").value =
      selectedRow.children[2].textContent;
  }
});

document.querySelector("#equipment-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("equipment delete", "danger");
  }
});
