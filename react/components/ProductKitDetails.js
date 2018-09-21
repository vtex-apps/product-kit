import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { BuyButton, ProductPrice } from 'vtex.store-components'

import propTypes from '../props/productKitItemProps'

/**
 * Product Kit Details component.
 * Show the details (price and number of items) of the Kit.
 */
export default class ProductKitDetails extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(propTypes.product).isRequired,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    items: [],
  }

  /**
   * Calculates the Kit Price according to the products that are being displayed.
   */
  calculateListPrice = items => {
    return items.reduce((price, item) => {
      return price + item.sku.seller.commertialOffer.Price
    }, 0)
  }

  /**
   * Calculates the Kit Price according to the products that are being displayed.
   * The price itself is calculated based on the discount that each product have separately.
   */
  calculateSellingPrice = items => {
    return items.reduce((price, item) => {
      return (
        price +
        (item.sku.seller.commertialOffer.Price * (100.0 - item.discount)) /
          100.0
      )
    }, 0)
  }

  /**
   * Extract the information required of the item to be passed to the BuyButton
   * component.
   */
  getSkuItems = items => {
    return items.map(item => {
      return {
        skuId: String(item.sku.itemId),
        quantity: item.minQuantity,
        seller: parseInt(item.sku.seller.sellerId),
      }
    })
  }

  render() {
    const { items, loading } = this.props

    return (
      <div className="vtex-product-kit__details flex flex-column items-center justify-center mw5 mh7">
        {!loading && (
          <FormattedMessage
            id="productKit.numberOfProductsTitle"
            values={{ numberOfItems: items.length }}
          />
        )}
        <div className="pv4">
          <ProductPrice
            sellingPrice={!loading ? this.calculateSellingPrice(items) : null}
            listPrice={!loading ? this.calculateListPrice(items) : null}
            showInstallments={false}
          />
        </div>
        <BuyButton skuItems={!loading ? this.getSkuItems(items) : null}>
          <FormattedMessage id="productKit.buyTogether" />
        </BuyButton>
      </div>
    )
  }
}
