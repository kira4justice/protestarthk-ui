import MainLayout from './main';
import '@plugins/element-ui';

describe('@layouts/main', () => {
  it('renders its content', () => {
    const slotContent = '<p>Hello!</p>';
    const { element } = shallowMount(MainLayout, {
      slots: {
        default: slotContent,
      },
    });
    expect(element.innerHTML).toContain(slotContent);
  });
});
