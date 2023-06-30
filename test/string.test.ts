import { it, describe } from 'vitest';

import { interpolate } from '../src/main';

const params = '{x.y}';

describe('Array', () => {
  it('Empty context', ({ expect }) => {
    const ctx = {};
    expect(interpolate(ctx, params)).toMatchSnapshot();
  });

  it('Exact match context', ({ expect }) => {
    const ctx = {
      x: { y: 'Hello' },
    };
    expect(interpolate(ctx, params)).toMatchSnapshot();
  });

  it('No match context', ({ expect }) => {
    const ctx = {
      a: { b: 'Hello' },
    };
    expect(interpolate(ctx, params)).toMatchSnapshot();
  });

  it('Full context', ({ expect }) => {
    const ctx = {
      x: { y: 'Hello' },
      a: { b: 'Hello' },
    };
    expect(interpolate(ctx, params)).toMatchSnapshot();
  });
});
