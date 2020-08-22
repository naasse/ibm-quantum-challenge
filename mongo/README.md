# MongoDB

We're going to use the latest Mongo image from [Docker Hub](https://hub.docker.com/_/mongo).
I've created the configuration file to do it for me with Docker-Compose.
With this, we can also initialize our database on start.

In WSL, PowerShell, or wherever you've configured Docker,
change directory to the [Mongo](https://github.com/naasse/ibm-quantum-challenge/tree/master/mongo)
subdirectory and start the database with:

```bash
docker-compose up -d
```

After that, let's verify our collection has been created.

```bash
naasse@NASA:~$ mongo -u ash -p ketchum --authenticationDatabase pokedex
MongoDB shell version v3.6.3
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 4.4.0
WARNING: shell and server versions do not match
> use pokedex
switched to db pokedex
> show collections
pokemon
> db.pokemon.find().pretty()
{
        "_id" : ObjectId("5f3dd93d42cb09e10be25ddd"),
        "id" : "001",
        "name" : "Bulbasaur",
        "classification" : "Seed Pokémon",
        "types" : [
                "Grass",
                "Poison"
        ],
        ...
}
```
