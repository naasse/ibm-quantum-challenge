/******************************************************************************\
 * Name: HttpError.ts
 *
 * Purpose: Custom error object to be returned to the caller.
 *          Wraps the inner error.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

export class HttpError {
    /**
     * HTTP Status code.
     * @type {number}
     */
    private statusCode: number;

    /**
     * The error message text to return.
     * @type {string}
     */
    private message: string;

    /**
     * The inner error to bubble up.
     * @type {Error?}
     */
    private error?: Error;

    /**
     *
     * @param {number} statusCode the HTTP status code.
     * @param {string} message the error message text to return.
     * @param {Error?} error [optional] the inner error to bubble up.
     */
    constructor(statusCode: number, message: string, error?: Error) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}
