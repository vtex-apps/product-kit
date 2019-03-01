import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { equals } from 'ramda'

import { IconPlus, IconEquals } from 'vtex.store-icons'

import ProductKitItem from './ProductKitItem'
import ProductKitDetails from './ProductKitDetails'
import { extractItemsKit } from '../helpers/index'
import { benefitShape, summaryShape } from '../props/index'
import styles from '../styles.css'

const DEFAULT_VISIBLE_ITEMS = 3

/**
 * ProductKitContent component.
 * Manages the operations over the items of a ProductKit.
 */
export default class ProductKitContent extends Component {
  static propTypes = {
    /** Product kit */
    productKit: benefitShape,
    /** Base product of the kit */
    baseProduct: PropTypes.shape({
      /** Id of the product */
      productId: PropTypes.string.isRequired,
    }),
    /** Product Summary Props */
    summaryProps: summaryShape,
    /** Allow or not the item swap */
    allowSwap: PropTypes.bool,
    /** Allow or not the item removal */
    allowRemoval: PropTypes.bool,
  }

  state = {
    shownItems: [],
    hiddenItems: [],
    numberOfVisibleItems: DEFAULT_VISIBLE_ITEMS,
  }

  /**
   * Updates the shown and hidden items arrays with the content of the
   * items array passed as an argument. This function uses the helper
   * function to extract the items kit from the items data.
   */
  updateComponentState = items => {
    const itemsKit = extractItemsKit(items, this.props.baseProduct)
    const { numberOfVisibleItems } = this.state

    this.setState({
      shownItems: itemsKit.slice(0, numberOfVisibleItems),
      hiddenItems: itemsKit.slice(numberOfVisibleItems),
    })
  }

  /**
   * When the component mounts it must update the shown and hidden items.
   */
  componentDidMount() {
    this.updateComponentState(this.props.productKit.items)
  }

  /**
   * Checks if the items data has changed since the last update of the props.
   */
  componentDidUpdate(prevProps) {
    const {
      productKit: { items: curItems },
    } = this.props
    const {
      productKit: { items: prevItems },
    } = prevProps

    if (!this.state.shownItems.length || !equals(curItems, prevItems)) {
      this.updateComponentState(curItems)
    }
  }

  /**
   * Receives the index of the item of the shownItems array and swap it by the
   * first item of the hiddenItems array, the swapped item will be pushed at the end
   * of the hiddenItems.
   */
  handleItemSwap = index => {
    const { shownItems, hiddenItems } = this.state
    const item = shownItems[index]

    shownItems[index] = hiddenItems.shift()
    hiddenItems.push(item)

    this.setState({
      shownItems,
      hiddenItems,
    })
  }

  /**
   * Receives the index of the item and handles the removal of it ProductKitItem wrapper component.
   * An important observation here is that the item kit itself is not removed from the kit,
   * it is just putted at the end of the hiddenItems array.
   */
  handleItemRemoval = index => {
    const { shownItems, hiddenItems, numberOfVisibleItems } = this.state

    hiddenItems.push(shownItems.splice(index, 1)[0])

    this.setState({
      shownItems,
      hiddenItems,
      numberOfVisibleItems: numberOfVisibleItems - 1,
    })
  }

  render() {
    const { summaryProps } = this.props

    const { shownItems, hiddenItems, numberOfVisibleItems } = this.state

    /** Allow swap operation if and only if there is hidden items */
    const allowSwap = this.props.allowSwap && hiddenItems.length > 0

    /** Allow removal operation if and only if the kit has more than two visible items */
    const allowRemoval = this.props.allowRemoval && numberOfVisibleItems > 2

    return (
      <div
        className={`${
          styles.container
        } flex flex-row items-center justify-center b--muted-5 pv3 w-100`}
      >
        {shownItems.map((item, index) => (
          <div
            className="flex flex-row items-center justify-center c-muted-1"
            key={index}
          >
            {index > 0 && <IconPlus size={45} className="w2" />}
            <ProductKitItem
              key={index}
              item={item}
              index={index}
              summaryProps={summaryProps}
              onItemSwap={this.handleItemSwap}
              onItemRemoval={this.handleItemRemoval}
              allowSwap={index > 0 && allowSwap}
              allowRemoval={index > 0 && allowRemoval}
            />
          </div>
        ))}
        <span className="c-muted-1">
          <IconEquals size={44} viewBox="0 0 44 22" className="w2" />
        </span>
        <ProductKitDetails items={shownItems} />
      </div>
    )
  }
}
