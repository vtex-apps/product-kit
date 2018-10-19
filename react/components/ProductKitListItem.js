import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { equals } from 'ramda'
import { extractItemsKit } from '../helpers/index'

import defaultPlusIcon from '../images/default-plus-icon.svg'

import ProductKitItem from './ProductKitItem'
import ProductKitSeparator from './ProductKitSeparator'

const DEFAULT_VISIBLE_ITEMS = 3

export default class ProductKitListItem extends Component {
  static propTypes = {
    // TODO: Update proptypes
    productKit: PropTypes.any,
  }

  static defaultProps = {
    allowSwap: true,
    allowRemoval: true,
    showBadge: true,
    badgeText: '',
    showLabels: true,
    showListPrice: true,
    showInstallments: true,
  }

  state = {
    shownItems: [],
    hidenItems: [],
    numberOfVisibleItems: DEFAULT_VISIBLE_ITEMS,
  }

  updateComponentState = items => {
    const itemsKit = extractItemsKit(items, this.props.mainProduct)
    const { numberOfVisibleItems } = this.state

    this.setState({
      shownItems: itemsKit.slice(0, numberOfVisibleItems),
      hidenItems: itemsKit.slice(numberOfVisibleItems),
    })
  }

  componentDidMount() {
    this.updateComponentState(this.props.productKit.items)
  }

  componentDidUpdate(prevProps) {
    const { productKit: { items: curItems } } = this.props
    const { productKit: { items: prevItems } } = prevProps

    if (!this.state.shownItems.length || !equals(curItems, prevItems)) {
      this.updateComponentState(curItems)
    }
  }

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

  handleItemRemoval = index => {
    const { shownItems, hidenItems, numberOfVisibleItems } = this.state

    hidenItems.push([shownItems.splice(index, 1)])

    this.setState({
      shownItems,
      hidenItems,
      numberOfVisibleItems: numberOfVisibleItems - 1,
    })
  }

  render() {
    const {
      showBadge,
      badgeText,
      showLabels,
      showListPrice,
      showInstallments,
      allowSwap,
      allowRemoval,
    } = this.props

    const { shownItems } = this.state

    return (
      <div className="vtex-product-kit">
        <div className="flex flex-row items-center justify-center ba b--black-05 pa5 w-100">
          {shownItems.map((item, index) => (
            <div className="flex flex-row" key={index}>
              {index > 0 && (
                <ProductKitSeparator icon={defaultPlusIcon} />
              )}
              <ProductKitItem
                item={item}
                itemIndex={index}
                onItemSwap={this.handleItemSwap}
                onItemRemoval={this.handleItemRemoval}
                viewOptions={{
                  showBadge,
                  badgeText,
                  showLabels,
                  showListPrice,
                  showInstallments,
                }}
                allowSwap={allowSwap && index > 0}
                allowRemoval={allowRemoval && index > 0}
              />
            </div>
          ))}
          {/* <ProductKitSeparator icon={defaultEqualsIcon} /> */}
          {/* <ProductKitDetails items={itemsKit} /> */}
        </div>
      </div>
    )
  }
}