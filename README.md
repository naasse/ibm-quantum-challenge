# IBMQuantum/backend-code-challenge

This repo is an attempt at the [IBMQuantum backend code challenge](https://github.com/IBMQuantum/backend-code-challenge).

To start the application, verify the
[prerequisites](https://github.com/naasse/ibm-quantum-challenge/blob/master/documentation/prerequisites.md)
are satisfied then run the `setup.sh` located in this directory to build services.

This will start the database Docker pod, but you will need to start the services manually.
See [setup documentation](https://github.com/naasse/ibm-quantum-challenge/blob/master/documentation/setup.md) for full instructions.

The below `README` content and the included `pokemons.json` come from the linked repository.
Everything else was written my me to use MongoDB, Loopback.io, and ReactJS to build a simple Pokedex application.

# Challenges Coding Exercise Backend

We have provided you with Pokemon data in a json file. Your mission is to create a database and expose the database to a API. Basically, you need to:

- Design the database to store information for the Pokemon data
- Load the database with the data
- Implement the API Interface withe the following features:

  - Query pokemons with the options:
    - Pagination
    - Search by name
    - Filter by pokemon type
    - Filter by favorite
  - Query a pokemon by id
  - Query a pokemon by name
  - Query list of pokemon types
  - Mutation to mark/unmark pokemon as favorite

- **Tests** are important and if time allows it, we'd like to see _some_ test coverage.

### Technology

Remember that our technology stack is:

- Loopback.io (Javascript and Typescript)
- MongoDB / PostgreSQL

Be careful with your decisitions. You can use the framework that you prefer, but please write the challenge in JS or TS. You can choose MongoDB or PostgreSQL like database, be free but take in consideration the best database to store the data provided in the JSON file.

