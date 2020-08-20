/******************************************************************************\
 * Name: pokemon.controller.ts
 *
 * Purpose: Handle endpoints for dealing with Pokemon.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import {get, param, Request, Response, ResponseObject, RestBindings} from "@loopback/rest";
import {ReferenceObject, SchemaObject} from "openapi3-ts/src/model/OpenApi";
import {inject} from "@loopback/core";
import * as http2 from "http2";

/**
 * The properties of a Pokemon.
 * @type {{ [propertyName: string]: (SchemaObject | ReferenceObject) }}
 */
const POKEMON_PROPERTIES: { [propertyName: string]: (SchemaObject | ReferenceObject) } = {
    "id": {"type": "string", "example": 1},
    "name": {"type": "string", "example": "Bulbasaur"},
    "classification": {"type": "string", "example": "Seed Pokemon"},
    // "types": {"type": "array"}, // TODO
    // "resistant": {"type": "array"}, // TODO
    // "weaknesses": {"type": "array"}, // TODO
    "weight": {"type": "object"}, // TODO
    "height": {"type": "object"}, // TODO
    "fleeRate": {"type": "number", "example": 0.1},
    "evolutionRequirements": {"type": "object"}, // TODO
    "evolutions": {"type": "object"}, // TODO
    "maxCP": {"type": "number", "example": 951},
    "maxHP": {"type": "number", "example": 1071},
    "attacks": {"type": "object"} // TODO
}

/**
 * OpenAPI response for a Pokemon
 * @type {ResponseObject}
 */
const POKEMON_RESPONSE: ResponseObject = {
    "description": "A Pokemon",
    "content": {
        "application/json": {
            "schema": {
                "type": "object",
                "title": "PokemonResponse",
                "properties": POKEMON_PROPERTIES,
            }
        }
    }
};

/**
 * OpenAPI response for a list of Pokemon
 * @type {ResponseObject}
 */
const POKEMON_LIST_RESPONSE: ResponseObject = {
    "description": "A list of Pokemon",
    "content": {
        "application/json": {
            "schema": {
                "type": "object",
                "title": "PokemonListResponse",
                "properties": {
                    "pokemon": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": POKEMON_PROPERTIES
                        }
                    }
                }
            }
        }
    }
};

/**
 * OpenAPI response for when a resource is not found.
 * @type {ResponseObject}
 */
const NOT_FOUND_RESPONSE: ResponseObject = {
    "description": "Resource not found",
    "content": {
        "application/json": {
            "schema": {
                "type": "object",
                "title": "NotFoundErrorResponse",
                "properties": {
                    "httpStatusCode": {"type": "number", "example": 404},
                    "message": {"type": "string", "example": "A Pokemon with ID '999' was not found."},
                }
            }
        }
    }
}

// Export this controller
export class PokemonController {
    /**
     * Construct the controller and inject the HTTP request and response objects.
     *
     * @param {Request} req the HTTP request.
     * @param {Response} res the HTTP response.
     * @return {PokemonController} the newly constructed controller.
     */
    constructor(@inject(RestBindings.Http.REQUEST) private req: Request,
                @inject(RestBindings.Http.RESPONSE) private res: Response) {
        // Nothing to do
    }

    /**
     * Get the list of all Pokemon, subject to pagination and filtering.
     * GET /pokemon
     *
     * @return {ResponseObject} response object containing the list of Pokemon.
     */
    @get("/pokemon", {
        "responses": {
            "200": POKEMON_LIST_RESPONSE
        }
    })
    listPokemon(): object[] {
        // TODO - retrieve from database
        // TODO - allow pagination
        // TODO - allow filter on type, favorites only, or if possible, any field?
        const pokemonList = [{"id": "001"}];
        return pokemonList;
    }

    /**
     * Get the the Pokemon with the specified ID.
     * GET /pokemon/{id}
     *
     * @param {string} id the Pokemon ID.
     * @return {ResponseObject} response object containing the pokemon with the specified ID.
     */
    @get("/pokemon/{id}", {
        "responses": {
            "200": POKEMON_RESPONSE,
            "404": NOT_FOUND_RESPONSE
        }
    })
    getPokemon(@param.path.string("id") id: string): object {
        // TODO - retrieve from database
        const pokemon = {"id": id};
        if (Number(id) > 150) {
            this.res.status(http2.constants.HTTP_STATUS_NOT_FOUND);
            return {
                "statusCode": http2.constants.HTTP_STATUS_NOT_FOUND,
                "message": `A Pokemon with ID '${id}' was not found.`
            }
        }
        // TODO - try name instead?
        return pokemon;
    }

    /**
     * Update the Pokemon with the specified ID to toggle the favorite status.
     * PUT /pokemon/{id}/favorite
     *
     * @param {string} id the Pokemon ID.
     * @return {ResponseObject} response object containing the updated Pokemon.
     */
    @put("/pokemon/{id}/favorite", {
        "responses": {
            "200": POKEMON_RESPONSE,
            "404": NOT_FOUND_RESPONSE
        }
    })
    toggleFavorite(@param.path.string("id") id: string): object {
        // TODO - retrieve/update database
        const pokemon = {"id": id, "favorite": true};
        if (Number(id) > 150) {
            this.res.status(http2.constants.HTTP_STATUS_NOT_FOUND);
            return {
                "statusCode": http2.constants.HTTP_STATUS_NOT_FOUND,
                "message": `A Pokemon with ID '${id}' was not found.`
            }
        }
        // TODO - try name instead?
        return pokemon;
    }

    // TODO - Query a pokemon by name (Is this different than searching on name?)
    // TODO - Query list of pokemon types
}
