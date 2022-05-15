import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavLinks = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const totalLength = cartItems.reduce((curr, item) => curr + item.quantity, 0);

  return (
    <Navbar>
      <Link to='/' className='navbar-brand'>
        {' '}
        AMAZON
      </Link>

      <Nav className='mr-auto'>
        <Link to='/' className='nav-link'>
          {' '}
          Home
        </Link>

        <Link to='/products' className='nav-link'>
          Products
        </Link>

        <Link to='/cart' className='nav-link'>
          {cartItems.length > 0 ? (
            <>
              {' '}
              Cart <Badge pill>{totalLength}</Badge>
            </>
          ) : (
            <span>Cart</span>
          )}
        </Link>
      </Nav>
    </Navbar>
  );
};

export default NavLinks;
