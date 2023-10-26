import { it, describe } from 'vitest';

import { interpolate } from '../src/main';

const params = ['{x.y}', '{x.y}'];

describe('Array', () => {
  it('Empty context', ({ expect }) => {
    const ctx = {};
    expect(interpolate(ctx, params)).to.deep.equal(params);
  });

  it('Exact match context', ({ expect }) => {
    const ctx = {
      x: { y: 'Hello' },
    };
    expect(interpolate(ctx, params)).to.deep.equal([ctx.x.y, ctx.x.y]);
  });

  it('No match context', ({ expect }) => {
    const ctx = {
      a: { b: 'Hello' },
    };
    expect(interpolate(ctx, params)).to.deep.equal(params);
  });

  it('Full context', ({ expect }) => {
    const ctx = {
      x: { y: 'Hello' },
      a: { b: 'Hello' },
    };
    expect(interpolate(ctx, params)).to.deep.equal([ctx.x.y, ctx.x.y]);
  });
});
