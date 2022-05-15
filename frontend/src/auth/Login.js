import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';
import PageTitle from '../utils/PageTitle';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Container className='small-container'>
      <PageTitle title='Login' />
      <h1>Login</h1>
      <Form className='handle-form-width'>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' required />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' required />
        </Form.Group>
        <Button className='my-3' variant='warning' type='submit'>
          Login
        </Button>{' '}
        New Consumer ? <Link to='/register'>Create Your Account</Link>
      </Form>
    </Container>
  );
};

export default Login;
