import React from 'react'

export const ExtensionPoint = ({ id, product }) => {
  return <div className={`extension-point-${id}`}>{product.sku.name}</div>
}
