import React from 'react'
import "./button.css"

const Button = ({title, onButtonClick, isSelected}) => {
  let constructedTitle

  if(title.includes(" ")){
    let tmp = title.split(" ")
    constructedTitle = <p>{tmp[0]}&nbsp;{tmp[1]}</p>
  }else{
    constructedTitle = title
  }

  return (
    <button onClick={onButtonClick} className={isSelected ? 'button_common': 'button_outline'}>{constructedTitle}</button>
  )
}

export default Button