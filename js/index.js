const addMonsterCard = document.querySelector('#create-monster')
const monstersListCard = document.querySelector('#monster-container')
const previousPage = document.querySelector('#back')
const nextPage = document.querySelector('#forward')
let page = 1;

document.addEventListener("DOMContentLoaded", () => {
   renderMonsterForm()
   fetchMonsters()
   const monsterForm = document.querySelector('#add-monster-form');
   monsterForm.addEventListener('submit', addNewMonster);
   previousPage.addEventListener('click', movePageDown);
   nextPage.addEventListener('click', movePageUp);
})

// Renders monster details for each retrieved toy from the response
let renderMonsterForm = () => {
   addMonsterCard.innerHTML = `<form id="add-monster-form">`
   + `<h3>Add Monster Here</h3>`
   + `<input type="text" name="name" placeholder="Monster's name..." id="monster-name" />`
   + `<input type="number" name="age" placeholder="Monster's age..." id="monster-age" />`
   + `<input type="text" name="description" placeholder="Monster's description..." id="monster-description" />`
   + `<input type="submit" value="Add Monster" id="monster-age" />`
   + `</form>`
}

let fetchMonsters = () => {
   fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
   .then(resp => resp.json())
   .then(monsters => { renderMonsterDetails(monsters) })
}

let renderMonsterDetails = monsters => {
   monsters.forEach( monster => { createMonsterDetailsElement(monster) })
}

let createMonsterDetailsElement = monster => {
   const monsterCard = document.createElement('div');
   monstersListCard.appendChild(monsterCard)
   monsterCard.innerHTML = `<h3>${monster.name}</h3>`
   +	`<small>Age : ${monster.age}</small>`
   +	`<p>${monster.description}</p>`
}

let addNewMonster = e => {
   e.preventDefault();
   let monsterName = document.querySelector('[name="name"]').value;
   let monsterAge = document.querySelector('[name="age"]').value;
   let monsterDescription = document.querySelector('[name="description"]').value;

   const newMonster = {
      name: monsterName,
      age: monsterAge,
      description: monsterDescription
   }
   
   const configurationObject = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
      },
      
      body: JSON.stringify(newMonster)
   }

   return fetch('http://localhost:3000/monsters', configurationObject)
   .then(resp => resp.json())
   .then(monster => { createMonsterDetailsElement(monster) })
   .catch(error => { alert("Error Adding New Monster!") })
}

let movePageUp = () => {
   page += 1
}

let movePageDown = () => {
   page -= 1
}