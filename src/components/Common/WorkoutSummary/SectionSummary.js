import React from 'react'
import { sectionTitling, movementFormatting, getSectionSummaryObject } from 'utils/sectionStringFormatting'
import {
  id as movement_instance_id,
  movement_id as movement_type,
  order as movement_order,
  count_type,
  count,
  superset
} from 'constants/movement'
import { movement_set } from 'constants/section'

function SectionSummary(props) {

  const movements = props.sectionData[movement_set]
  movements.sort((a,b)=>(a[movement_order]>b[movement_order]?1:-1))


 const sectionSummaryObject = getSectionSummaryObject(movements)

  const singleMovementFormat = (singleMovement, movementType) => {
    if (singleMovement.length===1) {
      console.log(singleMovement)
      const movement = singleMovement[0]
      const scores = movement.scores.filter(x=>x===null).length>0?null:'@ '+movement.scores.join(', ')+' '+movement.score_type
      return (
        <div>{movement.numSets} sets {movement[count]} {movement[count_type]} {movementType} {scores} </div>
      )
    } else {
      return (
        <ul className='mb-0'>
        {singleMovement.map((singleCount, index) => {
          const scores = singleCount.scores.filter(x=>x===null).length>0?null:'@ '+singleCount.scores.join(', ')+' '+singleCount.score_type
          return(
              <li key={index}>{singleCount.numSets} sets {singleCount[count]} {singleCount[count_type]} {scores}</li>
          )
        })}
        </ul>
      )
    }
  }

  const singleSuperSetFormat = (superset) => {
    return (
      superset.map((singleMovement, index)=> {
        return (
          <i key={index}>
            {singleMovement.movementDescription.length>1?<div>{singleMovement.totalSets} sets {singleMovement.movement}</div>:null}
            {singleMovementFormat(singleMovement.movementDescription, singleMovement.movement)}
          </i>
        )
      })
    )
  }


  return (
    <div className='mb-2'>
      <div className='mb-1'>
        {sectionTitling(props.sectionData)}
      </div>
      {sectionSummaryObject.map((superset, index) => {
        return (
          <div key={index} className='mb-2'>
            {sectionSummaryObject.length>1?<u><i>Part {index+1}:</i></u>:null}
            {singleSuperSetFormat(superset)}
          </div>
        )
        })
      }
    </div>
  )
}

export default SectionSummary
