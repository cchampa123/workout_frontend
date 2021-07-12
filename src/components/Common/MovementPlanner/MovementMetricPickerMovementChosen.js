import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import NumPad from 'components/Common/NumPad'
import TimePicker from 'components/Common/TimePicker'
import Dropdown from 'react-bootstrap/Dropdown'
import FakeForm from './FakeForm'
import Form from 'react-bootstrap/Form'
import {
  count_type,
  score_type,
  count,
  score_number,
  score_time
} from 'constants/movement'
import {
  count_types as class_count_types,
  score_types as class_score_types
} from 'constants/movement_class'

import { formatDataStrings } from 'utils/sectionStringFormatting'

function MovementMetricPickerMovementChosen(props) {

  const relevant_type_variable = props.count?count_type:score_type
  const relevant_number_variable = props.count?
    count
      :
    (props.movementData[score_type] === 'time' ? score_time : score_number)
  const relevant_defaults = props.count?class_count_types:class_score_types

  const [show, setShow] = useState(false)

  const setField = (field, value) => {
    if (field === score_type) {
      if (value === 'time') {
        props.setMovementData({
          ...props.movementData,
          [score_number]:null,
          [field]:value
        })
      } else {
        props.setMovementData({
          ...props.movementData,
          [score_time]:"00:00:00",
          [field]:value
        })
      }
    } else {
      props.setMovementData({
        ...props.movementData,
        [field]:value
      })
    }
  }

  return(
    <div>
      <FakeForm
        relevant_number_variable={relevant_number_variable}
        relevant_type_variable={relevant_type_variable}
        relevant_defaults={relevant_defaults}
        setShow={setShow}
        movementData={props.movementData}
        movementClass={props.movementClass}
        count={props.count}
      />
      <Modal
        show={show}
        onHide={()=>setShow(false)}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Dropdown className='col-12'>
            <Dropdown.Toggle
              style={{textTransform:'capitalize'}}
              className='btn col-12 text-dark'
            >
              {formatDataStrings(props.movementData[relevant_type_variable])}
            </Dropdown.Toggle>
            <Dropdown.Menu className='col-12'>
              {
                props.movementClass[relevant_defaults].map(x =>
                  <Dropdown.Item
                    key={x}
                    style={{textTransform:'capitalize'}}
                    onClick={()=>setField(relevant_type_variable, x)}
                  >
                    {formatDataStrings(x)}
                  </Dropdown.Item>
                )
              }
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Header>
        <Modal.Body>
          {
            relevant_number_variable===score_time ?
            <TimePicker
              scoreTime={props.movementData[relevant_number_variable]}
              onSelect={(selected) => setField(relevant_number_variable, selected)}
            /> :
            <Form.Control
              type='number'
              placeholder='Enter value'
              value={props.movementData[relevant_number_variable]}
              onChange={(e) => setField(relevant_number_variable, e.target.value)}
            />
          }
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='col-12'
            onClick={() => setShow(false)}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MovementMetricPickerMovementChosen
