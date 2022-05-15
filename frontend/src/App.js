import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavLinks from './components/NavLinks';
import Home from './views/Home/Home';
import ProductInfo from './views/Products/ProductInfo/ProductInfo';
import Cart from './Cart/Cart';
import Login from './auth/Login';

function App() {
  return (
    <BrowserRouter>
      <header>
        <NavLinks />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:slug' element={<ProductInfo />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
