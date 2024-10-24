
/**
 * 
 */

import {createEra, createYearOfEra, DateField} from "../../src/temporal.mjs";

function rangeToString(range) {
    return `Range: [${range.min ?? Number.MIN_SAFE_INTEGER}, ${range.max ?? Number.MAX_SAFE_INTEGER}]`;
}

try {
    const ce = createEra(1, {name: "Common Era", suffix: "CE", minYear: 1, maxYear: 999999999});
    const bce = createEra(1, {name: "Before Common Era", suffix: "BCE", minYear: 0, maxYear: -999999999});

    const yearRnage = ce.range("canonicalYear");
    console.log(rangeToString(yearRnage));
    const years = ce.range(DateField.Year);
    console.log(rangeToString(years));

    console.table({canonical: ce.range("canonicalYear"), era: ce.range(DateField.Year), descending: ce.options.descending});
    console.table({canonical: bce.range("canonicalYear"), era: bce.range(DateField.Year), descending: bce.options.descending});
} catch(error) {
    console.log("Creation failed due error", error);
}

try {
    const ce = createEra(1, {name: "Common Era", suffix: "CE", minYear: 1, maxYear: 999999999});
    const bce = createEra(1, {name: "Before Common Era", suffix: "BCE", minYear: 0, maxYear: -999999999});
    const bc1 = createYearOfEra(1, {era: bce});
    console.table(bc1);
    const ad1 = createYearOfEra(1, {era: ce})
    console.table(ad1);
} catch(error) {
    console.log("Creation of year of era failed", error);
}