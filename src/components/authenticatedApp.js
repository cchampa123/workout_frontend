import React, { useState } from 'react';
import Container from 'react-bootstrap/Container'
import MainMenu from './Navbar/MainMenu'
import Home from './Home/Home'
import BuildWorkout from './BuildWorkout/BuildWorkout'
import LogWorkout from './LogWorkout/LogWorkout'
import { AuthContext } from 'contexts/AuthContext'
import { WorkoutDataContext } from 'contexts/WorkoutDataContext'
import { PageContext } from 'contexts/PageContext'


function AuthenticatedApp(props) {

  const [page, setPage] = useState('Home')
  const pageValue = {page, setPage}

  const [workoutData, setWorkoutData] = useState({
    workouts:[],
    setWorkouts:()=>{},
    sections:[],
    setSections:()=>{},
    movements:[],
    setMovements:()=>{}}
  )
  const workoutDataValue={workoutData, setWorkoutData}

  const pages = {
    'Home': Home,
    'Plan Workout' : BuildWorkout,
    'Log Workout': LogWorkout
  }

  const Component = pages[page]

  return (
    <AuthContext.Provider value={props.user}>
    <PageContext.Provider value={pageValue}>
    <WorkoutDataContext.Provider value={workoutDataValue}>
      <MainMenu
        pages={pages}
      />
      <Container className='mt-3'>
        <Component />
      </Container>
    </WorkoutDataContext.Provider>
    </PageContext.Provider>
    </AuthContext.Provider>
  );
}

export default AuthenticatedApp;
