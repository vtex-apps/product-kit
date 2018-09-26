import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import ProductSummary from 'vtex.product-summary/index'

import ProductKitItemProps from '../props/productKitItemProps'

import swapIcon from '../images/swap-icon.svg'

/**
 * Product Kit Item component.
 * Display and provides management for an item of the kit.
 */
export default class ProductKitItem extends Component {
  static propTypes = {
    /** Product to be displayed as an item of the kit */
    item: ProductKitItemProps.product,
    /** Allow item swap flag */
    allowSwap: PropTypes.bool,
    /** Is component loading flag */
    loading: PropTypes.bool,
    /** Props of Product Summary */
    viewOptions: PropTypes.any,
  }

  render() {
    const {
      item,
      itemIndex,
      allowSwap,
      loading,
      onItemSwap,
      viewOptions,
    } = this.props

    return (
      <div className="vtex-product-kit__item">
        {!loading && allowSwap ? (
          <div className="relative dib">
            <div
              className="flex items-center absolute left-0 white pointer br1 z-999 bg-action-primary"
              onClick={() => onItemSwap(itemIndex)}>
              <div className="vtex-product-kit__item-swap-button h1 flex flex-row items-center mh3 mv3">
                <img className="w1 h1" src={swapIcon} />
                <div className="dn ml3">
                  <FormattedMessage id="productKit.swapItem" />
                </div>
              </div>
            </div>
            <ProductSummary product={item} {...viewOptions} hideBuyButton />
          </div>
        ) : (
          <ProductSummary product={item} {...viewOptions} hideBuyButton />
        )}
      </div>
    )
  }
}
