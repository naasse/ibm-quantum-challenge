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

// Load the pokemons.json into a JSON object
const fileContent = cat("/docker-entrypoint-initdb.d/pokemons.json");
const pokemon = JSON.parse(fileContent);

// Insert the data into the collection
db.pokemon.insertMany(pokemon);

// TODO: catch 'em all
