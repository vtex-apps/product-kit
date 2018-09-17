import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ProductSummary from 'vtex.product-summary/index'

import ProductKitItemPropTypes from '../prop-types/productKitItemPropTypes'

/**
 * Product Kit Item component.
 * Display and provides management for an item of the kit.
 */
export default class ProductKitItem extends Component {
  static propTypes = {
    /** Product to be displayed as an item of the kit */
    item: ProductKitItemPropTypes.product,
    /** Props of Product Summary */
    viewOptions: PropTypes.any.isRequired,
  }

  render() {
    const { item, viewOptions } = this.props

    return (
      <div className="vtex-product-kit__item">
        <ProductSummary product={item} {...viewOptions} hideBuyButton />
      </div>
    )
  }
}
