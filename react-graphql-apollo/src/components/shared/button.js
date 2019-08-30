import React from 'react'

const Button = ({children, type="button", ...props}) => {
  return (
    <button {...props} type={type}>
      {children}
    </button>
  )
}

export default Button
