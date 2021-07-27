const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../src/math");

test("should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);

  expect(total).toBe(13);

  // if (total !== 13) {
  //   throw new Error("total tip should be 13. Got " + total);
  // }
});

test("should calculate total with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12);
});

test("should convert temperature from fahrenheit to celcius", () => {
  const total = fahrenheitToCelsius(32);
  expect(total).toBe(0);
});

test("should convert temperature from celcius to fahrenheit", () => {
  const total = celsiusToFahrenheit(0);
  expect(total).toBe(32);
});

test("Async test demo", (done) => {
  setTimeout(() => {
    expect(2).toBe(2);
    done();
  }, 2000);
});

test("Async promise demo to add 2 numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test("Async promise demo to add 2 numbers using async await", async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});
