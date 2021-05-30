import React, { useState, useContext, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from 'contexts/AuthContext'
import { WorkoutDataContext } from 'contexts/WorkoutDataContext'
import { date as date_planned, complete } from 'constants/workout'
import { getRecentWorkouts } from 'utils/apiCalls'
import WorkoutSummaryWrapper from './WorkoutSummaryWrapper'
import moment from 'moment'

function Home() {

  const user = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const {workoutData, setWorkoutData} = useContext(WorkoutDataContext)
  useEffect(() => {
    async function updateData() {
      setLoading(true)
      const dataFromAPI = await getRecentWorkouts(user.token)
      if (!dataFromAPI.status) {
        setWorkoutData(dataFromAPI, true).then(
          setLoading(false)
        )
      } else {
        setLoading(false)
      }
    }
    updateData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const todayWorkouts = workoutData['workouts'].filter(x=>
    moment(x[date_planned]).isSame(moment(), 'day') && x[complete] === false
  )
  const upcomingWorkouts = workoutData['workouts'].filter(x=>moment(x[date_planned]).isAfter(moment()))
  const completedWorkouts = workoutData['workouts'].filter(x=>x[complete])
  completedWorkouts.sort((a,b)=>a[date_planned]>b[date_planned]?-1:1)

  return(
    <div>
      <h2 className='text-secondary'>Welcome, {user.user.first_name}!</h2>
      <h3>Up for Today</h3>
      <div className='mb-2'>
        {workoutData['workouts'].length === 0 && loading ?
          <div className='text-center'><Spinner animation='border'/></div>
          :
          <WorkoutSummaryWrapper
            goButton={true}
            workouts={todayWorkouts}
            workoutData={workoutData}
          />
        }
      </div>
      <h3>Upcoming</h3>
      <div className='mb-2'>
        {workoutData['workouts'].length === 0 && loading ?
          <div className='text-center'><Spinner animation='border'/></div>
          :
          <WorkoutSummaryWrapper
            dateHeader={true}
            workouts={upcomingWorkouts}
            workoutData={workoutData}
          />
        }
      </div>
      <h3>Recently completed</h3>
      <div className='mb-2'>
        {workoutData['workouts'].length === 0 && loading ?
          <div className='text-center'><Spinner animation='border'/></div>
          :
          <WorkoutSummaryWrapper
            dateHeader={true}
            workouts={completedWorkouts}
            workoutData={workoutData}
          />
        }
      </div>
    </div>
  );

}

export default Home;
