import React from 'react'
import { sectionTitling, getSectionSummaryObject } from 'utils/sectionStringFormatting'
import {
  order as movement_order,
  count_type,
  count
} from 'constants/movement'
import { movement_set, score_number, score_time } from 'constants/section'

function SectionSummary(props) {

  const movements = props.sectionData[movement_set]
  movements.sort((a,b)=>(a[movement_order]>b[movement_order]?1:-1))


 const sectionSummaryObject = getSectionSummaryObject(movements)

  const singleMovementFormat = (singleMovement, movementType) => {
    if (singleMovement.length===1) {
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

  const score = () => {
    if (props.sectionData[score_number]) {
      return <div><i>Score:</i> {props.sectionData[score_number]} Reps</div>
    } else if (props.sectionData[score_time]!=='00:00:00') {
      return <div><i>Score:</i> {props.sectionData[score_time]}</div>
    } else {
      return null
    }
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
      {
        score()
      }
    </div>
  )
}

export default SectionSummary
