import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ProductSummary from 'vtex.product-summary/index'

import ProductKitButton from './ProductKitButton'
import ProductKitItemProps from '../props/productKitItemProps'

import defaultSwapIcon from '../images/default-swap-icon.svg'
import defaultRemovalIcon from '../images/default-removal-icon.svg'

/**
 * Product Kit Item component.
 * Display and provides management for an item of the kit.
 */
export default class ProductKitItem extends Component {
  static propTypes = {
    /** Product to be displayed as an item of the kit */
    item: ProductKitItemProps.product,
    /** Allow item swap flag */
    allowSwap: PropTypes.bool,
    /** Allow item removal flag */
    allowSwap: PropTypes.bool,
    /** Props of Product Summary */
    viewOptions: PropTypes.any,
  }

  /** TODO: manter os allows false por default, tá assim só por fins de teste rápido */
  static defaultProps = {
    allowSwap: true,
    allowRemoval: true,
  }

  render() {
    const { item, itemIndex, allowSwap, allowRemoval, onItemSwap, viewOptions } = this.props

    return (
      <div className="vtex-product-kit__item">
        <div className="flex flex-row">
          <ProductSummary product={item} {...viewOptions} hideBuyButton />
          <div className="flex flex-column items-center ma2 w2">
            {allowRemoval && <ProductKitButton icon={defaultRemovalIcon} />}
            {allowSwap && <ProductKitButton icon={defaultSwapIcon} />}
          </div>
        </div>
      </div>
    )
  }
}
