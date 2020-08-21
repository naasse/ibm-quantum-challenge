import {Entity, model, property} from "@loopback/repository";

@model({
    settings: {
        mongodb: {collection: "pokemon"},
        strict: false
    }
})
export class Pokemon extends Entity {

    @property({
        type: "number",
        id: false,
        generated: false,
        required: true,
    })
    id: number;

    @property({
        type: "string",
        id: true,
        generated: true,
        required: true,
    })
    _id: string;

    @property({
        type: "string",
        required: true,
    })
    name: string;

    @property({
        type: "string",
    })
    classification?: string;

    @property({
        type: "array",
        itemType: "string",
    })
    types?: string[];

    @property({
        type: "array",
        itemType: "string",
    })
    resistant?: string[];

    @property({
        type: "array",
        itemType: "string",
    })
    weaknesses?: string[];

    @property({
        type: "object",
    })
    weight?: object;

    @property({
        type: "object",
    })
    height?: object;

    @property({
        type: "number",
    })
    fleeRate?: number;

    @property({
        type: "object",
    })
    evolutionRequirements?: object;

    @property({
        type: "array",
        itemType: "object",
    })
    evolutions?: object[];

    @property({
        type: "array",
        itemType: "object",
    })
    previousEvolutions?: object[];

    @property({
        type: "number",
    })
    maxCP?: number;

    @property({
        type: "number",
    })
    maxHP?: number;

    @property({
        type: "object",
    })
    attacks?: object;

    @property({
        type: "boolean",
    })
    favorite?: boolean;

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<Pokemon>) {
        super(data);
    }
}
