import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../store/reducers/reducers';
import axios from 'axios';
import ErrorMessage from '../utils/ErrorMessage';
import ServerErrorMessage from '../utils/ServerErrorMessage';
import { toast } from 'react-toastify';

const NavLinks = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const totalLength = cartItems.reduce((curr, item) => curr + item.quantity, 0);

  // Logout the
  const loggingOut = async (e) => {
    try {
      e.preventDefault();
      await axios({
        method: 'get',
        url: '/api/v1/user/logout',
      });
      dispatch(logout());
      localStorage.setItem('user', JSON.stringify({}));
    } catch (error) {
      <ErrorMessage variant='danger'>{error.message}</ErrorMessage>;
      toast.error(ServerErrorMessage(error), {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  };

  return (
    <Navbar bg='dark' variant='dark'>
      <Nav>
        <LinkContainer to='/'>
          <Nav.Link className='navbar-brand'> AMAZON</Nav.Link>
        </LinkContainer>

        <LinkContainer to='/'>
          <Nav.Link className='navbar-brand'>Home</Nav.Link>
        </LinkContainer>

        <LinkContainer to='/products'>
          <Nav.Link className='navbar-brand'> Products</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/cart'>
          <Nav.Link>
            {cartItems.length > 0 ? (
              <>
                Cart <Badge pill>{totalLength}</Badge>
              </>
            ) : (
              <span>Cart</span>
            )}
          </Nav.Link>
        </LinkContainer>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown title={user ? user.name : 'user'} menuVariant='dark'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              {user ? (
                <NavDropdown.Item onClick={loggingOut}>logout</NavDropdown.Item>
              ) : (
                <LinkContainer to='/login'>
                  <NavDropdown.Item>login</NavDropdown.Item>
                </LinkContainer>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Nav>
    </Navbar>
  );
};

export default NavLinks;
