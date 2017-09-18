exports.compose = function(...fns) {
  return pipe(...fns.reverse())
}

exports.pipe = function(...fns) {
  return function piped(result) {
    for(let i = 0; i < fns.length; i++) {
      // unary function
      result = fns[i](input);
    }
    // outside of the loop return the result
    return result;
  }
}
