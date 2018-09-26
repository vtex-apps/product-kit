import PropTypes from 'prop-types'

export default {
  /** PropTypes of ProductKit component */
  propTypes: {
    /** Shows the product list price */
    showListPrice: PropTypes.bool,
    /** Set pricing labels' visibility */
    showLabels: PropTypes.bool,
    /** Set installments' visibility  */
    showInstallments: PropTypes.bool,
    /** Set the discount badge's visibility */
    showBadge: PropTypes.bool,
    /** Text shown on badge */
    badgeText: PropTypes.string,
    /** Product Query Data */
    productQuery: PropTypes.shape({
      /** Main Product of the Kit */
      product: PropTypes.shape({
        /** Product's id */
        productId: PropTypes.string,
        /** Product's name */
        productName: PropTypes.string,
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
        benefits: PropTypes.arrayOf(
          PropTypes.shape({
            featured: PropTypes.bool.isRequired,
            name: PropTypes.string.isRequired,
            items: PropTypes.arrayOf(
              PropTypes.shape({
                product: PropTypes.shape({
                  /** Product id */
                  productId: PropTypes.string.isRequired,
                  /** Product name */
                  productName: PropTypes.string.isRequired,
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
                                NumberOfInstallments:
                                  PropTypes.number.isRequired,
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
              })
            ),
          })
        ),
      }),
    }),
  },

  /** Default prop types values */
  defaultProps: {
    showListPrice: true,
    showLabels: false,
    showInstallments: false,
    showBadge: false,
    badgeText: '',
  },
}
