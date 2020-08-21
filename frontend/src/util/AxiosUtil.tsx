/******************************************************************************\
 * Name: AxiosUtil.tsx
 *
 * Purpose: Utility class for using the Axios package for HTTP requests.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import axios, {AxiosRequestConfig} from "axios";
import {HttpMethod} from "../enum/HttpMethod";
import {HttpHeaders} from "../enum/HttpHeaders";
import {MediaTypeConstants} from "../constants/MediaTypeConstants";
import {isNil} from "lodash";

export default class AxiosUtil {

    /**
     * Make a request to the given URI with the given parameters.
     *
     * @param {string} uri the URI to request.
     * @param {HttpMethod} method the HTTP Method of the request.
     * @param {any} data [optional] the request body data.
     * @param {any} headers [optional] the HTTP headers to send.
     */
    public static async makeRequest(uri: string, method: HttpMethod, data?: any, headers?: any): Promise<any> {
        if (isNil(headers)) {
            headers = {};
        }
        if (isNil(headers[HttpHeaders.ACCEPT])) {
            headers[HttpHeaders.ACCEPT] = MediaTypeConstants.APPLICATION_JSON;
        }
        if (isNil(headers[HttpHeaders.CONTENT_TYPE])) {
            headers[HttpHeaders.CONTENT_TYPE] = MediaTypeConstants.APPLICATION_JSON;
        }

        const config = {
            "method": method,
            "url": uri,
            "data": data,
            "headers": headers
        } as AxiosRequestConfig;

        // Make the request
        return axios(config)
            .then((response) => {
                return response;
            });
    }
}
