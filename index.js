/***************************************************************
 * node/context/interpolate.js
 *
 * Copyright (C) Lolocodo AB - All rights reserved
 ***************************************************************/


const { get, isArray, reduce } = require('lodash');

const interpolate = (ctx, params) => {
    return deepMap(params, val => interpolateOne(ctx, val));
};

const allRE = /{[^{}]*}/g;
const oneRE = /{([^{}]*)}/;

const interpolateOne = (ctx, str) => {
    if (typeof str !== 'string') return str;

    // debugging
    if (str === '{}') return ctx;

    const vars = str.match(allRE);

    const processOne = str => {
        const [, path] = str.match(oneRE);
        return get(ctx, path, `{${path}}`);
    };

    // no variable expressions found
    if (!vars) return str;

    // return literal
    if (vars[0] === str) return processOne(str);

    // build string
    return vars.reduce((memo, v) => {
        memo = memo.replace(v, processOne(v));
        return memo;
    }, str);
};

const deepMap = (obj, fn) => {
    if (isArray(obj)) return obj.map(i => deepMap(i, fn));
    if (typeof obj !== 'object') return fn(obj);

    return reduce(obj, (memo, v, k) => {
        memo[k] = typeof v === 'object' ?
            deepMap(v, fn) :
            fn(v, k, obj);
        return memo;
    }, {});
};

module.exports = interpolate;
