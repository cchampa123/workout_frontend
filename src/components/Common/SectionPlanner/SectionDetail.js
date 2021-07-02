import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import TimePicker from 'components/Common/TimePicker'

import { sectionTitling, formatDataStrings, unformatDataStrings } from 'utils/sectionStringFormatting'

import {
  id as section_id,
  rounds,
  round_type,
  round_types,
  round_duration,
  section_type,
  section_types,
  extra_instructions
} from 'constants/section'

function SectionDetail(props) {

  const [show, setShow] = useState(false)
  const [form, setForm] = useState(props.sectionData)
  const [errors, setErrors] = useState({})

  const checkFormErrors = () => {
    const {rounds, round_type, section_type } = form
    const newErrors = {}
    if (round_type==='amrap' && round_duration==='00:00:00') {
      newErrors.round_duration='AMRAP-type workouts must have an associated round duration.'
    }
    if (round_type==='emom' && round_duration==='00:00:00') {
      newErrors.round_duration='EMOM-type workouts must have an associated round duration.'
    }
    if (rounds==='' && section_type!=='S') {
      newErrors.rounds='Please enter the number of rounds for this section.'
    }
    return newErrors
  }

  const setField = (field, value) => {
    if (field === round_type && value==='F') {
      setForm({
        ...form,
        round_type:value,
      })
    } else if (field === section_type && value==='S') {
      setForm({
        ...form,
        section_type:value,
        rounds:'',
        round_type:''
      })
    } else if (form[section_type]==='S' && field===section_type && value!=='S') {
      setForm({
        ...form,
        section_type:value,
        round_type:round_types[0]
      })
    } else {
      setForm({
        ...form,
        [field]:value
      })
    }
  }

  const submit = () => {
    const errors = checkFormErrors()
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
    } else {
        props.setSectionData({
          ...form,
          rounds:Number(form[rounds])
        })
      setErrors(errors)
      setShow(false)
    }
  }

  const deleteSection = () => {
    setShow(false)
    props.setSectionData(null, props.sectionData[section_id])
  }

  return(
    <Col className='col-12'>
    <Button className='col-12 btn btn-info text-dark' onClick={()=>setShow(true)}>
      {sectionTitling(props.sectionData)}
    </Button>
    <Modal show={show} onHide={()=>setShow(false)}>
      <Modal.Header>
        Section Detail
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Section Type</Form.Label>
            <Form.Control
              value={formatDataStrings(form[section_type])}
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
          {form[section_type]!=='S' ?
          <div>
            <Form.Group>
              <Form.Label>Rounds</Form.Label>
              <Form.Control
                value={form[rounds]}
                type='number'
                pattern='[0-9]*'
                onChange={e=>setField(rounds, e.target.value)}
                isInvalid={!!errors.rounds}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.rounds}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Round Type</Form.Label>
              <Form.Control
                value={formatDataStrings(form[round_type])}
                as='select'
                onChange={e=>setField(round_type, unformatDataStrings(e.target.value))}
              >
                {
                  round_types.map(x=>
                    <option key={x}>{formatDataStrings(x)}</option>
                  )
                }
              </Form.Control>
            </Form.Group>
            {form[round_type]==='F'?<div/>:
            <div>
              <Form.Label>Round Duration</Form.Label>
              <TimePicker
                scoreTime={form[round_duration]}
                onSelect={e=>setForm({...form, [round_duration]:e})}
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
              value={form[extra_instructions]}
              placeholder='Optional'
              as='textarea'
              rows={3}
              onChange={e=>setField('extra_instructions',e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className='col-12' onClick={submit}>Submit</Button>
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
