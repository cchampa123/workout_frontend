import React, {useState, useEffect, useContext} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import image from '../img/open_logo.png'
import axios from 'axios'
import { usePersistedState } from 'utils/stateHandlers'
import jwt_decode from 'jwt-decode'
import { AUTH_URL, CLIENT_ID } from 'constants/configs'
import {AuthContext} from 'contexts/AuthContext'
import getPkce from 'oauth-pkce'

function UnauthenticatedApp(props) {

  const {setUser} = useContext(AuthContext)
  const [ loading, setLoading ] = useState(true)
  const [ pkce, setPkce ] = useState({})
  const [ code, setCode ] = useState('')
  const [ authData, setAuthData ] = useState({})
  useEffect(() => {
    if (localStorage.getItem('pkce')===null) {
      getPkce(50, (error, { verifier, challenge }) => {
        setPkce({ verifier, challenge });
        localStorage.setItem('pkce', JSON.stringify({verifier, challenge}))
    })}
    else {
      setPkce(JSON.parse(localStorage.getItem('pkce')))
      localStorage.removeItem('pkce')
    };
    const params = new URLSearchParams(window.location.search)
    const authCode = params.get('code')
    if (authCode) {
      setCode(authCode)
    } else {
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    async function getAuthData() {
      try {
        const response = await axios.post(
          `${AUTH_URL}/token/`,
          `client_id=${CLIENT_ID}&code_verifier=${pkce.verifier}&grant_type=authorization_code&code=${code}`,
          {headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }}
        )
        setCode('')
        setPkce({})
        setAuthData(response.data)
      } catch (error) {
        setCode('')
        setLoading(false)
        //return error
      }
    }
    if (code) {
      getAuthData()
      console.log(code)
    }
  }, [code, pkce.verifier])

  useEffect(() => {
    if (authData['id_token']) {
      setUser({
        user:jwt_decode(authData['id_token']), token:authData['access_token'],
        expires_in:authData['expires_in'],
        refresh_token:authData['refresh_token']
      })
    }
  }, [authData])

  const oauth_url = `${AUTH_URL}/authorize?
nonce=${Math.random().toString(36).substring(2,10)}
&code_challenge=${pkce.challenge}
&code_challenge_method=S256
&response_type=code
&scope=openid
&client_id=${CLIENT_ID}`
  const params = new URLSearchParams(window.location.search)
  const state = params.get('state')

  return (
    <Container>
      <br/>
      <img src={image} className='mx-auto d-block img-fluid' alt="WhoopiePie Logo"/>
      <br/>
      <h1 style={{textAlign: "center", fontWeight:"bold"}}>WhoopiePie</h1>
      <br/>
      {loading?<div className='text-center'><Spinner animation='border'/></div>:<Button className='col-12 btn-dark' href={oauth_url}>Log In</Button>}
    </Container>
  );
}

export default UnauthenticatedApp;
