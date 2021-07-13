import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import TimePicker from 'components/Common/TimePicker'
import {
  id,
  movement_id as movement_name,
  count,
  count_type,
  score_number,
  score_time,
  score_type,
  order as movement_order
} from 'constants/movement'
import { movement_set } from 'constants/section'
import { formatDataStrings } from 'utils/sectionStringFormatting'
import { formatTwoDigitsTime } from 'utils/stringfunctions'

function MovementLogForm(props) {

  const relevantScore = props.movementData[score_type] === 'time'?count:score_number
  const [show, setShow] = useState(false)
  const errors = !!props.errors[movement_set]
    ? !!props.errors[movement_set][props.movementData[movement_order]]
      ?
        props.errors[movement_set][props.movementData[movement_order]]
      :
        {}
    :
    {}
  const buttonText = () => {
    if (relevantScore===count) {
      return props.movementData[score_time]==='00:00:00'?'Untimed':props.movementData[score_time]
    } else {
      return props.movementData[count]===null?'? Reps':props.movementData[count]
    }
  }

  const changeTime = (
      <Modal.Body>
        <TimePicker
          scoreTime={props.movementData[score_number]}
          onSelect={e=>props.setMovementData({...props.movementData, [score_number]:e})}
        />
      </Modal.Body>
    )

  const changeReps = (
    <Modal.Body>
      <Form.Group>
        <Form.Control
          type='number'
          value={props.movementData[count]===null?'':props.movementData[count]}
          isInvalid={!!errors[count]}
          onChange={e => props.setMovementData({...props.movementData, [count]:e.target.value})}
          placeholder={formatDataStrings(props.movementData[count_type])}
        />
        <Form.Control.Feedback type='invalid'>{errors[count]}</Form.Control.Feedback>
      </Form.Group>
    </Modal.Body>
  )

  return(
    <Row className='align-items-center my-1 g-0'>
      <Col className='col-4'>
        <Form.Group>
          <Form.Control
            value={props.movementData[relevantScore]===null?'':props.movementData[relevantScore]}
            type='number'
            onChange={e => props.setMovementData({...props.movementData, [relevantScore]:e.target.value})}
            placeholder={formatDataStrings(relevantScore===count?props.movementData[count_type]:props.movementData[score_type])}
            isInvalid={!!errors[relevantScore]}
          />
          <Form.Control.Feedback type='invalid'>{errors[relevantScore]}</Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col className='col-3 m-0'>
        <Button className={'col-12'+(!!errors[count]?' border border-red':'')} onClick={()=>setShow(true)}>
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
            relevantScore===count?changeTime:changeReps
          }
        <Modal.Footer>
          <Button onClick={()=>setShow(false)} className='col-12'>Close</Button>
        </Modal.Footer>
      </Modal>
    </Row>
  )

}

export default MovementLogForm
