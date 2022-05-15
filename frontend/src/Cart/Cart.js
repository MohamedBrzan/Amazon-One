import React from 'react';
import ErrorMessage from '../utils/ErrorMessage';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllCart, removeItem } from '../store/reducers/reducers';
import './Cart.css';
import { Link } from 'react-router-dom';

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
      <Row>
        <Col md={6} lg={8}>
          {cartItems.length ? (
            <>
              <Table striped bordered hover className='text-center'>
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
                        {' '}
                        <Link
                          to={`/products/${item.product.slug}`}
                          onClick={() =>
                            localStorage.setItem(
                              'product',
                              JSON.stringify(item.product)
                            )
                          }
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
                      <td>{item.quantity}</td>
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
              no cart items available .
            </ErrorMessage>
          )}
        </Col>
        <Col md={6} lg={4}>
          {cartItems.length > 0 && (
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Card.Title>Total</Card.Title>
                </ListGroup.Item>

                <Card.Body>
                  <ListGroup.Item>
                    <Card.Text>
                      <strong>{formatter(Total)}</strong>
                    </Card.Text>
                  </ListGroup.Item>
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
