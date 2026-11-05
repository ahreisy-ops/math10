/* Shared, bounded integer sampling for linear substitution tasks. */
(function () {
  'use strict';
  function integer(min, max) {
    if (!Number.isInteger(min) || !Number.isInteger(max) || min > max) throw new Error('Invalid integer range');
    return min + Math.floor(Math.random() * (max - min + 1));
  }
  function pick(min, max, nonzero) {
    if (!nonzero) return integer(min, max);
    var count = max - min + 1 - (min <= 0 && max >= 0 ? 1 : 0);
    if (count <= 0) throw new Error('No nonzero integers in range');
    var offset = integer(0, count - 1), value = min + offset;
    return min <= 0 && max >= 0 && value >= 0 ? value + 1 : value;
  }
  function sample(config) {
    var a = config.a, b = config.b, x = config.x;
    return {a:pick(a[0],a[1],!!config.nonzeroA), b:pick(b[0],b[1],!!config.nonzeroB), x:pick(x[0],x[1],!!config.nonzeroX)};
  }
  /* Construct ax+b=c with integer solution x; constrain c without rejection loops. */
  function equation(config) {
    var a = pick(config.a[0],config.a[1],true);
    var x = pick(config.x[0],config.x[1],false);
    var lo = Math.max(config.b[0],config.c[0]-a*x);
    var hi = Math.min(config.b[1],config.c[1]-a*x);
    /* If a chosen pair is infeasible, select uniformly from feasible (a,x) pairs. */
    if (lo > hi) {
      var possible = [];
      for (var aa=config.a[0]; aa<=config.a[1]; aa++) if (aa !== 0)
        for (var xx=config.x[0]; xx<=config.x[1]; xx++) {
          var low=Math.max(config.b[0],config.c[0]-aa*xx);
          var high=Math.min(config.b[1],config.c[1]-aa*xx);
          if (low<=high) possible.push({a:aa,x:xx,lo:low,hi:high});
        }
      if (!possible.length) throw new Error('No feasible linear equation');
      var valid=possible[integer(0,possible.length-1)];
      a=valid.a; x=valid.x; lo=valid.lo; hi=valid.hi;
    }
    var b=integer(lo,hi);
    return {a:a,b:b,c:a*x+b,solution:x};
  }
  window.LinearValues = Object.freeze({sample:sample,equation:equation});
})();
