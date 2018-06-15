import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { ProductSummary } from 'vtex.product-summary'

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
  }

  static defaultProps = {
    price: 0,
    products: [],
    showListPrice: true,
    showLabels: false,
    showInstallments: false,
    showBadge: false,
    badgeText: '',
  }

  static getSchema = ({ showBadge }) => {
    return {
      title: 'editor.productKit.title',
      description: 'editor.productKit.description',
      type: 'object',
      properties: {
        showListPrice: {
          type: 'boolean',
          title: 'editor.productKit.showListPrice',
          default: true,
        },
        showLabels: {
          type: 'boolean',
          title: 'editor.productKit.showLabels',
          default: false,
        },
        showInstallments: {
          type: 'boolean',
          title: 'editor.productKit.showInstallments',
          default: false,
        },
        showBadge: {
          type: 'boolean',
          title: 'editor.productKit.showBadge',
          default: false,
        },
        badgeText: showBadge ? {
          type: 'string',
          title: 'editor.productKit.badgeText',
        } : {},
      },
    }
  }

  render() {
    const {
      price,
      products,
      showListPrice,
      showLabels,
      showInstallments,
      showBadge,
      badgeText,
    } = this.props

    return (
      <div className="vtex-product-kit flex items-center justify-center">
        <div className="inline-flex items-center">
          {
            products.slice(0, DEFAULT_MAX_ITEMS).map((product, index) => (
              <Fragment key={index}>
                { index > 0 &&
                  <ProductKitSeparator>
                    <span>+</span>
                  </ProductKitSeparator>
                }
                <ProductKitItem
                  product={product}
                  summaryProps={{ showListPrice, showLabels, showInstallments, showBadge, badgeText }}
                />
              </Fragment>
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
