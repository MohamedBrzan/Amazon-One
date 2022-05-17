import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../store/reducers/reducers';

const NavLinks = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const totalLength = cartItems.reduce((curr, item) => curr + item.quantity, 0);

  return (
    <Navbar bg='dark' variant='dark' >
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
            <NavDropdown
              title={user.name ? user.name : 'user'}
              menuVariant='dark'
            >
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              {user.name ? (
                <NavDropdown.Item onClick={() => dispatch(logout())}>
                  logout
                </NavDropdown.Item>
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
