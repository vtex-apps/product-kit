import './global.css'

import React, { Component } from 'react'

import { path, equals } from 'ramda'
import { extractItemsKit } from './helpers'

import { getSchema } from './schema'
import { propTypes, defaultProps } from './props/productKitProps'

import ProductKitContent from './components/ProductKitContent'

const DEFAULT_MAX_VISIBLE_ITEMS = 3
const DEFAULT_VISIBLE_ITEMS = Array(DEFAULT_MAX_VISIBLE_ITEMS).fill(null)

/**
 * ProductKit component.
 * Wraps a ProductKitContent and manages de shown and hiden items kit.
 */
export default class ProductKit extends Component {
  static propTypes = propTypes

  static defaultProps = defaultProps

  static getSchema = getSchema

  state = {
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
   * function to extract the items kit from the items data.
   */
  updateComponentState = items => {
    const itemsKit = extractItemsKit(items)

    if (itemsKit.length) {
      this.setState({
        shownItems: itemsKit.slice(0, DEFAULT_MAX_VISIBLE_ITEMS),
        hidenItems: itemsKit.slice(DEFAULT_MAX_VISIBLE_ITEMS),
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

  render() {
    const {
      showBadge,
      badgeText,
      showLabels,
      showListPrice,
      showInstallments,
      productQuery: { product },
    } = this.props

    const benefits = path(['benefits'], product)

    /** The product does not have any Kit associated with it, in this case
     *  the ProductKitContent should not be rendered */
    if (benefits && !benefits.length) return null

    /** Shown and Hiden items */
    const { shownItems, hidenItems } = this.state

    /** The component is loading if the shown items has the default content */
    const loading = equals(shownItems, DEFAULT_VISIBLE_ITEMS)

    /** Allow item swap only if there's hiden items */
    const allowSwap = hidenItems.length > 0

    return (
      <div className="vtex-page-padding">
        <ProductKitContent
          loading={loading}
          allowSwap={allowSwap}
          itemsKit={shownItems}
          viewOptions={{
            showBadge,
            badgeText,
            showLabels,
            showListPrice,
            showInstallments,
          }}
          onItemSwap={this.handleItemSwap}
        />
      </div>
    )
  }
}
