import React, { useState, useEffect, useMemo } from 'react';
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import MainMenu from './Navbar/MainMenu'
import Home from './Home/Home'
import BuildWorkout from './BuildWorkout/BuildWorkout'
import LogWorkout from './LogWorkout/LogWorkout'
import { AuthContext } from 'contexts/AuthContext'
import { WorkoutDataContext } from 'contexts/WorkoutDataContext'
import { PageContext } from 'contexts/PageContext'
import { LOCAL_DATE_RANGE } from 'constants/configs'
import { submitNewData, getData } from 'utils/apiCalls'
import moment from 'moment'
import { date as date_planned, id as workout_workout_id } from 'constants/workout'
import { workout_id as section_workout_id } from 'constants/section'
import { workout_id as movement_workout_id } from 'constants/movement'
import axios from 'axios'
import useSWR from 'swr'

function AuthenticatedApp(props) {

  const [page, setPage] = useState({pageTitle:'Home', pageProps:{}});
  const pageValue = {page, setPage};

  const dateParams = useMemo(() => ({
    'date__lte':moment().add(LOCAL_DATE_RANGE, 'd').format('YYYY-MM-DD'),
    'date__gte':moment().subtract(LOCAL_DATE_RANGE, 'd').format('YYYY-MM-DD')
  }), [])
  const token = props.user.token
  const { data, error, mutate } = useSWR(
    ['workout/', token, dateParams],
    (url, token, dateParams) => getData(url, token, dateParams)
  )

  const dataValue = { workoutData:data, error, mutate };
  const pages = {
    'Home': Home,
    'Plan Workout' : BuildWorkout,
    'Log Workout': LogWorkout
  }

  if (!!error) {
    if (error.response.status === 401) {
      props.setUser(null)
      return (
        <AuthContext.Provider value={props.user}>
        <PageContext.Provider value={pageValue}>
          <MainMenu
            pages={pages}
            setUser={props.setUser}
          />
          <Container className='mt-3'>
            <h3>Session expired. Redirecting...</h3>
          </Container>
        </PageContext.Provider>
        </AuthContext.Provider>
      )
    } else {
      return (
        <AuthContext.Provider value={props.user}>
        <PageContext.Provider value={pageValue}>
          <MainMenu
            pages={pages}
            setUser={props.setUser}
          />
          <Container className='mt-3'>
            <h1>Something went wrong</h1>
          </Container>
        </PageContext.Provider>
        </AuthContext.Provider>
      )
    }
  } else if (!data) {
    return (
      <AuthContext.Provider value={props.user}>
      <PageContext.Provider value={pageValue}>
        <MainMenu
          pages={pages}
          setUser={props.setUser}
        />
        <Container className='mt-3'>
          <div className='text-center'><Spinner animation='border'/></div>
        </Container>
      </PageContext.Provider>
      </AuthContext.Provider>
    )
  } else {
    const Component = pages[page.pageTitle]
    return (
      <AuthContext.Provider value={props.user}>
      <PageContext.Provider value={pageValue}>
      <WorkoutDataContext.Provider value={dataValue}>
        <MainMenu
          pages={pages}
          setUser={props.setUser}
        />
        <Container className='mt-3'>
          <Component {...page.pageProps}/>
        </Container>
      </WorkoutDataContext.Provider>
      </PageContext.Provider>
      </AuthContext.Provider>
    );
  }
}

export default AuthenticatedApp;
