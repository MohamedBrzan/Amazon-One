import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../store/reducers/reducers';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format;

  return (
    <div className='product'>
      <Link
        to={`/products/${product.slug}`}
        onClick={() => localStorage.setItem('product', JSON.stringify(product))}
      >
        {' '}
        <img src={product.images[0]} alt={product.name} />
      </Link>
      <div className='product-info'>
        <Link
          to={`/products/${product.slug}`}
          onClick={() => localStorage.setItem(JSON.stringify('product'))}
        >
          <h3>{product.name}</h3>
        </Link>
        <p>{product.description}</p>
        <p>{formatter(product.price)}</p>
        {product.countInStock < 1 ? (
          <ListGroup variant='flush'>
            {' '}
            <ListGroup.Item className='text-danger'>
              <small>will be available soon!</small>
            </ListGroup.Item>
          </ListGroup>
        ) : (
          <Button
            className='btn-warning'
            onClick={() => dispatch(addToCart(product))}
          >
            buy now
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
