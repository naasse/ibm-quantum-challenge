# MongoDB Docker Image

This Docker Compose will pull the latest Docker image for Mongo.

It will initialize it with a new database (`pokedex`), 
create a user (user=`ash`, pwd=`ketchum`), 
then create the `pokemon` collection and seed `pokemons.json` into it.

To start the database, run the following command:

```bash
docker-compose up -d
```
