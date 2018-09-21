import './global.css'

import React, { Component } from 'react'

import { path } from 'ramda'

import { getSchema } from './schema'
import { propTypes, defaultProps } from './props/productKitProps'

import ProductKitContainer from './components/ProductKitContainer'

/**
 * ProductKit component.
 * 
 * Retrieves the content of the a product kit from the product query 
 * and passed it to the ProductKitContainer wrapped component.
 */
export default class ProductKit extends Component {
  static propTypes = propTypes

  static defaultProps = defaultProps

  static getSchema = getSchema

  render() {
    const {
      slug,
      showBadge,
      badgeText,
      showLabels,
      showListPrice,
      showInstallments,
      productQuery: { product },
    } = this.props

    const benefits = path(['benefits'], product)

    /** The product does not have any Kit associated with it, in this case 
     *  the ProductKitContent should not be rendered */
    if (benefits && !benefits.length)
      return null

    /** The content of the ProductKitContent component will be defined by 
     *  the first `item` of the set of benefits associated with the product */
    const items = path(['0', 'items'], benefits)

    return (
      <div className="vtex-page-padding" key={slug}>
        <ProductKitContainer
          items={items}
          viewOptions={{
            showListPrice,
            showLabels,
            showInstallments,
            showBadge,
            badgeText,
          }}
        />
      </div>
    )
  }
}
