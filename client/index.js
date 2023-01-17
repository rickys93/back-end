const herd = document.getElementById("herd");

const api_base = "http://localhost:3000"

async function callTheHerd() {

    // Request all the goats from the API
    const res = await fetch(api_base + "/goats");

    // Extracting the JSON data from the response
    const data = await res.json();

    console.log(data)

    // Log them
    data.forEach(goat => {
        addGoatToHTML(goat)
    })
}

function addGoatToHTML(goat) {
    const tr = document.createElement("tr");
    let goatKeys = ['id', 'name', 'age', 'sex', 'favouriteColour'];
    for (key of goatKeys) {
        
        const td = document.createElement("td");
        td.textContent = goat[key];
        td.id = key
        if (key === "favouriteColour") {
            td.style.backgroundColor = goat[key];
        }
        tr.appendChild(td);
    }
    const option = document.createElement("option")
    option.value = goat["id"]
    option.textContent = goat["id"]
    document.getElementById("form-id").appendChild(option)

    const td = document.createElement("td");
    const deleteButton = document.createElement("button")
    td.appendChild(deleteButton)
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener('click', deleteGoat)
    tr.appendChild(td)
    herd.appendChild(tr);
}

function deleteGoat(event) {
    const row = event.currentTarget.parentElement.parentElement
    const goatId = event.currentTarget.parentElement.parentElement.querySelector("#id").textContent

    row.removeEventListener('click', deleteGoat)
    row.remove()
    deleteGoatFromDatabase(goatId)
}

async function deleteGoatFromDatabase(id) {
    const options = {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    }
    const res = await fetch(api_base + `/goats/${id}`, options)
    if (await res.status != 200) {
        alert("Attempt to delete goat failed!")
    } else {
        alert("Goat delete successfully!")
    }
}

async function addGoat(goat) {
    console.log(goat)

    const options = {
        method: "POST",
        body: JSON.stringify(goat),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    }

    const res = await fetch(api_base + "/goats", options)
    const data = await res.json()
    if (await res.status != 201) {
        alert("Attempt to add goat failed")
        return
    } 
    return await data
}

async function updateGoat(goat) {
    const id = goat["id"]
    delete goat.id

    const options = {
        method:"PUT",
        body: JSON.stringify(goat),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    }
    console.log(options)
    const endPoint = api_base + "/goats/" + id
    console.log(endPoint)

    const res = await fetch(endPoint, options)

}

function updateGoatInHtml(goat) {
    const tr = document.createElement("tr");
    let goatKeys = ['id', 'name', 'age', 'sex', 'favouriteColour'];
    for (key of goatKeys) {
        
        const td = document.createElement("td");
        td.textContent = goat[key];
        td.id = key
        if (key === "favouriteColour") {
            td.style.backgroundColor = goat[key];
        }
        tr.appendChild(td);
    }
}

document.querySelector("#add-goat-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const goat = {
        name: e.target.name.value,
        age: e.target.age.value,
        sex: e.target.sex.value,
        favouriteColour: e.target.colour.value
    };

    goat = addGoat(goat)
    addGoatToHTML(goat)
})

document.querySelector("#update-goat-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const goat = {
        id: e.target.id.value,
        age: e.target.age.value,
        favouriteColour: e.target.colour.value
    };
    console.log(goat)

    updateGoat(goat)
})

callTheHerd()
