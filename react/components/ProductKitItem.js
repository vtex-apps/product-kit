import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import ProductSummary from 'vtex.product-summary/index'

import ProductKitItemPropTypes from '../prop-types/productKitItemPropTypes'

import swapIcon from '../images/swap-icon.svg'

/**
 * Product Kit Item component.
 * Display and provides management for an item of the kit.
 */
export default class ProductKitItem extends Component {
  static propTypes = {
    /** Product to be displayed as an item of the kit */
    item: ProductKitItemPropTypes.product,
    /** Allow item swap flag */
    allowSwap: PropTypes.bool,
    /** Is component loading flag */
    loading: PropTypes.bool,
    /** Props of Product Summary */
    viewOptions: PropTypes.any,
  }

  static defaultProps = {
    allowSwap: true,
  }

  render() {
    const { item, allowSwap, loading, viewOptions } = this.props

    return (
      <div className="vtex-product-kit__item">
        {!loading && allowSwap ? (
          <div className="relative dib">
            <div className="flex items-center absolute left-0 white br1 z-max bg-action-primary">
              <div
                className="vtex-product-kit__item-swap-button flex flex-row items-center mh3 mv3"
                onClick={() => console.log('swap')}>
                <img src={swapIcon} />
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
