import { Routes as Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Cart from './pages/Cart'

const Routes = () => {
  return (
    <Switch>
      <Route path='/' element={<Home />} />

      <Route path='/cart' element={<Cart />} />
    </Switch>
  );

}

export default Routes;