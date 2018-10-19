import './global.css'

import React, { Component } from 'react'

import { path, equals, findIndex, propEq } from 'ramda'
import { extractItemsKit } from './helpers'

import ProductKitSchema from './schema'
import { propTypes, defaultProps } from './props/productKitProps'

import ProductKitContent from './components/ProductKitContent'

const DEFAULT_MAX_VISIBLE_ITEMS = 3
const DEFAULT_VISIBLE_ITEMS = Array(DEFAULT_MAX_VISIBLE_ITEMS).fill(null)

/**
 * ProductKit component.
 * Wraps a ProductKitContent and manages the visibility of the items.
 */
export default class ProductKit extends Component {
  static propTypes = propTypes

  static defaultProps = defaultProps

  static getSchema = ProductKitSchema

  state = {
    numberOfVisibleItems: DEFAULT_MAX_VISIBLE_ITEMS,
    shownItems: DEFAULT_VISIBLE_ITEMS,
    hidenItems: [],
  }

  /**
   * Retrieve the items of a product.
   */
  getItems = product => {
    return path(['0', 'items'], path(['benefits'], product))
  }

  /**
   * When the component mounts it must update the shown and hiden items
   */
  componentDidMount() {
    this.updateComponentState(this.getItems(this.props.productQuery.product))
  }

  /**
   * Checks if the items data has changed since the last component
   * props update.
   */
  componentDidUpdate(prevProps) {
    const items = this.getItems(this.props.productQuery.product)
    const prevItems = this.getItems(prevProps.productQuery.product)

    if (
      equals(this.state.shownItems, DEFAULT_VISIBLE_ITEMS) ||
      !equals(items, prevItems)
    ) {
      this.updateComponentState(items)
    }
  }

  /**
   * Updates the shown and hiden items arrays with the content of the
   * items array passed as an argument. This function uses the helper
   * function to extract the items kit from the items data and sets the 
   * first item as the main item of the Kit.
   */
  updateComponentState = items => {
    const mainProductId = path(['productQuery', 'product', 'productId'], this.props)
    const itemsKit = extractItemsKit(items, mainProductId)

    if (itemsKit.length) {
      const { numberOfVisibleItems } = this.state

      this.setState({
        shownItems: itemsKit.slice(0, numberOfVisibleItems),
        hidenItems: itemsKit.slice(numberOfVisibleItems),
      })
    }
  }

  /**
   * Receives the index of the item of the shownItems array and swap it by the
   * first item of the hidenItems array, the swapped item will be pushed at the end
   * of the hidenItems.
   */
  handleItemSwap = index => {
    const { shownItems, hidenItems } = this.state
    const item = shownItems[index]

    shownItems[index] = hidenItems.shift()
    hidenItems.push(item)

    this.setState({
      shownItems,
      hidenItems,
    })
  }

  /**
   * Receives the index of the item of the shownItems array and remove it from the 
   * shownItems array, besides it push the removed element at the end of the hidenItems 
   * array and display one less product in the kit.
   */
  handleItemRemoval = index => {
    const { shownItems, hidenItems, numberOfVisibleItems } = this.state

    hidenItems.push(shownItems.splice(index, 1)[0])

    this.setState({
      shownItems,
      hidenItems,
      numberOfVisibleItems: numberOfVisibleItems - 1
    })
  }

  render() {
    const {
      showBadge,
      badgeText,
      showLabels,
      showListPrice,
      showInstallments,
      productQuery: { product, loading },
    } = this.props

    const benefits = path(['benefits'], product)

    /** The product does not have any Kit associated with it, in this case
     *  the ProductKitContent should not be rendered */
    if (loading || (benefits && !benefits.length)) return null

    /** Shown and Hiden items */
    const { shownItems, hidenItems, numberOfVisibleItems } = this.state

    /** Allow item swap only if there's hiden items */
    const allowSwap = hidenItems.length > 0
    const allowRemoval = hidenItems.length > 0 && numberOfVisibleItems > 2

    return (
      <div className="vtex-page-padding">
        <ProductKitContent
          allowSwap={allowSwap}
          allowRemoval={allowRemoval}
          itemsKit={shownItems}
          viewOptions={{
            showBadge,
            badgeText,
            showLabels,
            showListPrice,
            showInstallments,
          }}
          onItemSwap={this.handleItemSwap}
          onItemRemoval={this.handleItemRemoval}
        />
      </div>
    )
  }
}
