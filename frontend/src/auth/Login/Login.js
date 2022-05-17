import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducers/reducers';
import { toast } from 'react-toastify';
import ErrorMessage from '../../utils/ErrorMessage';
import ServerErrorMessage from '../../utils/ServerErrorMessage';
import PageTitle from '../../utils/PageTitle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      await axios({
        method: 'post',
        url: '/api/v1/login',
        data: { email, password },
      }).then((response) => dispatch(login(response.data.user)));
    } catch (error) {
      <ErrorMessage variant='danger'>{error.message}</ErrorMessage>;
      toast.error(ServerErrorMessage(error), {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  };

  return (
    <Container className='small-container'>
      <PageTitle title='Login' />
      <h1>Login</h1>
      <Form className='handle-form-width' onSubmit={handleLogin}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
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
