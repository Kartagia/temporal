
/**
 * The test module of day.
 * @module test/module/day
 */

import { expect } from "chai";
import { createTestResult, testTestCase } from "../testFramework/index.mjs";
import { createDay } from "../../src/temporal.mjs";

const MODULE_NAME = "TemporalDay - Testing Temporal Day";

/**
 * The sub modules. 
 */
const testCases = [

    ...[1,15, 31, 365, 366].map( (dayValue) => (
        
        /**
         * @type {import("../testFramework/index.mjs").TestCase<function, number, Day, undefined>}
         */
        {
        title: `Create simple day ${dayValue}`,
        param: [dayValue],
        tested: createDay,
        test(tested, param) {
            return tested(...(param ? param : []));
        },
        resultValidator: ( /** @type {Day} */ tested) => {
            expect(tested).a("object");
            expect(tested).not.null;
            expect(tested.day).equal(dayValue);
            expect(tested.valueOf(), `Invalid value`).equal(dayValue);
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