import React, { Component, Fragment } from 'react'

import ProductKitItem from './ProductKitItem'
import ProductKitDetails from './ProductKitDetails'
import ProductKitSeparator from './ProductKitSeparator'

import ProductKitPropTypes from './propTypes'

import './global.css'
import { FormattedMessage } from 'react-intl';

const MAX_ITEMS = 3

/**
 * Product Kit component.
 * Display a list of items which composes a kit.
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
          isLayout: true,
        },
        showLabels: {
          type: 'boolean',
          title: 'editor.productKit.showLabels',
          default: false,
          isLayout: true,
        },
        showInstallments: {
          type: 'boolean',
          title: 'editor.productKit.showInstallments',
          default: false,
          isLayout: true,
        },
        showBadge: {
          type: 'boolean',
          title: 'editor.productKit.showBadge',
          default: false,
          isLayout: true,
        },
        badgeText: showBadge ? {
          type: 'string',
          title: 'editor.productKit.badgeText',
          isLayout: false,
        } : {},
      },
    }
  }

  /**
   * Extract and format the required information of a Product to be used into the 
   * ProductKitItem component.
   */
  prepareProduct = kitProduct => {
    const { benefitProduct, discount } = kitProduct
    const newProduct = { ...benefitProduct }

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
    
    return { ...newProduct, discount }
  }

  /**
   * Calculates the Kit Price according to the products that are being displayed. 
   * The price itself is calculated based on the discount that each product have separately.
   */
  calculatePrice = kitProducts => {
    let kitPrice = 0
    kitProducts.map(kitProduct => {
      const price = kitProduct.sku.seller.commertialOffer.Price
      kitPrice += price * (100.0 - kitProduct.discount) / 100.0
    })
    return kitPrice
  }

  render() {
    const {
      product,
      showListPrice,
      showLabels,
      showInstallments,
      showBadge,
      badgeText,
    } = this.props

    if (!product.benefits.length) {
      return ( 
        <Fragment></Fragment>
      )
    }

    const { benefits: [ benefit ] } = product
    
    const kitProducts = benefit.items.slice(0, MAX_ITEMS).map(item => (
      this.prepareProduct(item)
    ))

    return (
      <div className="vtex-product-kit flex flex-column items-center justify-center">
        <h1 className="pv3 ph3">
          <FormattedMessage id="productKit.buyTogether" />
        </h1>
        <div className="flex flex-column flex-wrap-l flex-row-l items-center justify-center">
          {
            kitProducts.map((kitProduct, index) => (
              <Fragment key={index}>
                { index > 0 &&
                  <ProductKitSeparator>
                    <span>+</span>
                  </ProductKitSeparator>
                }
                <ProductKitItem
                  product={kitProduct}
                  summaryProps={
                    { 
                      showListPrice, 
                      showLabels, 
                      showInstallments,
                      showBadge, 
                      badgeText,
                    }
                  } />
              </Fragment>
            ))
          }
          <ProductKitSeparator>
            <span>=</span>
          </ProductKitSeparator>
          <ProductKitDetails
            numberOfItems={kitProducts.length}
            price={this.calculatePrice(kitProducts)} />
        </div>
      </div>
    )
  }
}

export default ProductKit