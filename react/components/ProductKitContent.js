import { equals } from 'ramda'
import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { extractItemsKit } from '../helpers/ProductKitHelper'
import ProductKitDetails from './ProductKitDetails'
import ProductKitItem from './ProductKitItem'
import ProductKitSeparator from './ProductKitSeparator'

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

  componentDidUpdate(prevProps) {
    const { content } = this.props

    if (content !== prevProps.content) {
      const itemsKit = extractItemsKit(content)

      this.setState({
        shownItems: itemsKit.slice(0, MAX_VISIBLE_ITEMS),
        hidenItems: itemsKit.slice(MAX_VISIBLE_ITEMS),
      })
    }
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
              {index > 0 && (
                <ProductKitSeparator>
                  <span>&#43;</span>
                </ProductKitSeparator>
              )}
              <ProductKitItem item={item} viewOptions={viewOptions} />
            </Fragment>
          ))}
          <ProductKitSeparator>
            <span>&#61;</span>
          </ProductKitSeparator>
          <ProductKitDetails loading={loading} items={shownItems} />
        </div>
      </div>
    )
  }
}
