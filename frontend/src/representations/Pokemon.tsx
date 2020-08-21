/******************************************************************************\
 * Name: Pokemon.tsx
 *
 * Purpose: Define a Pokemon representation to match the API.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/
import Attack from "./Attack";

export default class Pokemon {

    /**
     * The Pokemon's ID.
     * @type {number}
     */
    public id!: number;

    /**
     * The Pokemon's name.
     * @type {string}
     */
    public name!: string;

    /**
     * The classification.
     * @type {string}
     */
    public classification?: string;

    /**
     * The types.
     * @type {string[]}
     */
    public types?: string[];

    /**
     * The resistances.
     * @type {string[]}
     */
    public resistant?: string[];

    /**
     * The weaknesses.
     * @type {string[]}
     */
    public weaknesses?: string[];

    /**
     * The weight range.
     * @type {{minimum: string, maximum: string}}
     */
    public weight?: { "minimum": string, "maximum": string };

    /**
     * The height range.
     * @type {{minimum: string, maximum: string}}
     */
    public height?: { "minimum": string, "maximum": string };

    /**
     * The flee rate.
     * @type {number}
     */
    public fleeRate?: number;

    /**
     * The evolution requirements.
     * @type {{amount: number, name: string}}
     */
    public evolutionRequirements?: {"amount": number, "name": string};

    /**
     * The previous evolutions.
     * @type {{id: number, name: string}}
     */
    public previousEvolutions?: {"id": number, "name": string};

    /**
     * The evolutions.
     * @type {{id: number, name: string}}
     */
    public evolutions?: {"id": number, "name": string};

    /**
     * The maximum combat power.
     * @type {number}
     */
    public maxCP?: number;

    /**
     * The maximum hit point.
     * @type {number}
     */
    public maxHP?: number;

    /**
     * The Pokemon's attacks.
     * @type {{fast: Attack[], special: Attack[]}}
     */
    public attacks?: {"fast": Attack[], "special": Attack[]}

    /**
     * Constructor for this object.
     * @return {Pokemon} the constructed object.
     */
    public constructor() {
        // Nothing to do
    }
}
