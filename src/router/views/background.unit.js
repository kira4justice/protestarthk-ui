import Background from './background';
import '@plugins/element-ui';

describe('@views/background', () => {
  it('is a valid view', () => {
    expect(Background).toBeAViewComponent();
  });
});
