import {expect} from "@loopback/testlab";
import {PokemonRepository} from "../repositories";
import {PokemonController} from "./pokemon.controller";
import {Pokemon} from "../models";
import {PokemonDataSourceMock} from "../datasources";
import {HttpError} from "../representations";

const {mockRequest, mockResponse} = require("mock-req-res");

describe("PokemonController (integration)", () => {
    const req = mockRequest({
        "body": {},
        "cookies": {},
        "query": {},
        "params": {}
    });
    const res = mockResponse({
        "body": {},
        "cookies": {},
        "query": {},
        "params": {}
    });
    const dataSource = new PokemonDataSourceMock();
    const repository = new PokemonRepository(dataSource);
    const controller = new PokemonController(repository, req, res);

    const expectedPokemon = [
        new Pokemon({"id": 1, "name": "Bulbasaur", "types": ["Grass", "Poison"], "favorite": false}),
        new Pokemon({"id": 2, "name": "Ivysaur", "types": ["Grass", "Poison"], "favorite": false}),
        new Pokemon({"id": 3, "name": "Venusaur", "types": ["Grass", "Poison"], "favorite": false}),
        new Pokemon({"id": 4, "name": "Charmander", "types": ["Fire"], "favorite": true}),
        new Pokemon({"id": 5, "name": "Charmeleon", "types": ["Fire"], "favorite": false}),
        new Pokemon({"id": 6, "name": "Charizard", "types": ["Fire", "Flying"], "favorite": false}),
        new Pokemon({"id": 7, "name": "Squirtle", "types": ["Water"], "favorite": false}),
        new Pokemon({"id": 8, "name": "Wartortle", "types": ["Water"], "favorite": false}),
        new Pokemon({"id": 9, "name": "Blastoise", "types": ["Water"], "favorite": false})
    ];

    beforeEach(resetData);

    describe("find()", () => {
        it("finds the list of Pokemon", async () => {
            const found = await controller.find() as Pokemon[];
            expect(found.length).to.equal(expectedPokemon.length);
            expect(found[0].name).to.equal(expectedPokemon[0].name);
            expect(found[0].id).to.equal(expectedPokemon[0].id);
            expect(found[1].name).to.equal(expectedPokemon[1].name);
            expect(found[1].id).to.equal(expectedPokemon[1].id);
        });

        it("Supports pagination (first page)", async () => {
            const limit = 5;
            const offset = 0;
            const filter = {
                "limit": limit,
                "offset": offset
            }
            const found = await controller.find(filter) as Pokemon[];
            expect(found.length).to.equal(limit);
            expect(found[0].id).to.equal(expectedPokemon[offset].id);
            expect(found[0].name).to.equal(expectedPokemon[offset].name);
            expect(found[1].id).to.equal(expectedPokemon[1 + offset].id);
            expect(found[1].name).to.equal(expectedPokemon[1 + offset].name);
        });

        it("Supports pagination (second page)", async () => {
            const limit = 5;
            const offset = 5;
            const filter = {
                "limit": limit,
                "offset": offset
            }
            const found = await controller.find(filter) as Pokemon[];
            expect(found.length).to.equal(4); // Should fall short of limit on second page
            expect(found[0].id).to.equal(expectedPokemon[offset].id);
            expect(found[0].name).to.equal(expectedPokemon[offset].name);
            expect(found[1].id).to.equal(expectedPokemon[1 + offset].id);
            expect(found[1].name).to.equal(expectedPokemon[1 + offset].name);
        });

        it("Supports searching by name", async () => {
            const searchId = 3; // Charmander
            const filter = {
                "where": {
                    "name": expectedPokemon[searchId].name
                }
            }
            const found = await controller.find(filter) as Pokemon[];
            expect(found.length).to.equal(1);
            expect(found[0].id).to.equal(expectedPokemon[searchId].id);
            expect(found[0].name).to.equal(expectedPokemon[searchId].name);
        });

        it("Supports filtering by type", async () => {
            let filter = {
                "where": {
                    "types": {
                        "inq": ["Fire"]
                    }
                }
            }
            let found = await controller.find(filter) as Pokemon[];
            expect(found.length).to.equal(3);

            filter = {
                "where": {
                    "types": {
                        "inq": ["Flying"]
                    }
                }
            }
            found = await controller.find(filter) as Pokemon[];
            expect(found.length).to.equal(1);
        });

        it("Supports filtering by favorite", async () => {
            const filter = {
                "where": {
                    "favorite": true
                }
            }
            const found = await controller.find(filter) as Pokemon[];
            expect(found.length).to.equal(1);
            expect(found[0].name).to.equal("Charmander");
        });
    });

    describe("count()", () => {
        it("counts the number of Pokemon", async () => {
            const count = await controller.count();
            expect(count.count).to.equal(expectedPokemon.length);
        });
    });

    describe("getTypes()", () => {
        it("Get the list of unique Pokemon types", async () => {
            const types = await controller.getTypes() as string[];
            expect(types[0]).to.equal("Grass");
            expect(types[1]).to.equal("Poison");
            expect(types[2]).to.equal("Fire");
            expect(types[3]).to.equal("Flying");
            expect(types[4]).to.equal("Water");
        });
    });

    describe("findById()", () => {
        it("finds a Pokemon by ID", async () => {
            const found = await controller.findById(expectedPokemon[0].id) as Pokemon;
            expect(found.id).to.equal(expectedPokemon[0].id);
            expect(found.name).to.equal(expectedPokemon[0].name);
        });

        it("throws an error on not found", async () => {
            const error = await controller.findById(999) as HttpError;
            // Pop off the inner and cast to remove type. Apparently the wrapped error doesn't conform to the built-in error.
            const innerError = error.error as any;
            expect(error.statusCode).to.equal(404);
            expect(error.message).to.equal("A Pokemon with the given ID was not found.");
            expect(innerError.code).to.equal("ENTITY_NOT_FOUND");
            expect(innerError.entityId).to.equal(999);
            expect(innerError.entityName).to.equal("Pokemon");
        });
    });

    describe("toggleFavoriteById()", () => {
        it("Can toggle favorite", async () => {
            let toggled = await controller.toggleFavoriteById(expectedPokemon[0].id) as Pokemon;
            expect(toggled.favorite).to.equal(true);
            let found = await controller.findById(expectedPokemon[0].id) as Pokemon;
            expect(found.favorite).to.equal(true);
            toggled = await controller.toggleFavoriteById(expectedPokemon[0].id) as Pokemon;
            expect(toggled.favorite).to.equal(false);
            found = await controller.findById(expectedPokemon[0].id) as Pokemon;
            expect(found.favorite).to.equal(false);
        });

        it("throws an error on not found", async () => {
            const error = await controller.toggleFavoriteById(999) as HttpError;
            // Pop off the inner and cast to remove type. Apparently the wrapped error doesn't conform to the built-in error.
            const innerError = error.error as any;
            expect(error.statusCode).to.equal(404);
            expect(error.message).to.equal("A Pokemon with the given ID was not found.");
            expect(innerError.code).to.equal("ENTITY_NOT_FOUND");
            expect(innerError.entityId).to.equal(999);
            expect(innerError.entityName).to.equal("Pokemon");
        });
    });

    function resetData() {
        repository.deleteAll();
        repository.createAll(expectedPokemon);
    }
});
