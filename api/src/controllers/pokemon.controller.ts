/******************************************************************************\
 * Name: pokemon.controller.ts
 *
 * Purpose: Handle endpoints for dealing with Pokemon.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import {get, put, param, Request, Response, ResponseObject, RestBindings, requestBody, del} from "@loopback/rest";
import {inject} from "@loopback/core";
import {Filter, FilterExcludingWhere, repository} from "@loopback/repository";
import {PokemonRepository} from "../repositories";
import {Pokemon} from "../models";
import * as http2 from "http2";
import {HttpError} from "../representations";
import {PokemonListResponseSpec, PokemonResponseSpec} from "../specs";
import {Routes} from "../constants";

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
     * @return {ResponseObject} response object containing the list of Pokemon.
     */
    @get(Routes.POKEMON_LIST, PokemonListResponseSpec)
    async find(@param.filter(Pokemon) filter?: Filter<Pokemon>): Promise<Pokemon[] | HttpError> {
        // TODO - retrieve from database
        // TODO - allow pagination
        // TODO - allow filter on type, favorites only, or if possible, any field?
        return this.repository.find(filter).catch((err) => {
            return this.handleError(err);
        });
    }

    /**
     * Get the the Pokemon with the specified ID.
     * GET /pokemon/{id}
     *
     * @param {string} id the Pokemon ID.
     * @param {FilterExcludingWhere<Pokemon>} filter [optional] the filter to apply.
     * @return {ResponseObject} response object containing the pokemon with the specified ID.
     */
    @get(Routes.POKEMON, PokemonResponseSpec)
    async findById(
        @param.path.string("id") id: string,
        @param.filter(Pokemon, {"exclude": "where"}) filter?: FilterExcludingWhere<Pokemon>
    ): Promise<Pokemon | HttpError> {
        return this.repository.findById(id, filter).catch((err) => {
            return this.handleError(err);
        });
    }

    // @put(Routes.POKEMON, {
    //     responses: {
    //         '204': {
    //             description: 'Pokemon PUT success',
    //         },
    //     },
    // })
    // async replaceById(
    //     @param.path.string('id') id: string,
    //     @requestBody() pokemon: Pokemon,
    // ): Promise<void> {
    //     await this.repository.replaceById(id, pokemon);
    // }
    //

    /**
     * Update the Pokemon with the specified ID to toggle the favorite status.
     * PUT /pokemon/{id}/favorite
     *
     * @param {string} id the Pokemon ID.
     * @return {ResponseObject} response object containing the updated Pokemon.
     */
    @put(Routes.POKEMON_FAVORITE, PokemonResponseSpec)
    async toggleFavoriteById(@param.path.string("id") id: string): Promise<Pokemon | HttpError> {
        return this.repository.findById(id).then((response) => {
            // TODO - update it
            return response;
        }).catch((err) => {
            return this.handleError(err);
        });
    }

    // @del('/pokemon/{id}', {
    //     responses: {
    //         '204': {
    //             description: 'Pokemon DELETE success',
    //         },
    //     },
    // })
    // async deleteById(@param.path.string('id') id: string): Promise<void> {
    //     await this.repository.deleteById(id);
    // }

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
}
