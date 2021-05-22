import React, { useContext } from 'react'
import WorkoutPlanner from 'components/Common/WorkoutPlanner/WorkoutPlanner'
import { WorkoutDataContext } from 'contexts/WorkoutDataContext'
import { AuthContext } from 'contexts/AuthContext'
import { createNewDefaultWorkout } from 'utils/createDefaults'

function BuildWorkout(props) {

  const {workoutData, setWorkoutData} = useContext(WorkoutDataContext)
  const {user} = useContext(AuthContext)

  return(
    <div>
      <WorkoutPlanner
        workoutData={workoutData}
        setWorkoutData={setWorkoutData}
        workout={createNewDefaultWorkout(user, workoutData['workouts'])}
        sections={[]}
        movements={[]}
      />
    </div>
  )

}

export default BuildWorkout
