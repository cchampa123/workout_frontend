import React, { useContext } from 'react'
import WorkoutPlanner from 'components/Common/WorkoutPlanner/WorkoutPlanner'
import { WorkoutDataContext } from 'contexts/WorkoutDataContext'
import { createNewDefaultWorkout } from 'utils/createDefaults'

function BuildWorkout(props) {

  const {workoutData, setWorkoutData} = useContext(WorkoutDataContext)

  return(
    <div>
      <WorkoutPlanner
        workoutData={workoutData}
        setWorkoutData={setWorkoutData}
        workout={createNewDefaultWorkout(workoutData['workouts'])}
        sections={[]}
        movements={[]}
      />
    </div>
  )

}

export default BuildWorkout
