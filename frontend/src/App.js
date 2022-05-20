import { Route, Routes } from 'react-router-dom';
import NavLinks from './components/NavLinks';
import Home from './views/Home/Home';
import ProductInfo from './views/Products/ProductInfo/ProductInfo';
import Cart from './Cart/Cart';
import ProductsPage from './views/Products/Products';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './auth/Login/Login';
import Shipping from './views/Shipping/Shipping';
import Register from './auth/Register/Register';
import Profile from './views/Me/Profile/Profile';
import MyProducts from './views/Me/MyProducts/MyProducts';
import MyOrders from './views/Me/MyOrders/MyOrders';
import CreateProduct from './views/Me/Create/CreateProduct';
import EditProduct from './views/Me/MyProducts/EditProduct';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <ToastContainer />
      <header>
        <NavLinks />
      </header>
      <main>
        <Routes>
          {!user.name && (
            <>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </>
          )}
          {user.name && (
            <>
              <Route path='/me' element={<Profile />} />
              <Route path='/create' element={<CreateProduct />} />
              <Route path='/my-products' element={<MyProducts />} />
              <Route path='/my-orders' element={<MyOrders />} />
              <Route path='/shipping' element={<Shipping />} />
            </>
          )}

          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:slug' element={<ProductInfo />} />
          <Route path='/product/:slug/edit' element={<EditProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
