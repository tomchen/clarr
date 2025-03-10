(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD (RequireJS)
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // CommonJS (Node.js, Webpack, Browserify)
    module.exports = factory();
  } else {
    // Browser Global
    root.clarr = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  function c() {
    for (var result = "", first = true, i = 0; i < arguments.length; i++) {
      var val = arguments[i];
      if (val) {
        if (first) {
          result = val;
          first = false;
        } else {
          result += " " + val;
        }
      }
    }
    return result;
  }
  c.clarr = c;
  return c;
});
