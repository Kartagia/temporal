
/**
 * The test framework defining useful testing tools.
 * @module test/testFramework
 */

import { expect } from "chai";

/**
 * A predicate testing a value.
 * @template TYPE
 * @callback Predicate
 * @param {TYPE} tested The tested value.
 * @returns {boolean} True, if and only if the tested value fulfils the predicate.
 */

/**
 * The test result. 
 * @typedef {Object} TestResult
 * @property {number} passed The number of passed tests.
 * @property {number} failed The number of failed tests.
 * @property {number} skipped The number of skipped tests.
 */

/**
 * Create a new test result.
 * @param {Partial<TestResult>} options The initial values of the test result. 
 * @returns {TestResult} The test result with given values or 0 as initial values.
 */
export function createTestResult(options={}) {
    return {
        passed: options.passed == null ? 0 : options.passed,
        failed: options.failed == null ? 0 : options.failed,
        skipped: options.skipped == null ? 0 : options.skipped
    }
}

/**
 * @typedef {Object} TestModule
 * @property {() => TestResult} test The function performing the test. 
 */

/**
 * The data type of a test suite of several test cases.
 * @typedef {Object} TestSuite
 * @property {string}  title The title of the test case.
 * @property {TestCase<any, any, any, any>[]} [cases=[]] The test cases.
 * @property {import("../../src/temporal.mjs").Integer} [failureTolerance=0n] The number of errors the test case tolerate.
 */

/**
 * A test function.
 * @template TYPE The type of the tested value.
 * @template [PARAM=void] The parameter type. 
 * @template [RESULT=void] The result type of the test.
 * @template [EXCEPTION=any] The exception thrown by the test.
 * @callback Test
 * @param {TYPE} tested The tested value.
 * @param {PARAM} [param] The parameters of the test.
 * @returns {RESULT} The return value of the test.
 * @throws {EXCEPTION} The error thrown on error.
 */

/**
 * The individual test case.
 * @template TYPE The type of the tested value.
 * @template [PARAM=void] The parameter type. 
 * @template [RESULT=void] The result type of the test.
 * @template [EXCEPTION=any] The exception thrown by the test.
 * @typedef {Object} TestCase
 * @property {TYPE} tested The tested value.
 * @property {EXCEPTION} [exception] The expected exception. 
 * @property {RESULT} [expected] The expected result.
 * @property {Test<TYPE, PARAM, RESULT, EXCEPTION>} test The test function of the case.
 * @property {Predicate<TYPE>} [testedValidator] The validator of the tested after the test.
 * @property {Predicate<RESULT>} [resultValidator] The validator of the resuturn value.
*/

/**
 * Test a test case.
 * @template TYPE The type of the tested value.
 * @template [PARAM=void] The parameter type. 
 * @template [RESULT=void] The result type of the test.
 * @template [EXCEPTION=any] The exception thrown by the test.
 * @param {TestCase<TYPE, PARAM,  RESULT, EXCEPTION>} testCase The test case.
 * @returns {import("../main.test.mjs").TestResult} The test result.
 */
export function testTestCase(testCase, index=undefined) {
    const result = createTestResult();
    try {
        it(`Test Case ${index == null ? "" : `#${index}`}${testCase.title ?? ""}`, function() {
            if (testCase.exception !== undefined) {
                expect(() => {testCase.test(testCase.tested, testCase.param)}).throw(testCase.exception);
                result.passed++;
            } else {
                var testResult = undefined;
                expect( () => { testResult = testCase.test(testCase.tested, testCase.param)}).not.throw();
                if (testCase.expected !== undefined) {
                    expect(testResult).equals(testCase.expected);
                }
                if (testCase.testedValidator !== undefined) {
                    testCase.testedValidator(tested);
                }
                if (testCase.resultValidator !== undefined) {
                    testCase.resultValidator(testResult);
                }
                result.passed++;
            }
        })
    } catch(error) {
        result.failed++;        
    }
    return result;
}