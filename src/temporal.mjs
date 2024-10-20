
/**
 * Temporal types and basic methods. 
 * @module Temporal 
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
 * 
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

/**
 * The temporal field options.
 * @typedef {Object} TemporalFieldOptions
 * @property {Integer} [min=1] The smallest accepted value.
 * @property {Integer} [max=Number.MAX_SAFE_INTEGER] The largest accepted value.
 */

/**
 * The temporal field properties.
 * @typedef {Object} TemporalFieldProperties
 * @property {Readonly<string>} fieldName The name of the temporal field.
 * @property {Readonly<TemporalFieldOptions>} options The options of the temporal field.
 */

/**
 * The temporal field methods.
 * @typedef {Object} TemporalFieldMethods
 * @property {() => Integer} valueOf Converts the value into an integer.
 * @property {(mode=undefined) => String} toString Converts the field into its string representation.
 * @property {(fieldName: string) => Range<Integer>} range Get the range of valid field values for the temporal field.
 * @property {() => string} toJSON Convert the temporal field to JSON array, which can be given to the temporal field
 * creator function as parameters. 
 */

/**
 * The properties specific to the days. 
 * @typedef {Object} DayProps
 * @property {Integer} day The day of the temporal field.
 */

/**
 * @typedef {DayProps & TemporalFieldProperties & TemporalFieldMethods} Day
 */

/**
 * Create a day.
 * @param {Integer} dayValue The day value.
 * @param {TemporalFieldOptions} [options] The temporal field options. 
 * @returns {Day} The temporal field of a day.
 */
export function createDay(dayValue, options={}) {
    
    if (!isInteger(dayValue)) {
        throw new TypeError("Cannot create a day from non-integer value");
    }

    const actualOptions = {
        min: options.min ?? 1, max: options.max ?? Number.MAX_SAFE_INTEGER
    };
    
    /**
     * @type {Day}
     */
    const result =  {
        get fieldName() {
            return "day"
        },
        get day() {
            return dayValue;
        },
        valueOf() {
            return this.day;
        },
        toString() {
            return `${this.day}`;
        },
        get options() {
            return actualOptions;
        },
        range(fieldName="day") {
            switch (fieldName) {
                case "day": 
                    /**
                     * @todo Move this to createRange
                     */
                    return { min: this.options.min, max: this.options.max, includes(value) {
                        return this.min <= value && value <= this.max;
                    }};
                default:
                    throw new Error("Unsupported temporal field");
            }
        },
        toJSON() {
            return JSON.stringify([this.day, options]);
        }
    };
    return result;
}

/**
 * 
 */

export default {
    createDay
}