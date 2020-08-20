/******************************************************************************\
 * Name: PokemonResponseSpec.ts
 *
 * Purpose: Define the spec for the Pokemon response.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import {getModelSchemaRef, OperationObject} from "@loopback/rest";
import {Pokemon} from "../models";

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
                    "schema": getModelSchemaRef(Pokemon, {"includeRelations": true}),
                }
            }
        },
        // TODO - fix this for an actual error spec
        "404": {
            "description": "A Pokemon with the given ID was not found.",
            "content": {
                "application/json": {
                    "schema": {
                        "type": "array",
                        "items": getModelSchemaRef(Pokemon, {"includeRelations": true}),
                    },
                },

            }
        }
    }
};
