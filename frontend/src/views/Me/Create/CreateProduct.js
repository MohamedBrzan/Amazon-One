import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './CreateProduct.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import ErrorMessage from '../../../utils/ErrorMessage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../../store/reducers/reducers';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ServerErrorMessage from '../../../utils/ServerErrorMessage';

const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [code, setCode] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStocks] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  //   let images = [];

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Upload Images
  function uploadImages() {
    var files = document.querySelector('input[type=file]').files;

    // check files size
    for (var i = 0; i < files.length; i++) {
      if (files[i].size > 200000) {
        toast.error(
          'File size is too big, please upload a smaller file less than 200kb',
          {
            position: 'top-right',
            autoClose: 15000,
          }
        );
        return;
      } else if (files.length > 4) {
        toast.error(
          'File length is too long, please upload a smaller file less than or equal 4',
          {
            position: 'top-right',
            autoClose: 15000,
          }
        );
        return;
      }
    }

    function readAndPreview(file) {
      // Make sure `file.name` matches our extensions criteria
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        var reader = new FileReader();

        reader.addEventListener(
          'load',
          function () {
            setImages((image) => [...image, this.result]);
          },
          false
        );

        reader.readAsDataURL(file);
      }
    }

    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  }

  const uploadProducts = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const data = {
        name,
        brand,
        code,
        slug,
        category,
        description,
        countInStock,
        price,
        images,
      };
      await axios({
        method: 'POST',
        url: '/api/v1/product/new',
        data: data,
      }).then(async (response) => {
        await axios({
          method: 'GET',
          url: '/api/v1/user',
        }).then((result) => {
          dispatch(userInfo(result.data));
          setLoading(false);
          navigate('/my-products');
        });
      });
    } catch (error) {
      setLoading(false);
      toast.error(ServerErrorMessage(error), {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  return (
    <Container className='my-3 container-maxwidth'>
      <h1>create product</h1>
      <Form onSubmit={uploadProducts}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>name</Form.Label>
          <Form.Control
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            name='code'
            placeholder='Enter Product Code'
          />
        </Form.Group>
        <Form.Group controlId='slug' className='my-3'>
          <Form.Label>slug</Form.Label>
          <Form.Control
            disabled={loading}
            name='slug'
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            type='text'
            placeholder='Enter The Product Slug'
          />
          <Form.Text className='text-muted'>
            slug is used to generate product url and it should be unique
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='category'>
          <Form.Label>category</Form.Label>
          <Form.Control
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
            name='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type='number'
            placeholder='Enter The Product Price'
          />
        </Form.Group>{' '}
        <Form.Group controlId='images' className='my-3'>
          <Form.Label>images</Form.Label>
          <Form.Control
            disabled={loading}
            name='images'
            type='file'
            multiple
            onChange={uploadImages}
          />
        </Form.Group>
        <Button disabled={loading} variant='warning' type='submit'>
          Upload The Product
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

export default CreateProduct;
