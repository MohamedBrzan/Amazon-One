import { Route, Routes } from 'react-router-dom';
import NavLinks from './components/NavLinks';
import Home from './views/Home/Home';
import ProductInfo from './views/Products/ProductInfo/ProductInfo';
import Cart from './Cart/Cart';
import ProductsPage from './views/Products/Products';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './auth/Login/Login';
import ShippingDetails from './views/MakeOrder/ShippingDetails';
import Register from './auth/Register/Register';
import Profile from './views/Me/Profile/Profile';
import MyProducts from './views/Me/MyProducts/MyProducts';
import MyOrders from './views/Me/MyOrders/MyOrders';
import CreateProduct from './views/Me/Create/CreateProduct';
import EditProduct from './views/Me/MyProducts/EditProduct';
import { useSelector } from 'react-redux';
import PlaceOrder from './views/MakeOrder/PlaceOrder';

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <ToastContainer />
      <header>
        <NavLinks />
      </header>
      <main>
        <Routes>
          {!user.fullName && (
            <>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </>
          )}
          {user.fullName && (
            <>
              <Route path='/me' element={<Profile />} />
              <Route path='/create' element={<CreateProduct />} />
              <Route path='/my-products' element={<MyProducts />} />
              <Route path='/my-orders' element={<MyOrders />} />
              <Route path='/shipping' element={<ShippingDetails />} />
              <Route path='/place-order' element={<PlaceOrder />} />
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
