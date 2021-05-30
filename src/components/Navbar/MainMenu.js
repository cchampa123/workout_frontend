import React, { useContext } from 'react';
import Button from 'react-bootstrap/button'
import Navbar from 'react-bootstrap/navbar'
import Nav from 'react-bootstrap/nav'
import { PageContext } from 'contexts/PageContext'
import Container from 'react-bootstrap/Container'

import logo192 from '../../img/logo192.png';

function MainMenu(props) {

  const { page, setPage } = useContext(PageContext)

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
            <Button as='a' className='nav-link my-.5 col-12 text-center' onClick={()=>props.setUser(null)}>Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainMenu;
