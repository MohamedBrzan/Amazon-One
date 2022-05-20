import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './Shipping.css';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import ErrorMessage from '../../utils/ErrorMessage';
import axios from 'axios';
import { removeAllCart, userInfo } from '../../store/reducers/reducers';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [fullName, setFullName] = useState(user.name || '');
  const [address, setAddress] = useState(user.address || '');
  const [city, setCity] = useState(user.city || '');
  const [state, setState] = useState(user.state || '');
  const [country, setCountry] = useState(user.country || '');
  const [zip, setZip] = useState(user.zip || '');
  const [phone, setPhone] = useState(user.phone || '');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const sentShipping = async (e) => {
    try {
      e.preventDefault();
      await axios({
        method: 'post',
        url: '/api/v1/product/shipping',
        data: {
          fullName,
          address,
          city,
          state,
          country,
          zip,
          phone,
        },
      }).then((response) => dispatch(userInfo(response.data.user)));
      dispatch(removeAllCart());
      navigate('/');
    } catch (error) {
      <ErrorMessage variant='danger'>{error.message}</ErrorMessage>;
    }
  };

  return (
    <Container className='mt-5 container-maxwidth'>
      <h1>Shipping</h1>
      <Form onSubmit={sentShipping}>
        <Form.Group controlId='fullName' className='my-3'>
          <Form.Label>full name</Form.Label>
          <Form.Control
            name='fullName'
            value={user.name ? user.name : fullName}
            type='text'
            placeholder='Enter Full Name'
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='address' className='my-3'>
          <Form.Label>address</Form.Label>
          <Form.Control
            name='address'
            value={user.address ? user.address : address}
            placeholder='Enter Your Address'
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='postalCode' className='my-3'>
          <Form.Label>zipCode</Form.Label>
          <Form.Control
            name='zip'
            value={user.zip ? user.zip : zip}
            type='number'
            placeholder='Enter Your zip Code'
            onChange={(e) => setZip(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='state'>
          <Form.Label>state</Form.Label>
          <Form.Control
            name='state'
            value={user.state ? user.state : state}
            type='text'
            placeholder='Enter A Country'
            onChange={(e) => setState(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>country</Form.Label>
          <Form.Control
            name='country'
            value={user.country ? user.country : country}
            type='text'
            placeholder='Enter A Country'
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>city</Form.Label>
          <Form.Control
            name='city'
            value={user.city ? user.city : city}
            type='text'
            placeholder='Enter A City'
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='phone' className='my-3'>
          <Form.Label>phone</Form.Label>
          <Form.Control
            name='phone'
            value={user.phone ? user.phone : phone}
            type='number'
            placeholder='Enter Your Phone'
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Button variant='warning' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Shipping;
