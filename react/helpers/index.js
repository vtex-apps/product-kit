import { propEq, findIndex } from 'ramda'

/**
 * Helper functions to extract the Kit Items of a Product Kit and sets the first
 * item as the main item according to the mainProductId passed as an argument.
 */
export const extractItemsKit = (productsKit, mainProduct) => {
  const itemsKit = []
  let indexOfMainProduct = -1

  if (productsKit) {
    productsKit.forEach((productKit, index) => {
      const {
        benefitProduct,
        benefitSKUIds,
        discount,
        minQuantity,
      } = productKit

      if (benefitProduct.productId === mainProduct.productId && indexOfMainProduct === -1) {
        indexOfMainProduct = index
      }

      benefitSKUIds.forEach(skuId => {
        const indexOfItem = findIndex(propEq('itemId', skuId))(
          benefitProduct.items
        )

        if (indexOfItem !== -1) {
          itemsKit.push(
            extractKitItem({
              discount,
              minQuantity,
              product: {
                ...benefitProduct,
                items: [benefitProduct.items[indexOfItem]],
              },
            })
          )
        }
      })
    })
  }

  if (indexOfMainProduct !== -1) {
    const mainItem = itemsKit[indexOfMainProduct]
    itemsKit[indexOfMainProduct] = itemsKit[0]
    itemsKit[0] = mainItem
  }

  return itemsKit
}

/**
 * Extract the required information of a Product to be used into the
 * ProductKitItem component.
 */
export const extractKitItem = productKit => {
  const { discount, minQuantity, product } = productKit
  const kitItem = { ...product }

  if (kitItem.items && kitItem.items.length) {
    kitItem.sku = { ...kitItem.items[0] }
    kitItem.productName = kitItem.sku.nameComplete

    if (kitItem.sku.sellers && kitItem.sku.sellers.length) {
      kitItem.sku.seller = kitItem.sku.sellers[0]
    } else {
      kitItem.sku.seller = {
        commertialOffer: {
          Price: 0,
          ListPrice: 0,
        },
      }
    }

    if (kitItem.sku.images && kitItem.sku.images.length) {
      kitItem.sku.image = { ...kitItem.sku.images[0] }
      kitItem.sku.image.imageUrl = kitItem.sku.image.imageUrl.replace(
        /^https?:/,
        ''
      )
    }

    kitItem.sku.referenceId = (kitItem.sku.referenceId && kitItem.sku.referenceId[0]) || {
      Value: '',
    }
  }

  return { ...kitItem, discount, minQuantity }
}
