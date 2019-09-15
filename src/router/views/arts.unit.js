import Arts from './arts'
import '@plugins/element-ui'

describe('@views/arts', () => {
  it('is a valid view', () => {
    expect(Arts).toBeAViewComponent()
  })
})
