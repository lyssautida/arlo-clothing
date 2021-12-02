import React, { useState, useEffect } from 'react'
import { MdAddShoppingCart } from 'react-icons/md'

import { ProductList } from './styles'
import { api } from '../../services/api'
import { formatPrice } from '../../utils/format'
import { useCart } from '../../hooks/useCart'

interface Product {
  id: number
  title: string
  price: number
  image: string

}

interface ProductFormatted extends Product {
  priceFormatted: string
}

interface CartItemsAmount {
  [key: number]: number
}

const Home = () => {
  const [products, setProducts] = useState<ProductFormatted[]>([])
  const { cart, addProduct } = useCart()

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount
    return sumAmount
  //   // TODO
  }, {} as CartItemsAmount)

  //array vazio (do loadProducts), lança isso toda vez que carrega a pag
  //função async é carregada, espera a resposta terminar com a função await e depois lança a resposta no console.log. Se não tiver await ele não esperar o api carregar a resposta
  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get<Product[]>('products')
    
      
      const FormattedData = data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }))
      
      setProducts(FormattedData)
    }

    loadProducts()
  }, [])

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
        <img
          src={product.image}
          alt={product.title}

        />
        <strong>Camisa Xadrez</strong>
        <span>R$ 159,90</span>
        <button
          type='button'
          data-testid='add-product-button'
          onClick={() => handleAddProduct(product.id)}
        >
          <div data-testid='cart-product-quantity'>
            <MdAddShoppingCart size={16} color='#FFF' />
            {cartItemsAmount[product.id] || 0} 
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
        ))}
      
    </ProductList>
  )
}

export default Home