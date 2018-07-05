import React, { Component, Fragment } from 'react'

import ProductKitItem from './ProductKitItem'
import ProductKitDetails from './ProductKitDetails'
import ProductKitSeparator from './ProductKitSeparator'

import ProductKitPropTypes from './propTypes'

import './global.css'

const DEFAULT_MAX_ITEMS = 3

/**
 * Product Kit component.
 * Display a horizontal list of items which composes a kit.
 */
class ProductKit extends Component {
  static propTypes = ProductKitPropTypes

  static defaultProps = {
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

  calculateKitPrice = kitItems => {
    let kitPrice = 0
    kitItems.slice(0, DEFAULT_MAX_ITEMS).map(kitItem => {
      const { discount, product: { items: [ { sellers: [ { commertialOffer: { Price } } ] } ] } } = kitItem
      kitPrice += Price * (100.0 - discount) / 100.0
    })
    return kitPrice
  }

  render() {
    const {
      kit,
      showListPrice,
      showLabels,
      showInstallments,
      showBadge,
      badgeText,
    } = this.props

    const kitItems = kit.items

    return (
      <div className="vtex-product-kit flex items-center justify-center">
        <div className="inline-flex items-center justify-center">
          {
            kitItems.slice(0, DEFAULT_MAX_ITEMS).map((item, index) => (
              <Fragment key={index}>
                { index > 0 &&
                  <ProductKitSeparator>
                    <span>+</span>
                  </ProductKitSeparator>
                }
                <ProductKitItem
                  product={item.product}
                  summaryProps={{ showListPrice, showLabels, showInstallments, showBadge, badgeText }}
                />
              </Fragment>
            ))
          }
          <ProductKitSeparator>
            <span>=</span>
          </ProductKitSeparator>
          <ProductKitDetails
            numberOfItems={Math.min(DEFAULT_MAX_ITEMS, kitItems.length)}
            price={this.calculateKitPrice(kitItems)}
          />
        </div>
      </div>
    )
  }
}

export default ProductKit