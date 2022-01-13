import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import TimePicker from 'components/Common/TimePicker'

import { sectionTitling, formatDataStrings, unformatDataStrings } from 'utils/sectionStringFormatting'

import {
  rounds,
  round_type,
  round_types,
  round_duration,
  section_type,
  score_number,
  score_time,
  section_types,
  extra_instructions
} from 'constants/section'

function SectionDetail(props) {

  const [show, setShow] = useState(false)

  const setField = (field, value) => {
    if (field === round_type && value==='F') {
      props.setForm({
        ...props.form,
        round_type:value,
      })
    } else if (field === section_type && value!=='M') {
      props.setForm({
        ...props.form,
        section_type:value,
        score_number:null,
        score_time:'00:00:00',
        rounds:1,
        round_type:'F'
      })
    } else if (props.form[section_type]!=='M' && field===section_type && value!=='S') {
      props.setForm({
        ...props.form,
        score_number:null,
        score_time:'00:00:00',
        section_type:value,
        round_type:round_types[0]
      })
    } else {
      props.setForm({
        ...props.form,
        [field]:value
      })
    }
  }

  const deleteSection = () => {
    setShow(false)
    props.setForm(null)
  }

  const buttonStyling = () => {
    if (!!props.errors[rounds] || !!props.errors[round_type] || !!props.errors[rounds]) {
      return 'col-12 btn btn-info text-dark border-red'
    }
    return 'col-12 btn btn-info text-dark'
  }

  return(
    <Col className='col-12'>
    <Button className={buttonStyling()} onClick={()=>setShow(true)}>
      {sectionTitling(props.form)}
    </Button>
    <Modal show={show} onHide={()=>setShow(false)}>
      <Modal.Header>
        Section Detail
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Section Type</Form.Label>
          <Form.Control
            value={formatDataStrings(props.form[section_type])}
            as='select'
            onChange={e=>setField(section_type, unformatDataStrings(e.target.value))}
          >
            {
              section_types.map(type=>
                <option key={type}>{formatDataStrings(type)}</option>
              )
            }
          </Form.Control>
        </Form.Group>
        {props.form[section_type]==='M' ?
        <div>
          <Form.Group>
            <Form.Label>Rounds</Form.Label>
            <Form.Control
              value={props.form[rounds]}
              type='number'
              isInvalid={!!props.errors[rounds]}
              pattern='[0-9]*'
              onChange={e=>setField(rounds, e.target.value)}
            />
            <Form.Control.Feedback type='invalid'>{props.errors[rounds]}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Round Type</Form.Label>
            <Form.Control
              value={formatDataStrings(props.form[round_type])}
              as='select'
              isInvalid={!!props.errors[round_type]}
              onChange={e=>setField(round_type, unformatDataStrings(e.target.value))}
            >
              {
                round_types.map(x=>
                  <option key={x}>{formatDataStrings(x)}</option>
                )
              }
            </Form.Control>
            <Form.Control.Feedback type='invalid'>{props.errors[round_type]}</Form.Control.Feedback>
          </Form.Group>
          {props.form[round_type]==='F'?<div/>:
          <div>
            <Form.Label>Round Duration</Form.Label>
            <TimePicker
              scoreTime={props.form[round_duration]}
              onSelect={e=>setField(round_duration, e)}
            />
          </div>
          }
        </div>
        :
        <div/>
        }

        <Form.Group>
          <Form.Label>Extra Instructions</Form.Label>
          <Form.Control
            value={props.form[extra_instructions]}
            placeholder='Optional'
            as='textarea'
            rows={3}
            onChange={e=>setField('extra_instructions',e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className='col-12' onClick={()=>setShow(false)}>Submit</Button>
        {props.noDelete?<div/>:
          <Button
            className='col-12 btn btn-danger'
            onClick={deleteSection}>
            Delete Section
          </Button>
        }
      </Modal.Footer>
    </Modal>
    </Col>
  )

}

export default SectionDetail
