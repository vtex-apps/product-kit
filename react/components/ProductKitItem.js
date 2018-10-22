import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ProductSummary from 'vtex.product-summary/index'

import { productShape, summaryShape } from '../props'

/**
 * ProductKitItem component.
 *
 * Displays a product as an item of a kit of products and provides
 * the buttons to trigger the swap and removal item operations.
 */
export default class ProductKitItem extends Component {
  static propTypes = {
    /** Product item */
    item: productShape,
    /** Index of the item */
    index: PropTypes.number,
    /** Function that is called to handle the item swap operation */
    onItemSwap: PropTypes.func,
    /** Function that is called to handle the item removal operation */
    onItemRemoval: PropTypes.func,
    /** Swap icon */
    swapIcon: PropTypes.string,
    /** Removal icon */
    removalIcon: PropTypes.string,
    /** Allow or not the item swap */
    allowSwap: PropTypes.bool,
    /** Allow or not the item removal */
    allowRemoval: PropTypes.bool,
    /** Product Summary Props */
    summaryProps: summaryShape,
  }

  render() {
    const {
      item,
      index,
      allowSwap,
      allowRemoval,
      onItemSwap,
      onItemRemoval,
      summaryProps,
      swapIcon,
      removalIcon,
    } = this.props

    return (
      <div className="vtex-product-kit__item">
        <div className="flex flex-row">
          <div className="pl7" >
            <ProductSummary
              hideBuyButton
              product={item}
              {...summaryProps}
            />
          </div>
          <div className="flex flex-column items-center w2">
            {allowSwap &&
              <div className="flex items-center mh3 mv3"
                onClick={() => onItemRemoval(index)}>
                <img className="w1 h1" src={removalIcon} />
              </div>
            }
            {allowRemoval &&
              <div className="flex items-center mh3 mv3"
                onClick={() => onItemSwap(index)}>
                <img className="w1 h1" src={swapIcon} />
              </div>
            }
          </div>
        </div>
      </div >
    )
  }
}
