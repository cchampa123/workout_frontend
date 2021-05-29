import React from 'react'
import WorkoutSummary from 'components/Common/WorkoutSummary/WorkoutSummary'
import { id as workout_workout_id } from 'constants/workout'
import { workout_id as section_workout_id } from 'constants/section'
import { workout_id as movement_workout_id } from 'constants/movement'
import { FaUmbrellaBeach } from 'react-icons/fa'

function WorkoutSummaryWrapper(props) {

  if (props.workouts.length===0) {
    return <div className='text-center'><FaUmbrellaBeach className='text-secondary' size='2em'/></div>
  } else {
    return (
      <>
      {
        props.workouts.map(workout =>
          <WorkoutSummary
            key={workout[workout_workout_id]}
            workout={workout}
            goButton={props.goButton}
            dateHeader={props.dateHeader}
            sections={props.workoutData['sections'].filter(x=>
              x[section_workout_id]===workout[workout_workout_id]
            )}
            movements={props.workoutData['movements'].filter(x=>
              x[movement_workout_id]===workout[workout_workout_id]
            )}
          />
        )
      }
      </>
    )
  }
}

export default WorkoutSummaryWrapper
