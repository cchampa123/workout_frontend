import React, { useState } from 'react'
import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/button'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/col'
import Row from 'react-bootstrap/row'

import { convertToDurationString } from 'utils/stringfunctions'
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
  const [form, setForm] = useState({
    ...props.sectionData,
    'round_duration_minutes':String(Number(props.sectionData[round_duration].split(':')[1])),
    'round_duration_seconds':String(Number(props.sectionData[round_duration].split(':')[2]?props.sectionData[round_duration].split(':')[2]:''))
  })
  const [errors, setErrors] = useState({})

  const checkFormErrors = () => {
    const {rounds, round_type, section_type, round_duration_minutes, round_duration_seconds} = form
    const newErrors = {}
    if (round_type==='amrap' && round_duration_minutes==='0' && round_duration_seconds==='0') {
      newErrors.round_duration_minutes='AMRAP-type workouts must have an associated round duration.'
      newErrors.round_duration_seconds=''
    }
    if (round_type==='amrap' && round_duration_minutes==='' && round_duration_seconds==='') {
      newErrors.round_duration_minutes='AMRAP-type workouts must have an associated round duration.'
      newErrors.round_duration_seconds=''
    }
    if (round_type==='emom' && round_duration_minutes==='0' && round_duration_seconds==='0') {
      newErrors.round_duration_minutes='EMOM-type workouts must have an associated round duration.'
      newErrors.round_duration_seconds=''
    }
    if (round_type==='emom' && round_duration_minutes==='' && round_duration_seconds==='') {
      newErrors.round_duration_minutes='EMOM-type workouts must have an associated round duration.'
      newErrors.round_duration_seconds=''
    }
    if (rounds==='' && section_type!=='strength') {
      newErrors.rounds='Please enter the number of rounds for this section.'
    }
    return newErrors
  }

  const setField = (field, value) => {
    if (field === round_type && value==='fortime') {
      setForm({
        ...form,
        round_type:value,
        'round_duration_minutes':'',
        'round_duration_seconds':''
      })
    } else if (field === section_type && value==='strength') {
      setForm({
        ...form,
        section_type:value,
        'round_duration_minutes':'',
        'round_duration_seconds':'',
        rounds:'',
        round_type:''
      })
    } else if (form[section_type]==='strength' && field===section_type && value!=='strength') {
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
      if (form['round_duration_minutes']===''&&form['round_duration_seconds']==='') {
        const {round_duration_minutes, round_duration_seconds, ...rest} = form
        props.setSectionData({
          ...rest,
          round_duration:''
        })
      } else {
        const {round_duration_minutes, round_duration_seconds, rounds, ...rest} = form
        props.setSectionData({
          ...rest,
          rounds:Number(rounds),
          [round_duration]:convertToDurationString(
            '00',
            form['round_duration_minutes'],
            form['round_duration_seconds'],
          )
        })
      }
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
          {form[section_type]!=='strength' ?
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
            {form[round_type]==='fortime'?<div/>:
            <div>
              <Form.Label>Round Duration</Form.Label>
              <Row>
                <Col>
                  <i>Minutes</i>
                  <Form.Control
                    value={form['round_duration_minutes']}
                    type='number'
                    onChange={e=>setField('round_duration_minutes', e.target.value)}
                    placeholder='Min'
                    isInvalid={!!errors.round_duration_minutes}
                  />
                </Col>
                <Col>
                  <i>Seconds</i>
                  <Form.Control
                    type='number'
                    value={form['round_duration_seconds']}
                    onChange={e=>setField('round_duration_seconds', e.target.value)}
                    placeholder='Sec'
                    isInvalid={!!errors.round_duration_minutes}
                  />
                </Col>
              </Row>
              {errors.round_duration_minutes ?
              <Row className='text-danger' style={{fontSize:14}}>
                <Col>
                {errors.round_duration_minutes}
                </Col>
              </Row>
              :
              <div/>
              }
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
