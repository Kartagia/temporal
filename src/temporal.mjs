
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

/**
 * A predicate of a value.
 * @template [TYPE=any] The value type of the tested values.
 * @callback Predicate
 * @param {TYPE} value The tested value.
 * @returns {boolean} True, if and only if the value fulfils the predicate.
 */

/**
 * A range of values. 
 * @template [TYPE=any] The value type of the range.
 * @typedef {Object} Range
 * @property {TYPE} min The lower boundary of the range.
 * @property {TYPE} max The upper boundary of the range.
 * @property {Predicate<TYPE>} includes Does the range contain given value.
 */

/**
 * The properties of the range.
 * @template [TYPE=any] The value type of the range.
 * @typedef {Pick<Range<TYPE>, "min"|"max">} RangeProps
 */

/**
 * The methods of the range.
 * @template [TYPE=any] The value type of the range.
 * @typedef {Omit<Range<TYPE>, "min"|"max">} RangeMethods
 */

////////////////////////////////////////////////////////////////////////////////////////////
// Temporal exceptions
////////////////////////////////////////////////////////////////////////////////////////////

/**
 * A temporal exception represents a temporal related exceptions.
 * 
 * @template CAUSE The type of teh cause of the error.
 * @abstract
 */
export class TemporalException extends Error {

    /**
     * Create a new temporal exception.
     * @param {string} sourceName The source of the exception.
     * @param {string} [message] The message of the exception.
     * @param {CAUSE} [cause] The optinal cause of the exception.
     */
    constructor(sourceName, message = undefined, cause = undefined) {
        super(message, {cause});
        this.name = this.constructor.name;
        this.source = sourceName;
    }
}

/**
 * An error indicating a temporal field was not supported.
 * 
 * @template [CAUSE=undefined] The cause of the temporal exception.
 * @extends {TemporalException<CAUSE>} The 
 */
export class UnsupportedTemporalFieldError extends TemporalException {

    /**
     * The default message of the error.
     */
    static defaultMessage = "Unsupported temporal field";

    /**
     * Create a new unsupported temporal field error.
     * @param {string} fieldName The name of the invalid temporal field.
     * @param {string} [message] The message of the exception. Defaults to the default message.
     * @param {CAUSE} [cause] The cause of the error.
     */
    constructor(fieldName, message = UnsupportedTemporalFieldError.defaultMessage, cause = undefined) {
        super(fieldName, message, cause);
    }

    /**
     * The field name of the invalid temporal field.
     * @type {string}
     */
    get fieldName() {
        return super.sourceName;
    }
}

/**
 * An error indicating a temporal unit was not supported.
 * 
 * @template [CAUSE=undefined] The cause of the temporal exception.
 * @extends {TemporalException<CAUSE>} The 
 */
export class UnsupportedTemporalUnitError extends TemporalException {

    /**
     * The default message of the error.
     */
    static defaultMessage = "Unsupported temporal unit";

    /**
     * Create a new unsupported temporal unit error.
     * @param {string} unitName The name of the invalid temporal unit.
     * @param {string} [message] The message of the exception. Defaults to the default message.
     * @param {CAUSE} [cause] 
     */
    constructor(unitName, message = UnsupportedTemporalUnitError.defaultMessage, cause = undefined) {
        super(unitName, message, cause);
    }

    /**
     * The field name of the invalid temporal field.
     * @type {string}
     */
    get unitName() {
        return super.sourceName;
    }
}



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

/**
 * The options for the with field exception.
 * @template TYPE
 * @template [EXCEPTION=UnsupportedTemporalFieldError] The type of the thrown exception.
 * @template [CAUSE=undefined] The cause of the exception 
 * @typedef {Object} WithFieldOptions
 * @property {string} [message] The error message of the exception.
 * @property {(message: string, cause?: CAUSE|undefined)=>EXCEPTION} [exception] The creaction of the exception.
 * This method is required, if the EXCEPTION does not contain the default exception.
 */

/**
 * Create a new temporal field from the current field by applying a field with value.
 * @template [TYPE=Integer]
 * @template [EXCEPTION=UnsupportedTemporalFieldError] The type of the thrown exception.
 * @template [CAUSE=undefined] The cause of the exception 
 * @callback WithField
 * @param {string} fieldName The name of the field.
 * @param {TYPE} value The value of the field.
 * @param {WithFieldOptions<TYPE, EXCEPTION, CAUSE>} [options] The options of the with field. 
 * @returns {TemporalField} The temporal field of the 
 * @throws {EXCEPTION} The field is not supported.
 * @throws {RangeError} The field value is not supported.
 */

/**
 * The temporal field method suggestions.
 * @template [TYPE=Integer] The type of the valid value.
 * @template [EXCEPTION=UnsupportedTemporalFieldError] The type of the thrown exception.
 * @template [CAUSE=undefined] The cause of the exception 
 * @typedef {Object} TemporalFieldMethodSuggestions
 * @property {WithField<TYPE, EXCEPTION, CAUSE>} with 
 */

/**
 * A temporal field is the temporal structure.
 * @typedef {TemporalFieldProperties & TemporalFieldMethods} TemporalField
 * @abstract
 */


/**
 * Create a new temporal field.
 * @param {string} fieldName The name of the temporal fie.d
 * @param {TemporalFieldOptions} [options] 
 * @returns {TemporalField} The temporal field.
 */
export function createTemporalField(fieldName, options={}) {

    const actualOptions = {...options};

    return {
        get fieldName() {
            return fieldName;
        },
        get options() {
            return actualOptions;
        },
        range(field) {
            switch (field) {
                case fieldName: 
                    return {
                        min: this.options.min,
                        max: this.options.max,
                        includes(value)  {
                            return isInteger(value) && (this.min <= value && value <= this.max);
                        }
                    };
                default:
                    throw new UnsupportedTemporalFieldError(field);
            }
        }
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dates
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

/**
 * The date fields in descending order of magnitude.
 */
export const dateFields = Object.freeze([DateField.Era, DateField.Year, DateField.Season, DateField.Month, DateField.Week, DateField.Day]);



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
 * @extends {TemporalField}
 */

/**
 * The canonical era construction properties specific to the era defined by the range of canonical years.
 * - The era can be either descending or ascending.
 * - If the minYear is greater than the maxYear, the era will be descending with year of era increasing when canonical year decreases.
 * - If the minYear is less than or equal to the maxYear, the era is ascending. 
 * - The length of era is determined by the number of years between maxYear and minYear with boudnaries indluded.
 * @typedef {Object} CanonicalEraOptions
 * @property {Integer} minYear The minimal canonical year of the era.
 * @property {Integer} maxYear The maximal canonical year of the era.
 */

/**
 * A canonical ascending era with specific number of years.
 * - The largest canonical year is determiend by the first canonical year of the era, and 
 * the length of era.
 * @typedef {Object} CanonicalAscendingEraOptions
 * @property {Integer} minYear The minimal canonical year of the era.
 * @property {Integer} eraLength The number of years of the era.
 */

/**
 * The construction options for a non-canonical era.
 * A non-canonical era has no link between canonical years and the year of era.
 * @typedef {Object} NonCanonicalEraOptions
 * @property {Integer} eraLength The number of years of the era.
 */


/**
 * The era construction options.
 * @typedef {Object} CommonEraOptions
 * @property {string} suffix The suffix of the era.
 * @property {string} [name] The name of the era.
 * @property {Integer} [minYear] The minimal canonical year of the era.
 * @property {Integer} [maxYear] The maximal canonical year of the era.
 * @property {Integer} [eraLength] The number of years of the era.
 * @property {boolean} [descending=false] Does the year of era reduce the common era. 
 */

/**
 * The construciton options of the era.
 * @typedef {CommonEraOptions & (CanonicalAscendingEraOptions|CanonicalEraOptions|NonCanonicalEraOptions)} EraOptions
 */

/**
 * Creata a new era.
 * @param {Integer} eraValue The era value.
 * @param {TemporalFieldOptions & EraOptions } [options] The era options 
 * @returns {Era}
 * @throws {TypeError} Some of the options had invalid value type.
 * @throws {RangeError} Some of the options had invalid value.
 */
export function createEra(eraValue, options = {}) {
    const actualOptions = { ...options };

    if (actualOptions.minYear != null) {
        const propertyName = "minYear";
        const propertyDesc = "minimal year";
        if (!isInteger(actualOptions[propertyName])) {
            throw new TypeError(`Invalid type of ${propertyDesc}`);
        }
        actualOptions.maxYear = actualOptions.maxYear == null ? MAX_CANONICAL_YEAR : actualOptions.maxYear;
        if (actualOptions.maxYear < actualOptions.minYear) {
            [actualOptions.minYear, actualOptions.maxYear] = [actualOptions.maxYear, actualOptions.minYear];
            actualOptions.descending = true;
        }
        actualOptions.eraLength = asInteger(actualOptions.eraLength == null ? actualOptions.maxYear - actualOptions.minYear + 1 : actualOptions.eraLength);
    } else if (actualOptions.maxYear != null) {
        const propertyName = "maxYear";
        const propertyDesc = "maximal year";
        if (!isInteger(actualOptions.maxYear)) {
            throw new TypeError(`Invalid type of ${propertyDesc}`);
        } else if (actualOptions.eraLength != null && actualOptions.eraLength !== Math.abs(actualOptions.maxYear - actualOptions.minYear)+1) {
            throw new RangeError(`Invalid value of ${propertyDesc}`);
        }
        actualOptions.eraLength = asInteger(actualOptions.eraLength)
    } else {
        // Calculating the max year from the first year and the era length.
        actualOptions.maxYear = actualOptions.minYear + (actualOptions.eraLength || 0);
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
                    if (this.options.minYear != null && this.options.maxYear != null) {
                        return {
                            min: this.options.minYear,
                            max: this.options.maxYear,
                            includes(value) {
                                return isInteger(value) && this.min <= value && value <= this.max;
                            }
                        }
                    } else {
                        throw new UnsupportedTemporalFieldError(fieldName);
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
                    throw new UnsupportedTemporalFieldError("Unsupported temporal field");
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
 * A year of era reprenting a year belonging ot the era.
 * @typedef {TemporalField & YearOfEraProperties} YearOfEra
 * @extends {TemporalField}
 */


/**
 * Create year of era.
 * @param {Integer} yearValue The year of era value.
 * @param {TemporalFieldOptions & { era: Era }} options The options.
 * @returns {YearOfEra} The year of era created from teh year valeu and options.
 */
export function createYearOfEra(yearValue, options = {}) {
    const fieldName = "yearOfEra";
    const fieldDesc = "a year of era";
    const canonicalFieldDesc = "a canonical year";

    if (!isInteger(yearValue)) {
        throw new TypeError(`Invalid type of ${ options.canonicalYear ? canonicalFieldDesc :  fieldDesc}`);
    } else if ( options.canonicalYear == false && (yearValue < 1 && yearValue >= options.era.eraLength) ) {
        throw new RangeError(`Invalid value of ${fieldDesc}`);
    } else if ( options.canonicalYear == true && (options.era.range("canonicalYear").includes(yearValue)) ) {
        throw new RangeError(`Invalid value of a ${canonicalFieldDesc}`);
    }

    const actualYearValue = (options.canonicalYear ? options.era.with("canonicalYear", yearValue, {message: `Invalid value of ${canonicalFieldDesc}`, exception: (message, cause) => {
        return new RangeError(message, {cause: cause});
    }}): yearValue);

    /**
     * @type {YearOfEra}
     */
    const result = {
        get fieldName() {
            return fieldName;
        },
        /**
         * The era of year.
         * @type {Era}
         */
        get era() { return this.options.era },
        get year() { return yearValue },
        get canonicalYear() {
            return (this.options.minYear <= this.options.maxYear ? this.options.minYear + this.year - 1 : this.options.maxYear - this.year + 1);
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
 * @extends {TemporalField}
 */

/**
 * The options of the canonical year.
 * @typedef {TemporalFieldOptions} CanonicalYearOptions
 */

/**
 * The canonical year without era.
 * @typedef {Year} CanonicalYear
 * @extends {TemporalField}
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
 * @returns {CanonicalYear & TemporalFieldMethodSuggestions<Integer|Era>} The created canonical year.
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
                    throw new UnsupportedTemporalFieldError("Unsupported temporal field");
            }
        },

        /**
         * reate a field with 
         * @template [CAUSE=undefined] The cause of the exception.
         * @param {string} fieldName 
         * @param {Integer|Era} value
         * @param {WithFieldOptions<Integer|Era, UndefinedTemporalFieldError, CAUSE>} [options] The with options.
         * @returns {TemporalField} The temporal field created by applying given field with value to the current
         * temporal.
         * @throws {UnsupportedTemporalFieldError} The temporal field is not compatible with the field name.  
         */
        with(fieldName, value, options={}) {
            const actualOptions = {...defaultWithOptions, message: "Invalid temporal field", exception: (( /** @type {string} */ message, /** @type {CAUSE|undefined} */ cause = undefined) => (
                new UnsupportedTemporalFieldError(fieldName, message, cause)
            )), ...options}
            switch (fieldName) {
                case "era":
                    try {
                        if (value.range("canonicalYear").includes(this.year)) {
                            if (era.descending) {
                                return createYearOfEra(value.maxYear - this.year +1, {era: value});
                            } else {
                                return createYearOfEra(this.year - value.minYear +1, {era: value});
                            }
                        }
                    } catch (error) {
                        throw new UnsupportedTemporalFieldError(fieldName);
                    }
                case "year":
                    return createCanonicalYear(value, this.options);
                default:
                    throw new UnsupportedTemporalFieldError(fieldName);
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
 * @extends {TemporalField}
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