import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import PageTitle from '../../../utils/PageTitle';
import ErrorMessage from '../../../utils/ErrorMessage';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/reducers/reducers';

const ProductInfo = () => {
  const product = JSON.parse(localStorage.getItem('product'));
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format;

  const dispatch = useDispatch();

  return (
    <Container className='mt-5'>
      {product ? (
        <PageTitle title={product.name} />
      ) : (
        <PageTitle title='product not found' />
      )}
      {product ? (
        <Row>
          <Col md={6}>
            <img src={product.images[0]} alt='product' />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>Name : {product.name}</ListGroup.Item>
              <ListGroup.Item>Brand : {product.brand}</ListGroup.Item>
              <ListGroup.Item>Code : {product.code}</ListGroup.Item>
              <ListGroup.Item>Desc : {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    Price : {formatter(product.price)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {product.countInStock > 0 ? (
                      <>
                        {' '}
                        Status : <Badge bg='success'>in stock</Badge>
                      </>
                    ) : (
                      <>
                        {' '}
                        Status : <Badge bg='danger'>out stock</Badge>
                      </>
                    )}
                  </ListGroup.Item>{' '}
                  <ListGroup.Item>
                    {product.countInStock > 0 ? (
                      <Button
                        className='btn-warning'
                        onClick={() => dispatch(addToCart(product))}
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
