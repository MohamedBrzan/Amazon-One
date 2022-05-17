import { useEffect, useReducer } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard/ProductCard';
import ErrorMessage from '../../utils/ErrorMessage';
import Container from 'react-bootstrap/Container';
import LoadingSvg from '../../utils/LoadingSvg';
import ServerErrorMessage from '../../utils/ServerErrorMessage';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Products.css';

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
          url: '/api/v1/product/all',
        }).then((results) =>
          dispatch({ type: 'FETCH_SUCCESS', payload: results.data.products })
        );
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: ServerErrorMessage(error) });
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container className='product-container'>
      <h1 className='title'>features list</h1>
      {loading ? (
        <div className='products'>
          <LoadingSvg />
        </div>
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <Row>
          {products.length ? (
            products.map((product, index) => (
              <Col sm={6} md={4} lg={3} className='mb-3' key={index}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <ErrorMessage variant='warning'>no data available</ErrorMessage>
          )}
        </Row>
      )}
    </Container>
  );
};

export default ProductsPage;
