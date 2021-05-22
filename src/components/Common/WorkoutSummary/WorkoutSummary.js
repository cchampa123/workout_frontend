import React from 'react'
import Card from 'react-bootstrap/card'
import SectionSummary from './SectionSummary'
import {
  section_id as movement_section_id
} from 'constants/movement'
import {
  id as section_section_id
} from 'constants/section'

function WorkoutSummary(props) {

  return (
    <Card className='mb-2'>
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
  )
}

export default WorkoutSummary
