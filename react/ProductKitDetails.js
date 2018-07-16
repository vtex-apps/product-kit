import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { FormattedMessage } from 'react-intl'

import { ProductPrice, BuyButton } from 'vtex.store-components'

/**
 * Product Kit Details component.
 * Show the details (price and number of items) of the Kit.
 */
export default class ProductKitDetails extends PureComponent {
  static propTypes = {
    /** Price of the kit */
    price: PropTypes.number.isRequired,
    /** Number of items in the kit */
    numberOfItems: PropTypes.number.isRequired,
  }

  static defaultProps = {
    price: 0,
    numberOfItems: 0,
  }

  render() {
    const {
      price,
      numberOfItems,
    } = this.props

    return (
      <div className="vtex-product-kit__details flex flex-column items-center justify-center mh7">
        <FormattedMessage
          id="productKit.numberOfProductsTitle"
          values={{ numberOfItems }} />
        <div className="pv4">
          <ProductPrice
            sellingPrice={price}
            showInstallments={false}
            showListPrice={false} />
        </div>
        <BuyButton>
          <FormattedMessage id="productKit.buyTogether" />
        </BuyButton>
      </div>
    )
  }
}
