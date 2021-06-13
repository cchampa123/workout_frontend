import React from 'react'
import { sectionTitling, movementFormatting } from 'utils/sectionStringFormatting'
import {
  id as movement_instance_id,
  order as movement_order
} from 'constants/movement'

function SectionSummary(props) {

  //const movementStrings = props.movementData.map(x=>movementFormatting(x))

  return (
    <div className='mb-2'>
      <div className='mb-1'>
        {sectionTitling(props.sectionData)}
      </div>
      {
        props.movementData.sort((a,b)=>(a[movement_order]>b[movement_order]?1:-1)).map(x=>
          <div key={x[movement_instance_id]}>
            <i>{movementFormatting(x)}</i>
          </div>
        )
      }
    </div>
  )
}

export default SectionSummary
