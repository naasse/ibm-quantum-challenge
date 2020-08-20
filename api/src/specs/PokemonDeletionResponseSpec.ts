/******************************************************************************\
 * Name: PokemonDeletionResponseSpec.ts
 *
 * Purpose: Define the spec for the Pokemon deletion response.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import {OperationObject} from "@loopback/rest";

/**
 * Spec response for deleting a Pokemon.
 * @type {OperationObject}
 */
export const PokemonDeletionResponseSpec: OperationObject = {
    "responses": {
        "204": {
            "description": "Pokemon was deleted successfully or has already been deleted."
        }
        // Note I've read lots of debates over the years of the idempotent nature of subsequent deletes.
        // I've implemented APIs that return 204 on NOT FOUND, and I've done 404.
        // Returning the 404, so that it matches GET of the resource, makes sense.
        // This clashes with idempotent nature of REST endpoints, but it's worth noting you could interpret
        // the RFC spec as desiring idempotency on the SERVER, not the client.
        // I still think I cast my vote on always returning 204.
    }
};
