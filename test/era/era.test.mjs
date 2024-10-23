/**
 * The test module of day.
 * @module test/module/era
 */

import { expect } from "chai";
import { createTestResult, testTestCase } from "../testFramework/index.mjs";
import { createEra, DateField } from "../../src/temporal.mjs";

/**
 * The sub modules. 
 */
const testCases = [

    ...[
        {
            eraName: "Before Christ",
            eraSuffix: "BC", 
            eraValue: 1,
            eraOptions: {
                minYear: -999999999,
                maxYear: 0,
                descending: true
            }
        }, 
        {
            eraName: "Anno Domini",
            eraSuffix: "AD",
            eraValue: 2,
            eraOptions: {
                minYear: 1,
                maxYear: 999999999
            }
        }
    ].map( ({eraName, eraSuffix, eraValue, eraOptions }) => (
        
        /**
         * @type {import("../testFramework/index.mjs").TestCase<function, number, Day, undefined>}
         */
        {
        title: `Create era ${eraSuffix} of ${eraValue} from ${eraOptions.minYear} to ${eraOptions.maxYear}`,
        param: [eraValue, {name: eraName, suffix: eraSuffix, ...eraOptions}],
        tested: createEra,
        test(tested, param) {
            return tested(...(param ? param : []));
        },
        resultValidator: ( /** @type {Day} */ tested) => {
            expect(tested).a("object");
            expect(tested).not.null;
            expect(tested.era).equal(eraValue);
            expect(tested.suffix).equal(eraSuffix);
            const canonicalYearRange = tested.range(DateField.CanonicalYear);
            expect(canonicalYearRange.min).equals(tested.options.minYear);
            expect(canonicalYearRange.max).equals(tested.options.maxYear);
            const yearRange = tested.range(DateField.Year);
            expect(yearRange.min).equals(1);
            expect(yearRange.max).equals(Math.abs(eraOptions.minYear - eraOptions.maxYear)+1);
            expect(tested.valueOf(), `Invalid value`).equal(eraValue);
        }
    }))
];

/**
 * The test module of day.
 * @type {import("../testFramework/index.mjs").TestModule}
 */
export const TestEra = {
        title: "Temporal Era",
        test() {
            var result = createTestResult();
            describe(`Test ${TestEra.title}`, function () {
            testCases.forEach( (subModule, index) => {
                const testResult = testTestCase(subModule, index);
                result.passed += testResult.passed;
                result.failed += testResult.failed;
                result.skipped += testResult.skipped;
            });
            return result;
        })
    }
};

export default TestEra;