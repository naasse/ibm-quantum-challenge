/******************************************************************************\
 * Name: Pokemon.tsx
 *
 * Purpose: Define a Pokemon representation to match the API.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

export default class Attack {

    /**
     * The attack name.
     * @type {string}
     */
    public name!: string;

    /**
     * The attack type.
     * @type {string}
     */
    public type!: string;

    /**
     * The attack damage.
     * @type {number}
     */
    public damage!: number;

    /**
     * Constructor for this object.
     * @return {Attack} the constructed object.
     */
    public constructor() {
        // Nothing to do
    }
}
