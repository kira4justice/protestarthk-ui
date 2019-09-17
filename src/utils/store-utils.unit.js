import { mergeState } from './store-utils';

describe('@utils/store-utils', () => {
  describe('mergeState', () => {
    it('says hello', () => {
      const oldState = { a: 1, b: 'b', c: ['c'], d: { e: 'e' } };
      const newState = { a: null, b: null, c: null, d: null };
      const result = mergeState(oldState, newState);
      expect(result).toBe(oldState);
      expect(result).not.toBe(newState);
      expect(result).toEqual(newState);
    });
  });
});
