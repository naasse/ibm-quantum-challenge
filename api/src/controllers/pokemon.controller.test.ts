import {createStubInstance, expect, sinon, StubbedInstanceWithSinonAccessor} from "@loopback/testlab";
import {PokemonRepository} from "../repositories";
import {PokemonController} from "./pokemon.controller";
import {Pokemon} from "../models";
import {HttpError} from "../representations";

const {mockRequest, mockResponse} = require("mock-req-res");

describe("PokemonController", () => {
    let repository: StubbedInstanceWithSinonAccessor<PokemonRepository>;
    let controller: PokemonController;
    const expectedPokemon = [
        new Pokemon({"id": 1, "name": "Bulbasaur"}),
        new Pokemon({"id": 2, "name": "Ivysaur"})
    ];
    beforeEach(stubRepository);

    describe("find()", () => {
        it("finds the list of Pokemon", async () => {
            repository.stubs.find.resolves(expectedPokemon);
            const found = await controller.find() as Pokemon[];
            expect(found.length).to.equal(expectedPokemon.length);
            expect(found[0]).to.equal(expectedPokemon[0]);
            expect(found[1]).to.equal(expectedPokemon[1]);
            sinon.assert.calledWithMatch(repository.stubs.find);
        });
    });

    describe("count()", () => {
        it("counts the number of Pokemon", async () => {
            repository.stubs.count.resolves({"count": expectedPokemon.length});
            const count = await controller.count();
            expect(count.count).to.equal(expectedPokemon.length);
            sinon.assert.calledWithMatch(repository.stubs.count);
        });
    });

    describe("findById()", () => {
        it("finds a Pokemon by ID", async () => {
            repository.stubs.find.resolves([expectedPokemon[0]]);
            const found = await controller.findById(expectedPokemon[0].id);
            expect(found).to.equal(expectedPokemon[0]);
            sinon.assert.calledWithMatch(repository.stubs.find, {
                "where": {
                    "id": 1
                }
            });
        });

        it("throws an error on not found", async () => {
            repository.stubs.find.resolves([]);
            const error = await controller.findById(expectedPokemon[0].id) as HttpError;
            // Pop off the inner and cast to remove type. Apparently the wrapped error doesn't conform to the built-in error.
            const innerError = error.error as any;
            expect(error.statusCode).to.equal(404);
            expect(error.message).to.equal("A Pokemon with the given ID was not found.");
            expect(innerError.code).to.equal("ENTITY_NOT_FOUND");
            expect(innerError.entityId).to.equal(1);
            expect(innerError.entityName).to.equal("Pokemon");
            sinon.assert.calledWithMatch(repository.stubs.find, {
                "where": {
                    "id": 1
                }
            });
        });
    });

    function stubRepository() {
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
        repository = createStubInstance(PokemonController) as any;
        controller = new PokemonController(repository, req, res);
    }
});
