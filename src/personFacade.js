const URL = "https://manlyman69.rocks/CA1/api/person"

function getPersons(){
    return fetch(URL)
    .then(res=> res.json())
}

function getPerson(id){
    return fetch(URL+"/"+id)
    .then(handleHttpErrors)  
}

function addPerson(person){
    const options = makeOptions("POST",person)
    return fetch(URL,options)
    .then(handleHttpErrors)    
}

function editPerson(person){
    const options = makeOptions("PUT",person)
    return fetch(URL,options)
    .then(handleHttpErrors)  
}

function deletePerson(id){
    const options = makeOptions("DELETE",id)
    return fetch(URL+"/",options)
    .then(handleHttpErrors)    
}

function personHobby(hobby){
    return fetch(URL+"/hobby/"+hobby)
    .then(handleHttpErrors)    
}

function personZipcode(zipcode){
    return fetch(URL+"/zipcode/"+zipcode)
    .then(handleHttpErrors)    
}

function allZipcodes(){
    return fetch(URL+"/zipcodes")
    .then(handleHttpErrors)  
}

const personFacade = {
    getPersons,
    getPerson,
    addPerson,
    editPerson,
    deletePerson,
    personHobby,
    personZipcode,
    allZipcodes
}


function makeOptions(method, body) {
    var opts =  {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if(body){
      body = JSON.stringify(body);
    }
    return opts+body;
   }

function handleHttpErrors(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
   }
   
   

export default personFacade; 