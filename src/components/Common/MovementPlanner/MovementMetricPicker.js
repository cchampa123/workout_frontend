import React from 'react'
import MovementMetricPickerMovementChosen from './MovementMetricPickerMovementChosen'
import Button from 'react-bootstrap/Button'

function MovementMetricPicker(props) {
  if (props.movementClass.length===0) {
    return(
      <Button className='btn btn-info col-12 disabled text-dark'>-</Button>
    )
  } else {
    return(
      <MovementMetricPickerMovementChosen
        movementClass={props.movementClass[0]}
        movementData={props.movementData}
        count={props.count}
        setMovementData={props.setMovementData}
      />
    )
  }
}

export default MovementMetricPicker
