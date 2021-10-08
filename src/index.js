import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import * as bootstrap from 'bootstrap';
import '@popperjs/core';
import { SERVER_URL } from './constants'
import jokeFacade from "./jokeFacade";

document.getElementById("all-content").style.display = "block"


/* JS For Person below */

let addModalElement = document.getElementById("addmodal")
let addmodal = new bootstrap.Modal(addModalElement)

let editModalElement = document.getElementById("editmodal")
let editModal = new bootstrap.Modal(editModalElement)

let deleteModalElement = document.getElementById("deletemodal")
let deletemodal = new bootstrap.Modal(deleteModalElement)

let zipModalElement = document.getElementById("zipmodal")
let zipmodal = new bootstrap.Modal(zipModalElement)

document.getElementById("tablerows").addEventListener('click', e => {
  e.preventDefault();
  const node = e.target
  const name = node.getAttribute("name")
  const id = node.getAttribute("id")
  switch (name) {
    case "edit": editPerson(id); break;
    case "delete": deletePerson(id); break;
  }
})
document.getElementById("ziprows").addEventListener('click', inAZipSearch)

document.getElementById("addPerson_btn").addEventListener('click', addPerson)

function addPerson() {
  addmodal.toggle()
}

document.getElementById("modal-create-person-btn").addEventListener('click', createPerson)

function createPerson() {
  const personObject = {
    firstName: document.getElementById("newfirstName").value,
    lastName: document.getElementById("newlastName").value,
    address: {
      street: document.getElementById("newaddress_street").value,
      additionalInfo: document.getElementById("newaddress_info").value,
      cityInfoDTO: {
        zipcode: document.getElementById("newcity_zip").value,
        city: document.getElementById("newcity_name").value
      }
    },
    phones: [
      {
        number: document.getElementById("newphone_num").value,
        description: document.getElementById("newphone_disc").value
      }
    ],
    hobbies: [
      {
        name: document.getElementById("newhobby_name").value,
        description: document.getElementById("newhobby_disc").value
      }
    ]
  }

  const options = makeOptions('POST', personObject)

  fetch(`${SERVER_URL}/person`, options)
    .then(handleHttpErrors)
    .then(data => {
      addmodal.toggle()
      getAllPersons()
    })
    .catch(errorHandling)
}



function editPerson(id) {

  fetch(`${SERVER_URL}/person/${id}`)
    .then(handleHttpErrors)
    .then(data => {
      console.log(data.id)
      console.log(data.firstName)
      document.getElementById("edit_id").value = data.id
      document.getElementById("firstName").value = data.firstName
      document.getElementById("lastName").value = data.lastName
      document.getElementById("address_id").value = data.address.id
      document.getElementById("address_street").value = data.address.street
      document.getElementById("address_info").value = data.address.additionalInfo
      document.getElementById("city_id").value = data.address.cityInfoDTO.id
      document.getElementById("city_zip").value = data.address.cityInfoDTO.zipcode
      document.getElementById("city_name").value = data.address.cityInfoDTO.city
      document.getElementById("phone_id").value = data.phones.map(phone => `${phone.id}`)
      document.getElementById("phone_num").value = data.phones.map(phone => `${phone.number}`)
      document.getElementById("phone_disc").value = data.phones.map(phone => `${phone.description}`)
      document.getElementById("hobby_id").value = data.hobbies.map(hobby => `${hobby.id}`)
      document.getElementById("hobby_name").value = data.hobbies.map(hobby => `${hobby.name}`)
      document.getElementById("hobby_disc").value = data.hobbies.map(hobby => `${hobby.description}`)
      editModal.toggle()
    })
    .catch(errorHandling)
}

document.getElementById("modal-edit-save-btn").addEventListener('click', updatePerson)

function updatePerson() {
  const id = document.getElementById("edit_id").value

  const personObject = {
    id: id,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: {
      street: document.getElementById("address_street").value,
      additionalInfo: document.getElementById("address_info").value,
      cityInfoDTO: {
        zipcode: document.getElementById("city_zip").value,
        city: document.getElementById("city_name").value
      }
    },
    phones: [
      {
        id: document.getElementById("phone_id").value,
        number: document.getElementById("phone_num").value,
        description: document.getElementById("phone_disc").value
      }
    ],
    hobbies: [
      {
        id: document.getElementById("hobby_id").value,
        name: document.getElementById("hobby_name").value,
        description: document.getElementById("hobby_disc").value
      }
    ]
  }

  const options = makeOptions('PUT', personObject)

  fetch(`${SERVER_URL}/person`, options)
    .then(handleHttpErrors)
    .then(data => {
      editModal.toggle()
      getAllPersons()
    })
    .catch(errorHandling)
}

document.getElementById("modal-delete-confirm-btn").addEventListener('click', removePerson)

function deletePerson(id) {
  deletemodal.toggle()
  document.getElementById("edit_id").value = id
}

function removePerson() {
  const id = document.getElementById("edit_id").value

  const options = makeOptions("DELETE", id)

  fetch(`${SERVER_URL}/person/${id}`, options)
    .then(data => {
      deletemodal.toggle()
      getAllPersons()
    })
    .catch(errorHandling)
}


function getAllPersons() {
  fetch(`${SERVER_URL}/person`)
    .then(handleHttpErrors)
    .then(data => {
      // Lav tabel rækker med data
      const allRows = data.map(p => getPersonTableRow(p))
      document.getElementById("tablerows").innerHTML = allRows.join("")
    })
    .catch(errorHandling)
}



function getPersonTableRow(p) {
  return `<tr>
    <td>${p.id}</td>

    <td>${p.firstName}</td>
    <td>${p.lastName}</td>
    <td>${p.phones.map(phone => `${phone.number}`)}</td>
    <td>${p.address.street}</td>
    <td>${p.address.cityInfoDTO.zipcode}</td>
    <td>${p.address.cityInfoDTO.city}</td>
    <td>${p.hobbies.map(hobby => `${hobby.name}`)}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button id="${p.id}" type="button" name="edit" class="btn btn-success">Edit</button>
        <button id="${p.id}" type="button" name="delete" class="btn btn-danger">Delete</button>
      </div>
    </td>
    </tr>`
}


function inAZipSearch(id) {
  zipmodal.toggle()
}

function getAllZips() {
  fetch(`${SERVER_URL}/person/zipcodes`)
    .then(handleHttpErrors)
    .then(data => {
      const allRows = data.map(z => getZipTableRow(z))
      document.getElementById("ziprows").innerHTML = allRows.join("")
    })
    .catch(errorHandling)
}

function getZipTableRow(z) {
  return `<tr>
    <td>${z.id}</td>
    <td>${z.zipcode}</td>
    <td>${z.city}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button id="${z.id}" type="button" name="lookup" class="btn btn-light">Persons from this zipcode</button>
      </div>
    </td>
    </tr>`
}



/* Helper functions */

function makeOptions(method, body) {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

function errorHandling(err) {
  console.log(err)
  if (err.status) {
    err.fullError.then(e => alert(e.message + 
    "\n Try using correct data and try again!"))
  }
  else {
    console.log("Network error")
  }
}


/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("person").style = "display:none"
  document.getElementById("zipcodes_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "persons": hideAllShowOne("person"); getAllPersons(); break
    case "zipcodes": hideAllShowOne("zipcodes_html"); getAllZips(); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");