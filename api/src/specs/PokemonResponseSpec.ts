/******************************************************************************\
 * Name: PokemonResponseSpec.ts
 *
 * Purpose: Define the spec for the Pokemon response.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import {getModelSchemaRef, OperationObject} from "@loopback/rest";
import {Pokemon} from "../models";
import {HttpError} from "../representations";

/**
 * Spec response for retrieving a Pokemon.
 * @type {OperationObject}
 */
export const PokemonResponseSpec: OperationObject = {
    "responses": {
        "200": {
            "description": "Pokemon model instance.",
            "content": {
                "application/json": {
                    "schema": getModelSchemaRef(Pokemon, {"includeRelations": false})
                }
            }
        },
        "400": {
            "description": "The user submitted a bad request. Ensure the filter is valid.",
            "content": {
                "application/json": {
                    "schema": getModelSchemaRef(HttpError)
                }
            }
        },
        "404": {
            "description": "A Pokemon with the given ID was not found.",
            "content": {
                "application/json": {
                    "schema": getModelSchemaRef(HttpError)
                }
            }
        }
    }
};
