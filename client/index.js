// const { render } = require("../server/app");

const herd = document.getElementById("herd");

async function callTheHerd() {

    // Request all the goats from the API
    const res = await fetch("http://localhost:3000/goats");

    // Extracting the JSON data from the response
    const data = await res.json();

    // Log them
    data.forEach(goat => {
        const tr = document.createElement("tr")
        const valueArray = []
        for (key in goat) {
            const td = document.createElement("td")
            td.textContent = goat[key]
            tr.appendChild(td)
        }
        herd.appendChild(tr)

        
        
    })

}

callTheHerd()