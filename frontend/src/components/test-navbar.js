<Navbar bg='dark' className='navbar' variant='dark' expand='lg'>
  <Container>
    <Nav>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <LinkContainer to='/'>
          <Nav.Link className='navbar-brand'> AMAZON</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/'>
          <Nav.Link className='navbar-brand'>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/products'>
          <Nav.Link className='navbar-brand'> Products</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/cart'>
          <Nav.Link>
            {totalLength > 0 ? (
              <>
                Cart <Badge pill>{totalLength}</Badge>
              </>
            ) : (
              <span>Cart</span>
            )}
          </Nav.Link>
        </LinkContainer>

        <Nav>
          <NavDropdown
            title={user.name ? user.name : 'user'}
            menuVariant='dark'
          >
            {user.name && (
              <>
                <LinkContainer to='/me'>
                  <NavDropdown.Item>profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/create'>
                  <NavDropdown.Item>create</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/my-products'>
                  <NavDropdown.Item>products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/my-orders'>
                  <NavDropdown.Item>orders</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
              </>
            )}
            {user.name ? (
              <NavDropdown.Item onClick={loggingOut}>logout</NavDropdown.Item>
            ) : (
              <LinkContainer to='/login'>
                <NavDropdown.Item>login</NavDropdown.Item>
              </LinkContainer>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Nav>
  </Container>
</Navbar>;
