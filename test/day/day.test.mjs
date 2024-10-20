
/**
 * The test module of day.
 * @module test/module/day
 */

import { expect } from "chai";
import { it } from "mocha";
import { testTestCase } from "../testFramework/index.mjs";
import { createDay } from "../../src/temporal.mjs";

const MODULE_NAME = "TemporalDay - Testing Temporal Day";

/**
 * The sub modules. 
 */
const subModules = [

    ...[1,15, 31, 365, 366].map( (dayValue) => (
        
        /**
         * @type {import("../testFramework/index.mjs").TestCase<function, number, Day, undefined>}
         */
        {
        title: `Create simple day ${dayValue}`,
        param: dayValue,
        tested: createDay,
        test(tested, param) {
            return tested(param);
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
export default function TestDay() {
    describe(`Module ${MODULE_NAME}`, function () {
        subModules.forEach( (subModule, index) => {
            it(`Test #${index}: ${subModule.title}`, function () {
                testTestCase(subModule);
            });
        });    
    })
};