import React, { Component } from 'react'
import Slider from 'vtex.store-components/Slider'
import { FormattedMessage } from 'react-intl'
import { path } from 'ramda'

import './global.css'

import ProductKitContent from './components/ProductKitContent'
import { schema } from './schema/index'
import { propTypes, defaultProps } from './props/index'

/** Slick slider should display at most one Product Kit per time */
const KITS_PER_TIME = 1

/**
 * ProductKit component.
 * Display a list of Kits of Products inside a Slick Slider compone nt.
 */
export default class ProductKit extends Component {
  static getSchema = schema

  static propTypes = propTypes

  static defaultProps = defaultProps

  render() {
    const {
      showArrows,
      prevArrow,
      nextArrow,
      showDots,
      dots,
      showListPrice,
      showLabel,
      showInstallments,
      showBadge,
      badgeText,
      showCollections,
      allowSwap,
      allowRemoval,
      plusIcon,
      equalsIcon,
      swapIcon,
      removalIcon,
      productQuery: { product, loading },
    } = this.props

    const productKitList = path(['benefits'], product)

    /** The product does not have any kit of products associated with it,
     * in this case the component should not be rendered */
    if (loading || (productKitList && !productKitList.length)) {
      return null
    }

    /** The component should be displayed only in large screens for a while */
    return (
      <div className="vtex-product-kit-list vtex-page-padding dn db-ns">
        <div className="flex flex-column items-center justify-center">
          <div className="t-heading-3 mv7">
            <FormattedMessage id="productKitList.mountYourKit" />
          </div>
          <Slider
            sliderSettings={{
              arrows: showArrows,
              prevArrow,
              nextArrow,
              dots: showDots,
              appendDots: dots,
              slidesToShow: KITS_PER_TIME,
            }}>
            {productKitList.map((productKit, index) => (
              <ProductKitContent
                key={index}
                baseProduct={product}
                productKit={productKit}
                plusIcon={plusIcon}
                equalsIcon={equalsIcon}
                allowSwap={allowSwap}
                allowRemoval={allowRemoval}
                swapIcon={swapIcon}
                removalIcon={removalIcon}
                summaryProps={{
                  showListPrice,
                  showLabel,
                  showInstallments,
                  showBadge,
                  badgeText,
                  showCollections,
                }}
              />
            ))}
          </Slider>
        </div>
      </div>
    )
  }
}
