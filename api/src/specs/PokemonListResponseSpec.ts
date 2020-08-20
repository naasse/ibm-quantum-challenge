/******************************************************************************\
 * Name: PokemonListResponseSpec.ts
 *
 * Purpose: Define the spec for the Pokemon list response.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import {getModelSchemaRef, OperationObject} from "@loopback/rest";
import {Pokemon} from "../models";

/**
 * Spec response for retrieving a list of Pokemon.
 * @type {OperationObject}
 */
export const PokemonListResponseSpec: OperationObject = {
    "responses": {
        "200": {
            "description": "Array of Pokemon model instances.",
            "content": {
                "application/json": {
                    "schema": {
                        "type": "array",
                        "items": getModelSchemaRef(Pokemon, {"includeRelations": true})
                    }
                }
            }
        }
    }
};
