/******************************************************************************\
 * Name: pokemon.controller.ts
 *
 * Purpose: Handle endpoints for dealing with Pokemon.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import {del, get, param, put, Request, Response, ResponseObject, RestBindings} from "@loopback/rest";
import {inject} from "@loopback/core";
import {Filter, repository} from "@loopback/repository";
import {PokemonRepository} from "../repositories";
import {Pokemon} from "../models";
import * as http2 from "http2";
import {HttpError} from "../representations";
import {PokemonDeletionResponseSpec, PokemonListResponseSpec, PokemonResponseSpec} from "../specs";
import {Routes} from "../constants";
import {isEmpty, isNil} from "lodash";

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
        return this.repository.find(filter).catch((err) => {
            return this.handleError(err);
        });
    }

    /**
     * Get the the Pokemon with the specified ID.
     * GET /pokemon/{id}
     *
     * @param {string} id the Pokemon ID.
     * @param {Filter<Pokemon>} filter [optional] the filter to apply.
     * @return {ResponseObject} response object containing the pokemon with the specified ID.
     */
    @get(Routes.POKEMON, PokemonResponseSpec)
    async findById(
        @param.path.string("id") id: string,
        @param.filter(Pokemon, {"exclude": "where"}) filter?: Filter<Pokemon>
    ): Promise<Pokemon | HttpError> {
        if (isNil(filter)) {
            filter = {};
        }
        // We're going to always apply a where clause ourselves.
        // That allows us to find Pokemon by the external numeric ID, instead of the internal MongoDB ID
        filter.where = {
            "id": id
        };
        return this.repository.find(filter).then((response) => {
            // If none were found, throw a 404 for the requested entity
            if (isEmpty(response)) {
                // Not Found, throw a 404
                return this.handleError({
                    "code": "ENTITY_NOT_FOUND",
                    "entityName": "Pokemon",
                    "entityId": id
                });
            }
            // Otherwise, return the first one. There should only be one.
            return response[0];
        }).catch((err) => {
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

    /**
     * Delete the Pokemon with the specified ID.
     * DELETE /pokemon/{id}
     *
     * @param {string} id the Pokemon ID.
     * @return {ResponseObject} an empty response.
     */
    @del('/pokemon/{id}', PokemonDeletionResponseSpec)
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        // Since we're deleting by the internal ID, we can't use the CRUD repository delete interface methods immediately.

        // We're going to always apply a where clause ourselves.
        // That allows us to find Pokemon by the external numeric ID, instead of the internal MongoDB ID
        const filter = {
            "where": {
                "id": id
            }
        };

        await this.repository.find(filter).then((response) => {
            // If none were found, throw a 404 for the requested entity
            if (!isEmpty(response)) {
                return this.repository.deleteById(response[0]._id);
            }
        }).catch((err) => {
            return this.handleError(err);
        });
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
}
