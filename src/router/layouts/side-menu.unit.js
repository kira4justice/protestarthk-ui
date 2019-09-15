import SideMenuLayout from './side-menu'
import '@plugins/element-ui'

describe('@layouts/side-menu', () => {
  it('renders its content', () => {
    const slotContent = '<p>Hello!</p>'
    const { element } = shallowMount(SideMenuLayout, {
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })
})
