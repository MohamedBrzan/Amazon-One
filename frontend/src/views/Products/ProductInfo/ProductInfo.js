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

const ProductInfo = () => {
  const { productInfo } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format;

  const dispatch = useDispatch();

  const find = cartItems.find((item) => item.product._id === productInfo._id);

  console.log(find.quantity);
  console.log(productInfo.countInStock);

  return (
    <Container className='my-5'>
      {productInfo ? (
        <PageTitle title={productInfo.name} />
      ) : (
        <PageTitle title='product not found' />
      )}
      {productInfo ? (
        <Row>
          <Col md={6} className='mb-3'>
            <img
              src={productInfo.images[0]}
              alt='product'
              className='img-thumbnail'
            />
          </Col>
          <Col md={6} lg={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>Name : {productInfo.name}</ListGroup.Item>
              <ListGroup.Item>Brand : {productInfo.brand}</ListGroup.Item>
              <ListGroup.Item>Code : {productInfo.code}</ListGroup.Item>
              <ListGroup.Item>Desc : {productInfo.description}</ListGroup.Item>
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
                    {productInfo.countInStock > 0 ? (
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
                    {productInfo.countInStock > 0 &&
                    !find.quantity >= productInfo.countInStock ? (
                      <Button
                        className='btn-warning'
                        onClick={() => dispatch(addToCart(productInfo))}
                      >
                        add to cart
                      </Button>
                    ) : find.quantity < productInfo.countInStock ? (
                      <Button
                        className='btn-warning'
                        onClick={() => dispatch(addToCart(productInfo))}
                      >
                        add to cart
                      </Button>
                    ) : find.quantity >= productInfo.countInStock ? (
                      <ListGroup.Item className='text-danger'>
                        <small>will be available soon!</small>
                      </ListGroup.Item>
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
