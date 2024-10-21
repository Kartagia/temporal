
/**
 * Temporal types and basic methods. 
 * @module Temporal 
 */

import { asInteger, isInteger } from "./integer.mjs";

/**
 * @typedef {import("./integer.mjs").Integer} Integer
 */

/**
 * @typedef {import("./integer.mjs").Int} Int
 */

////////////////////////////////////////////////////////////////////////////////////////////
// Temporal exceptions
////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////
// Temporal fields
////////////////////////////////////////////////////////////////////////////////////////////


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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dates
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The date fields in descending order of magnitude.
 */
export const dateFields = Object.freeze([DateField.Era, DateField.Year, DateField.Season, DateField.Month, DateField.Week, DateField.Day]);

/**
 * The date fields enumeration.
 * @enum {string}
 */
export const DateField = Object.freeze({
    Day: "day",
    Month: "month",
    Year: "year",
    Era: "era",
    Week: "week",
    Season: "season"
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Era
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The era specific properties.
 * @typedef {Object} EraProperties
 * @property {Integer} era The era value of the era.
 * @property {Integer} eraLength The length of era.
 * @property {string} [name] The name of the era.
 * @property {string} suffix The era suffix for a year.
 */

/**
 * A temporal era.
 * @typedef {EraProperties & Omit<TemporalFieldProperties, "options"> & { options: TemporalFieldOptions & EraOptions } & TemporalFieldMethods} Era
 */

/**
 * The era construction options.
 * @typedef {Object} EraOptions
 * @property {string} suffix The suffix of the era.
 * @property {string} [name] The name of the era.
 * @property {Integer} [minYear] The minimal year of the era.
 * @property {Integer} [maxYear] The maximal year of the era.
 * @property {Integer} [eraLength] The number of years of the era.
 */

/**
 * Creata a new era.
 * @param {Integer} eraValue The era value.
 * @param {TemporalFieldOptions & EraOptions } [options] The era options 
 * @returns {Era}
 */
export function createEra(eraValue, options = {}) {
    const actualOptions = { ...options };

    if (actualOptions.minYear != null) {
        if (!isInteger(actualOptions.minYear)) {
            throw new TypeError("Invalid type of minimal year");
        }
        actualOptions.maxYear = actualOptions.maxYear == null ? MAX_CANONICAL_YEAR : actualOptions.maxYear;
        if (actualOptions.maxYear < actualOptions.minYear) {
            (actualOptions.minYear, actualOptions.maxYear) = (actualOptions.maxYear, actualOptions.minYear);
        }
        actualOptions.eraLength = actualOptions.eraLength == null ? actualOptions.maxYear - actualOptions.minYear +1: actualOptions.eraLength;
    }
    if (actualOptions.maxYear != null) {
        if (!isInteger(actualOptions.maxYear)) {
            throw new TypeError("Invalid type of maximal year");
        } else if (actualOptions.maxYear < (actualOptions.minYear == null ? 1 : actualOptions.minYear) ) {
            throw new RangeError("Invalid maximum year - the maximum before the minimum");
        }
    }

    return {
        fieldName: DateField.era,
        get era() {
            return eraValue;
        },
        get suffix() {
            return this.options.suffix;
        },
        get eraLength() {
            return this.options.eraLength;
        },
        get name() {
            return this.options.name;
        },
        get options() {
            return actualOptions;
        },
        range(fieldName = "era") {

            switch (fieldName) {
                case "era":
                    return {
                        min: this.options.min ?? Number.MIN_SAFE_INTEGER,
                        max: this.options.max ?? Number.MAX_SAFE_INTEGER,
                        includes(value) {
                            return isInteger(value) && (this.min <= value && value <= this.max);
                        }
                    };
                case "canonicalYear":
                    return {
                        min: this.options.minYear,
                        max: this.options.maxYear,
                        includes(value) {
                            return isInteger(value) && this.min <= value && value <= this.max;
                        }
                    }
                case "year":
                    return {
                        min: 1,
                        max: this.options.eraLength,
                        includes(value) {
                            return isInteger(value) && this.min <= value && value <= this.max;
                        }
                    };

                default:
                    throw new Error("Unsupported temporal field");
            }
        },
        valueOf() {
            return this.era;
        },
        toString() {
            return this.suffix;
        }
    }
}

/**
 * The year of era properties.
 * @typedef {Object} YearOfEraProperties
 * @property {Era} era the era of the year.
 * @property {Integer} year The year value of the era.
 * @property {Integer} [canonicalYear] The canonical year of the year of era. If undefined, the year cannot be converted to 
 * canonical year. 
 */

/**
 * The options of the year of era construction.
 * @typedef {TemporalFieldOptions & {era: Era}} YearOfEraOptions
 */


/**
 * Create year of era.
 * @param {Integer} yearValue The year of era value.
 * @param {TemporalFieldOptions & { era: Era }} options The options.
 * @returns {YearOfEra} The year of era created from teh year valeu and options.
 */
export function createYearOfEra(yearValue, options = {}) {

    if (!isInteger(yearValue)) {
        throw new TypeError("Invalid year of era");
    } else if (yearValue < 1 && yearValue >= options.era.eraLength) {
        throw new RangeError("Invalid year of era.");
    }


    /**
     * @type {YearOfEra}
     */
    const result = {
        /**
         * The era of year.
         * @type {Era}
         */
        get era() { return this.options.era },
        get year() { return yearValue },
        get canonicalYear() {
            return (this.options.minYear <= this.options.maxYear ? this.options.minYear + this.year -1 : this.options.maxYear - this.year +1);
        },
        get options() {
            return actualOptions;
        },
        valueOf() {
            return this.year;
        },
        toString() {
            return `${this.year}${this.era.suffix}`
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Year
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The year specific properties.
 * @typedef {Object} YearProps
 * @property {Integer} year The year field value.
 */

/**
 * The generic year. 
 * @typedef {YearProps & TemporalFieldProperties & TemporalFieldMethods} Year
 */

/**
 * The options of the canonical year.
 * @typedef {TemporalFieldOptions} CanonicalYearOptions
 */

/**
 * The canonical year without era.
 * @typedef {Year} CanonicalYear
 */

/**
 * The largest supported canonical field defined by the ISO standard ISO-8601.
 */
export const MAX_CANONICAL_YEAR = asInteger(999999999);

/**
 * The smallest supported canoncial field defined by the ISO standard ISO-8601.
 */
export const MIN_CANONICAL_YEAR = asInteger(-999999999);

/**
 * Create a year.
 * @param {Integer} yearValue The year value.
 * @param {YearOfEraOptions || CanonicalYearOptions} options 
 * @returns {YearOfEra|CanonicalYear} Either the year of era or a canoncial year.
 */
export function createYear(yearValue, options = {}) {
    if ("era" in options) {
        return createYearOfEra(yearValue, options);
    } else {
        return createCanonicalYear(yearValue, options);
    }
}

/**
 * Create a canonical year.
 * @param {Integer} yearValue The year value.
 * @param {TemporalFieldOptions} options 
 */
export function createCanonicalYear(yearValue, options = {}) {
    const actualOptions = { min: MIN_CANONICAL_YEAR, max: MAX_CANONICAL_YEAR, ...options };
    const year = asInteger(yearValue, { message: "Invalid canoncial year" });

    /**
     * The resulting year.
     * @type {Year}
     */
    const result = {
        fieldName: DateField.year,

        get year() {
            return this.year;
        },

        get options() {
            return actualOptions;
        },

        valueOf() {
            return this.year;
        },

        range(fieldName = "year") {
            switch (fieldName) {
                case "day":
                    /**
                     * @todo Move this to createRange
                     */
                    return {
                        min: this.options.min, max: this.options.max, includes(value) {
                            return this.min <= value && value <= this.max;
                        }
                    };
                default:
                    throw new Error("Unsupported temporal field");
            }
        },

        toString(mode = "brief") {
            switch (mode = "brief") {
                case "brief":
                case "standard":
                default:
                    return `${this.valueOf()}`;
            }
        }
    };
    return result;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Season
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Month
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Week
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Day
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The properties specific to the days. 
 * @typedef {Object} DayProps
 * @property {Integer} day The day of the temporal field.
 */

/**
 * The temporal field representing a day.
 * @typedef {DayProps & TemporalFieldProperties & TemporalFieldMethods} Day
 */

/**
 * Create a day.
 * @param {Integer} dayValue The day value.
 * @param {TemporalFieldOptions} [options] The temporal field options. 
 * @returns {Day} The temporal field of a day.
 */
export function createDay(dayValue, options = {}) {

    if (!isInteger(dayValue)) {
        throw new TypeError("Cannot create a day from non-integer value");
    }

    const actualOptions = {
        min: options.min ?? 1, max: options.max ?? Number.MAX_SAFE_INTEGER
    };

    /**
     * @type {Day}
     */
    const result = {
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
        range(fieldName = "day") {
            switch (fieldName) {
                case "day":
                    /**
                     * @todo Move this to createRange
                     */
                    return {
                        min: this.options.min, max: this.options.max, includes(value) {
                            return this.min <= value && value <= this.max;
                        }
                    };
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Time
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hour
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Minute
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Second
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Millisecond
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Microsecond
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Nanosecond
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Default export
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The default export of the module exports all creation methods.
 */
export default {
    createDay
}