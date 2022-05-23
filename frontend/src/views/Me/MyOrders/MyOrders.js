import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ErrorMessage from '../../../utils/ErrorMessage';
import { Link } from 'react-router-dom';
import { getProduct } from '../../../store/reducers/reducers';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import ServerErrorMessage from '../../../utils/ServerErrorMessage';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingSvg from '../../../utils/LoadingSvg';
import Button from 'react-bootstrap/Button';
import './MyOrders.css';

const MyOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const dispatch = useDispatch();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format;

  useEffect(() => {
    const fetchingOrders = async () => {
      try {
        const { data } = await axios({
          method: 'get',
          url: `/api/v1/order/user`,
        });
        setOrders(data);
        setLoading(false);
      } catch (error) {
        toast.error(ServerErrorMessage(error), {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    };
    fetchingOrders();
  }, []);

  return (
    <Container className='my-orders mt-5'>
      {loading ? (
        <LoadingSvg />
      ) : (
        <Row>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <>
                <Col key={index} md={6} className='position-relative mb-3'>
                  <Card className='order-info'>
                    <Card.Body>
                      <h6>
                        <span className='text-primary product-text-overflow'>
                          order : {order._id}
                        </span>
                      </h6>
                      <Row>
                        <Col lg={6} className='p-2'>
                          <Card.Title>
                            <span className='text-primary text-font-size'>
                              fullName :
                            </span>
                            <span className='product-text-overflow'>
                              {order.fullName}
                            </span>
                          </Card.Title>
                          <Card.Text>
                            <span className='text-primary text-font-size'>
                              address :
                            </span>
                            <span className='product-text-overflow'>
                              {order.address}
                            </span>
                          </Card.Text>
                        </Col>
                        <Col lg={6} className='p-2'>
                          <Card.Title>
                            <span className='text-font-size'>status :</span>
                            <Button
                              className='product-text-overflow'
                              disabled
                              variant={
                                order.status === 'pending'
                                  ? 'primary'
                                  : order.status === 'paid'
                                  ? 'warning'
                                  : order.status === 'shipped'
                                  ? 'success'
                                  : order.status === 'delivered'
                                  ? 'success'
                                  : 'danger'
                              }
                            >
                              {order.status}
                            </Button>
                          </Card.Title>
                          <Card.Text>
                            <span className='text-font-size text-success'>
                              total :
                            </span>
                            <span className='text-primary'>
                              {formatter(order.totalPrice)}
                            </span>
                          </Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>product</th>
                          <th>quantity</th>
                          <th>price</th>
                          <th>totalAmount</th>
                        </tr>
                      </thead>

                      {order.products.map((item, index) => (
                        <tbody key={index}>
                          <tr>
                            <td style={{ width: 100, textAlign: 'center' }}>
                              <Link
                                to={`/products/${item.product.slug}`}
                                onClick={() =>
                                  dispatch(getProduct(item.product))
                                }
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
                              <div>{formatter(item.totalAmount)}</div>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </Table>
                  </Card>
                </Col>
              </>
            ))
          ) : (
            <ErrorMessage>
              No Order Found Yet .
              <Link to='/' className='ms-3'>
                go shopping
              </Link>
            </ErrorMessage>
          )}
        </Row>
      )}
    </Container>
  );
};

export default MyOrders;
