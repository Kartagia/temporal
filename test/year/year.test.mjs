/**
 * The test module of canonical year
 * @module test/module/canonicalYear
 */

import { expect } from "chai";
import { createTestResult, testTestCase } from "../testFramework/index.mjs";
import { createCanonicalYear, createDay } from "../../src/temporal.mjs";

/**
 * The sub modules. 
 */
const testCases = [

    ...[-999999999, 1,15, 31, 365, 366, 999999999].map( (yearValue) => (
        
        /**
         * @type {import("../testFramework/index.mjs").TestCase<function, number, Day, undefined>}
         */
        {
        title: `Create canonical year ${yearValue}`,
        param: [yearValue],
        tested: createCanonicalYear,
        test(tested, param) {
            return tested(...(param ? param : []));
        },
        resultValidator: ( /** @type {Day} */ tested) => {
            expect(tested).a("object");
            expect(tested).not.null;
            expect(tested.year).equal(yearValue);
            expect(tested.valueOf(), `Invalid value`).equal(yearValue);
        }
    }))
];

/**
 * The test module of day.
 * @type {import("../testFramework/index.mjs").TestModule}
 */
export const TestCanonicalYear = {
        title: "Temporal Year",
        test() {
            var result = createTestResult();
            describe(`Test ${TestDay.title}`, function () {
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

export default TestCanonicalYear;