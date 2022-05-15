import { useEffect, useReducer } from 'react';
import axios from 'axios';
import './Products.css';
import ProductCard from './ProductCard/ProductCard';
import ErrorMessage from '../../utils/ErrorMessage';
import Container from 'react-bootstrap/Container';
import LoadingSvg from '../../utils/LoadingSvg';
import ServerErrorMessage from '../../utils/ServerErrorMessage';

const ProductsPage = () => {
  const reducer = (state, actions) => {
    switch (actions.type) {
      case 'FETCH_START':
        return { ...state, products: actions.payload, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, products: actions.payload, loading: false };
      case 'FETCH_ERROR':
        return {
          ...state,
          error: actions.payload,
          loading: false,
        };
      default:
        return state;
    }
  };

  const [{ products, loading, error }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    const fetchProducts = async () => {
      try {
        await axios({
          method: 'GET',
          url: '/api/v1/products',
        }).then((results) =>
          dispatch({ type: 'FETCH_SUCCESS', payload: results.data })
        );
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: ServerErrorMessage(error) });
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <h1 className='title'>features list</h1>
      {loading ? (
        <div className='products'>
          <LoadingSvg />
        </div>
      ) : error ? (
        <ErrorMessage variant='danger'>{error} </ErrorMessage>
      ) : (
        <div className='products'>
          {products ? (
            products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))
          ) : (
            <ErrorMessage variant='warning'>no data available</ErrorMessage>
          )}
        </div>
      )}
    </Container>
  );
};

export default ProductsPage;
