import './global.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { path } from 'ramda'
import { FormattedMessage } from 'react-intl'

import Slider from 'vtex.store-components/Slider'
import ProductKitListItem from './components/ProductKitListItem'

import defaultPlusIcon from './images/default-plus-icon.svg'
import defaultEqualsIcon from './images/default-equals-icon.svg'

import defaultSwapIcon from './images/default-swap-icon.svg'
import defaultRemovalIcon from './images/default-removal-icon.svg'

const KITS_PER_PAGE = 1

export default class ProductKit extends Component {
  static propTypes = {
    /** Slick Slider */
    showArrows: PropTypes.bool,
    showDots: PropTypes.bool,
    nextArrow: PropTypes.any,
    prevArrow: PropTypes.any,
    dots: PropTypes.any,

    /** Product Summary */
    showListPrice: PropTypes.bool,
    showLabel: PropTypes.bool,
    showInstallments: PropTypes.bool,
    showBadge: PropTypes.bool,
    badgeText: PropTypes.text,
    showCollections: PropTypes.bool,

    /** Separator */
    plusIcon: PropTypes.any,
    equalsIcon: PropTypes.any,

    /** Component Operations */
    allowSwap: PropTypes.bool,
    allowRemoval: PropTypes.bool,

    /** Query */
    productQuery: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      product: PropTypes.shape({
        productId: PropTypes.number.isRequired,
        benefits: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string.isRequired,
          // Finish this prop types validation
          items: PropTypes.arrayOf(PropTypes.object).isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    /** Slick Slider */
    showArrows: true,
    showDots: true,

    /** Product Summary */
    showListPrice: true,
    showLabel: true,
    showInstallments: true,
    showBadge: true,
    showCollections: true,

    /** Component Operations  */
    allowSwap: true,
    allowRemoval: true,

    plusIcon: defaultPlusIcon,
    equalsIcon: defaultEqualsIcon,

    swapIcon: defaultSwapIcon,
    removalIcon: defaultRemovalIcon,
  }

  // static getSchema = ({ showArrows, showDots, showBadge }) => {
  //   return {
  //     title: 'editor.productKitList.title',
  //     description: 'editor.productKitList.description',
  //     type: 'object',
  //     properties: {
  //       allowSwap: {
  //         type: 'boolean',
  //         title: 'editor.productKitList.allowSwap',
  //         default: true,
  //         isLayout: false,
  //       },
  //       allowRemoval: {
  //         type: 'boolean',
  //         title: 'editor.productKitList.allowRemoval',
  //         default: true,
  //         isLayout: false,
  //       },
  //       showArrows: {
  //         type: 'boolean',
  //         title: 'editor.productKitList.showArrows',
  //         default: true,
  //         isLayout: true,
  //       },
  //       nextArrow: showArrows ? {
  //         type: 'string',
  //         title: 'editor.productKitList.nextArrow',
  //         default: '',
  //         isLayout: false,
  //         widget: {
  //           'ui:widget': 'image-uploader',
  //         },
  //       } : {},
  //       prevArrow: showArrows ? {
  //         type: 'string',
  //         title: 'editor.productKitList.prevArrow',
  //         default: '',
  //         isLayout: false,
  //         widget: {
  //           'ui:widget': 'image-uploader',
  //         },
  //       } : {},
  //       showDots: {
  //         type: 'boolean',
  //         title: 'editor.productKitList.showDots',
  //         default: true,
  //         isLayout: true,
  //       },
  //       dot: showDots ? {
  //         type: 'string',
  //         title: 'editor.productKitList.dot',
  //         default: '',
  //         isLayout: false,
  //         widget: {
  //           'ui:widget': 'image-uploader',
  //         },
  //       } : {},
  //       showListPrice: {
  //         type: 'boolean',
  //         title: 'editor.productKitList.showListPrice',
  //         default: true,
  //         isLayout: true,
  //       },
  //       showLabels: {
  //         type: 'boolean',
  //         title: 'editor.productKitList.showLabels',
  //         default: false,
  //         isLayout: true,
  //       },
  //       showInstallments: {
  //         type: 'boolean',
  //         title: 'editor.productKitList.showInstallments',
  //         default: false,
  //         isLayout: true,
  //       },
  //       showBadge: {
  //         type: 'boolean',
  //         title: 'editor.productKitList.showBadge',
  //         default: false,
  //         isLayout: true,
  //       },
  //       badgeText: showBadge
  //         ? {
  //           type: 'string',
  //           title: 'editor.productKitList.badgeText',
  //           isLayout: false,
  //         }
  //         : {},
  //       plusIcon: {
  //         type: 'string',
  //         title: 'editor.productKitList.plusIcon',
  //         isLayout: false,
  //         default: '',
  //         widget: {
  //           'ui:widget': 'image-uploader',
  //         },
  //       },
  //       equalsIcon: {
  //         type: 'string',
  //         title: 'editor.productKitList.equalsIcon',
  //         isLayout: false,
  //         default: '',
  //         widget: {
  //           'ui:widget': 'image-uploader',
  //         },
  //       },
  //     }
  //   }
  // }

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

    return (
      <div className="vtex-page-padding vtex-product-kit-list">
        <div className="flex flex-column items-center justify-center">
          <div className="b ttu f4 mv7">
            <FormattedMessage id="productKitList.mountYourKit" />
          </div>
          <Slider
            sliderSettings={{
              arrows: showArrows,
              prevArrow,
              nextArrow,
              dots: showDots,
              appendDots: dots,
              slidesToShow: KITS_PER_PAGE
            }}>
            {productKitList.map((productKit, index) => (
              <ProductKitListItem
                key={index}
                baseProduct={product}
                productKit={productKit}
                summaryProps={{
                  showListPrice,
                  showLabel,
                  showInstallments,
                  showBadge,
                  badgeText,
                  showCollections,
                }}
                separatorProps={{
                  plusIcon,
                  equalsIcon,
                }}
                operationsProps={{
                  allowSwap,
                  allowRemoval,
                  swapIcon,
                  removalIcon,
                }}
              />
            ))}
          </Slider>
        </div>
      </div>
    )
  }
}