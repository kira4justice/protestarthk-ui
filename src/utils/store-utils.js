import { toPairs } from 'ramda';

export const mergeState = (oldState, newState) => {
  const pairs = toPairs(newState);
  pairs.forEach((d) => (oldState[d[0]] = d[1]));
  return oldState;
};
