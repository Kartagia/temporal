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
    {
        title: `Create year 1 of Era ${AD.name ?? AD.suffix}`,
        param: [1, {era: AD}],
        tested: createYearOfEra,
        test(constructorFn, value, options={}) {
            return constructorFn(value, options);
        },
        resultValidator( /** @type {YearOfEra} */ tested) {
            expect(tested, "Not an object").a("object");
            expect(tested.era).equals(AD);
            expect(tested.year).equal(1);
        }
    },
    ...[1,15, 31, 365, 366, 9999, 999999999].map(
        (yearValue) => (yearValue < 1 ? {yearValue, era: BC} : { era: AD})
    ).map( ({yearValue, era}) => (
        
        /**
         * @type {import("../testFramework/index.mjs").TestCase<function, number, Day, undefined>}
         */
        {
        title: `Create year ${yearValue} of era ${era.name ?? era.suffix}`,
        param: [yearValue, {era}],
        tested: createYearOfEra,
        test(tested, param) {
            return tested(...(param ? param : []));
        },
        resultValidator: ( /** @type {import("../../src/temporal.mjs").YearOfEra} */ tested) => {
            expect(tested).a("object");
            expect(tested).not.null;
            expect(tested.year).equal(yearValue);
            expect(tested.era).equal(era);
            expect(tested.valueOf(), `Invalid value`).equal(yearValue);
        }
    })),
    ...[-1, 1000000000, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER].reduce( (result, yearOfEra) => {
        return [
            ...result,
            ...([AD, BC].map( (era)=> {
                        return {
                            title: `Invalid create year ${yearOfEra} of era ${era.name ?? era.suffix}`,
                            tested: createYearOfEra,
                            params: [yearOfEra, {era}],
                            test(tested, param) {
                                return tested(...(param ? param : []));
                            },
                            exception: RangeError
                        }
                    }
                )
            )
        ];
    }, [])
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