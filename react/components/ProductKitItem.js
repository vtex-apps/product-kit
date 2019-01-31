import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ProductSummary from 'vtex.product-summary/index'
import { IconRemove, IconSwap } from 'vtex.dreamstore-icons'

import { productShape, summaryShape } from '../props'
import styles from '../styles.css'

/**
 * ProductKitItem component.
 *
 * Displays a product as an item of a kit of products and provides
 * the buttons to trigger the swap and removal item operations.
 */
export default class ProductKitItem extends Component {
  static propTypes = {
    /** Product item */
    item: productShape,
    /** Index of the item */
    index: PropTypes.number,
    /** Function that is called to handle the item swap operation */
    onItemSwap: PropTypes.func,
    /** Function that is called to handle the item removal operation */
    onItemRemoval: PropTypes.func,
    /** Allow or not the item swap */
    allowSwap: PropTypes.bool,
    /** Allow or not the item removal */
    allowRemoval: PropTypes.bool,
    /** Product Summary Props */
    summaryProps: summaryShape,
  }

  render() {
    const {
      item,
      index,
      allowSwap,
      allowRemoval,
      onItemSwap,
      onItemRemoval,
      summaryProps,
    } = this.props

    return (
      <div className={styles.item}>
        <div className="flex flex-row">
          <div className="pl4" >
            <ProductSummary
              hideBuyButton
              product={item}
              {...summaryProps}
            />
          </div>
          <div className="flex flex-column items-center w2">
            {allowRemoval &&
              <div className="pointer flex items-center mh3 mv3 c-on-base"
                onClick={() => onItemRemoval(index)}>
                <IconRemove size={21} viewBox="0 0 21 21" className="w1 h1" />
              </div>
            }
            {allowSwap &&
              <div className="pointer flex items-center mh3 mv3 c-on-base"
                onClick={() => onItemSwap(index)}>
                <IconSwap size={21} viewBox="0 0 21 21" className="w1 h1" />
              </div>
            }
          </div>
        </div>
      </div >
    )
  }
}
