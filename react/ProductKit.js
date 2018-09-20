import './global.css'

import { path } from 'ramda'
import React, { Component } from 'react'

import ProductKitContent from './components/ProductKitContent'
import ProductKitProps from './props/productKitProps'
import ProductKitSchema from './schema/productKitSchema'

/**
 * ProductKit component.
 */
export default class ProductKit extends Component {
  static propTypes = ProductKitProps.propTypes

  static defaultProps = ProductKitProps.defaultProps

  static getSchema = ProductKitSchema

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

    // The product does not have any Kit associated with it, in this
    // case the ProductKitContent should not be rendered
    if (benefits && !benefits.length) {
      return null
    }

    // The content of the ProductKitContent component will be defined by
    // the first `item` of the set of benefits associated with the product
    const content = path(['0', 'items'], benefits)

    return (
      <ProductKitContent
        key={slug}
        content={content}
        viewOptions={{
          showListPrice,
          showLabels,
          showInstallments,
          showBadge,
          badgeText,
        }}
      />
    )
  }
}
