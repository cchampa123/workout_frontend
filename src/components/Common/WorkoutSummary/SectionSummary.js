import React from 'react'
import { sectionTitling, movementFormatting } from 'utils/sectionStringFormatting'
import {
  id as movement_instance_id
} from 'constants/movement'

function SectionSummary(props) {

  const movementStrings = props.movementData.map(x=>movementFormatting(x))

  return (
    <div className='mb-2'>
      <div className='mb-1'>
        {sectionTitling(props.sectionData)}
      </div>
      {
        movementStrings.map(x=>
          <div key={movement_instance_id}>
            <i>{x}</i>
          </div>
        )
      }
    </div>
  )
}

export default SectionSummary
