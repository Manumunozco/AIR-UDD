
// ASIGNA ELEMENTO A VARIABLE ADDBUTTON
const addButton = document.getElementById("saveButton")

// GUARDAR INFO AL HACER EL CLICK
addButton.addEventListener("click", saveData)

// DECLARA VARIABLE PRINCIPAL
let data = [];
let editmode = false
let idEditing = null

// INICIALIZAR VARIABLE

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
    <p>${element.name}</p>
    <p>${element.passport}</p>
    <p>${element.leaveDate}</p>
    <p>${element.returnDate}</p>
    <p>${element.fromCity}</p>
    <p>${element.toCity}</p>
    <div class="buttonCard">
    <button class="edit" onclick="editData('${element.id}')">Edit</button>
    <button class="delete" onclick="deleteData('${element.id}')">Delete</button>
    </div>
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

bringData()