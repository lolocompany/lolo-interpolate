import { it, describe } from 'vitest';

import { interpolate } from '../src/main';

const paramsOne = '{x.y}';
const paramsMultiple = '{x.y}/{a.b}';

describe('String', () => {
  it('Empty context', ({ expect }) => {
    const ctx = {};
    expect(interpolate(ctx, paramsOne)).to.deep.equal(paramsOne);
  });

  it('Exact match context', ({ expect }) => {
    const ctx = {
      x: { y: 'Hello' },
    };
    expect(interpolate(ctx, paramsOne)).to.deep.equal(ctx.x.y);
  });

  it('No match context', ({ expect }) => {
    const ctx = {
      a: { b: 'Hello' },
    };
    expect(interpolate(ctx, paramsOne)).to.deep.equal(paramsOne);
  });

  it('Full context', ({ expect }) => {
    const ctx = {
      x: { y: 'Hello' },
      a: { b: 'Hello' },
    };
    expect(interpolate(ctx, paramsOne)).to.deep.equal(ctx.x.y);
  });

  it('Multiple matches in one string', ({ expect }) => {
    const ctx = {
      x: { y: 'Hello' },
      a: { b: 'Hello' },
    };
    expect(interpolate(ctx, paramsMultiple)).to.deep.equal(`${ctx.x.y}/${ctx.a.b}`);
  });
});
