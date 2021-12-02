import React, { useContext } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { RiShirtLine } from 'react-icons/ri'

import { Container, Cart, Home } from './styles'
import { useCart } from '../../hooks/useCart'

const Header = () => {
  //const { cart } = useContext(CartContext)
  const { cart } = useCart();
  // const cartSize = // TODO;
  const  cartSize = cart.length

  return (
    <Container>
      <Home to='/'>
        ARLO<span>CLOTHING</span> <RiShirtLine />
      </Home>

      <Cart to='/cart'>
        <div>
          <strong>Meu carrinho</strong>
          <span data-testid='cart-size'>
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
          
          </span>
        </div>
        <MdShoppingBasket size={36} color='#FFF' />
      </Cart>
    </Container>
  )
}

export default Header

// carrinho é um array de varios produtos
// const cart = [

//   {},
//   {},
//   {},
// ]