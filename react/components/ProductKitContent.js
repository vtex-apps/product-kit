import React, { Component, Fragment } from 'react'

import { FormattedMessage } from 'react-intl'

import ProductKitDetails from './ProductKitDetails'
import ProductKitItem from './ProductKitItem'

/**
 * ProductKitContent component.
 * Displays a list of items which composes a kit.
 */
export default class ProductKitContent extends Component {
  render() {
    const { itemsKit, allowSwap, viewOptions, onItemSwap } = this.props

    return (
      <div className="vtex-product-kit flex flex-column items-center justify-center mb7">
        <h1 className="pv3 ph3">
          <FormattedMessage id="productKit.buyTogether" />
        </h1>
        <div className="flex flex-column flex-wrap-l flex-row-l items-center justify-center">
          {itemsKit.map((item, index) => (
            <Fragment key={index}>
              {index > 0 && (
                <div className="flex items-center justify-center mh4 mv4 b white bg-action-primary h2 w2 br-100">
                  <span>&#43;</span>
                </div>
              )}
              <ProductKitItem
                item={item}
                itemIndex={index}
                allowSwap={allowSwap}
                onItemSwap={onItemSwap}
                viewOptions={viewOptions}
              />
            </Fragment>
          ))}
          <ProductKitDetails items={itemsKit} />
        </div>
      </div>
    )
  }
}
