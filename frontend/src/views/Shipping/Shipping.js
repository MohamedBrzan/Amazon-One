import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './Shipping.css';
import Button from 'react-bootstrap/Button';

const Shipping = () => {
  return (
    <Container className='mt-5 container-maxwidth'>
      <h1>Shipping</h1>
      <Form>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>full name</Form.Label>
          <Form.Control name='name' type='text' placeholder='Enter Full Name' />
        </Form.Group>
        <Form.Group controlId='address' className='my-3'>
          <Form.Label>address</Form.Label>
          <Form.Control name='address' placeholder='Enter Your Address' />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='postalCode' className='my-3'>
          <Form.Label>postalCode</Form.Label>
          <Form.Control
            name='postalCode'
            type='text'
            placeholder='Enter Your PostalCode'
          />
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>country</Form.Label>
          <Form.Control
            name='country'
            type='country'
            placeholder='Enter A Country'
          />
        </Form.Group>
        <Form.Group controlId='phone' className='my-3'>
          <Form.Label>phone</Form.Label>
          <Form.Control
            name='phone'
            type='number'
            placeholder='Enter Your Phone'
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
