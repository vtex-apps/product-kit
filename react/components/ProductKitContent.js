import React, { Component, Fragment } from 'react'

import { FormattedMessage } from 'react-intl'

import ProductKitDetails from './ProductKitDetails'
import ProductKitItem from './ProductKitItem'

import defaultPlusIcon from '../images/default-plus-icon.svg'
import defaultEqualsIcon from '../images/default-equals-icon.svg'

import ProductKitSeparator from './ProductKitSeparator';

import Slider from 'vtex.store-components/Slider'

/**
 * ProductKitContent component.
 * Displays a list of items which composes a kit.
 */
export default class ProductKitContent extends Component {
  render() {
    const { itemsKit, allowSwap, allowRemoval, viewOptions, onItemSwap, onItemRemoval } = this.props

    return (
      <div className="vtex-product-kit dn flex-ns flex-ns flex-column-ns items-center-ns justify-center-ns mb7-ns">
        <div className="b ttu f4 mv7">
          <FormattedMessage id="productKit.mountYourKit" />
        </div>
        <Slider
          sliderSettings={{
            dots: true,
            slidesToShow: 1
          }}>
          <div className="w-100">
            <div className="flex flex-row items-center justify-center ba b--black-05 pa5 w-100">
              {itemsKit.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  {index > 0 && (
                    <ProductKitSeparator icon={defaultPlusIcon} />
                  )}
                  <ProductKitItem
                    item={item}
                    itemIndex={index}
                    onItemSwap={onItemSwap}
                    onItemRemoval={onItemRemoval}
                    viewOptions={viewOptions}
                    allowSwap={allowSwap && index > 0}
                    allowRemoval={allowRemoval && index > 0}
                  />
                </div>
              ))}
              {/* <ProductKitSeparator icon={defaultEqualsIcon} /> */}
              {/* <ProductKitDetails items={itemsKit} /> */}
            </div>
          </div>

          <div className="w-100">
            <div className="flex flex-row items-center justify-center ba b--black-05 pa5 w-100">
              {itemsKit.map((item, index) => (
                <div className="flex flex-row" key={index}>
                  {index > 0 && (
                    <ProductKitSeparator icon={defaultPlusIcon} />
                  )}
                  <ProductKitItem
                    item={item}
                    itemIndex={index}
                    onItemSwap={onItemSwap}
                    onItemRemoval={onItemRemoval}
                    viewOptions={viewOptions}
                    allowSwap={allowSwap && index > 0}
                    allowRemoval={allowRemoval && index > 0}
                  />
                </div>
              ))}
              {/* <ProductKitSeparator icon={defaultEqualsIcon} /> */}
              {/* <ProductKitDetails items={itemsKit} /> */}
            </div>
          </div>
        </Slider>
      </div>
    )
  }
}
