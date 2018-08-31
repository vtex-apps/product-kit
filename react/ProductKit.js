import './global.css'

import { path } from 'ramda'
import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import ProductKitDetails from './components/ProductKitDetails'
import ProductKitItem from './components/ProductKitItem'
import ProductKitSeparator from './components/ProductKitSeparator'
import ProductKitPropTypes from './prop-types/productKitPropTypes'

const MAX_ITEMS = 3
const ITEMS_CONTENT_LOADER = 2

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
        badgeText: showBadge
          ? {
              type: 'string',
              title: 'editor.productKit.badgeText',
              isLayout: false,
            }
          : {},
      },
    }
  }

  /**
   * Extract and format the required information of a Product to be used into the
   * ProductKitItem component.
   */
  prepareProductKit = productKit => {
    const { benefitProduct, discount, minQuantity } = productKit
    const newProduct = { ...benefitProduct }

    if (newProduct.items && newProduct.items.length) {
      newProduct.sku = { ...newProduct.items[0] }
      newProduct.productName = newProduct.sku.nameComplete
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
        newProduct.sku.image.imageUrl = newProduct.sku.image.imageUrl.replace(
          /^https?:/,
          ''
        )
      }
      newProduct.sku.referenceId = (newProduct.sku.referenceId &&
        newProduct.sku.referenceId[0]) || {
        Value: '',
      }
      delete newProduct.sku.sellers
      delete newProduct.sku.images
      delete newProduct.items
    }

    return { ...newProduct, discount, minQuantity }
  }

  prepareProductSKUKit = productKit => {
    let productSKUKit = []
    productKit.forEach(productKitItem => {
      const { benefitProduct: product, benefitSKUIds } = productKitItem
      benefitSKUIds.forEach(skuId => {
        product.items.forEach(item => {
          if (skuId === item.itemId) {
            productSKUKit.push({
              ...productKitItem,
              benefitProduct: { ...product, items: [item] },
            })
          }
        })
      })
    })
    return productSKUKit
  }

  render() {
    const {
      productQuery: { product },
      showListPrice,
      showLabels,
      showInstallments,
      showBadge,
      badgeText,
    } = this.props

    const benefits = path(['benefits'], product)

    if (benefits && benefits.length === 0) {
      return null
    }

    const displayLoader = !path(['length'], benefits)
    const kitProducts = displayLoader
      ? Array(ITEMS_CONTENT_LOADER).fill(null)
      : this.prepareProductSKUKit(path(['0', 'items'], benefits))
          .slice(0, MAX_ITEMS)
          .map(this.prepareProductKit)

    return (
      <div className="vtex-product-kit flex flex-column items-center justify-center mb7">
        <h1 className="pv3 ph3">
          <FormattedMessage id="productKit.buyTogether" />
        </h1>
        <div className="flex flex-column flex-wrap-l flex-row-l items-center justify-center">
          {kitProducts.map((kitProduct, index) => (
            <Fragment key={index}>
              {index > 0 && (
                <ProductKitSeparator>
                  <span>&#43;</span>
                </ProductKitSeparator>
              )}
              <ProductKitItem
                product={kitProduct}
                summaryProps={{
                  showListPrice,
                  showLabels,
                  showInstallments,
                  showBadge,
                  badgeText,
                }}
              />
            </Fragment>
          ))}
          <ProductKitSeparator>
            <span>&#61;</span>
          </ProductKitSeparator>
          <ProductKitDetails
            loading={displayLoader}
            kitProducts={kitProducts}
          />
        </div>
      </div>
    )
  }
}

export default ProductKit
