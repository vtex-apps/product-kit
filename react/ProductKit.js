import './global.css'

import { path } from 'ramda'
import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import ProductKitDetails from './components/ProductKitDetails'
import ProductKitItem from './components/ProductKitItem'
import ProductKitSeparator from './components/ProductKitSeparator'
import { extractItemsKit } from './helpers/ProductKitHelper'
import ProductKitPropTypes from './prop-types/productKitPropTypes'
import ProductKitSchema from './schema/productKitSchema'

const MAX_ITEMS = 3
const ITEMS_CONTENT_LOADER = 2

/**
 * Product Kit component.
 * Display a list of items which composes a kit.
 */
class ProductKit extends Component {
  static propTypes = ProductKitPropTypes.props

  static defaultProps = ProductKitPropTypes.defaultProps

  static getSchema = ProductKitSchema

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
      : extractItemsKit(path(['0', 'items'], benefits)).slice(0, MAX_ITEMS)

    return (
      <div className="vtex-product-kit vtex-page-padding flex flex-column items-center justify-center mb7">
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
