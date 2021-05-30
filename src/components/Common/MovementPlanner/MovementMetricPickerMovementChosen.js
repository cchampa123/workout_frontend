import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import NumPad from 'components/Common/NumPad'
import TimePicker from 'components/Common/TimePicker'
import Dropdown from 'react-bootstrap/Dropdown'
import FakeForm from './FakeForm'
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
  const [number, setNumber] = useState(props.movementData[relevant_number_variable])
  const [type, setType] = useState(props.movementData[relevant_type_variable])

  function hideHelper() {
    setShow(false)
    setNumber(props.movementData[relevant_number_variable])
  }

  function updateDataHelper() {
    if (relevant_number_variable!==score_time) {
      setNumber(Number(number))
    } else {
      setNumber(number)
    }
    props.setMovementData(
        {
          ...props.movementData,
          [relevant_number_variable]:relevant_number_variable===score_time?number:Number(number),
          [relevant_type_variable]:type
        }
      )
    setShow(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateDataHelper()
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
        onHide={()=>hideHelper()}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Dropdown className='col-12'>
            <Dropdown.Toggle
              style={{textTransform:'capitalize'}}
              className='btn col-12 text-dark'
            >
              {formatDataStrings(type)}
            </Dropdown.Toggle>
            <Dropdown.Menu className='col-12'>
              {
                props.movementClass[relevant_defaults].map(x =>
                  <Dropdown.Item
                    key={x}
                    style={{textTransform:'capitalize'}}
                    onClick={()=>setType(x)}
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
              value={number}
              handleSubmit={(e)=>handleSubmit(e)}
              onChange={(selected) => setNumber(selected)}
            /> :
            <NumPad
              handleSubmit={(e)=>handleSubmit(e)}
              placeholder='Enter value'
              value={number}
              onChange={(selected) => setNumber(selected)}
            />
          }
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='col-12'
            onClick={() => updateDataHelper()}>
            Submit
          </Button>
          <Button className='col-12' onClick={()=>hideHelper()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MovementMetricPickerMovementChosen
