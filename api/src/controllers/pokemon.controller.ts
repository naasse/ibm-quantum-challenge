/******************************************************************************\
 * Name: pokemon.controller.ts
 *
 * Purpose: Handle endpoints for dealing with Pokemon.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import {del, get, param, put, Request, Response, ResponseObject, RestBindings} from "@loopback/rest";
import {inject} from "@loopback/core";
import {Count, Filter, repository} from "@loopback/repository";
import {PokemonRepository} from "../repositories";
import {Pokemon} from "../models";
import * as http2 from "http2";
import {HttpError} from "../representations";
import {PokemonDeletionResponseSpec, PokemonListResponseSpec, PokemonResponseSpec} from "../specs";
import {Routes} from "../constants";
import {isEmpty, isEqual, isNil} from "lodash";

export class PokemonController {
    /**
     * Construct the controller and inject the fields.
     *
     * @param {PokemonRepository} repository the repository for accessing the pokemon database.
     * @param {Request} req the HTTP request.
     * @param {Response} res the HTTP response.
     * @return {PokemonController} the newly constructed controller.
     */
    constructor(
        @repository(PokemonRepository) public repository: PokemonRepository,
        @inject(RestBindings.Http.REQUEST) private req: Request,
        @inject(RestBindings.Http.RESPONSE) private res: Response
    ) {
        // Nothing to do
    }

    /**
     * Get the list of all Pokemon, subject to pagination and filtering.
     * GET /pokemon
     *
     * @param {Filter<Pokemon>} filter [optional] the filter to apply.
     * @return {Promise<Pokemon[] | HttpError>} response containing the list of Pokemon, or error.
     */
    @get(Routes.POKEMON_LIST, PokemonListResponseSpec)
    async find(@param.filter(Pokemon) filter?: Filter<Pokemon>): Promise<Pokemon[] | HttpError> {
        filter = this.updateFilter(filter);
        return this.repository.find(filter).catch((err) => {
            return this.handleError(err);
        });
    }


    /**
     * Get the count of all Pokemon, subject to filtering.
     * GET /pokemon/count
     *
     * @param {Filter<Pokemon>} filter [optional] the filter to apply.
     * @return {Promise<Count>} response containing the count of Pokemon.
     */
    @get(Routes.POKEMON_COUNT, PokemonListResponseSpec)
    async count(@param.filter(Pokemon) filter?: Filter<Pokemon>): Promise<Count> {
        filter = this.updateFilter(filter);
        return this.repository.count(filter.where);
    }

    /**
     * Get the the Pokemon with the specified ID.
     * GET /pokemon/{id}
     *
     * @param {number} id the Pokemon ID.
     * @param {Filter<Pokemon>} filter [optional] the filter to apply.
     * @return {Promise<Pokemon | HttpError>} response containing the pokemon with the specified ID, or error.
     */
    @get(Routes.POKEMON, PokemonResponseSpec)
    async findById(
        @param.path.number("id") id: number,
        @param.filter(Pokemon, {"exclude": "where"}) filter?: Filter<Pokemon>
    ): Promise<Pokemon | HttpError> {
        filter = this.updateFilter(filter);
        return this.getOne(id, filter).then((response) => {
            // If none were found, throw a 404 for the requested entity
            if (isNil(response)) {
                // Not Found, throw a 404
                return this.handleError({
                    "code": "ENTITY_NOT_FOUND",
                    "entityName": "Pokemon",
                    "entityId": id
                });
            }
            return response;
        }).catch((err) => {
            return this.handleError(err);
        });
    }

    /**
     * Update the Pokemon with the specified ID to toggle the favorite status.
     * PUT /pokemon/{id}/favorite
     *
     * @param {number} id the Pokemon ID.
     * @return {Promise<void | HttpError>} response containing the updated Pokemon,
     */
    @put(Routes.POKEMON_FAVORITE, PokemonResponseSpec)
    async toggleFavoriteById(@param.path.number("id") id: number): Promise<Pokemon | HttpError> {
        var updated: Pokemon;
        return this.getOne(id).then((response) => {
            if (isNil(response.favorite)) {
                response.favorite = true;
            } else {
                response.favorite = !response.favorite;
            }
            updated = response;
            return this.repository.update(updated);
        }).then(() => {
            // Return the Pokemon we just updated
            return Promise.resolve(updated);
        }).catch((err) => {
            return this.handleError(err);
        });
    }

    /**
     * Delete the Pokemon with the specified ID.
     * DELETE /pokemon/{id}
     *
     * @param {number} id the Pokemon ID.
     * @return {ResponseObject} an empty response.
     */
    @del(Routes.POKEMON, PokemonDeletionResponseSpec)
    async deleteById(@param.path.number("id") id: number): Promise<void | HttpError> {
        // Since we're deleting by the internal ID,
        // we can't use the CRUD repository delete interface methods immediately.
        // Retrieve the specified entity then delete it.
        return this.getOne(id).then((response) => {
            // If one was found, delete it
            if (!isNil(response)) {
                return this.repository.delete(response);
            }
        }).catch((err) => {
            return this.handleError(err);
        });
    }

    /**
     * Utility method for getting a Pokemon by the external number ID.
     * @param {number} id the Pokemon ID to look for.
     * @param {Filter<Pokemon>} filter [optional] the filter to apply.
     * @return {Promise<Pokemon>} the found pokemon.
     */
    async getOne(id: number, filter?: Filter<Pokemon>): Promise<(Pokemon)> {
        // We're going to always apply a where clause ourselves to retrieve a specific Pokemon.
        // That allows us to find Pokemon by the external numeric ID/Pokemon number,
        // instead of the internal MongoDB ID.
        filter = this.updateFilter(filter);
        filter.where = {
            "id": id
        };
        return this.repository.find(filter).then((response) => {
            // Return the first one.
            return response[0];
        });
    }

    /**
     * Update a given, optional filter.
     * Ensures it is defined, and array filters passed in as string are properly updated.
     *
     * @param {Filter<Pokemon>} filter [optional] the filter to update. If undefined, return a new filter.
     * @retrun {Filter<Pokemon>} the updated filter.
     */
    updateFilter(filter?: Filter<Pokemon>): Filter<Pokemon> {
        if (isNil(filter)) {
            return {};
        }
        // // TODO - this doesn't seem like this should be necessary?
        // // Per the loopback documentation, I imagine [inq] should automatically be converted to array type.
        // // I'm possibly implementing the filter wrong, or making an invalid REST call.
        // // Ensure all array type fields don't have an inq clause on string.
        // if (!isNil(filter.where)) {
        //     // Pop off the where clause as a new object
        //     const where: any = filter.where;
        //     console.log("WHERE:");
        //     console.log(where);
        //
        //     console.log("ALL PROPERTIES:");
        //     const dummyPokemon = new Pokemon();
        //     for (const prop in dummyPokemon) {
        //         console.log(`${prop}`);
        //         if (Pokemon.hasOwnProperty(prop)) {
        //         }
        //     }
        //
        //     if (typeof where.types.inq === "string" || where.types.inq instanceof String) {
        //         // It was a string - set it to an array containing that string.
        //         // If there are commas, split them
        //         where.types.inq = where.types.inq.split(",");
        //     }
        //     // Reset the filter clause
        //     filter.where = where;
        //     console.log("NEW FILTER");
        //     console.log(filter.where);
        // }
        return filter;
    }

    /**
     * Catch an error and wrap in an HTTPError to be surfaced to the API user.
     * @param {any} err the original error that was thrown.
     * @return {HttpError} the wrapped HTTP error.
     */
    handleError(err: any): HttpError {
        // Log it
        console.error(err);

        switch (err.code) {
            // Not Found - 404
            case "ENTITY_NOT_FOUND":
                this.res.status(http2.constants.HTTP_STATUS_NOT_FOUND);
                return new HttpError(http2.constants.HTTP_STATUS_NOT_FOUND, "A Pokemon with the given ID was not found.", err);
            // Unhandled error - 500
            default:
                this.res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
                return new HttpError(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, "An unexpected error occurred.", err);
        }
    }

    // TODO - Query a pokemon by name (Is this different than searching on name?)
    // TODO - Query list of pokemon types
    // NOTE: PUT/POST/PATCH not implemented.
    // Requirements don't ask for it, and though I started to implement, it seems like
    // the point of this API is to seed from initial data and only view/favorite from there.
}
