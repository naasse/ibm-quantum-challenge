import {createStubInstance, expect, sinon, StubbedInstanceWithSinonAccessor} from "@loopback/testlab";
import {PokemonRepository} from "../repositories";
import {PokemonController} from "./pokemon.controller";
import {Pokemon} from "../models";

describe("PokemonController", () => {
    let repository: StubbedInstanceWithSinonAccessor<PokemonRepository>;
    beforeEach(givenStubbedRepository);
    describe("find()", () => {
        it("finds the list of Pokemon", async () => {
            const controller = new PokemonController(repository, {} as any, {} as any);
            const expectedPokemon = new Pokemon();
            repository.stubs.find.resolves([expectedPokemon]);
            const found = await controller.find() as Pokemon[];
            expect(found[0]).to.equal(expectedPokemon);
            sinon.assert.calledWithMatch(repository.stubs.find);
        });
    });
    describe("count()", () => {
        it("counts the number of Pokemon", async () => {
            const controller = new PokemonController(repository, {} as any, {} as any);
            repository.stubs.count.resolves({"count": 1});
            const count = await controller.count();
            expect(count.count).to.equal(1);
            sinon.assert.calledWithMatch(repository.stubs.count);
        });
    });

    function givenStubbedRepository() {
        repository = createStubInstance(PokemonController) as any;
    }
});
