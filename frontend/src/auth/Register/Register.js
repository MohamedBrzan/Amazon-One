import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorMessage from '../../utils/ErrorMessage';
import ServerErrorMessage from '../../utils/ServerErrorMessage';
import PageTitle from '../../utils/PageTitle';
import './Register.css';

const Register = () => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');

  const navigate = useNavigate();

  const handleUploadAvatar = () => {
    const file = document.querySelector('input[type="file"]').files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader.result);
    };
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      await axios({
        method: 'post',
        url: '/api/v1/user/register',
        data: {
          name,
          email,
          password,
          reenterPassword,
          avatar,
        },
      }).then((res) => console.log(res.data));
      toast.success('Register success', {
        position: 'top-right',
        autoClose: 1000,
      });
      navigate('/login');
    } catch (error) {
      <ErrorMessage variant='danger'>{error.message}</ErrorMessage>;
      toast.error(ServerErrorMessage(error), {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  return (
    <Container className='register small-container'>
      <PageTitle title='Register' />
      <h1>register</h1>
      <Form className='handle-form-width' onSubmit={handleLogin}>
        <div className='my-3 form-group'>
          <label htmlFor='avatar'>avatar</label>
          <div id='avatar'>
            <img
              src={avatar}
              style={{ display: avatar ? 'block' : 'none' }}
              alt='Avatar'
              className='avatar-img'
            />
          </div>
          <div
            style={{
              width: 150,
              margin: 'auto',
              display: 'block',
              cursor: 'pointer',
            }}
            className='upload-btn'
          >
            <i className='fa-solid fa-camera'>
              <span
                style={{
                  fontSize: 15,
                  margin: '0 0 0 5px',
                  fontFamily: 'Helvetica',
                  cursor: 'pointer',
                }}
              >
                upload
              </span>
            </i>
            <input
              type='file'
              name='avatar'
              required
              onChange={handleUploadAvatar}
              className='file-input'
            />
          </div>
        </div>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={name}
            placeholder='Enter Your Name'
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={email}
            placeholder='Enter Your Email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password}
            placeholder='Enter Your Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='reenterPassword'>
          <Form.Label>re-enterPassword</Form.Label>
          <Form.Control
            type='password'
            name='reenterPassword'
            value={reenterPassword}
            placeholder='Enter Re-EnterPassword'
            required
            onChange={(e) => setReenterPassword(e.target.value)}
          />
        </Form.Group>
        <Button className='my-3' variant='warning' type='submit'>
          Register
        </Button>
        I'm Consumer ? <Link to='/login'>I'm Already Have An Account</Link>
      </Form>
    </Container>
  );
};

export default Register;
