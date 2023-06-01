

// SAVE THE DATA
const data = [];

const selectedRecordIndex = -1;

function saveData() {
    const name = document.getElementById("nameInput").value;
    const passport = document.getElementById("passportInput").value;
    const leaveDate = document.getElementById("leaveDateInput").value;
    const returnDate = document.getElementById("returnDateInput").value;
    const fromCity = document.getElementById("fromCityInput").value;
    const toCity = document.getElementById("toCityInput").value;
    localStorage.setItem('name', name);
    localStorage.setItem('passport', passport);
    localStorage.setItem('leaveDate', leaveDate);
    localStorage.setItem('returnDate', returnDate);
    localStorage.setItem('fromCity', fromCity);
    localStorage.setItem('toCity', toCity);

    const newData = {
        name: name,
        passport: passport,
        leaveDate: leaveDate,
        returnDate: returnDate,
        fromCity: fromCity,
        toCity: toCity
        };

    if (selectedRecordIndex === -1) {
        data.push(newData);
        }
    else {
        data[selectedRecordIndex] = newData;
        selectedRecordIndex = -1;
        }

    clearForm();

    updateDataView();
}

// EDIT DATA

function editData(index) {
    const record = data[index];
        document.getElementById("nameInput").value = record.name;
        document.getElementById("passportInput").value = record.passport;
        document.getElementById("leaveDateInput").value = record.leaveDate;
        document.getElementById("returnDateInput").value = record.returnDate;
        document.getElementById("fromCityInput").value = record.fromCity;
        document.getElementById("toCityInput").value = record.toCity;

        selectedRecordIndex = index;
}

// DELETE DATA

function deleteData(index) {
    data.splice(index, 1);
    selectedRecordIndex = -1;
    updateDataView();
}

// CLEAN THE FORM

function clearForm() {
    document.getElementById("nameInput").value = "";
    document.getElementById("passportInput").value = "";
    document.getElementById("leaveDateInput").value = "";
    document.getElementById("returnDateInput").value = "";
    document.getElementById("fromCityInput").value = "";
    document.getElementById("toCityInput").value = "";
}

function updateDataView() {
    const formContainer = document.getElementById("dataForm");
    formContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
    const record = data[i];

    const recordElement = document.createElement("div");
    recordElement.classList.add("record");

    const nameElement = document.createElement("p");
    nameElement.textContent = "Name: " + record.name;
    recordElement.appendChild(nameElement);

    const passportElement = document.createElement("p");
    passportElement.textContent = "Passport: " + record.passport;
    recordElement.appendChild(passportElement);

    const leaveDateElement = document.createElement("p");
    leaveDateElement.textContent = "Leave Date: " + record.leaveDate;
    recordElement.appendChild(leaveDateElement);

    const returnDateElement = document.createElement("p");
    returnDateElement.textContent = "Return Date: " + record.returnDate;
    recordElement.appendChild(returnDateElement);

    const fromCityElement = document.createElement("p");
    fromCityElement.textContent = "From: " + record.fromCity;
    recordElement.appendChild(fromCityElement);

    const toCityElement = document.createElement("p");
    toCityElement.textContent = "To: " + record.toCity;
    recordElement.appendChild(toCityElement);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", editData.bind(null, i));
    recordElement.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteData.bind(null, i));
    recordElement.appendChild(deleteButton);

    formContainer.appendChild(recordElement);
  }
}
console.log(data)
