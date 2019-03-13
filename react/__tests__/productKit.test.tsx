import React from 'react'
import { render } from 'test-utils'
import { productMock } from '../__mocks__/productMock'
import ProductKit from '../index'

describe('<ProductSummary /> component', () => {
  function renderComponent() {
    return render(<ProductKit {...productMock} />)
  }

  it('should be rendered', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match the snapshot', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})
