import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import PageTitle from '../../../utils/PageTitle';
import ErrorMessage from '../../../utils/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/reducers/reducers';
import { useNavigate } from 'react-router-dom';
import './ProductInfo.css';

const ProductInfo = () => {
  const { productInfo } = useSelector((state) => state.product);

  const { cartItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format;

  const dispatch = useDispatch();

  let find = cartItems.find((item) => item.product._id === productInfo._id);

  const navigate = useNavigate();

  return (
    <Container className='my-5'>
      {productInfo ? (
        <PageTitle title={productInfo.name} />
      ) : (
        <PageTitle title='product not found' />
      )}
      {productInfo ? (
        <Row>
          <Col md={6} lg={3} className='mb-3 text-center'>
            <img
              src={productInfo.images[0]}
              alt='product'
              className='img-thumbnail'
            />
          </Col>
          <Col md={6}>
            <ListGroup variant='flush'>
              <ListGroup.Item className='overflow-text'>
                <span className='text-primary'>Name : </span> {productInfo.name}
              </ListGroup.Item>
              <ListGroup.Item className='overflow-text'>
                <span className='text-primary'>Brand : </span>
                {productInfo.brand}
              </ListGroup.Item>
              <ListGroup.Item className='overflow-text'>
                <span className='text-primary'>Code : </span> {productInfo.code}
              </ListGroup.Item>
              <ListGroup.Item className='overflow-text'>
                <span className='text-primary'>Description : </span>
                {productInfo.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={6} lg={3}>
            <Card>
              <Card.Body>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    Price : {formatter(productInfo.price)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {productInfo.countInStock > 0 && !find?.quantity ? (
                      <>
                        Status : <Badge bg='success'>in stock</Badge>
                      </>
                    ) : productInfo.countInStock > 0 &&
                      find?.quantity < productInfo.countInStock ? (
                      <>
                        Status : <Badge bg='success'>in stock</Badge>
                      </>
                    ) : (
                      <>
                        Status : <Badge bg='danger'>out stock</Badge>
                      </>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {productInfo.countInStock > 0 && !find?.quantity ? (
                      <Button
                        className='btn-warning'
                        onClick={() => {
                          if (user.fullName) {
                            dispatch(addToCart(productInfo));
                          } else {
                            navigate('/login');
                          }
                        }}
                      >
                        add to cart
                      </Button>
                    ) : productInfo.countInStock > 0 &&
                      find?.quantity < productInfo.countInStock ? (
                      <Button
                        className='btn-warning'
                        onClick={() => {
                          if (user.fullName) {
                            dispatch(addToCart(productInfo));
                          } else {
                            navigate('/login');
                          }
                        }}
                      >
                        add to cart
                      </Button>
                    ) : (
                      <ListGroup.Item className='text-danger'>
                        <small>will be available soon!</small>
                      </ListGroup.Item>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <ErrorMessage variant='danger'>Product Not Found</ErrorMessage>
      )}
    </Container>
  );
};

export default ProductInfo;
