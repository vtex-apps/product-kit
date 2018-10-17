import React, { Component, Fragment } from 'react'

import { FormattedMessage } from 'react-intl'

import ProductKitDetails from './ProductKitDetails'
import ProductKitItem from './ProductKitItem'

import defaultPlusIcon from '../images/default-plus-icon.svg'
import defaultEqualsIcon from '../images/default-equals-icon.svg'

import ProductKitSeparator from './ProductKitSeparator';

/**
 * ProductKitContent component.
 * Displays a list of items which composes a kit.
 */
export default class ProductKitContent extends Component {
  render() {
    const { itemsKit, allowSwap, allowRemoval, viewOptions, onItemSwap } = this.props

    return (
      <div className="vtex-product-kit flex flex-column items-center justify-center mb7">
        <div className="b ttu f4 mv7">
          <FormattedMessage id="productKit.mountYourKit" />
        </div>
        <div className="flex flex-column flex-wrap-l flex-row-l items-center justify-center ba b--black-05 pa5 w-100">
          {itemsKit.map((item, index) => (
            <div className="flex flex-row" key={index}>
              {index > 0 && (
                <ProductKitSeparator icon={defaultPlusIcon} />
              )}
              <ProductKitItem
                item={item}
                itemIndex={index}
                onItemSwap={onItemSwap}
                viewOptions={viewOptions}
                allowSwap={allowSwap && index > 0}
                allowRemoval={allowRemoval && index > 0}
              />
            </div>
          ))}
          {/* <ProductKitSeparator icon={defaultEqualsIcon} /> */}
          {/* <ProductKitDetails items={itemsKit} /> */}
        </div>
      </div>
    )
  }
}
