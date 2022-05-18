import { Navigate, Route, Routes } from 'react-router-dom';
import NavLinks from './components/NavLinks';
import Home from './views/Home/Home';
import ProductInfo from './views/Products/ProductInfo/ProductInfo';
import Cart from './Cart/Cart';
import ProductsPage from './views/Products/Products';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './auth/Login/Login';
import AuthContext from './auth/IsLogged/IsLogged';
import { useContext } from 'react';
import Shipping from './views/Shipping/Shipping';
function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <>
      <ToastContainer />
      <header>
        <NavLinks />
      </header>
      <main>
        {loggedIn.success === false && (
          <Routes>
            <Route path='/login' element={<Login />} />
          </Routes>
        )}
        {loggedIn.success === true && (
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/:slug' element={<ProductInfo />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/shipping' element={<Shipping />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
