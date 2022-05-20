import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, getProduct } from '../../../store/reducers/reducers';
import Card from 'react-bootstrap/Card';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format;

  const { cartItems } = useSelector((state) => state.cart);

  const find = cartItems.find((item) => item.product._id === product._id);

  return (
    <Card>
      <Link
        to={`/products/${product.slug}`}
        onClick={() => dispatch(getProduct(product))}
      >
        <Card.Img variant='top' src={product.images[0]} />
      </Link>
      <Card.Body className='product-info'>
        <Link
          to={`/products/${product.slug}`}
          onClick={() => dispatch(getProduct(product))}
        >
          <h6 className='product-text product-name'>{product.name}</h6>
        </Link>
        <p className='product-text product-desc'>{product.description}</p>
        <p>{formatter(product.price)}</p>
        {product.countInStock < 1 ? (
          <ListGroup variant='flush'>
            {' '}
            <ListGroup.Item className='text-danger product-text'>
              <small>will be available soon!</small>
            </ListGroup.Item>
          </ListGroup>
        ) : find && find.quantity >= product.countInStock ? (
          <small className='text-danger'>will be available soon!</small>
        ) : (
          <Button
            variant='warning'
            onClick={() => {
              if (user.name) {
                return dispatch(addToCart(product));
              } else {
                return (window.location.href = '/login');
              }
            }}
          >
            buy now
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
