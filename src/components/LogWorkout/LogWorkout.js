import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { WorkoutDataContext } from 'contexts/WorkoutDataContext'
import WorkoutSummary from 'components/Common/WorkoutSummary/WorkoutSummary'
import WorkoutPlanner from 'components/Common/WorkoutPlanner/WorkoutPlanner'
import WorkoutLogger from 'components/Common/WorkoutLogger/WorkoutLogger'
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

  const {workoutData, setWorkoutData} = useContext(WorkoutDataContext)
  const [activeWorkout, setActiveWorkout] = useState(null)
  const [newWorkout, setNewWorkout] = useState(false)

  if (props.workoutData) {
    return (
      <WorkoutLogger
        workoutData={props.workoutData}
        setWorkoutData={setWorkoutData}
      />
    )
  } else if (newWorkout) {
    return (
      <WorkoutPlanner
        finishWorkout
        workoutData={workoutData}
        setWorkoutData={setWorkoutData}
        workout={createNewDefaultWorkout(workoutData['workouts'])}
        sections={[]}
        movements={[]}
      />
    )
  } else if (activeWorkout === null) {
    workoutData['workouts'].sort((a,b)=>
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
        {workoutData['workouts'].filter(x=>x[complete]===false).map(workout=>
          <Button
            className='col-12'
            style={{textAlign:'left'}}
            as='a'
            onClick={()=>setActiveWorkout(workout[workout_workout_id])}
            key={workout[workout_workout_id]}
          >
            <WorkoutSummary
              dateHeader
              workout={workout}
              sections={workoutData['sections'].filter(
                x=>x[section_workout_id]===workout[workout_workout_id])
              }
              movements={workoutData['movements'].filter(
                x=>x[section_workout_id]===workout[workout_workout_id])
              }
            />
          </Button>
        )}
      </div>
    )
  } else {

    const selectedWorkout = workoutData['workouts'].filter(workout =>
      workout[workout_workout_id]===activeWorkout
    )[0]
    const selectedSections = workoutData['sections'].filter(section =>
      section[section_workout_id]===activeWorkout
    )
    const selectedMovements = workoutData['movements'].filter(movement =>
      movement[movement_workout_id]===activeWorkout
    )

    return (
      <WorkoutLogger
        workoutData={{
          'workouts':selectedWorkout,
          'sections':selectedSections,
          'movements':selectedMovements
        }}
        setWorkoutData={setWorkoutData}
      />
    )
  }
}

export default LogWorkout
