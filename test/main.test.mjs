
import { expect } from "chai";
import { describe, it } from "mocha";
/**
 * The main test for the library.
 */

/**
 * The test result. 
 * @typedef {Object} TestResult
 * @property {number} passed The number of passed tests.
 * @property {number} failed The number of failed tests.
 * @property {number} skipped The number of skipped tests.
 */

/**
 * @typedef {Object} TestModule
 * @property {() => TestResult} test The function performing the test. 
 */

const testModules = [];
const options = {
    failureThreshold: 0
}

describe("Testing the library", function () {
    const result = {
        passed: 0, 
        failed: 0,
        skipped: 0,
        get passed() {
            return this.failed <= options.failureThreshold;
        },
    }
    testModules.forEach( (module) => {
        it(`Test Module ${module.name}`, function () {
            const testResult = module.test();
            result.passed += testResult?.passed ?? 0;
            result.failed += testResult?.failed ?? 0;
            result.skipped += testResult?.skipped ?? 0;
        });
    });

    it("Library test", function () {
        expect(result.passed, "Library test failed.").true;
    });
});