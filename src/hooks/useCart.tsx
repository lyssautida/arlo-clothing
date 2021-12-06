import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { ProductList } from '../pages/Home/styles'
import { api } from '../services/api'

interface CartProviderProps {
  children: ReactNode
}
interface UpdateProductAmount {
  productId: number
  amount: number
}

interface Stock {
  id: number
  amount: number //quantidade no carrinhho no momento
}

interface Product { //tipando o array
  id: number
  title: string
  price: number
  image: string
  amount: number
}

//
interface CartContextData {
  cart: Product[] //array, precisa ser tipado ts
  addProduct: (productId: number) => Promise<void>
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void
  removeProduct: (productId: number) => void
}

//criar contexto, prove ele ao meio e importa em cada elemento
const CartContext = createContext<CartContextData>({} as CartContextData) //é um array precisa ser tipado
//provendo o contexto
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Product[]>(() => {
 
    const storagedCart = localStorage.getItem('@ArloClothing:cart')
    
    if (storagedCart) {
      return JSON.parse(storagedCart)

    } 
return []
  })
  //toda vez que precisa verificar api, colocar await
  const addProduct = async (productId: number) => {
    try {
      const updatedCart = [...cart ] //criou o mesmo carrinho cópia exata
    
      //verifica se produto existe
      const productExists = updatedCart.find(product =>
        product.id === productId)
      
      //ver o que tem no estoque
      const stock = await api.get(`stock/${productId}`)

      //armazenar na outra variavel o quanto tem em respectiva quantidade de cada produto
      const stockAmount = stock.data.amount

      //quntidade atual do carrinho
      const currentAmount = productExists ? productExists.amount : 0

      //adicionar o produto
      const amount = currentAmount + 1

      //se não tem no estoque:
      if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque')
        return
      }
      //no carrinho criado separado, cópia
      if (productExists) {
        productExists.amount = amount
      } else {
        const product = await api.get(`products/${productId}`)
        product.data.amount = 1
        updatedCart.push(product.data)
      }
//passar o carrinho cópia para o de verdade e salva 
      setCart(updatedCart)
      localStorage.setItem('@ArloClothing:cart', JSON.stringify(updatedCart)) //chma json porque updatedcart é objeto

      toast.success('Produto adicionado com sucesso')
    } catch {
      toast.error ('Erro na adição do produto')
    }
  }

const updateProductAmount = async({ productId, amount }:
  UpdateProductAmount) => {
  try {
    if (amount <= 0) {
      return
    }

    const stock = await api.get<Stock>(`stock/${productId}`)
    const stockAmount = stock.data.amount

    if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora do estoque')
    return
    }
    
    const updatedCart = [...cart]
    const productExists = updatedCart.find(
        product => product.id === productId
      
    )

if (productExists) {
  productExists.amount = amount

  setCart(updatedCart)
  localStorage.setItem('@ArloClothing:cart', JSON.stringify
  (updatedCart))
} else {
  throw Error()
}


  } catch {
    toast.error ('Erro na alteração de quantidade de produto')
  }
  }

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart]
      const productIndex = updatedCart.findIndex(
        product => product.id === productId
  
      )
      if (productId > 0) {
        updatedCart.splice(productIndex, 1)
        
        setCart(updatedCart)
        localStorage.setItem('@ArloClothing:cart', JSON.stringify
        (updatedCart))
  
      } else {
        throw Error()
      }
    } catch {
          toast.error('Erro na remoção do produto')
        }
  
  
    }
  

  return (
    <CartContext.Provider
      value={{ cart, addProduct, updateProductAmount, removeProduct }}
    >
      {children}
    </CartContext.Provider>

  )
}



//usando o contexto
//em vez de fazer duas importações, faz o hook useCart e importa só uma
export function useCart(): CartContextData {
  const context = useContext(CartContext)
  return context
}