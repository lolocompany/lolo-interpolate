"use strict";
/***************************************************************
 * node/context/interpolate.js
 *
 * Copyright (C) Lolocodo AB - All rights reserved
 ***************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpolate = void 0;
const lodash_1 = require("lodash");
const interpolate = (ctx, params) => {
    return deepMap(params, val => interpolateOne(ctx, val));
};
exports.interpolate = interpolate;
const allRE = /{[^{}]*}/g;
const oneRE = /{([^{}]*)}/;
const interpolateOne = (ctx, str) => {
    if (typeof str !== 'string') {
        return str;
    }
    // debugging
    if (str === '{}') {
        return ctx;
    }
    const vars = str.match(allRE);
    const processOne = (str) => {
        const match = str.match(oneRE);
        if (match === null) {
            throw new Error('Unable to determine path when processing property');
        }
        const [, path] = match;
        return (0, lodash_1.get)(ctx, path, `{${path}}`);
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
const deepMap = (target, fn) => {
    if (Array.isArray(target)) {
        return target.map(i => deepMap(i, fn));
    }
    if (typeof target !== 'object') {
        return fn(target);
    }
    ;
    return (0, lodash_1.reduce)(target, (memo, v, k) => {
        memo[k] = typeof v === 'object' ?
            deepMap(v, fn) :
            fn(v);
        return memo;
    }, {});
};
exports.default = exports.interpolate;
// For compatibility with the original JS implementation
module.exports = exports.interpolate;
module.exports.interpolate = exports.interpolate;
module.exports.default = exports.interpolate;
//# sourceMappingURL=main.js.map