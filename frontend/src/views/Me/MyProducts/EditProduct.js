import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ServerErrorMessage from '../../../utils/ServerErrorMessage';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { userInfo } from '../../../store/reducers/reducers';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const productInfo = JSON.parse(localStorage.getItem('productInfo'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(productInfo.name || '');
  const [brand, setBrand] = useState(productInfo.brand || '');
  const [code, setCode] = useState(productInfo.code || '');
  const [category, setCategory] = useState(productInfo.category || '');
  const [description, setDescription] = useState(productInfo.description || '');
  const [countInStock, setCountInStocks] = useState(
    productInfo.countInStock || ''
  );
  const [price, setPrice] = useState(productInfo.price || '');
  const [images, setImages] = useState(productInfo.images || []);

  // const uploadImages = async () => {
  //   const files = document.querySelector('input[type="file"]').files;

  //   const testFiles = (file) => {
  //     if (/\.('jpe?g|png|gif')$/i.test(file.name)) {
  //       const reader = new FileReader();

  //       reader.addEventListener(
  //         'onload',
  //         () => {
  //           setImages((image) => [...image, this.result]);
  //         },
  //         false
  //       );

  //       reader.readAsDataURL(file);
  //     }
  //   };
  //   if (files) {
  //     [].forEach.call(files, testFiles);
  //   }
  // };

  const EditProduct = async (e) => {
    try {
      e.preventDefault();

      const data = {
        name,
        brand,
        code,
        slug: productInfo.slug,
        category,
        description,
        countInStock,
        price,
        // images,
      };
      await axios({
        method: 'PUT',
        url: `/api/v1/product/${productInfo.slug}`,
        data: data,
      }).then((response) => dispatch(userInfo(response.data.user)));
      navigate('/my-products');
    } catch (error) {
      toast.error(ServerErrorMessage(error), {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  return (
    <Container className='my-3 container-maxwidth'>
      <h1>edit product</h1>
      <Form onSubmit={EditProduct}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>name</Form.Label>
          <Form.Control
            required
            name='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter The Product Name'
          />
        </Form.Group>{' '}
        <Form.Group controlId='brand' className='my-3'>
          <Form.Label>brand name</Form.Label>
          <Form.Control
            required
            name='brand'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            type='text'
            placeholder='Enter The Product Brand Name'
          />
        </Form.Group>
        <Form.Group controlId='code' className='my-3'>
          <Form.Label>code</Form.Label>
          <Form.Control
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            name='code'
            placeholder='Enter Product Code'
          />
        </Form.Group>
        <Form.Group controlId='category'>
          <Form.Label>category</Form.Label>
          <Form.Control
            required
            name='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type='text'
            placeholder='Enter A Product Category'
          />
        </Form.Group>
        <FloatingLabel
          controlId='description'
          label='Description'
          className='my-3'
        >
          <Form.Control
            required
            as={'textarea'}
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type='text'
            placeholder='Enter The Product Description'
          />
        </FloatingLabel>
        <Form.Group controlId='countInStock'>
          <Form.Label>count in stock</Form.Label>
          <Form.Control
            required
            name='countInStock'
            value={countInStock}
            onChange={(e) => setCountInStocks(e.target.value)}
            type='number'
            placeholder='Enter The Product Count In Stock Number'
          />
        </Form.Group>
        <Form.Group controlId='price' className='my-3'>
          <Form.Label>price</Form.Label>
          <Form.Control
            required
            name='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type='number'
            placeholder='Enter The Product Price'
          />
        </Form.Group>{' '}
        {/* <Form.Group controlId='images' className='my-3'>
          <Form.Label>images</Form.Label>
          <Form.Control
            name='images'
            type='file'
            multiple
            onChange={uploadImages}
          />
        </Form.Group> */}
        <Button variant='warning' type='submit'>
          Upload The Edit
        </Button>
      </Form>
      <Row id='images' className='images'>
        {images.map((image, index) => (
          <Col sm={6} md={4} lg={3} key={index}>
            <img src={image} alt='' className='handle-image' />{' '}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EditProduct;
