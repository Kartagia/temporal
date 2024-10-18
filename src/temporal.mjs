
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
    
    const actualOptions = {
        min: this.options.min ?? 1, max: this.options.max ?? Number.MAX_SAFE_INTEGER
    };
    
    return {
        get name() {
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
            return JSON.stringify({day: this.day, options});
        }
    };
}

/**
 * 
 */

export default {
    createDay
}