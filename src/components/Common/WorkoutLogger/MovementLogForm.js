import React, { useState } from 'react'
import Form from 'react-bootstrap/form'
import Row from 'react-bootstrap/row'
import Col from 'react-bootstrap/col'
import Button from 'react-bootstrap/button'
import Modal from 'react-bootstrap/modal'
import {
  id,
  movement_id as movement_name,
  count,
  count_type,
  score_number,
  score_time,
  score_type
} from 'constants/movement'
import { formatDataStrings } from 'utils/sectionStringFormatting'
import { formatTwoDigitsTime } from 'utils/stringfunctions'

function MovementLogForm(props) {

  const relevantScore = props.movementData[score_type] === 'time'?count:score_number
  const [show, setShow] = useState(false)

  const buttonText = () => {
    if (relevantScore===count) {
      return props.movementData[score_time]==='00:00:00'?'Untimed':props.movementData[score_time]
    } else {
      return props.movementData[count]===null?'? Reps':props.movementData[count]
    }
  }

  const changeTime = () => {
    const [hours, minutes, seconds] = props.movementData[score_time].split(':').map(x=>Number(x))
    return (
      <Modal.Body>
        <Form.Control
          type='number'
          pattern='[0-9]*'
          placeholder='Hours'
          value={hours===0?'':hours}
          onChange={e=>props.setMovementData({
            ...props.movementData,
            [score_time]:formatTwoDigitsTime(e.target.value)+':'+formatTwoDigitsTime(minutes)+':'+formatTwoDigitsTime(seconds)
          })}
        />
        <Form.Control
          type='number'
          pattern='[0-9]*'
          placeholder='Minutes'
          value={minutes===0?'':minutes}
          onChange={e=>props.setMovementData({
            ...props.movementData,
            [score_time]:formatTwoDigitsTime(hours)+':'+formatTwoDigitsTime(e.target.value)+':'+formatTwoDigitsTime(seconds)
          })}
        />
        <Form.Control
          type='number'
          pattern='[0-9]*'
          placeholder='Seconds'
          value={seconds===0?'':seconds}
          onChange={e=>props.setMovementData({
            ...props.movementData,
            [score_time]:formatTwoDigitsTime(hours)+':'+formatTwoDigitsTime(minutes)+':'+formatTwoDigitsTime(e.target.value)
          })}
        />
      </Modal.Body>
    )
  }

  const changeReps = (
    <Modal.Body>
      <Form.Control
        type='number'
        value={props.movementData[count]}
        isInvalid={!!props.errors[props.movementData[id]]}
        onChange={e => props.setMovementData({...props.movementData, [count]:e.target.value})}
        placeholder={formatDataStrings(props.movementData[count_type])}
      />
    </Modal.Body>
  )

  return(
    <Row className='align-items-center my-1 g-0'>
      <Col className='col-4'>
        <Form.Control
          value={props.movementData[relevantScore]}
          type='number'
          onChange={e => props.setMovementData({...props.movementData, [relevantScore]:e.target.value})}
          placeholder={formatDataStrings(relevantScore===count?props.movementData[count_type]:props.movementData[score_type])}
          isInvalid={!!props.errors[props.movementData[id]]}
        />
      </Col>
      <Col className='col-3 m-0'>
        <Button className={'col-12'+(!!props.errors[props.movementData[id]]?' border border-red':'')} onClick={()=>setShow(true)}>
          {buttonText()}
        </Button>
      </Col>
      <Col className='col-5 m-0'>
        <h5 className='m-0'>{props.movementData[movement_name]}</h5>
      </Col>
      <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header>
          {
            relevantScore===count?'Enter Time':'Enter Reps'
          }
        </Modal.Header>
          {
            relevantScore===count?changeTime():changeReps
          }
        <Modal.Footer>
          <Button onClick={()=>setShow(false)} className='col-12'>Close</Button>
        </Modal.Footer>
      </Modal>
    </Row>
  )

  // if (props.movementData[score_type]==='time') {
  //   if (props.movementData[count])
  //   const [hours, minutes, seconds] = props.movementData[score_time].split(':').map(x=>Number(x))
  //   return(
  //     <Row className='align-items-center my-1'>
  //       <Col className='col-8'>
  //         <Row className='g-0'>
  //
  //           <Col className='col-3'>
  //
  //           </Col>
  //         </Row>
  //       </Col>
  //       <Col className='col-4'>
  //         <h5 className='m-0'>{props.movementData[movement_name]}</h5>
  //       </Col>
  //     </Row>
  //   )
  // } else {
  //
  // }
}

export default MovementLogForm
