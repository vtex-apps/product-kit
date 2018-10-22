import PropTypes from 'prop-types'
import productPropTypes from 'vtex.product-details/propTypes'

export default {
  /** Slick Slider Props */

  /** Show or not the arrows */
  showArrows: PropTypes.bool,
  /** Show or not the dots */
  showDots: PropTypes.bool,
  /** Next arrow icon */
  nextArrow: PropTypes.any,
  /** Previous arrow icon */
  prevArrow: PropTypes.any,
  /** Dots icon */
  dots: PropTypes.any,

  /** Product Summary */

  /** Show or not the list price */
  showListPrice: PropTypes.bool,
  /** Show or not the labels "from" and "to" */
  showLabel: PropTypes.bool,
  /** Show or not the installments */
  showInstallments: PropTypes.bool,
  /** Show or not the discount badge */
  showBadge: PropTypes.bool,
  /** Text of the discount badge */
  badgeText: PropTypes.string,
  /** Show or not the collections badges */
  showCollections: PropTypes.bool,

  /** Separator */

  /** Plus icon */
  plusIcon: PropTypes.any,
  /** Equals icon */
  equalsIcon: PropTypes.any,

  /** Component Operations */

  /** Allow or not the item swap */
  allowSwap: PropTypes.bool,
  /** Allow or not the item removal */
  allowRemoval: PropTypes.bool,

  /** Product Query */
  productQuery: PropTypes.shape({
    /** Query is loading or not */
    loading: PropTypes.bool.isRequired,
    /** Product */
    product: PropTypes.shape({
      /** Product ID */
      productId: PropTypes.string.isRequired,
      /** Benefits associated with the product */
      benefits: PropTypes.arrayOf(PropTypes.shape({
        /** Items Product of the benefits */
        items: PropTypes.arrayOf(PropTypes.shape({
          /** Benefit Product */
          benefitProduct: productPropTypes.isRequired,
          /** List of SKUS of the above product which belongs to the benefit */
          benefitSKUIds: PropTypes.arrayOf(
            PropTypes.string,
          ).isRequired,
          /** Discount of the product according to the benefit */
          discount: PropTypes.number.isRequired,
          /** Minimum quantity of the product to validate the benefit */
          minQuantity: PropTypes.number.isRequired,
        })).isRequired,
      })),
    }).isRequired,
  }).isRequired,
}