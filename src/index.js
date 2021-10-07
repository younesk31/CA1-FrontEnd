import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import personFacade from "./personFacade"

document.getElementById("all-content").style.display = "block"






/* JS For PersonsData below */
personFacade.getPersons()
.then(persons => {
  const personRows = persons.map(person => `
  <tr>
    <td>${person.id}</td>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
  </tr>
  `)
  const userRowsAsString = personRows.join("")
  document.getElementById("allUserRows").innerHTML = userRowsAsString
})

/*
personFacade.getPersons()
.then(persons => {
  const personRows = persons.map(person => `
  <tr>
    <td>${person.id}</td>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>

    <td>${person.address.id}</td>
    <td>${person.address.street}</td>
    <td>${person.address.additionalInfo}</td>
    <td>${person.address.cityInfoDTO.id}</td>
    <td>${person.address.cityInfoDTO.zipcode}</td>
    <td>${person.address.cityInfoDTO.city}</td>

    <td>${person.phones.map(phone => `${phone.id }
    <td>${phone.number}</td>
    <td>${phone.description}</td>`)}</td>

    <td>${person.hobbies.map(hobby => `${hobby.id }
    <td>${hobby.name}</td>
    <td>${hobby.description}</td>`)}</td>
    
  </tr>
  `)
  const userRowsAsString = personRows.join("")
  document.getElementById("allUserRows").innerHTML = userRowsAsString
}) 
*/


// GET TESTS
personFacade.allZipcodes();
personFacade.personZipcode(3911);
personFacade.personHobby("DET");



/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("frontpage_html").style = "display:none"
  document.getElementById("addPerson_html").style = "display:none"
  document.getElementById("Hobbys_html").style = "display:none"
  document.getElementById("Zipcodes_html").style = "display:none"
  document.getElementById("PersonsData_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "PersonsData": hideAllShowOne("PersonsData_html"); break
    case "Hobbys": hideAllShowOne("Hobbys_html"); break
    case "Zipcodes": hideAllShowOne("Zipcodes_html"); break
    case "addperson": hideAllShowOne("addPerson_html"); break
    default: hideAllShowOne("frontpage_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("frontpage_html");



