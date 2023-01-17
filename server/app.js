// describes the server/API

const express = require("express"); // access to express library
const cors = require("cors")

let {goats, nextId} = require("./goats")
const logger = require("./logger");

const app = express(); // make very basic server using express

// MIDDLEWARE

// req -> [cors (add header to response)] -> [API] -> response
// req -> [auth (check the req headers for a key)] -> [API] -> response
app.use(express.json()) // Layer to read the body of POSTs
app.use(cors()) // Layer to add CORS headers
app.use(logger) // Layer to log access

// ENDPOINTS

// Tell the app what kind of requests to listen for (and how to handle them)
app.get("/", (request, response) => {
    response.json({
        "message":"Welcome to the GOAT API!"
    })
})

// Get goat data
app.get("/goats", (request, response) => {
    const {maxAge} = request.query

    if (maxAge) {
        response.json(goats.filter(g => g["age"] <= maxAge))
    } else {
        response.json(goats)
    }
})

// get goat data for certain id
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


// Add a new goat
app.post("/goats", (request, response) => {

    const newGoat = request.body
    nextId = goats.length + 1
    newGoat["id"] = nextId

    goats.push(newGoat)
    
    response.status(201).json(newGoat)

    console.log(goats)
})

// Get goat data
app.delete("/goats/:id", (request, response) => {
    const id = request.params["id"]

    const exists = goats.filter(g => g["id"] == id).length == 1;

    if (exists) {
        goats = goats.filter(g => g["id"] != id)
        response.status(200).json({
            "message":`Goat ${id} deleted.`
        })
    } else {
        response.status(404).json({
            "message":`Goat not found at id: ${id}`
        })
    }
    
})

// Get goat data
app.put("/goats/:id", (request, response) => {
    const id = request.params["id"]

    const updatedGoat = request.body
    let goat = goats.filter(g => g["id"] == id)[0]

    for (key in updatedGoat) {
        goat[key] = updatedGoat[key]
    }
    goats[id] = goat

    response.status(200).json({
        goat
    })
})

    


module.exports = app; // makes the server available to other files