import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { equals } from 'ramda'
import { extractItemsKit } from '../helpers/index'

import ProductKitItem from './ProductKitItem'
import ProductKitDetails from './ProductKitDetails'

const DEFAULT_VISIBLE_ITEMS = 3

export default class ProductKitContent extends Component {
  // static propTypes = {
  //   // TODO: Update proptypes
  //   productKit: PropTypes.any,
  // }

  // static defaultProps = {
  //   allowSwap: true,
  //   allowRemoval: true,
  //   showBadge: true,
  //   badgeText: '',
  //   showLabels: true,
  //   showListPrice: true,
  //   showInstallments: true,
  // }

  state = {
    shownItems: [],
    hidenItems: [],
    numberOfVisibleItems: DEFAULT_VISIBLE_ITEMS,
  }

  updateComponentState = items => {
    const itemsKit = extractItemsKit(items, this.props.baseProduct)
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

    hidenItems.push(shownItems.splice(index, 1)[0])

    this.setState({
      shownItems,
      hidenItems,
      numberOfVisibleItems: numberOfVisibleItems - 1,
    })
  }

  render() {
    const {
      summaryProps,
      separatorProps: { plusIcon, equalsIcon },
      operationsProps: { allowRemoval, allowSwap, swapIcon, removalIcon },
    } = this.props

    const { shownItems } = this.state

    return (
      <div className="vtex-product-kit flex flex-row items-center justify-center ba b--black-05 br1 pv6 w-100">
        {shownItems.map((item, index) => (
          <div className="flex flex-row items-center justify-center" key={index}>
            {index > 0 && (
              <img className="w2" src={plusIcon} />
            )}
            <ProductKitItem
              key={index}
              item={item}
              index={index}
              summaryProps={summaryProps}
              onItemSwap={this.handleItemSwap}
              onItemRemoval={this.handleItemRemoval}
              allowSwap={index > 0 && allowSwap}
              allowRemoval={index > 0 && allowRemoval}
              swapIcon={swapIcon}
              removalIcon={removalIcon}
            />
          </div>
        ))}
        <img className="w2" src={equalsIcon} />
        <ProductKitDetails items={shownItems} />
      </div>
    )
  }
}