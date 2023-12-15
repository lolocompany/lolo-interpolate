/***************************************************************
 * node/context/interpolate.js
 *
 * Copyright (C) Lolocodo AB - All rights reserved
 ***************************************************************/


import { get, reduce } from 'lodash';

export const interpolate = (ctx: unknown, params: unknown): unknown => {
  return deepMap(params, val => interpolateOne(ctx, val));
};

const allRE = /{[^{}]*}/g;
const oneRE = /{([^{}]*)}/;

const interpolateOne = (ctx: unknown, str: unknown) => {
  if (typeof str !== 'string') {
    return str;
  }

  // debugging
  if (str === '{}') {
    return ctx;
  }

  const vars = str.match(allRE);

  const processOne = (str: string) => {
    const match = str.match(oneRE);
    if (match === null) {
      throw new Error('Unable to determine path when processing property');
    }
    const [, path] = match;
    return get(ctx, path, `{${path}}`);
  };

  // no variable expressions found
  if (!vars) {
    return str;
  }
  // return literal
  if (vars[0] === str) {
    return processOne(str);
  }

  // build string
  return vars.reduce((memo, v) => {
    memo = memo.replace(v, processOne(v));
    return memo;
  }, str);
};

const deepMap = (target: unknown, fn: (val: unknown) => unknown): unknown => {
  if (Array.isArray(target)) {
    return target.map(i => deepMap(i, fn));
  }
  if (typeof target !== 'object') {
    return fn(target)
  };

  return reduce(target, (memo, v, k) => {
    memo[k] = typeof v === 'object' ?
      deepMap(v, fn) :
      fn(v);
    return memo;
  }, {} as Record<string, unknown>);
};

export default interpolate;

// For compatibility with the original JS implementation
module.exports = interpolate;
module.exports.interpolate = interpolate;
module.exports.default = interpolate;
