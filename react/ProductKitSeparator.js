import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 * Product Kit Separator.
 * Display a rounded div which encapsulates the item separator.
 */
export default class ProductKitSeparator extends PureComponent {
  static propTypes = {
    /** Children component which represents the separator itself */
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <div className="vtex-product-kit__separator flex items-center justify-center mh4 b white br-100 bg-blue">
        { this.props.children }
      </div>
    )
  }
}
