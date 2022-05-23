import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ErrorMessage from '../../../utils/ErrorMessage';
import ProductCard from '../../Products/ProductCard/ProductCard';
import './MyProducts.css';
import { toast } from 'react-toastify';
import ServerErrorMessage from '../../../utils/ServerErrorMessage';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  getProduct,
  removeItem,
  userInfo,
} from '../../../store/reducers/reducers';
import { useDispatch, useSelector } from 'react-redux';

const MyProducts = () => {
  const { user } = useSelector((state) => state.user);

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const deleteProduct = async (slug) => {
    try {
      await axios({
        method: 'delete',
        url: `/api/v1/product/${slug}`,
      }).then((response) => dispatch(userInfo(response.data.user)));
      navigate('/my-products');
    } catch (error) {
      <ErrorMessage variant='danger'>{error.message}</ErrorMessage>;
    }
  };

  return (
    <Container className='product-container mt-5'>
      <Row>
        {user.products.length > 0 ? (
          user.products.map((product, index) => (
            <Col
              key={index}
              sm={6}
              md={4}
              lg={3}
              className='position-relative mb-3'
            >
              <ProductCard product={product} />
              <Link
                to='/product/slug/edit'
                className='edit-btn'
                title='Edit'
                onClick={() => dispatch(getProduct(product))}
              >
                <i className='fa-solid fa-edit'></i>
              </Link>
              <div
                className='delete-btn'
                title='Delete'
                onClick={() => {
                  deleteProduct(product.slug);
                  dispatch(removeItem(product));
                }}
              >
                <i className='fa-solid fa-trash'></i>
              </div>
            </Col>
          ))
        ) : (
          <ErrorMessage>
            No Products Found Yet .{' '}
            <Link to='/create'>create your First product</Link>
          </ErrorMessage>
        )}
      </Row>
    </Container>
  );
};

export default MyProducts;
