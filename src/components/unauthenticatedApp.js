import React, {useState} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import image from '../img/open_logo.png'
import axios from 'axios'
import { API_URL } from 'constants/configs'

function UnauthenticatedApp(props) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function submitCreds() {
    setLoading(true)
    let response
    try {
      response = await axios.post(API_URL+'login/', {
        email:email,
        password:password
      })
      props.setUser(response.data)
    }
    catch (error) {
      setError(error.response.data)
      setLoading(false)
    }
  }

  const loginForm = (
    <Form>
      <Row className='my-2'>
        <Form.Group>
          <Form.Control
            placeholder='Email'
            type='email'
            style={{textAlign: "center",
                    fontWeight: "bold"}}
            value={email}
            onChange={e => setEmail(e.target.value)}
            isInvalid={!!error.email}
          />
          <Form.Control.Feedback type='invalid'>{error.email}</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='my-2'>
        <Form.Group>
          <Form.Control
            placeholder='Password'
            type='password'
            style={{textAlign: "center",
                    fontWeight: "bold"}}
            value={password}
            onChange={e => setPassword(e.target.value)}
            isInvalid={!!error.password}
          />
          <Form.Control.Feedback type='invalid'>{error.password}</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='my-2'>
        <Form.Group>
          <Button
            className='btn btn-dark col-12'
            style={{fontWeight:"bold"}}
            onClick={() => submitCreds()}
          >
            Log In
          </Button>
        </Form.Group>
      </Row>
      {error.non_field_errors ?
        <h5 className='text-red text-center'>{error.non_field_errors}</h5>:
        <div/>
      }
    </Form>
  )

  return (
    <Container>
      <br/>
      <img src={image} className='mx-auto d-block img-fluid' alt="WhoopiePie Logo"/>
      <br/>
      <h1 style={{textAlign: "center", fontWeight:"bold"}}>WhoopiePie</h1>
      <br/>
      {loading ? <div className='text-center'><Spinner animation='border'/></div> : loginForm}
    </Container>
  );
}

export default UnauthenticatedApp;
