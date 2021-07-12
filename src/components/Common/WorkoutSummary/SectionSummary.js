import React from 'react'
import { sectionTitling, movementFormatting } from 'utils/sectionStringFormatting'
import {
  id as movement_instance_id,
  order as movement_order
} from 'constants/movement'
import { movement_set } from 'constants/section'

function SectionSummary(props) {

  const movements = props.sectionData[movement_set]
  return (
    <div className='mb-2'>
      <div className='mb-1'>
        {sectionTitling(props.sectionData)}
      </div>
      {
        movements.sort((a,b)=>(a[movement_order]>b[movement_order]?1:-1)).map(x=>
          <div key={x[movement_instance_id]}>
            <i>{movementFormatting(x)}</i>
          </div>
        )
      }
    </div>
  )
}

export default SectionSummary
