import {get} from '@loopback/rest';

export class PokemonController {
    @get('/pokemon')
    getPokemon(): object[] {
        // TODO - retrieve from database
        const pokemon = [{"id": 1}];
        return pokemon;
    }
}
