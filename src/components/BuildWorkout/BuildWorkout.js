import React, { useContext } from 'react'
import WorkoutPlanner from 'components/Common/WorkoutPlanner/WorkoutPlanner'
import { WorkoutDataContext } from 'contexts/WorkoutDataContext'
import { createNewDefaultWorkout } from 'utils/createDefaults'
import Spinner from 'react-bootstrap/Spinner'

function BuildWorkout(props) {
  const { workoutData, errors, mutate } = useContext(WorkoutDataContext)
  const newDefault = createNewDefaultWorkout()

  if (!!errors) return <h1>Something went wrong</h1>
  if (!workoutData) {
    return <div className='text-center'><Spinner animation='border'/></div>
  }

  return(
    <div>
      <WorkoutPlanner
        errors={errors}
        mutate={mutate}
        workout={newDefault}
      />
    </div>
  )

}

export default BuildWorkout
