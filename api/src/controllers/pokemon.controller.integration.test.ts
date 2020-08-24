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
        new Pokemon({"id": 1, "name": "Bulbasaur"}),
        new Pokemon({"id": 2, "name": "Ivysaur"})
    ];

    beforeEach(resetData);

    describe("find()", () => {
        it("finds the list of Pokemon", async () => {
            const found = await controller.find() as Pokemon[];
            expect(found.length).to.equal(expectedPokemon.length);
            expect(found[0].id).to.equal(expectedPokemon[0].id);
            expect(found[0].name).to.equal(expectedPokemon[0].name);
            expect(found[1].id).to.equal(expectedPokemon[1].id);
            expect(found[1].name).to.equal(expectedPokemon[1].name);
        });
    });

    describe("count()", () => {
        it("counts the number of Pokemon", async () => {
            const count = await controller.count();
            expect(count.count).to.equal(expectedPokemon.length);
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

    function resetData() {
        repository.deleteAll();
        repository.createAll(expectedPokemon);
    }
});
