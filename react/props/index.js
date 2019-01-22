import PropTypes from 'prop-types'

import defaultPlusIcon from '../images/default-plus-icon.svg'
import defaultEqualsIcon from '../images/default-equals-icon.svg'
import defaultSwapIcon from '../images/default-swap-icon.svg'
import defaultRemovalIcon from '../images/default-removal-icon.svg'

export const summaryShape = PropTypes.shape({
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
  /** Product summary classes */
  productSummaryClasses: PropTypes.string,
})

export const productShape = PropTypes.shape({
  /** Product's link text */
  linkText: PropTypes.string.isRequired,
  /** Product's name */
  productName: PropTypes.string.isRequired,
  /** Product's brand */
  brand: PropTypes.string.isRequired,
  /** Product's SKU */
  sku: PropTypes.shape({
    /** SKU name */
    name: PropTypes.string.isRequired,
    /** SKU id */
    itemId: PropTypes.string.isRequired,
    /** SKU Image to be shown */
    image: PropTypes.shape({
      /** Image URL */
      imageUrl: PropTypes.string.isRequired,
      /** Image tag as string */
      imageTag: PropTypes.string.isRequired,
    }).isRequired,
    /** SKU seller */
    seller: PropTypes.shape({
      /** Seller comertial offer */
      commertialOffer: PropTypes.shape({
        /** SKU installments */
        Installments: PropTypes.arrayOf(
          PropTypes.shape({
            /** Installment value */
            Value: PropTypes.number.isRequired,
            /** Interest rate (zero if interest-free) */
            InterestRate: PropTypes.number.isRequired,
            /** Calculated total value */
            TotalValuePlusInterestRate: PropTypes.number,
            /** Number of installments */
            NumberOfInstallments: PropTypes.number.isRequired,
            /** Installments offer name */
            Name: PropTypes.string,
          })
        ),
        /** Selling Price */
        Price: PropTypes.number.isRequired,
        /** List Price */
        ListPrice: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  /** Product's collections */
  productClusters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
})

export const benefitShape = PropTypes.shape({
  items: PropTypes.arrayOf(PropTypes.shape({
    /** Benefit Product */
    benefitProduct: PropTypes.shape({
      /** SKU's id */
      skuId: PropTypes.string,
      /** Product slug */
      slug: PropTypes.string.isRequired,
      /** Product Query from the graphql */
      productQuery: PropTypes.shape({
        /** Product that owns the informations */
        product: PropTypes.shape({
          /** Product's id */
          productId: PropTypes.string.isRequired,
          /** Product's name */
          productName: PropTypes.string.isRequired,
          /** Product reference */
          productReference: PropTypes.string,
          /** Product's brand */
          brand: PropTypes.string,
          /** Product's SKUs */
          items: PropTypes.arrayOf(
            PropTypes.shape({
              /** SKU id */
              itemId: PropTypes.string.isRequired,
              /** SKU name */
              name: PropTypes.string.isRequired,
              /** SKU Images to be shown */
              images: PropTypes.arrayOf(
                PropTypes.shape({
                  /** Image id */
                  imageId: PropTypes.string.isRequired,
                  /** Image label */
                  imageLabel: PropTypes.string,
                  /** Image tag as string */
                  imageTag: PropTypes.string,
                  /** Image URL */
                  imageUrl: PropTypes.string.isRequired,
                  /** Image text */
                  imageText: PropTypes.string.isRequired,
                })
              ).isRequired,
              /** SKU sellers */
              sellers: PropTypes.arrayOf(
                PropTypes.shape({
                  /** Seller id */
                  sellerId: PropTypes.string.isRequired,
                  /** Seller comertial offer */
                  commertialOffer: PropTypes.shape({
                    /** SKU installments */
                    Installments: PropTypes.arrayOf(
                      PropTypes.shape({
                        /** Installment value */
                        Value: PropTypes.number.isRequired,
                        /** Interest rate (zero if interest-free) */
                        InterestRate: PropTypes.number.isRequired,
                        /** Calculated total value */
                        TotalValuePlusInterestRate: PropTypes.number,
                        /** Number of installments */
                        NumberOfInstallments: PropTypes.number.isRequired,
                        /** Installments offer name */
                        Name: PropTypes.string,
                      })
                    ),
                    /** Selling Price */
                    Price: PropTypes.number.isRequired,
                    /** List Price */
                    ListPrice: PropTypes.number.isRequired,
                  }).isRequired,
                })
              ).isRequired,
            })
          ).isRequired,
        }),
        /** Loading info */
        loading: PropTypes.bool.isRequired,
      }),
      /** Share Schema properties */
      share: PropTypes.shape({
        /** Social Networks configuration */
        social: PropTypes.object.isRequired,
      }),
    }),
    /** List of SKUS of the above product which belongs to the benefit */
    benefitSKUIds: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
    /** Discount of the product according to the benefit */
    discount: PropTypes.number.isRequired,
    /** Minimum quantity of the product to validate the benefit */
    minQuantity: PropTypes.number.isRequired,
  })).isRequired,
})

export const propTypes = {
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
  /** Plus icon */
  plusIcon: PropTypes.any,
  /** Equals icon */
  equalsIcon: PropTypes.any,
  /** Swap icon */
  swapIcon: PropTypes.string,
  /** Removal icon */
  removalIcon: PropTypes.string,
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
      benefits: PropTypes.arrayOf(
        benefitShape
      ),
    }).isRequired,
  }).isRequired,
}

export const defaultProps = {
  showArrows: true,
  showDots: true,
  showListPrice: true,
  showLabel: false,
  showInstallments: false,
  showBadge: true,
  showCollections: true,
  allowSwap: true,
  allowRemoval: true,
  swapIcon: defaultSwapIcon,
  removalIcon: defaultRemovalIcon,
  plusIcon: defaultPlusIcon,
  equalsIcon: defaultEqualsIcon,
}
