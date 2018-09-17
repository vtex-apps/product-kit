import { path } from 'ramda'
import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { extractItemsKit } from '../helpers/ProductKitHelper'
import ProductKitPropTypes from '../prop-types/productKitPropTypes'
import ProductKitSchema from '../schema/productKitSchema'
import ProductKitDetails from './ProductKitDetails'
import ProductKitItem from './ProductKitItem'
import ProductKitSeparator from './ProductKitSeparator'

const MAX_ITEMS = 3

/**
 * Product Kit component.
 * Display a list of items which composes a kit.
 */
export default class ProductKitContent extends Component {
  static propTypes = ProductKitPropTypes.props

  static defaultProps = ProductKitPropTypes.defaultProps

  static getSchema = ProductKitSchema

  render() {
    const {
      loading,
      showListPrice,
      showLabels,
      showInstallments,
      showBadge,
      badgeText,
      productQuery: { product },
    } = this.props

    const kitItems = loading
      ? Array(MAX_ITEMS).fill(null)
      : extractItemsKit(
          path(['0', 'items'], path(['benefits'], product))
        ).slice(0, MAX_ITEMS)

    return (
      <div className="vtex-product-kit vtex-page-padding flex flex-column items-center justify-center mb7">
        <h1 className="pv3 ph3">
          <FormattedMessage id="productKit.buyTogether" />
        </h1>
        <div className="flex flex-column flex-wrap-l flex-row-l items-center justify-center">
          {kitItems.map((kitItem, index) => (
            <Fragment key={index}>
              {index > 0 && (
                <ProductKitSeparator>
                  <span>&#43;</span>
                </ProductKitSeparator>
              )}
              <ProductKitItem
                product={kitItem}
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
          <ProductKitDetails loading={loading} kitProducts={kitItems} />
        </div>
      </div>
    )
  }
}
