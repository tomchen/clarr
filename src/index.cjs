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

module.exports = c;

module.exports.clarr = c;
