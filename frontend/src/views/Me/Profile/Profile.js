import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Profile.css';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Container>
      <h1>Profile</h1>
      <Row>
        {' '}
        <Col>
          <img src={user.avatar} alt='Avatar' className='my-avatar' />
        </Col>{' '}
        <Col>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
