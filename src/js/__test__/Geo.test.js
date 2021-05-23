import { test } from "@jest/globals";
import Geo from "../Geo";

const geo = new Geo();

test.each([
  ['51.50851, -0.12572', true],
  ['51.50851,-0.12572', true],
  ['[51.50851, -0.12572]', true],
  ['bla bla bla', false]
])(('it should be %s'), ( input, expected ) => {
  expect(geo.coordinatesValidation( input )).toBe( expected );
});
