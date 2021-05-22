import React, {useState} from 'react';
import Container from 'react-bootstrap/container'
import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/button'
import image from '../img/open_logo.png'

function UnauthenticatedApp(props) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function submitCreds() {
    props.setUser({"username":username, "password":password})
  }

  return (
    <Container>
      <br/>
      <img src={image} className='mx-auto d-block img-fluid' alt="WhoopiePie Logo"/>
      <br/>
      <h1 style={{textAlign: "center", fontWeight:"bold"}}>WhoopiePie</h1>
      <br/>
      <Form>
        <Form.Group>
          <Form.Control
            placeholder='Username'
            style={{textAlign: "center",
                    fontWeight: "bold"}}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Control
            placeholder='Password'
            type='password'
            style={{textAlign: "center",
                    fontWeight: "bold"}}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <br/>
        <Button
          className='btn btn-dark col-12'
          style={{fontWeight:"bold"}}
          onClick={() => submitCreds()}
        >
          Log In
        </Button>
      </Form>
    </Container>
  );
}

export default UnauthenticatedApp;
