/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["$"] = factory();
	else
		root["$"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _temporal_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./temporal.mjs */ \"./src/temporal.mjs\");\n/**\n * Library @Kartagia/temporal implements Temporal library set.\n */\n\n\n\n/**\n * The temporal field creation options.\n * @typedef {@import(\"./temporal.mjs\").TemporalOptions} TemporalFieldOptions\n */\n\n/**\n * The properties shared by all temporal fields. \n * @typedef {@import(\"./temporal.mjs\").TemporalFieldProperties} TemporalFieldProperties\n */\n\n/**\n * The methods shared by all temporal fields. \n * @typedef {@import(\"./temporal.mjs\").TemporalFieldMethods} TemporalFieldMethods\n */\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  createDay: _temporal_mjs__WEBPACK_IMPORTED_MODULE_0__.createDay\n});\n\n//# sourceURL=webpack://$/./src/index.js?");

/***/ }),

/***/ "./src/temporal.mjs":
/*!**************************!*\
  !*** ./src/temporal.mjs ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createDay: () => (/* binding */ createDay),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\n * Temporal types and basic methods. \n * @module Temporal \n */\n\n/**\n * @typedef {number & {__type__: \"integer\"}} Int\n */\n\n/**\n * The integer type.\n * @typedef {Int|bigint} Integer\n */\n\n/**\n * The temporal field options.\n * @typedef {Object} TemporalFieldOptions\n * @property {Integer} [min=1] The smallest accepted value.\n * @property {Integer} [max=Number.MAX_SAFE_INTEGER] The largest accepted value.\n */\n\n/**\n * The temporal field properties.\n * @typedef {Object} TemporalFieldProperties\n * @property {Readonly<string>} fieldName The name of the temporal field.\n * @property {Readonly<TemporalFieldOptions>} options The options of the temporal field.\n */\n\n/**\n * The temporal field methods.\n * @typedef {Object} TemporalFieldMethods\n * @property {() => Integer} valueOf Converts the value into an integer.\n * @property {(mode=undefined) => String} toString Converts the field into its string representation.\n * @property {(fieldName: string) => Range<Integer>} range Get the range of valid field values for the temporal field.\n * @property {() => string} toJSON Convert the temporal field to JSON array, which can be given to the temporal field\n * creator function as parameters. \n */\n\n/**\n * The properties specific to the days. \n * @typedef {Object} DayProps\n * @property {Integer} day The day of the temporal field.\n */\n\n/**\n * @typedef {DayProps & TemporalFieldProperties & TemporalFieldMethods} Day\n */\n\n/**\n * Create a day.\n * @param {Integer} dayValue The day value.\n * @param {TemporalFieldOptions} [options] The temporal field options. \n * @returns {Day} The temporal field of a day.\n */\nfunction createDay(dayValue) {\n  var _this$options$min, _this$options$max;\n  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var actualOptions = {\n    min: (_this$options$min = this.options.min) !== null && _this$options$min !== void 0 ? _this$options$min : 1,\n    max: (_this$options$max = this.options.max) !== null && _this$options$max !== void 0 ? _this$options$max : Number.MAX_SAFE_INTEGER\n  };\n  return {\n    get name() {\n      return \"day\";\n    },\n    get day() {\n      return dayValue;\n    },\n    valueOf: function valueOf() {\n      return this.day;\n    },\n    toString: function toString() {\n      return \"\".concat(this.day);\n    },\n    get options() {\n      return actualOptions;\n    },\n    range: function range() {\n      var fieldName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : \"day\";\n      switch (fieldName) {\n        case \"day\":\n          /**\n           * @todo Move this to createRange\n           */\n          return {\n            min: this.options.min,\n            max: this.options.max,\n            includes: function includes(value) {\n              return this.min <= value && value <= this.max;\n            }\n          };\n        default:\n          throw new Error(\"Unsupported temporal field\");\n      }\n    },\n    toJSON: function toJSON() {\n      return JSON.stringify({\n        day: this.day,\n        options: options\n      });\n    }\n  };\n}\n\n/**\n * \n */\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  createDay: createDay\n});\n\n//# sourceURL=webpack://$/./src/temporal.mjs?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});