import React from 'react'
import { ItemsCardsContainer } from './ItemsCardsStyle'
import { TItemsProps } from './ItemsCardType'

function ItemsCards({name, desc, price, image} : TItemsProps) {
  return (
    <ItemsCardsContainer>
        <img src={image}></img>
        <div className='top-text'>
            <p>{price}</p>
        </div>
        <div className="bottom-text">
            <p>{name}</p>
            <p>{desc}</p>
        </div>
    </ItemsCardsContainer>
  )
}

export default ItemsCards