import React from 'react'

const iconMock = (orientation, size, className, name) => {
  return (
    <svg
      className={`${orientation}-oritentation-mock ${className} ${name}`}
      width={size}
      height={size}
    >
      <rect width={size} height={size} />
    </svg>
  )
}

export const IconEquals = ({ orientation, size, className }) =>
  iconMock(orientation, size, className, 'IconEquals')

export const IconPlus = ({ orientation, size, className }) =>
  iconMock(orientation, size, className, 'IconPlus')
