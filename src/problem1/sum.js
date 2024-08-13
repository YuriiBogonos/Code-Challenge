// It's not clear how sum if n is negative, so I will assume that the sum is 0

// Implementation A: Using the Formula for the Sum of the First n Natural Numbers
var sum_to_n_a = function (n) {
  if (n <= 0) {
    return 0;
  }
  return (n * (n + 1)) / 2;
};

//Implementation B: Using Recursion
var sum_to_n_b = function (n) {
  if (n <= 0) {
    return 0;
  }
  return n + sum_to_n_b(n - 1);
};

//Implementation C: Using Array and reduce
var sum_to_n_c = function (n) {
  if (n <= 0) {
    return 0;
  }
  return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0);
};

//Implementation D: Using Proxy
var sum_to_n_d = function (n) {
  const handler = {
    get: function (target, prop) {
      if (prop === "value") {
        return target.reduce((sum, num) => sum + num, 0);
      }
      return Reflect.get(...arguments);
    },
  };

  const numbers = new Proxy(
    [...Array(n).keys()].map((i) => i + 1),
    handler
  );
  return numbers.value;
};
