
import React, { Component } from 'react'

import { equals } from 'ramda'
import { extractItemsKit } from '../helpers'

import ProductKitContent from './ProductKitContent';

const DEFAULT_MAX_VISIBLE_ITEMS = 3
const DEFAULT_VISIBLE_ITEMS = Array(DEFAULT_MAX_VISIBLE_ITEMS).fill(null)

/**
 * ProductKitContainer component.
 * 
 * Wraps a ProductKitContent and manages de shown and hiden items kit.
 */
export default class ProductKitContainer extends Component {
  state = {
    shownItems: DEFAULT_VISIBLE_ITEMS,
    hidenItems: [],
  }

  /**
   * When the component mounts it must update the shown and hiden items
   */
  componentDidMount() {
    this.updateComponentState(this.props.items)
  }

  /**
   * Checks if the items data has changed since the last component 
   * props update.
   */
  componentDidUpdate(prevProps) {
    const { items } = this.props
    const { shownItems } = this.state

    if (equals(shownItems, DEFAULT_VISIBLE_ITEMS) || !equals(prevProps.items, items)) {
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
    const { shownItems, hidenItems } = this.state
    const { viewOptions } = this.props

    /** The component is loading if the shown items has the default content */
    const loading = equals(shownItems, DEFAULT_VISIBLE_ITEMS)

    /** Allow item swap only if there's hiden items */
    const allowSwap = hidenItems.length > 0

    return (
      <ProductKitContent 
        loading={loading}
        allowSwap={allowSwap}
        itemsKit={shownItems} 
        viewOptions={viewOptions}
        onItemSwap={this.handleItemSwap}
      />
    )
  }
}