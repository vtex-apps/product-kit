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

  it('should match the snapshot with no removal and swap', () => {
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
      5
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render 3 products', () => {
    const { getByText } = renderComponent({}, 4)
    expect(getByText(/Take all 3 products/)).toBeTruthy()
  })

  it('should remove an item from the kit', () => {
    const { getByText, container } = renderComponent({ allowRemoval: true }, 2)
    expect(getByText(/Take all 2 products/)).toBeTruthy()

    act(() => {
      fireEvent.click(container.querySelector('.IconRemove'))
    })

    expect(getByText(/Take all 1 products/)).toBeTruthy()
  })

  /** It will swap the first swapable (name-2) for the one left over (name-4).
   * If swapped again, it should retrieve the previous one. */
  it('should swap an item from the kit', () => {
    const { getByText, container } = renderComponent({ allowSwap: true }, 4)
    expect(getByText('name-2')).toBeTruthy()

    act(() => {
      fireEvent.click(container.querySelector('.IconSwap'))
    })

    expect(getByText('name-4')).toBeTruthy()
    expect(getByText('name-2')).toBeFalsy()

    act(() => {
      fireEvent.click(container.querySelector('.IconSwap'))
    })

    expect(getByText('name-2')).toBeTruthy()
  })
})
