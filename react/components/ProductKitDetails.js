import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { BuyButton, ProductPrice } from 'vtex.store-components'

import { productShape } from '../props'
import styles from '../styles.css'

/**
 * ProductKitDetails component.
 *
 * Show the details (price and number of items) of the Kit.
 */
export default class ProductKitDetails extends Component {
  static propTypes = {
    /** Array of items */
    items: PropTypes.arrayOf(
      productShape,
    ),
  }

  getPrice = item => {
    return item.sku.seller.commertialOffer.Price
  }

  calculateListPrice = items => {
    return items.reduce((price, item) => {
      return price + this.getPrice(item)
    }, 0)
  }

  /**
   * Calculates the Kit Price according to the products that are being displayed.
   * The price itself is calculated based on the discount that each product have separately.
   */
  calculateSellingPrice = items => {
    return items.reduce((price, item) => {
      return (
        price + (this.getPrice(item) * (100 - item.discount)) / 100
      )
    }, 0)
  }

  /**
   * Extract the information required of the item to be passed to the BuyButton
   * component.
   */
  getSkuItems = items => {
    return items.map(item => ({
      skuId: String(item.sku.itemId),
      quantity: item.minQuantity,
      seller: parseInt(item.sku.seller.sellerId),
    }))
  }

  render() {
    const { items } = this.props

    return (
      <div className={`${styles.listDetails} flex flex-column items-center justify-center tc ph7`}>
        <div className="t-body c-muted-1 mv3">
          <FormattedMessage
            id="productKitList.takeAll"
            values={{ numberOfItems: items.length }}
          />
        </div>
        <div className="pv4">
          <ProductPrice
            sellingPrice={this.calculateSellingPrice(items)}
            listPrice={this.calculateListPrice(items)}
            listPriceClass="t-heading-5--small strike"
            sellingPriceClass="t-heading-5"
            showInstallments={false}
            showLabels={false}
          />
        </div>
        <BuyButton skuItems={this.getSkuItems(items)}>
          <FormattedMessage id="productKitList.buyKit" />
        </BuyButton>
      </div >
    )
  }
}
