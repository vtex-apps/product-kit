import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProductSummary from 'vtex.product-summary/ProductSummary'

import ProductKitItem from './ProductKitItem'
import ProductKitDetails from './ProductKitDetails'
import ProductKitSeparator from './ProductKitSeparator'

import './global.css'

const DEFAULT_MAX_ITEMS = 3

/**
 * Product Kit component.
 * Display a horizontal list of items which composes a kit.
 */
export default class ProductKit extends Component {
  static propTypes = {
    /** Price of the kit */
    price: PropTypes.number.isRequired,
    /** Array of products which composes the kit */
    products: PropTypes.arrayOf(
      ProductSummary.propTypes.product
    ).isRequired,
    /** Props of the Product Summary component */
    summaryProps: PropTypes.shape({
      /** Shows the product list price */
      showListPrice: PropTypes.bool,
      /** Set pricing labels' visibility */
      showLabels: PropTypes.bool,
      /** Set installments' visibility  */
      showInstallments: PropTypes.bool,
      /** Set the discount badge's visibility */
      showBadge: PropTypes.bool,
      /** Text shown on badge */
      badgeText: PropTypes.string,
    }),
  }

  static defaultProps = {
    price: 0,
    products: [],
    summaryProps: {
      showListPrice: true,
      showLabels: false,
      showInstallments: false,
      showBadge: false,
      badgeText: '',
    },
  }

  render() {
    const {
      price,
      products,
      summaryProps,
    } = this.props
    return (
      <div className="vtex-product-kit flex items-center justify-center">
        <div className="inline-flex">
          {
            products.slice(0, DEFAULT_MAX_ITEMS).map((product, index) => (
              <div className="flex items-center" key={index}>
                { index > 0 &&
                  <ProductKitSeparator>
                    <span>+</span>
                  </ProductKitSeparator>
                }
                <ProductKitItem
                  product={product}
                  summaryProps={summaryProps}
                />
              </div>
            ))
          }
        </div>
        <ProductKitSeparator>
          <span>=</span>
        </ProductKitSeparator>
        <ProductKitDetails
          numberOfItems={products.length}
          price={price}
        />
      </div>
    )
  }
}
