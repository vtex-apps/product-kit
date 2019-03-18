import React from 'react'
import { render, fireEvent, act } from '@vtex/test-tools/react'
import { productMock } from '../__mocks__/productMock'
import ProductKit from '../index'

describe('<ProductSummary /> component', () => {
  function renderComponent(customProps, itemNumber = 1) {
    return render(<ProductKit {...productMock(itemNumber)} {...customProps} />)
  }

  it('should be rendered', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match the snapshot', () => {
    const { asFragment } = renderComponent({
      allowSwap: false,
      allowRemoval: false,
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot with removal and swap', () => {
    const { asFragment } = renderComponent(
      {
        allowSwap: true,
        allowRemoval: true,
      },
      2
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render the 2 itens', () => {
    const { getByText } = renderComponent({}, 2)
    expect(getByText(/Take all 2 products/)).toBeTruthy()
  })

  it('should remove an item from the kit', () => {
    const { getByText } = renderComponent({ allowRemoval: true }, 2)
    expect(getByText(/Take all 2 products/)).toBeTruthy()

    act(() => {
      fireEvent.click(getByText(/IconRemove/))
    })

    expect(getByText(/Take all 1 products/)).toBeTruthy()
  })
})
