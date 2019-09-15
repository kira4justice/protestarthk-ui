import Home from './home';
import '@plugins/element-ui';

describe('@views/home', () => {
  it('is a valid view', () => {
    expect(Home).toBeAViewComponent();
  });

  it('renders an element', () => {
    const wrapper = shallowMountView(Home);
    const element = wrapper.find('.no-padding');
    expect(element.exists()).toBe(true);
  });
});
