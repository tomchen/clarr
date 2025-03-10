import clarrEsmDefault, { clarr as clarrEsm } from "../src/index.mjs";

// const clarrCjsDefault = require("../src/index.cjs");
// const { clarr: clarrCjs } = require("../src/index.cjs");

// import clarrUmdImportDefault, { clarr as clarrUmdImport } from "../src/index.umd.js"; // only works in bun

// const clarrUmdCjsDefault = require("../src/index.umd.js");
// const { clarr: clarrUmdCjs } = require("../src/index.umd.js");

const list = [
  [clarrEsmDefault, "clarrEsmDefault"],
  [clarrEsm, "clarrEsm"],
  // [clarrCjsDefault, "clarrCjsDefault"],
  // [clarrCjs, "clarrCjs"],
  // [clarrUmdImportDefault, "clarrUmdImportDefault"],
  // [clarrUmdImport, "clarrUmdImport"],
  // [clarrUmdCjsDefault, "clarrUmdCjsDefault"],
  // [clarrUmdCjs, "clarrUmdCjs"],
];

const three = 3;
const nonExistentElement = undefined;
const testList = [
  [["a", "", "b"], "a b", 'clarr("a", "", "b")'],
  [["hello", "world"], "hello world", 'clarr("hello", "world")'],
  [["", "", "x"], "x", 'clarr("", "", "x")'],
  [[], "", "clarr()"],
  [[""], "", 'clarr("")'],
  [[" "], " ", 'clarr(" ")'],
  [["", "  "], "  ", 'clarr("", "  ")'],
  // As argument, those that would fail TypeScript check (objects like `{a:1}`, non-`0` numbers, etc.) can still run in JavaScript, the result would be the first truthy value (which may not be string), or space-separated string of all truthy values' string forms. The Reason not to check it in runtime is that we have TypeScript to check it, no need to check it again in runtime
  [[{ hello: true, bonjour: false }], { hello: true, bonjour: false }, "clarr({ hello: true, bonjour: false })"],
  [[0, 2, -0], 2, "clarr(0, 2, -0)"],
  [[Infinity], Infinity, "clarr(Infinity)"],
  [[0, 2, -0, Infinity], "2 Infinity", "clarr(0, 2, -0)"],
  [["Infinity"], "Infinity", 'clarr("Infinity")'],
  [[null, undefined, NaN, false], "", "clarr(null, undefined, NaN, false)"],
  [[0n], "", "clarr(0n)"],
  [["btn", three === 6 && "three-is-six", three === 3 && "three-is-three hello", "active", nonExistentElement && "nonExistentElement-exists", "", null, "large", NaN && "nan-class", 0], "btn three-is-three hello active large", 'clarr("btn", three === 6 && "three-is-six", three === 3 && "three-is-three hello", "active", nonExistentElement && "nonExistentElement-exists", "", null, "large", NaN && "nan-class", 0)'],
];

const stringifyEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

for (const [clarr, clarrName] of list) {
  const allPassed = testList
    .map(([input, expected, testName]) => {
      const result = clarr(...input);
      const assertion = stringifyEqual(result, expected);
      console.assert(assertion, `${clarrName}: Failed. ${testName}'s result is ${result}, expected "${expected}"`);
      return assertion;
    })
    .every((a) => a === true);
  if (allPassed) {
    console.log(`✅ All tests passed for ${clarrName} 🎉`);
  } else {
    throw new Error(`❌ Some tests failed for ${clarrName} 💥`);
  }
}
