# clarr: the fastest utility function for combining class names in JavaScript/TypeScript

Combines multiple class names into a single space-separated string, filtering out falsy values (`false`, `0`, `""`, `null`, `undefined`, `NaN`, `0n`).

Like [`classnames`](https://github.com/JedWatson/classnames) and [`clsx`](https://github.com/lukeed/clsx), but accepts only strings or falsy values as arguments, and faster.

Same function as `clsx/lite` but slightly faster.

## Usage

```
npm install clarr
```

```ts
import clarr from "clarr"; // or `import { clarr } from "clarr"`

clarr("class1", true && "class2", false && "class3", null && "class4");
// returns "class1 class2"

// in react: `<div className={clarr("class1", true && "class2")}></div>`
```

Type for each argument: class name string or falsy value (`string | false | 0 | -0 | 0n | "" | null | undefined | NaN`)

Return value: a space-separated string of valid class names

### Formats

ES Module, Common JS, simple function in global scope (minified), UMD (minified), and TypeScript definition are available.

Use it directly in HTML:

```html
<script src="https://unpkg.com/clarr/dist/clarr.global.js"></script>
<script>
clarr(<...>);
</script>
```

The minified, non-gzipped global scope version is 133 bytes (it is actually slightly larger when gzipped).

### More examples

```ts
import clarr from "clarr"; // or `import { clarr } from "clarr"`

const three: number = 3;
const nonExistentElement = undefined;
clarr("btn", three === 6 && "three-is-six", three === 3 && "three-is-three hello", "active", nonExistentElement && "nonExistentElement-exists", "", null, "large", NaN && "nan-class", 0);

// Returns: "btn three-is-three hello active large"
```

Test files contain more examples if you can read them.

## Performance

I compared several possible implementations/writings (including whether to cache `.length` as a variable, var/let/const, declare variables inside/outside the loop, for/while, the way to check whether it's the first class, the way to concatenate strings, etc.), to ensure the best performance.

## Note

Each argument is of type `string` or any falsy value. Among all falsy values, `NaN` is excluded in the type definition because it is not a valid type, unlike other falsy values such as `0` or `0n`. However, this is not an issue, as the function is intended to be used in expressions like `clarr(NaN && 'nan-class')`, in such cases, TypeScript infers the type of `NaN && 'nan-class'` as `0 | "nan-class"`, ensuring compatibility.

Class is "as is" and will not be trimmed (e.g. `" my-class  "`), one or several space/whitespace `"  "` will also be kept, duplicates will not be removed.

As argument, those that would fail TypeScript check (objects like `{a:1}`, non-`0` numbers, etc.) can still run in JavaScript, the result would be the first truthy value (which may not be string), or space-separated string of all truthy values' string forms. The reason not to check it in runtime is that we have TypeScript to check it, no need to check it again in runtime.
