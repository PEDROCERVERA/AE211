const form = document.getElementById('formRegister');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const tableBody = document.getElementById('tableBody');

let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit', function (event) {
    event.preventDefault();


    const name = nameInput.value;
    const city = cityInput.value;
    const cologne = cologneInput.value;
    const email = emailInput.value;

    if (name && email && city && cologne ) {
        const newData = {name, city, cologne, email};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    }else{
        alert('Todos los datos son obligatorios');
    }
});
function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data));
}
function renderTable() {
    tableBody.innerHTML = '';
    data.forEach(function (item, index) {
        const row = document.createElement('tr')
        const nameCell = document.createElement('td');
        const cityCell = document.createElement('td');
        const cologneCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        nameCell.textContent = item.name;
        cityCell.textContent = item.city;
        cologneCell.textContent = item.cologne;
        emailCell.textContent = item.email;
        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';

        editButton.classList.add("button", 'button--secondary');
        deleteButton.classList.add("button", 'button--tertiary');

        editButton.addEventListener('click', function () {
           editData(index);
        });

        deleteButton.addEventListener('click', function () {
           deleteData(index);
        });

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton)

        row.appendChild(nameCell);
        row.appendChild(cityCell);
        row.appendChild(cologneCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
});
}

function editData(index) {
    const item = data[index];
    nameInput.value = item.name;
    cityInput.value = item.city;
    cologneInput.value = item.cologne;
    emailInput.value = item.email;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}
function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}