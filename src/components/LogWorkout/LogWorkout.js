import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/button'
import { WorkoutDataContext } from 'contexts/WorkoutDataContext'
import WorkoutSummary from 'components/Common/WorkoutSummary/WorkoutSummary'
import WorkoutLogger from 'components/Common/WorkoutLogger/WorkoutLogger'
import {
  id as workout_workout_id
} from 'constants/workout'
import {
  workout_id as section_workout_id
} from 'constants/section'
import {
  workout_id as movement_workout_id
} from 'constants/movement'

function LogWorkout() {

  const {workoutData, setWorkoutData} = useContext(WorkoutDataContext)
  const [activeWorkout, setActiveWorkout] = useState(null)

  function setWorkoutDataWrapper(newData) {
    const newWorkoutData=[
      ...workoutData['workouts'].filter(
        x=>x[workout_workout_id]!==newData['workouts'][workout_workout_id]
      ),
      newData['workouts']
    ]
    const newSectionData=[
      ...workoutData['sections'].filter(
        x=>x[section_workout_id]!==newData['workouts'][workout_workout_id]
      ),
      ...newData['sections']
    ]
    const newMovementData=[
      ...workoutData['movements'].filter(
        x=>x[section_workout_id]!==newData['workouts'][workout_workout_id]
      ),
      ...newData['movements']
    ]

    setWorkoutData({
      'workouts':newWorkoutData,
      'sections':newSectionData,
      'movements':newMovementData
    })
  }

  if (activeWorkout === null) {
    return(
      <div>
        {workoutData['workouts'].map(workout=>
          <a
            onClick={()=>setActiveWorkout(workout[workout_workout_id])}
            key={workout[workout_workout_id]}
          >
            <WorkoutSummary
              workout={workout}
              sections={workoutData['sections'].filter(
                x=>x[section_workout_id]===workout[workout_workout_id])
              }
              movements={workoutData['movements'].filter(
                x=>x[section_workout_id]===workout[workout_workout_id])
              }
            />
          </a>
        )}
      </div>
    )
  } else {
    return (
      <WorkoutLogger
        workoutData={workoutData}
        setWorkoutData={setWorkoutDataWrapper}
        activeWorkout={activeWorkout}
      />
    )
  }
}

export default LogWorkout
