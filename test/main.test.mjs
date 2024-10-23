
import { expect } from "chai";
import { describe, it } from "mocha";
/**
 * The main test for the library.
 */

import DayModule from "./day/day.test.mjs";
import CanonicalYearModule from "./year/year.test.mjs";

/**
 * @type {import("./testFramework/index.mjs").TestModule[]}
 */
const testModules = [
    DayModule
];
const options = {
    failureThreshold: 0
}

describe("Testing the library", function () {
    var result = {
        passed: 0, 
        failed: 0,
        skipped: 0,
        get success() {
            return this.failed <= options.failureThreshold;
        },
    }
    testModules.forEach( (module) => {
        describe(`Test Module ${module.title}`, function () {
            const testResult = module.test();
            console.table(testResult);
            result.passed += (testResult?.passed) ?? 0;
            result.failed += (testResult?.failed) ?? 0;
            result.skipped += (testResult?.skipped) ?? 0;
        });
    });

    it("Library test", function () {
        expect(result.success, "Library test failed.").true;
    });
});