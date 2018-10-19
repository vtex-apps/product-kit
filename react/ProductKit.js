import './global.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { path } from 'ramda'
import { FormattedMessage } from 'react-intl';

import ProductKitListItem from './components/ProductKitListItem'
import Slider from 'vtex.store-components/Slider'

const KITS_PER_PAGE = 1

export default class ProductKit extends Component {
  static propTypes = {
    showArrows: PropTypes.bool,
    showDots: PropTypes.bool,
  }

  static defaultProps = {
    showArrows: true,
    showDots: true,
  }

  static schema = {}

  render() {
    const {
      showDots,
      showArrows,
      productQuery: { product, loading }
    } = this.props

    const productKitList = path(['benefits'], product)

    /** The product does not have any kit of products associated with it, 
     * in this case the component should not be rendered */
    if (loading || (productKitList && !productKitList.length)) {
      return null
    }

    return (
      <div className="vtex-page-padding vtex-product-kit-list">
        <div className="flex flex-column items-center justify-center">
          <div className="b ttu f4 mv7">
            <FormattedMessage id="productKitList.mountYourKit" />
          </div>
          <Slider
            sliderSettings={{
              dots: showDots,
              arrows: showArrows,
              slidesToShow: KITS_PER_PAGE
            }}>
            {productKitList.map(productKit => (
              <ProductKitListItem
                key={productKit.name}
                mainProduct={product}
                productKit={productKit}
              />
            ))}
          </Slider>
        </div>
      </div>
    )
  }
}