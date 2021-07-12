import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import SectionSummary from './SectionSummary'
import { PageContext } from 'contexts/PageContext'
import {
  date as date_planned,
  section_set
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
        {pageTitle:'Log Workout', pageProps:{workoutData:props.workout}})
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
        {props.workout[section_set].map(section=>
          <SectionSummary
            key={section[section_section_id]}
            sectionData={section}
          />
        )}
      </Card>
      {props.goButton?goButton:<div/>}
    </div>
  )
}

export default WorkoutSummary
