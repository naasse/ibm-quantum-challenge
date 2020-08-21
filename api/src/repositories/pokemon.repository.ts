/******************************************************************************\
 * Name: pokemon.repository.ts
 *
 * Purpose: Class to bridge the communication between a datasource and controller,
 *          taking care of data retrieval and ORM.
 *          Extends DefaultCrudRepository to inherit the functionality we need.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import {DefaultCrudRepository} from "@loopback/repository";
import {Pokemon} from "../models";
import {PokemonDataSource} from "../datasources";
import {inject} from "@loopback/core";

export class PokemonRepository extends DefaultCrudRepository<Pokemon,
    typeof Pokemon.prototype.id> {
    constructor(@inject("datasources.pokemon") dataSource: PokemonDataSource) {
        super(Pokemon, dataSource);
    }
}
