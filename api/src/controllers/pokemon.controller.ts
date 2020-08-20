import {get, param} from '@loopback/rest';

export class PokemonController {
    @get('/pokemon')
    listPokemon(): object[] {
        // TODO - retrieve from database
        // TODO - allow pagination
        // TODO - allow filter on type, favorites only, or if possible, any field
        const pokemonList = [{"id": 1}];
        return pokemonList;
    }

    @get('/pokemon/{id}')
    getPokemon(@param.path.string('id') id: string): object {
        // TODO - retrieve from database
        const pokemon = {"id": id};
        return pokemon;
    }

    // TODO - Query a pokemon by name (Is this different than searching on name?)
    // TODO - Query list of pokemon types
    // TODO - Mutation to mark/unmark pokemon as favorite
}
