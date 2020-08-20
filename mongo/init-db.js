/******************************************************************************\
 * Name: init-db.js
 *
 * Purpose: Initialize the Mongo Database.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

// Create our Pokedex database
databases = ["pokedex"];

// Switch to the Pokedex DB
db = db.getSiblingDB("pokedex");

// Create our Pokedex application user
db.createUser({
    "user": "ash",
    "pwd": "ketchum",
    "roles": [
        {
            "role": "readWrite",
            "db": "pokedex"
        }
    ]
});

// Create the collection of Pokemon in our Pokedex
db.createCollection("pokemon");

// Insert the known Pokemon into our collection
// TODO
// db.collection.insertMany([
//     "./pokemons.json"
// ])

// TODO: catch 'em all
