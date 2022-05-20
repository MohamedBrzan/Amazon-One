import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ErrorMessage from '../../../utils/ErrorMessage';
import ProductCard from '../../Products/ProductCard/ProductCard';

const MyProducts = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container className='product-container mt-5'>
      <Row>
        {user.name ? (
          user.products.map((product, index) => (
            <Col key={index} sm={6} md={4} lg={3} className='mb-3'>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <ErrorMessage variant='danger'>User Not Found</ErrorMessage>
        )}{' '}
      </Row>
    </Container>
  );
};

export default MyProducts;
