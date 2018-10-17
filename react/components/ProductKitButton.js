import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ProductKitButton extends Component {
  static propTypes = {
    icon: PropTypes.any,
    description: PropTypes.string,
    onClick: PropTypes.func,
  }

  render() {
    const { icon, onClick } = this.props
    return (
      <div className="vtex-product-kit__item-swap-button h1 flex flex-row items-center mh3 mv3"
        onClick={() => onClick && onClick()}>
        <img className="w1 h1" src={icon} />
        {/* <div className="dn ml3">
          <FormattedMessage id="productKit.swapItem" />
        </div> */}
      </div>
    )
  }
}