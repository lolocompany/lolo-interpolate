import interpolate from '../dist/main';

const expected = 42;
const got = interpolate({ foo: 42 }, '{foo}');
console.assert(got === expected, `Expected ${JSON.stringify(expected)} but got ${JSON.stringify(got)}`);
