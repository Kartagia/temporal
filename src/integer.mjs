
/**
 * 
 * The module of an integer type.
 * 
 * @module utils/integer
 */

/**
 * @typedef {number & {__type__: "integer"}} Int
 */

/**
 * The integer type.
 * @typedef {Int|bigint} Integer
 */

/**
 * Is a value an Integer.
 * @param {*} value The tested value.
 * @returns {boolean} True, if and only if the value is an integer.
 */
export function isInteger(value) {
    switch (typeof value) {
        case "bigint":
            return true;
        case "number":
            return Number.isSafeInteger(value);
        default:
            return false;
    }
}

/**
 * Check, if a value is an integer.
 * @template [EXCEPTION=SyntaxError] The exception type of the test.
 * @template [CAUSE=any] The cause of the failure.
 * @param {*} value Tested value.
 * @param {Object} [options] The options of the testing.
 * @param {string} [options.message] The error message of the exception. Defaults to "Not an integer value".
 * @param {(msg: string, cause?: CAUSE = undefined) => EXCEPTION} [options.exception] The method creating the exception.
 * @returns {Integer} The given value as an Integer.
 * @throws {EXCEPTION} the exception 
 */
export function asInteger(value, options={}) {
    if (isInteger(value)) {
        switch (typeof value) {
            case "number":
                return /**@type {Int} */ value;
            case "bigint":
                return value;
            default:
                throw Error("Is Integer accepted an invalid value");
        }
    } 
    throw (options.exception ?? ((message, cause=undefined) => (new SyntaxError(message, cause))))(options.message ?? "Not an integer value");
}


export default {
    asInteger
}