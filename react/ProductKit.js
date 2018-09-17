import './global.css'

import { path } from 'ramda'
import React, { Component, Fragment } from 'react'

import ProductKitContent from './components/ProductKitContent'
import ProductKitPropTypes from './prop-types/productKitPropTypes'

/**
 * ProductKit component.
 *
 * Wraps the ProductKitContent with a Fragment which has a key prop defined by
 * the `slug` of the product carried by the productQuery to force inner components
 * updates when a small change on the productQuery props occurs.
 */
export default class ProductKit extends Component {
  static propTypes = ProductKitPropTypes.props

  render() {
    const {
      productQuery: { product },
    } = this.props

    const benefits = path(['benefits'], product)

    /** The product does'nt have any Kit associated with it, in this case the
     * ProductKitContent should not be rendered  */
    if (benefits && !benefits.length) {
      return null
    }

    const slug = path(['slug'], product)

    return (
      <Fragment key={slug}>
        <ProductKitContent {...this.props} loading={!benefits} />
      </Fragment>
    )
  }
}
