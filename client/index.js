
const herd = document.getElementById("herd");

async function callTheHerd() {

    // Request all the goats from the API
    const res = await fetch("http://localhost:3000/goats");

    // Extracting the JSON data from the response
    const data = await res.json();

    console.log(data)

    // Log them
    data.forEach(goat => {
        addGoatToTable(goat)
    })
}

function addGoatToTable(goat) {
    const tr = document.createElement("tr");
    let goatKeys = ['id', 'name', 'age', 'sex', 'favouriteColour'];
    for (key of goatKeys) {
        const td = document.createElement("td");
        td.textContent = goat[key];
        if (key === "favouriteColour") {
            td.style.backgroundColor = goat[key];
        }
        tr.appendChild(td);
    }
    herd.appendChild(tr);
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

    const res = await fetch("http://localhost:3000/goats", options)
    const data = await res.json()
    if (await res.status != 201) {
        alert("Attempt to add goat failed")
        return
    } 
    return await data
}

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()

    const goat = {
        name: e.target.name.value,
        age: e.target.age.value,
        sex: e.target.sex.value,
        favouriteColour: e.target.colour.value
    };

    goat = addGoat(goat)
    addGoatToTable(goat)
})

callTheHerd()
