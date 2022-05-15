import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavLinks from './components/NavLinks';
import Home from './views/Home/Home';
import ProductInfo from './views/Products/ProductInfo/ProductInfo';
import Cart from './Cart/Cart';

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
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
