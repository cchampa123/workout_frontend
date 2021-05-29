import React, { useState, useEffect } from 'react';
import { usePersistedState } from 'utils/stateHandlers'
import Container from 'react-bootstrap/Container'
import MainMenu from './Navbar/MainMenu'
import Home from './Home/Home'
import BuildWorkout from './BuildWorkout/BuildWorkout'
import LogWorkout from './LogWorkout/LogWorkout'
import { AuthContext } from 'contexts/AuthContext'
import { WorkoutDataContext } from 'contexts/WorkoutDataContext'
import { PageContext } from 'contexts/PageContext'
import { LOCAL_DATE_RANGE } from 'constants/configs'
import { submitNewData } from 'utils/apiCalls'
import moment from 'moment'
import { date as date_planned, id as workout_workout_id } from 'constants/workout'
import { workout_id as section_workout_id } from 'constants/section'
import { workout_id as movement_workout_id } from 'constants/movement'

function AuthenticatedApp(props) {

  const [page, setPage] = useState({pageTitle:'Home', pageProps:{}});
  const pageValue = {page, setPage};

  const [workoutData, setWorkoutData] = usePersistedState('workoutData', {
    workouts:[],
    sections:[],
    movements:[],
  })
  useEffect(() => {
    return () => {
      setWorkoutData({
        workouts:[],
        sections:[],
        movements:[],
      })
    }
  }, [setWorkoutData])

  async function wrapper(newWorkoutData, noUpdate=false) {
    const [submissionErrors, newData] = await submitNewData(
      props.user.token,
      workoutData,
      newWorkoutData,
      noUpdate
    )
    const upperBound = moment().add(LOCAL_DATE_RANGE, 'd').format('YYYY-MM-DD')
    const lowerBound = moment().subtract(LOCAL_DATE_RANGE, 'd').format('YYYY-MM-DD')
    const filteredWorkouts = newData['workouts'].filter(x=>
      moment(x[date_planned]).isBetween(lowerBound, upperBound)
    )
    const workoutIds = filteredWorkouts.map(y=>y[workout_workout_id])

    const filteredSections = newData['sections'].filter(x=>
      workoutIds.includes(x[section_workout_id])
    )
    const filteredMovements = newData['movements'].filter(x=>
      workoutIds.includes(x[movement_workout_id])
    )
    setWorkoutData({
      'workouts':filteredWorkouts,
      'sections':filteredSections,
      'movements':filteredMovements
    })
    return submissionErrors
  }

  const workoutDataValue={workoutData, 'setWorkoutData':wrapper};

  const pages = {
    'Home': Home,
    'Plan Workout' : BuildWorkout,
    'Log Workout': LogWorkout
  }

  const Component = pages[page.pageTitle]

  return (
    <AuthContext.Provider value={props.user}>
    <PageContext.Provider value={pageValue}>
    <WorkoutDataContext.Provider value={workoutDataValue}>
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

export default AuthenticatedApp;
