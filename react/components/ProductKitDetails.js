// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { BuyButton, ProductPrice } from 'vtex.store-components'
import { path } from 'ramda'

// import propTypes from '../props/productKitItemProps'

/**
 * Product Kit Details component.
 * Show the details (price and number of items) of the Kit.
 */
export default class ProductKitDetails extends Component {
  // static propTypes = {
  //   /** Array of items which composes the kit */
  //   // items: PropTypes.arrayOf(propTypes.product).isRequired,
  // }

  // static defaultProps = {
  //   items: [],
  // }

  getPrice = item => {
    return path(['sku', 'seller', 'commertialOffer', 'Price'], item)
  }

  /**
   * Calculates the Kit Price according to the products that are being displayed.
   */
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
        price + (this.getPrice(item) * (100 - path(['discount'], item))) / 100
      )
    }, 0)
  }

  /**
   * Extract the information required of the item to be passed to the BuyButton
   * component.
   */
  getSkuItems = items => {
    return items.map(item => ({
      skuId: String(path(['sku', 'itemId'], item)),
      quantity: path(['minQuantity'], item),
      seller: parseInt(path(['sku', 'seller', 'sellerId'], item)),
    }))
  }

  render() {
    const { items } = this.props

    return (
      <div className="vtex-product-kit-list__details flex flex-column items-center justify-center tc ph7">
        <div className="b ttu f5 mid-gray mv3">
          <FormattedMessage
            id="productKitList.takeAll"
            values={{ numberOfItems: items.length }}
          />
        </div>
        <div className="pv4">
          <ProductPrice
            sellingPrice={this.calculateSellingPrice(items)}
            listPrice={this.calculateListPrice(items)}
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
