import React, { useContext } from 'react'
import WorkoutPlanner from 'components/Common/WorkoutPlanner/WorkoutPlanner'
import { WorkoutDataContext } from 'contexts/WorkoutDataContext'
import { createNewDefaultWorkout } from 'utils/createDefaults'

function BuildWorkout(props) {
  const {workoutData, setWorkoutData} = useContext(WorkoutDataContext)
  const newDefault = () => createNewDefaultWorkout(workoutData['workouts'])

  return(
    <div>
      <WorkoutPlanner
        workoutData={workoutData}
        setWorkoutData={setWorkoutData}
        workout={newDefault}
        sections={[]}
        movements={[]}
      />
    </div>
  )

}

export default BuildWorkout
