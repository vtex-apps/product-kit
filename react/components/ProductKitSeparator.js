import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class ProductKitSeparator extends PureComponent {
  static propTypes = {
    icon: PropTypes.any,
  }

  render() {
    return (
      <div className="vtex-product-kit__separator flex items-center justify-center mr7 mv4">
        <img className="h2" src={this.props.icon} />
      </div>
    )
  }
}