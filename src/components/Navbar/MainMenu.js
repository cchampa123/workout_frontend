import React, { useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { PageContext } from 'contexts/PageContext'
import Container from 'react-bootstrap/Container'
import { AUTH_URL, CLIENT_ID } from 'constants/configs'

import logo192 from '../../img/logo192.png';

function MainMenu(props) {
  const { page, setPage } = useContext(PageContext)
  const logout = () => {
    axios.post(`${AUTH_URL}/revoke_token/`, `client_id=${CLIENT_ID}&token=${props.user.token}`)
    props.setUser(null)
  }

  return (
    <Navbar
      bg='light'
      collapseOnSelect
      expand='*'
      onSelect={(selectedKey)=>setPage({pageTitle:selectedKey, pageProps:{}})}
    >
      <Container>
        <Navbar.Brand>
            <img src={logo192} className='img-fluid' alt='logo'/>
        </Navbar.Brand>
        <Navbar.Brand>
            <h1>WhoopiePie</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" style={{backgroundColor:'dark'}}>
          <Nav variant='pills' className='mr-auto' activeKey={page.pageTitle}>
            {
              Object.entries(props.pages).map(x =>
              <Nav.Link className='my-.5 col-12 text-center' eventKey={x[0]} key={x[0]}>
                  {x[0]}
              </Nav.Link>
              )
            }
            <Button as='a' className='nav-link my-.5 col-12 text-center' onClick={()=>logout()}>Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainMenu;
