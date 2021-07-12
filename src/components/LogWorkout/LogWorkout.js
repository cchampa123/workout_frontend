import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { WorkoutDataContext } from 'contexts/WorkoutDataContext'
import WorkoutSummary from 'components/Common/WorkoutSummary/WorkoutSummary'
import WorkoutPlanner from 'components/Common/WorkoutPlanner/WorkoutPlanner'
import WorkoutLogger from 'components/Common/WorkoutLogger/WorkoutLogger'
import Spinner from 'react-bootstrap/Spinner'
import { createNewDefaultWorkout } from 'utils/createDefaults'
import {
  id as workout_workout_id,
  date as date_planned,
  complete
} from 'constants/workout'
import {
  workout_id as section_workout_id
} from 'constants/section'
import {
  workout_id as movement_workout_id
} from 'constants/movement'

function LogWorkout(props) {

  const { workoutData, errors, mutate } = useContext(WorkoutDataContext)
  const [activeWorkout, setActiveWorkout] = useState(props.workoutData)
  const [newWorkout, setNewWorkout] = useState(false)
  if (!!errors) return <h1>Something went wrong</h1>
  if (!workoutData) {
    return <div className='text-center'><Spinner animation='border'/></div>
  }

  if (activeWorkout) {
    return (
      <WorkoutLogger
        workoutData={activeWorkout}
        errors={errors}
        mutate={mutate}
      />
    )
  } else if (newWorkout) {
    return (
      <WorkoutPlanner
        errors={errors}
        mutate={mutate}
        workout={createNewDefaultWorkout(workoutData)}
      />
    )
  } else {
    workoutData.sort((a,b)=>
      a[date_planned]>b[date_planned]?1:-1
    )
    return(
      <div>
        <Button
          className='btn-dark col-12 mb-2'
          onClick={()=>setNewWorkout(true)}
        >
          Build new workout
        </Button>
        <h5>Upcoming workouts</h5>
        {workoutData.filter(x=>x[complete]===false).map(workout=>
          <Button
            className='col-12'
            style={{textAlign:'left'}}
            as='a'
            onClick={()=>setActiveWorkout(workout)}
            key={workout[workout_workout_id]}
          >
            <WorkoutSummary
              dateHeader
              workout={workout}
            />
          </Button>
        )}
      </div>
    )
  }
}

export default LogWorkout
