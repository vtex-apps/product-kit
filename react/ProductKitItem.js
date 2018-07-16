import React, { Component } from 'react'
import PropTypes from 'prop-types'

import propTypes from './propTypes'
import { ProductSummary } from 'vtex.product-summary'

/**
 * Product Kit Item component.
 * Display and provides management for an item of the kit.
 */
export default class ProductKitItem extends Component {
  static propTypes = {
    /** Product to be displayed as an item of the kit */
    product: propTypes.product,
    /** Props of Product Summary */
    summaryProps: PropTypes.any.isRequired,
  }

  render() {
    const {
      product,
      summaryProps,
    } = this.props

    return (
      <div className="vtex-product-kit__item">
        <ProductSummary product={product} { ...summaryProps } hideBuyButton />
      </div>
    )
  }
}
