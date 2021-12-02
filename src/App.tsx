import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import{ CartProvider } from './hooks/useCart'

import Header from './components/Header'
import Routes from './Routes'
import GlobalStyles from './styles/global'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider >
      <GlobalStyles />
      <Header />
      {/* Header vai para todas as páginas */}
        <Routes />
        <ToastContainer autoClose={3000} />
     </CartProvider >
      </BrowserRouter>
    )
}

export default App
