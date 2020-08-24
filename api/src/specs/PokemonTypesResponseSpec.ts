/******************************************************************************\
 * Name: PokemonTypesResponseSpec.ts
 *
 * Purpose: Define the spec for the Pokemon types response.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import {getModelSchemaRef, OperationObject} from "@loopback/rest";
import {Pokemon} from "../models";

/**
 * Spec response for retrieving a list of Pokemon.
 * @type {OperationObject}
 */
export const PokemonTypesResponseSpec: OperationObject = {
    "responses": {
        "200": {
            "description": "Array of Pokemon type strings",
            "content": {
                "application/json": {
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    }
};
