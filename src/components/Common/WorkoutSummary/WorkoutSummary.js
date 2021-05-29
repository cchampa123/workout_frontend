import React, { useContext } from 'react'
import Card from 'react-bootstrap/card'
import Button from 'react-bootstrap/button'
import SectionSummary from './SectionSummary'
import { PageContext } from 'contexts/PageContext'
import {
  date as date_planned
} from 'constants/workout'
import {
  section_id as movement_section_id
} from 'constants/movement'
import {
  id as section_section_id
} from 'constants/section'
import moment from 'moment'

function WorkoutSummary(props) {

  const {setPage} = useContext(PageContext)
  const goButton = (
    <Button
      onClick={() => setPage(
        {pageTitle:'Log Workout', pageProps:{workoutData:{
          'workouts':props.workout,
          'sections':props.sections,
          'movements':props.movements
        }}})
      }
      className='btn-secondary col-12'
    >
      Do it
    </Button>
  )
  const dateHeader = (
    <h5>{moment(props.workout[date_planned]).format('ddd MMM D')}</h5>
  )

  return (
    <div className='mb-2'>
      {props.dateHeader?dateHeader:<div/>}
      <Card>
        {props.sections.map(section=>
          <SectionSummary
            key={section[section_section_id]}
            sectionData={section}
            movementData={props.movements.filter(
              movement=>movement[movement_section_id]===section[section_section_id]
            )
          }
          />
        )}
      </Card>
      {props.goButton?goButton:<div/>}
    </div>
  )
}

export default WorkoutSummary
