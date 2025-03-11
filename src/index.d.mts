/**
 * Combines multiple class names into a single space-separated string,
 * filtering out falsy values (false, 0, "", null, undefined, NaN).
 * @function clarr
 * @param {...(string | false | 0 | -0 | 0n | "" | null | undefined | NaN)} args - Class names or falsy values.
 * @returns {string} A space-separated string of valid class names.
 * @example
 * const three: number = 3;
 * const nonExistentElement = undefined;
 * clarr(
 *   "btn",
 *   three === 6 && "three-is-six",
 *   three === 3 && "three-is-three hello",
 *   "active",
 *   nonExistentElement && "nonExistentElement-exists",
 *   "",
 *   null,
 *   "large",
 *   NaN && 'nan-class',
 *   0
 * ); // Returns: "btn three-is-three hello active large"
 * @note Each argument is of type `string` or any falsy value. Among all falsy values, `NaN` is excluded because it is not a valid type, unlike other falsy values such as `0` or `0n`. However, this is not an issue, as the function is intended to be used in expressions like `clarr(NaN && 'nan-class')`, in such cases, TypeScript infers the type of `NaN && 'nan-class'` as `0 | "nan-class"`, ensuring compatibility
 * @note class is "as is" and will not be trimmed (e.g. `" my-class  "`), one or several space/whitespace `"  "` will also be kept, duplicates will not be removed
 * @note as argument, those that would fail TypeScript check (objects like `{a:1}`, non-`0` numbers, etc.) can still run in JavaScript, the result would be the first truthy value (which may not be string), or space-separated string of all truthy values' string forms. The Reason not to check it in runtime is that we have TypeScript to check it, no need to check it again in runtime
 */
declare function clarr(...args: (string | false | 0n | null | undefined | 0 | -0)[]): string;

export { clarr, clarr as default };
