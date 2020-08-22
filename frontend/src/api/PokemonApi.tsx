/******************************************************************************\
 * Name: PokemonApi.tsx
 *
 * Purpose: API service class for interacting with the backend Pokemon API.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/
import AxiosUtil from "../util/AxiosUtil";
import {HttpMethod} from "../enum/HttpMethod";
import Pokemon from "../representations/Pokemon";
import {isNil} from "lodash";

export default class PokemonApi {

    /**
     * Determine the host and root context of the Pokemon API requests.
     * @return {string} the host and root context of the API.
     */
    public static getContext(): string {
        return process.env.REACT_APP_API_HOST + ":" + process.env.REACT_APP_API_PORT + "/pokemon";
    }

    /**
     * Request the count of Pokemon.
     * @return {Promise<number>} the Promised count.
     */
    public static getCount(): Promise<number> {
        const uri = PokemonApi.getContext();
        return AxiosUtil.makeRequest(uri + "/count", HttpMethod.GET).then((response) => {
            return response.data.count;
        });
    }

    /**
     * Request the list of Pokemon.
     * @param {number} limit [optional] the number of Pokemon to get.
     * @param {number} offset [optional] the collection offset.
     * @return {Promise<Pokemon[]>} the Promised array of Pokemon.
     */
    public static find(limit?: number, offset?: number): Promise<Pokemon[]> {
        let uri = PokemonApi.getContext();
        if (!isNil(limit)) {
            uri += `?filter[limit]=${limit}`;
        }
        if (!isNil(offset)) {
            if (isNil(limit)) {
                uri += "?";
            } else {
                uri += "&";
            }
            uri += `filter[offset]=${offset}`;
        }
        return AxiosUtil.makeRequest(uri, HttpMethod.GET).then((response) => {
            return response.data;
        });
    }

    /**
     * Toggle favorite status for the Pokemon with the given ID.
     * @param {number} id the Pokemon ID.
     * @return {Promise<Pokemon>} the Promised updated Pokemon.
     */
    public static toggleFavorite(id: number): Promise<Pokemon> {
        const uri = PokemonApi.getContext() + "/" + id + "/favorite";
        return AxiosUtil.makeRequest(uri, HttpMethod.PUT).then((response) => {
            return response.data;
        });

    }
}
