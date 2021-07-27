const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
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
