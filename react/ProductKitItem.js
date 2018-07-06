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

  normalizeProduct(product) {
    if (!product) return null
    const newProduct = { ...product }
    if (newProduct.items && newProduct.items.length) {
      newProduct.sku = { ...newProduct.items[0] }
      if (newProduct.sku.sellers && newProduct.sku.sellers.length) {
        newProduct.sku.seller = newProduct.sku.sellers[0]
      } else {
        newProduct.sku.seller = {
          commertialOffer: {
            Price: 0,
            ListPrice: 0,
          },
        }
      }
      if (newProduct.sku.images && newProduct.sku.images.length) {
        newProduct.sku.image = { ...newProduct.sku.images[0] }
        newProduct.sku.image.imageUrl = newProduct.sku.image.imageUrl
          .replace('http:', '')
          .replace('https:', '')
      }
      newProduct.sku.referenceId = (newProduct.sku.referenceId &&
        newProduct.sku.referenceId[0]) || {
        Value: '',
      }
      delete newProduct.sku.sellers
      delete newProduct.sku.images
      delete newProduct.items
    }
    return newProduct
  }

  render() {
    const {
      product,
      summaryProps,
    } = this.props

    return (
      <div className="vtex-product-kit__item">
        <ProductSummary
          product={this.normalizeProduct(product)}
          {...summaryProps}
          hideBuyButton
        />
      </div>
    )
  }
}
