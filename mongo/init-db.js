/******************************************************************************\
 * Name: init-db.js
 *
 * Purpose: Initialize the Mongo Database.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

// Create our Pokedex database.
databases = ["pokedex", "log"];

// Switch to the Pokedex DB
db = db.getSiblingDB("pokedex");
log = db.getSiblingDB("log")

// Create our Pokedex user/role
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
// Create our log user/role
log.createUser({
    "user": "ash",
    "pwd": "ketchum",
    "roles": [
        {
            "role": "readWrite",
            "db": "log"
        }
    ]
});

// Create the collection of Pokemon in our Pokedex
db.createCollection("pokemon");

// Create a collection of warning and error events in our log db
log.createCollection("warnings");
log.createCollection("errors");

// Load the pokemons.json into a JSON object
let pokemonList = JSON.parse(cat("/docker-entrypoint-initdb.d/pokemons.json"));

// Only exists for testing.
// Uncomment to confirm model validation is working.
// pokemonList = pokemonList.concat(JSON.parse(cat("/docker-entrypoint-initdb.d/invalid-pokemons.json")));

// Keep track of the known IDs. We don't want to seed duplicates either.
const insertedIds = [];

// Validate the model. Our only requirement is a numeric ID and a name.
for (let pokemon of pokemonList) {
    if (isNaN(pokemon.id) ||
        pokemon.name === undefined ||
        pokemon.name === null ||
        pokemon.name.trim() === "") {
        // This is an invalid entry. Do not add it to the collection.
        // Log the failure to a separate database collection.
        log.errors.insertOne({
            "time": new Date(),
            "message": `Encountered invalid Pokemon during startup. ID: '${pokemon.id}', Name: '${pokemon.name}'`
        });
    } else {
        // Convert the ID to be a number
        pokemon.id = Number(pokemon.id);

        // Have we encountered this Pokemon yet?
        if (insertedIds.includes(pokemon.id)) {
            log.warnings.insertOne({
                "time": new Date(),
                "message": `Encountered duplicate Pokemon during startup. ID: '${pokemon.id}', Name: '${pokemon.name}'`
            });
        } else {
            // Add to the list of added Pokemon
            insertedIds.push(pokemon.id);
            // Insert into the database collection
            db.pokemon.insertOne(pokemon);
        }
    }
}

// TODO: catch 'em all
