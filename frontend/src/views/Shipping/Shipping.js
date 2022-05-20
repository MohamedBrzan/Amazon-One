import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './Shipping.css';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Shipping = () => {
  const { user } = useSelector((state) => state.user);

  const [shipping, setShipping] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    phone: '',
  });

  return (
    <Container className='mt-5 container-maxwidth'>
      <h1>Shipping</h1>
      <Form>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>full name</Form.Label>
          <Form.Control
            name='name'
            value={user.name ? user.name : shipping.name}
            type='text'
            placeholder='Enter Full Name'
            onChange={(e) => setShipping({ name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId='address' className='my-3'>
          <Form.Label>address</Form.Label>
          <Form.Control
            name='address'
            value={
              user.shipping.address ? user.shipping.address : shipping.address
            }
            placeholder='Enter Your Address'
            onChange={(e) => setShipping({ address: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId='postalCode' className='my-3'>
          <Form.Label>zipCode</Form.Label>
          <Form.Control
            name='zip'
            value={user.shipping.zip ? user.shipping.zip : shipping.zip}
            type='text'
            placeholder='Enter Your zip Code'
            onChange={(e) => setShipping({ zip: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId='state'>
          <Form.Label>state</Form.Label>
          <Form.Control
            name='state'
            value={user.shipping.state ? user.shipping.state : shipping.state}
            type='text'
            placeholder='Enter A Country'
            onChange={(e) => setShipping({ state: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>country</Form.Label>
          <Form.Control
            name='country'
            value={
              user.shipping.country ? user.shipping.country : shipping.country
            }
            type='text'
            placeholder='Enter A Country'
            onChange={(e) => setShipping({ country: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>city</Form.Label>
          <Form.Control
            name='city'
            value={user.shipping.city ? user.shipping.city : shipping.city}
            type='text'
            placeholder='Enter A City'
            onChange={(e) => setShipping({ city: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId='phone' className='my-3'>
          <Form.Label>phone</Form.Label>
          <Form.Control
            name='phone'
            value={user.shipping.phone ? user.shipping.phone : shipping.phone}
            type='number'
            placeholder='Enter Your Phone'
            onChange={(e) => setShipping({ phone: e.target.value })}
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
