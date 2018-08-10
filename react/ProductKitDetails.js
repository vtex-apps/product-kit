import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { BuyButton, ProductPrice } from 'vtex.store-components';

import propTypes from './productKitItemPropTypes';

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
    kitProducts: PropTypes.arrayOf(propTypes.product).isRequired,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    kitProducts: [],
  }

  /**
   * Calculates the Kit Price according to the products that are being displayed.
   * The price itself is calculated based on the discount that each product have separately.
   */
  calculatePrice = kitProducts => {
    return kitProducts.reduce((kitPrice, kitProduct) => {
      const price = kitProduct.sku.seller.commertialOffer.Price
      return kitPrice + (price * (100.0 - kitProduct.discount)) / 100.0
    }, 0)
  }

  /**
   * Extract the information required of the KitProduct to be passed to the BuyButton
   * component.
   */
  getSkuItems = kitProducts => {
    return kitProducts.map(kitProduct => {
      return {
        skuId: String(kitProduct.sku.itemId),
        quantity: kitProduct.minQuantity,
        seller: parseInt(kitProduct.sku.seller.sellerId),
      }
    })
  }

  render() {
    const { kitProducts, loading } = this.props
    const numberOfItems = kitProducts.length

    return (
      <div className="vtex-product-kit__details flex flex-column items-center justify-center mh7">
        <FormattedMessage
          id="productKit.numberOfProductsTitle"
          values={{ numberOfItems }}
        />
        <div className="pv4">
          <ProductPrice
            styles={priceLoaderStyles}
            sellingPrice={!loading ? this.calculatePrice(kitProducts) : null}
            showInstallments={false}
            showListPrice={false}
          />
        </div>
        <BuyButton skuItems={!loading ? this.getSkuItems(kitProducts) : null}>
          <FormattedMessage id="productKit.buyTogether" />
        </BuyButton>
      </div>
    )
  }
}
