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
import { toast } from 'react-toastify';
import ServerErrorMessage from '../../utils/ServerErrorMessage';

const Shipping = () => {
  const { user } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(user.fullName || '');
  const [address, setAddress] = useState(user.address || '');
  const [city, setCity] = useState(user.city || '');
  const [state, setState] = useState(user.state || '');
  const [country, setCountry] = useState(user.country || '');
  const [zip, setZip] = useState(user.zip || '');
  const [phone, setPhone] = useState(user.phone || '');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const data = {
    fullName,
    address,
    city,
    state,
    country,
    zip,
    phone,
  };

  const sentShipping = async (e) => {
    try {
      e.preventDefault();
      localStorage.setItem('shippingDetails', JSON.stringify(data));
      navigate('/place-order');
    } catch (error) {
      toast.error(ServerErrorMessage(error));
    }
  };

  return (
    <Container className='mt-5 container-maxwidth'>
      <h1>Shipping</h1>
      <Form onSubmit={sentShipping}>
        <Form.Group controlId='fullName' className='my-3'>
          <Form.Label>full name</Form.Label>
          <Form.Control
            required
            name='fullName'
            value={fullName}
            type='text'
            placeholder='Enter Full Name'
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='address' className='my-3'>
          <Form.Label>address</Form.Label>
          <Form.Control
            required
            name='address'
            value={user.address ? user.address : address}
            placeholder='Enter Your Address'
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='postalCode' className='my-3'>
          <Form.Label>zipCode</Form.Label>
          <Form.Control
            required
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
            required
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
            required
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
            required
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
            required
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
