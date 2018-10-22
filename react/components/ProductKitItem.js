import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ProductSummary from 'vtex.product-summary/index'

/**
 * ProductKitItem component.
 * 
 * Displays a product as an item of a kit of products and provides 
 * the buttons to trigger the swap and removal item operations.
 */
export default class ProductKitItem extends Component {
  static propTypes = {
    /** Product to be displayed */
    // TODO: find a way to do that validation without rewrite the code
    // item: ProductSummary.propTypes.product,
    /** Flag to allow the item swap */
    allowSwap: PropTypes.bool.isRequired,
    /** Flag to allow the item removal */
    allowRemoval: PropTypes.bool.isRequired,
    /** Function to handle the swap of an item */
    onItemSwap: PropTypes.func.isRequired,
    /** Function to handle the removal of an item */
    onItemRemoval: PropTypes.func.isRequired,
    /** Props of Product Summary */
    summaryProps: PropTypes.object.isRequired,
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
