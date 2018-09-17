import './global.css'

import { path } from 'ramda'
import React, { Component, Fragment } from 'react'

import ProductKitContent from './components/ProductKitContent'
import ProductKitPropTypes from './prop-types/productKitPropTypes'
import ProductKitSchema from './schema/productKitSchema'

/**
 * ProductKit component.
 *
 * Wraps the ProductKitContent with a Fragment which has a key prop defined by
 * the `slug` of the product carried by the productQuery to force inner components
 * updates when a small change on the productQuery props occurs.
 */
export default class ProductKit extends Component {
  static propTypes = ProductKitPropTypes.props

  static defaultProps = ProductKitPropTypes.defaultProps

  static getSchema = ProductKitSchema

  render() {
    const {
      slug,
      productQuery: { product },

      showListPrice,
      showLabels,
      showInstallments,
      showBadge,
      badgeText,
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
      <Fragment key={slug}>
        <ProductKitContent
          loading={!benefits}
          content={content}
          viewOptions={{
            showListPrice,
            showLabels,
            showInstallments,
            showBadge,
            badgeText,
          }}
        />
      </Fragment>
    )
  }
}
