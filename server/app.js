// describes the server/API

const express = require("express"); // access to express library

const {goats, nextId} = require("./goats")

const app = express(); // make very basic server using express

// Tell the app what kind of requests to listen for (and how to handle them)
app.get("/", (request, response) => {
    response.json({
        "message":"Welcome to the GOAT API!"
    })
})

// Get goat data
app.get("/goats", (request, response) => {
    response.json(goats)
})

app.get("/goats/:id", (request, response) => {
    const id = request.params["id"];

    // filter through the goat list and find the correct id
    const goat = goats.filter(g => g["id"] == id)[0];

    if (goat) {
        response.json(goat);
    } else {
        response.status(404).json({
            "message":`Goat not found at id: ${id}`
        })
    }

})


module.exports = app; // makes the server available to other files