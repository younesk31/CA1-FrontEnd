import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./jokeFacade"
import jokeFacade from "./jokeFacade"

document.getElementById("all-content").style.display = "block"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */


/* JS For Exercise-2 below */



/* JS For Exercise-3 below */
const URL = "https://manlyman69.rocks/CA1/api/person"
fetch(URL)
.then(res => res.json())
.then(users => {
  const userRows = users.map(user => `
  <tr>
    <td>${user.id}</td>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.address.id}</td>
    <td>${user.address.street}</td>
    <td>${user.address.additionalInfo}</td>
    <td>${user.address.cityInfoDTO.id}</td>
    <td>${user.address.cityInfoDTO.zipcode}</td>
    <td>${user.address.cityInfoDTO.city}</td>

    <td>${user.phones.map(phone => `${phone.id }
    <td>${phone.number}</td>
    <td>${phone.description}</td>`)}</td>

    <td>${user.hobbies.map(hobby => `${hobby.id }
    <td>${hobby.name}</td>
    <td>${hobby.description}</td>`)}</td>

  </tr>
  `)
  const userRowsAsString = userRows.join("")
  document.getElementById("allUserRows").innerHTML = userRowsAsString
})


/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1": hideAllShowOne("ex1_html"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



