import { equals } from 'ramda'
import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { extractItemsKit } from '../helpers/ProductKitHelper'
import ProductKitDetails from './ProductKitDetails'
import ProductKitItem from './ProductKitItem'

const MAX_VISIBLE_ITEMS = 3
const DEFAULT_VISIBLE_ITEMS = Array(MAX_VISIBLE_ITEMS).fill(null)

/**
 * Product Kit component.
 * Display a list of items which composes a kit.
 */
export default class ProductKitContent extends Component {
  state = {
    shownItems: DEFAULT_VISIBLE_ITEMS,
    hidenItems: [],
  }

  componentDidMount() {
    this.updateComponentState(this.props.content)
  }

  componentDidUpdate(prevProps) {
    const { content } = this.props
    const { shownItems } = this.state

    if (
      !equals(prevProps.content, content) ||
      equals(shownItems, DEFAULT_VISIBLE_ITEMS)
    ) {
      this.updateComponentState(content)
    }
  }

  updateComponentState(content) {
    const itemsKit = extractItemsKit(content)

    if (itemsKit.length) {
      this.setState({
        shownItems: itemsKit.slice(0, MAX_VISIBLE_ITEMS),
        hidenItems: itemsKit.slice(MAX_VISIBLE_ITEMS),
      })
    }
  }

  handleItemSwap = index => {
    const { shownItems, hidenItems } = this.state
    const swappedItem = shownItems[index]

    shownItems[index] = hidenItems.shift()
    hidenItems.push(swappedItem)

    this.setState({
      shownItems,
      hidenItems,
    })
  }

  render() {
    const { shownItems, viewOptions } = this.state
    const loading = equals(shownItems, DEFAULT_VISIBLE_ITEMS)

    return (
      <div className="vtex-product-kit vtex-page-padding flex flex-column items-center justify-center mb7">
        <h1 className="pv3 ph3">
          <FormattedMessage id="productKit.buyTogether" />
        </h1>
        <div className="flex flex-column flex-wrap-l flex-row-l items-center justify-center">
          {shownItems.map((item, index) => (
            <Fragment key={index}>
              {index > 0 &&
                !loading && (
                  <div className="vtex-product-kit__separator flex items-center justify-center mh4 mv4 b white bg-action-primary br-100">
                    <span>&#43;</span>
                  </div>
                )}
              <ProductKitItem
                item={item}
                itemIndex={index}
                loading={loading}
                viewOptions={viewOptions}
                onItemSwap={this.handleItemSwap}
              />
            </Fragment>
          ))}
          <ProductKitDetails loading={loading} items={this.state.shownItems} />
        </div>
      </div>
    )
  }
}
