import React, { useState, useMemo, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import MainMenu from './Navbar/MainMenu'
import Home from './Home/Home'
import BuildWorkout from './BuildWorkout/BuildWorkout'
import LogWorkout from './LogWorkout/LogWorkout'
import Explorer from './Explorer/Explorer'
import { AuthContext } from 'contexts/AuthContext'
import { WorkoutDataContext } from 'contexts/WorkoutDataContext'
import { PageContext } from 'contexts/PageContext'
import { LOCAL_DATE_RANGE, AUTH_URL, CLIENT_ID } from 'constants/configs'
import { getData } from 'utils/apiCalls'
import moment from 'moment'
import useSWR from 'swr'
import axios from 'axios'

function AuthenticatedApp(props) {

  const [page, setPage] = useState({pageTitle:'Home', pageProps:{}});
  const {user, setUser} = useContext(AuthContext)
  const pageValue = {page, setPage};

  const dateParams = useMemo(() => ({
    'date__lte':moment().add(LOCAL_DATE_RANGE, 'd').format('YYYY-MM-DD'),
    'date__gte':moment().subtract(LOCAL_DATE_RANGE, 'd').format('YYYY-MM-DD')
  }), [])
  const token = user.token
  const { data, error, mutate } = useSWR(
    ['workout/', token, dateParams],
    (url, token, dateParams) => getData(url, token, dateParams)
  )

  useEffect(()=>{
    const responseInterceptor = axios.interceptors.response.use((response) => {
      return response
    }, async function (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log(user.refresh_token)
        const newData = await axios.post(`${AUTH_URL}/token/`,
          `refresh_token=${user.refresh_token}&grant_type=refresh_token&client_id=${CLIENT_ID}`,
          {headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }}
        )
        setUser({...user,
          token:newData.data.access_token,
          refresh_token:newData.data.refresh_token})
        originalRequest.headers.Authorization = `Bearer ${newData.data.access_token}`
        return axios(originalRequest)
      }
      return Promise.reject(error)
    })
    return () => {
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [AUTH_URL, CLIENT_ID, user.access_token, user.refresh_token])

  const dataValue = { workoutData:data, error, mutate };
  const pages = {
    'Home': Home,
    'Plan Workout' : BuildWorkout,
    'Log Workout': LogWorkout,
    'Results Explorer': Explorer
  }

  if (!!error && error.response.status !== 401) {
    setUser(null)
    return (
      <PageContext.Provider value={pageValue}>
        <MainMenu
          pages={pages}
          user={user}
          setUser={setUser}
        />
        <Container className='mt-3'>
          <div className='text-center'><Spinner animation='border'/></div>
        </Container>
      </PageContext.Provider>
    )
  } else if (!data) {
    return (
      <PageContext.Provider value={pageValue}>
        <MainMenu
          pages={pages}
          user={user}
          setUser={setUser}
        />
        <Container className='mt-3'>
          <div className='text-center'><Spinner animation='border'/></div>
        </Container>
      </PageContext.Provider>
    )
  } else {
    const Component = pages[page.pageTitle]
    return (
      <PageContext.Provider value={pageValue}>
      <WorkoutDataContext.Provider value={dataValue}>
        <MainMenu
          pages={pages}
          user={user}
          setUser={setUser}
        />
        <Container className='mt-3'>
          <Component {...page.pageProps}/>
        </Container>
      </WorkoutDataContext.Provider>
      </PageContext.Provider>
    );
  }
}

export default AuthenticatedApp;
