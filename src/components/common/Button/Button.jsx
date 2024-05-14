import React from 'react'
import "./button.css"

const Button = ({title, onButtonClick, isSelected}) => {
  return (
    <button onClick={onButtonClick} className={isSelected ? 'button_common': 'button_outline'}>{title}</button>
  )
}

export default Button