import ErrorMessage from '../utils/ErrorMessage';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseItem,
  getProduct,
  increaseItem,
  removeAllCart,
  removeItem,
} from '../store/reducers/reducers';
import { Link } from 'react-router-dom';
import PageTitle from '../utils/PageTitle';
import { LinkContainer } from 'react-router-bootstrap';
import './Cart.css';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format;

  const dispatch = useDispatch();

  const Total = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <Container className='mt-5 cart'>
      {' '}
      <PageTitle title='Cart' />
      <Row>
        <Col lg={8} className='mb-5'>
          {cartItems.length > 0 ? (
            <>
              <Table striped bordered hover responsive className='text-center'>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Link
                          to={`/products/${item.product.slug}`}
                          onClick={() => dispatch(getProduct(item.product))}
                          title={`Go To (${item.product.name}) Info`}
                        >
                          <div className='img-handle'>
                            {' '}
                            <img
                              src={item.product.images[0]}
                              alt='Product Img'
                            />
                          </div>

                          {item.product.name}
                        </Link>
                      </td>
                      <td>
                        <Button
                          className='btn-dark'
                          disabled={item.quantity >= item.product.countInStock}
                          onClick={() => dispatch(increaseItem(item.product))}
                        >
                          <i className='fa-solid fa-square-plus'></i>
                        </Button>

                        <span className='py-2 px-3'>{item.quantity}</span>

                        <Button
                          className='btn-dark'
                          disabled={item.quantity === 1}
                          onClick={() => dispatch(decreaseItem(item.product))}
                        >
                          <i className='fa-solid fa-square-minus'></i>
                        </Button>
                      </td>
                      <td>{formatter(item.product.price)}</td>
                      <td>{formatter(item.product.price * item.quantity)}</td>
                      <td>
                        <Button
                          className='btn-danger '
                          onClick={() => dispatch(removeItem(item.product))}
                        >
                          {' '}
                          <i className='fa-solid fa-trash-can'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                className='btn-danger'
                onClick={() => dispatch(removeAllCart())}
              >
                clear cart
              </Button>
            </>
          ) : (
            <ErrorMessage variant='warning'>
              no cart items available . <Link to='/'>go to shopping</Link>
            </ErrorMessage>
          )}
        </Col>
        <Col lg={4}>
          {cartItems.length > 0 && (
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Card.Title>Subtotal</Card.Title>
                </ListGroup.Item>

                <Card.Body>
                  <ListGroup.Item className='bg-warning'>
                    <Card.Text>
                      <strong>{formatter(Total)}</strong>
                    </Card.Text>
                  </ListGroup.Item>
                  <LinkContainer to='/shipping'>
                    <Button className='btn-warning mt-5 m-auto d-block'>
                      proceed to checkout
                    </Button>
                  </LinkContainer>
                </Card.Body>
              </ListGroup>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
