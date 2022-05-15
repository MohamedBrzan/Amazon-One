import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
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
        <p>{product.price}</p>
        <Button className='btn-warning'>buy now</Button>
      </div>
    </div>
  );
};

export default ProductCard;
