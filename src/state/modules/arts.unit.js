import * as artsModule from './arts';

describe('@state/modules/arts', () => {
  it('exports a valid Vuex module', () => {
    expect(artsModule).toBeAVuexModule();
  });
});
