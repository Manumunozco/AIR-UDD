// ====== SAVE THE DATA ======

// ASIGNA ELEMENTO A VARIABLE ADDBUTTON
const addButton = document.getElementById("saveButton")
// GUARDAR INFO AL HACER EL CLICK
addButton.addEventListener("click", saveData)
// DECLARA VARIABLE PRINCIPAL
let data = [];
let editmode = false
let idEditing = null

// INICIALIZAR VARIABLE
// const selectedRecordIndex = -1;
// elementos html del formulario
    const nameInput = document.getElementById("nameInput");
    const passport = document.getElementById("passportInput");
    const leaveDate = document.getElementById("leaveDateInput");
    const returnDate = document.getElementById("returnDateInput");
    const fromCity = document.getElementById("fromCityInput");
    const toCity = document.getElementById("toCityInput");

// ====== DECLARAR FUNCIONES ======

function saveData(event) {
    // PREVENTDEFAULT previene que la pagina se recargue al hacer click
    event.preventDefault()
if (nameInput.value == '' || passport.value == '' || leaveDate.value == '' || returnDate.value == '' || fromCity.value == '' || toCity.value == ''){
    alert('hay campos vacios')
    return
}

    // localStorage.setItem('name', name);
    // localStorage.setItem('passport', passport);
    // localStorage.setItem('leaveDate', leaveDate);
    // localStorage.setItem('returnDate', returnDate);
    // localStorage.setItem('fromCity', fromCity);
    // localStorage.setItem('toCity', toCity);


let id = Date.now()

if (editmode){
    id = idEditing
}

// CREAR OBJETO
    const newData = {
        name: nameInput.value,
        passport: passport.value,
        leaveDate: leaveDate.value,
        returnDate: returnDate.value,
        fromCity: fromCity.value,
        toCity: toCity.value,
        id
        };
if (editmode){
    const index = data.findIndex((registro)=>registro.id == id)
    data[index] = newData
    saveDataLS()
    bringData()
    clearForm()
    idEditing = null
    editmode = false
    } else {
        data.push(newData)
        saveDataLS()
        clearForm();
        bringData();
    }
}

// ALMACENAR ARRAY EN LOCALSTORAGE
const saveDataLS = ()=>{
    localStorage.setItem("info", JSON.stringify(data))
}

const form = document.getElementById("form-container")

const formContainer = document.getElementById("dataForm");

const bringData = ()=>{
    // OBTENER DATOS DESDE LS
    const dataLS = localStorage.getItem("info")
    // JSONPARSE DEVUELVE LOS DATOS A OBJETOS
    data = JSON.parse(dataLS)
    // SI EL LC NO TIENE INFO, DEJA EL ARREGLO VACIO
    if(!data){
        data = []
    }
    console.log(data)
    // LIMPIA EL CONTENIDO
    formContainer.innerHTML = "";
    // RECORRE EL ARRAY CON FOREACH
    data.forEach((element)=>{
    // DIBUJAR ELEMENTOS EN WEB
    formContainer.innerHTML += `
   <div class="card">
    <h1>${element.name}</h1>
    <h3>${element.passport}</h3>
    <h4>${element.leaveDate}</h4>
    <p>${element.returnDate}</p>
    <p>${element.fromCity}</p>
    <p>${element.toCity}</p>
    <button onclick="editData('${element.id}')">Edit</button>
    <button onclick="deleteData('${element.id}')">Delete</button>
    </div>
    `
    })
}



// EDIT DATA

function editData(id) {
    const index = data.findIndex((registro)=>registro.id == id)
    const registroEditado = data[index]
    nameInput.value = registroEditado.name
    passport.value = registroEditado.passport
    leaveDate.value = registroEditado.leaveDate
    returnDate.value = registroEditado.returnDate
    fromCity.value = registroEditado.fromCity
    toCity.value = registroEditado.toCity
    idEditing = id
    editmode = true
    // const record = data[index];
    //     document.getElementById("nameInput").value = record.name;
    //     document.getElementById("passportInput").value = record.passport;
    //     document.getElementById("leaveDateInput").value = record.leaveDate;
    //     document.getElementById("returnDateInput").value = record.returnDate;
    //     document.getElementById("fromCityInput").value = record.fromCity;
    //     document.getElementById("toCityInput").value = record.toCity;

    //     selectedRecordIndex = index;
}

// DELETE DATA

function deleteData(id) {
const index = data.findIndex((registro)=>registro.id == id)
data.splice(index, 1)
saveDataLS()
bringData()
   }

// CLEAN THE FORM

function clearForm() { form.reset()}

// function updateDataView() {
    

//     for (let i = 0; i < data.length; i++) {
//     const record = data[i];

//     const recordElement = document.createElement("div");
//     recordElement.classList.add("record");

//     const nameElement = document.createElement("p");
//     nameElement.textContent = "Name: " + record.name;
//     recordElement.appendChild(nameElement);

//     const passportElement = document.createElement("p");
//     passportElement.textContent = "Passport: " + record.passport;
//     recordElement.appendChild(passportElement);

//     const leaveDateElement = document.createElement("p");
//     leaveDateElement.textContent = "Leave Date: " + record.leaveDate;
//     recordElement.appendChild(leaveDateElement);

//     const returnDateElement = document.createElement("p");
//     returnDateElement.textContent = "Return Date: " + record.returnDate;
//     recordElement.appendChild(returnDateElement);

//     const fromCityElement = document.createElement("p");
//     fromCityElement.textContent = "From: " + record.fromCity;
//     recordElement.appendChild(fromCityElement);

//     const toCityElement = document.createElement("p");
//     toCityElement.textContent = "To: " + record.toCity;
//     recordElement.appendChild(toCityElement);

//     const editButton = document.createElement("button");
//     editButton.textContent = "Edit";
//     editButton.addEventListener("click", editData.bind(null, i));
//     recordElement.appendChild(editButton);

//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Delete";
//     deleteButton.addEventListener("click", deleteData.bind(null, i));
//     recordElement.appendChild(deleteButton);

//     formContainer.appendChild(recordElement);
//   }
// }
bringData()