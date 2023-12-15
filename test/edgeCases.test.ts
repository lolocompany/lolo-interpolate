import { it, describe } from 'vitest';

import { interpolate } from '../src/main';

describe('Edge Cases', () => {
  it('Echo ctx for {} input', ({ expect }) => {
    const params = '{}'
    const ctx = {
      x: { y: 'Hello' },
    };
    expect(interpolate(ctx, params)).to.deep.equal(ctx);
  });
});
