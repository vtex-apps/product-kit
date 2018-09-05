import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

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
      <div className="vtex-product-kit__separator flex items-center justify-center mh4 mv4 b white bg-action-primary br-100">
        {this.props.children}
      </div>
    )
  }
}
