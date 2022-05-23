import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import { getProduct } from '../../store/reducers/reducers';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import ServerErrorMessage from '../../utils/ServerErrorMessage';
import LoadingSvg from '../../utils/LoadingSvg';
import ErrorMessage from '../../utils/ErrorMessage';
import { removeAllCart, userInfo } from '../../store/reducers/reducers';
import Button from 'react-bootstrap/Button';

const PlaceOrder = () => {
  const shippingDetails = JSON.parse(localStorage.getItem('shippingDetails'));

  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const [{ isPending, options }, paypalDispatch] = usePayPalScriptReducer();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const shipping = 0;

  const tax = 20;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format;

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalPrice + shipping + tax,
            },
          },
        ],
      })
      .then((orderId) => orderId);
  };

  const sentShipping = async (status) => {
    try {
      await axios({
        method: 'post',
        url: '/api/v1/order/new',
        data: {
          fullName: shippingDetails.fullName,
          address: shippingDetails.address,
          city: shippingDetails.city,
          state: shippingDetails.state,
          country: shippingDetails.country,
          zip: shippingDetails.zip,
          phone: shippingDetails.phone,
          status,
          products: cartItems,
          totalPrice: totalPrice,
        },
      }).then((response) => dispatch(userInfo(response.data.user)));
      localStorage.removeItem('shippingDetails');
      dispatch(removeAllCart());
      navigate('/');
    } catch (error) {
      toast.error(ServerErrorMessage(error));
    }
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      sentShipping('paid');
    });
  };

  const onError = (error) => toast.error(ServerErrorMessage(error));

  // useEffect(() => {
  //   const fetchingOrders = async () => {
  //     try {
  //       const { data: clientId } = await axios({
  //         method: 'get',
  //         url: `/api/v1/payment`,
  //       });
  //     } catch (error) {
  //       toast.error(ServerErrorMessage(error), {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: 5000,
  //       });
  //     }
  //   };
  //   fetchingOrders();
  // }, []);

  return (
    <Container className='my-orders mt-5'>
      {shippingDetails ? (
        <Row>
          <Col lg={8} className='position-relative mb-3'>
            <Card className='order-info'>
              <Card.Body>
                <Row>
                  <Col lg={6} className='p-2'>
                    <Card.Title>
                      <span className='text-primary text-font-size'>
                        fullName :
                      </span>
                      <span className='product-text-overflow'>
                        {shippingDetails.fullName}
                      </span>
                    </Card.Title>
                    <Card.Text>
                      <span className='text-primary text-font-size'>
                        address :
                      </span>
                      <span className='product-text-overflow'>
                        {shippingDetails.address}
                      </span>
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>product</th>
                    <th>quantity</th>
                    <th>price</th>
                    <th>totalAmount</th>
                  </tr>
                </thead>

                {cartItems.map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <td style={{ width: 100, textAlign: 'center' }}>
                        <Link
                          to={`/products/${item.product.slug}`}
                          onClick={() => dispatch(getProduct(item.product))}
                        >
                          <img
                            src={item.product.images[0]}
                            className='order-img'
                            alt='product'
                          />
                          <div>{item.product.name}</div>
                        </Link>
                      </td>
                      <td>
                        <div>{item.quantity}</div>
                      </td>
                      <td>
                        <div>{formatter(item.product.price)}</div>
                      </td>
                      <td>
                        <div>
                          {formatter(item.product.price * item.quantity)}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </Card>
          </Col>
          <Col lg={4}>
            <Card>
              <Card.Body>
                <Card.Title>order summary</Card.Title>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <span className='text-primary'> items : </span>
                    <span> {formatter(totalPrice)}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className='text-primary'> shipping : </span>
                    <span> {formatter(shipping)}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className='text-primary'> tax : </span>
                    <span> {formatter(tax)}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className='text-success'>total to pay :</span>
                    <span>{formatter(totalPrice + shipping + tax)}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Button
                variant='warning'
                className='w-50 m-auto mb-3'
                onClick={() => sentShipping('pending')}
              >
                place order without pay
              </Button>
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              />{' '}
            </Card>
          </Col>
        </Row>
      ) : cartItems.length <= 0 ? (
        <ErrorMessage variant='danger'>
          Please check <span className='text-dark'>your cartItems</span> data .
          <Link to='/' className='ms-3'>
            go shopping
          </Link>
        </ErrorMessage>
      ) : (
        <ErrorMessage variant='danger'>
          Please check <span className='text-dark'>shippingDetails</span> data
          <Link to='/' className='ms-3'>
            go shopping .
          </Link>
        </ErrorMessage>
      )}
    </Container>
  );
};

export default PlaceOrder;
