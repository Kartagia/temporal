/**
 * The test module of year of era
 * @module test/module/yearOfEra
 */

import { expect } from "chai";
import { createTestResult, testTestCase } from "../testFramework/index.mjs";
import { createEra, createYearOfEra } from "../../src/temporal.mjs";

const BC = createEra(1, {minYear: -99999999, maxYear: 0, name: "Before Christ", suffix: "BC"});
const AD = createEra(2, {minYear: 1, maxYear: 99999999, name: "Anno Domini", suffix: "AD"});

/**
 * The sub modules. 
 */
const testCases = [

    ...[1,15, 31, 365, 366].map(
        (yearValue) => (yearValue < 1 ? {yearValue, era: BC} : { era: AD})
    ).map( ({yearValue, era}) => (
        
        /**
         * @type {import("../testFramework/index.mjs").TestCase<function, number, Day, undefined>}
         */
        {
        title: `Create simple day ${yearValue}`,
        param: [yearValue, {era}],
        tested: createYearOfEra,
        test(tested, param) {
            return tested(...(param ? param : []));
        },
        resultValidator: ( /** @type {Day} */ tested) => {
            expect(tested).a("object");
            expect(tested).not.null;
            expect(tested.year).equal(yearValue);
            expect(tested.era).equal(era);
            expect(tested.valueOf(), `Invalid value`).equal(yearValue);
        }
    }))
];

/**
 * The test module of day.
 * @type {import("../testFramework/index.mjs").TestModule}
 */
export const TestDay = {
        title: "Temporal Day",
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

export default TestDay;