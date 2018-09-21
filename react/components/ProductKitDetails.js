import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { BuyButton, ProductPrice } from 'vtex.store-components'

import propTypes from '../props/productKitItemProps'

const priceLoaderStyles = {
  'vtex-price-list__container--loader': {
    height: 0,
  },
  'vtex-price-installments--loader': {
    height: 0,
  },
  'vtex-price-selling--loader': {
    height: '1.5em',
  },
}

/**
 * Product Kit Details component.
 * Show the details (price and number of items) of the Kit.
 */
export default class ProductKitDetails extends PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(propTypes.product).isRequired,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    items: [],
  }

  /**
   * Calculates the Kit Price according to the products that are being displayed.
   * The price itself is calculated based on the discount that each product have separately.
   */
  calculatePrice = items => {
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
            styles={priceLoaderStyles}
            sellingPrice={!loading ? this.calculatePrice(items) : null}
            showInstallments={false}
            showListPrice={false}
          />
        </div>
        <BuyButton skuItems={!loading ? this.getSkuItems(items) : null}>
          <FormattedMessage id="productKit.buyTogether" />
        </BuyButton>
      </div>
    )
  }
}
