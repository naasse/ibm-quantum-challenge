/******************************************************************************\
 * Name: PokemonApi.tsx
 *
 * Purpose: API service class for interacting with the backend Pokemon API.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/
import AxiosUtil from "../util/AxiosUtil";
import {HttpMethod} from "../enum/HttpMethod";

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
        return AxiosUtil.makeRequest(uri + "/count", HttpMethod.GET)
            .then((response) => {
                return response.data.count;
            });
    }
}
