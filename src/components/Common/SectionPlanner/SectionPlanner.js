import React from 'react'
import Card from 'react-bootstrap/Card'
import SectionDetail from './SectionDetail'
import Button from 'react-bootstrap/Button'
import MovementItem from 'components/Common/MovementPlanner/MovementItem'
import TimePicker from 'components/Common/TimePicker'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import {
  id as movement_id,
  order as movement_order
} from 'constants/movement'

import {
  section_type,
  movement_set,
  round_type,
  score_number,
  score_time
} from 'constants/section'

import { createNewDefaultMovement } from 'utils/createDefaults'

function SectionPlanner(props) {

  const sortedMovementData = (newData, movementToUpdate) => {
    const newMovementData = newData ?
      [...props.sectionData[movement_set].filter(
        x => x[movement_order] !== movementToUpdate
      ), newData]
      :
      [...props.sectionData[movement_set].filter(
        x => x[movement_order] !== movementToUpdate
      )]
    newMovementData.sort((a,b)=>(a[movement_order]>b[movement_order]) ? 1 : -1)

    const newSectionData = {...props.sectionData, [movement_set]:newMovementData}
    return newSectionData
  }

  const movementErrors = !!props.errors[movement_set]?props.errors[movement_set]:{}

  const sectionScoreInput = props.sectionData[round_type]!=='F'?
    <Form.Group>
      <Form.Label>Score</Form.Label>
      <Form.Control
        type='input'
        value={props.sectionData[score_number]}
        onChange={e=>props.setForm({...props.sectionData, [score_number]:e.target.value})}
        placeholder='Score'
      />
    </Form.Group>
    :
    <>
    Score
    <TimePicker
      scoreTime={props.sectionData[score_time]}
      onSelect={e=>props.setForm({...props.sectionData, [score_time]:e})}
    />
    </>

  return(
    <Card className='my-1 bg-light'>
        <Row className='m-1'>
          <SectionDetail
            form={props.sectionData}
            setForm={props.setForm}
            errors={props.errors}
          />
        </Row>
        {props.sectionData[movement_set].map(movement =>
            <MovementItem
              key={movement[movement_id]}
              movement={movement}
              setForm={movementData => props.setForm(
                sortedMovementData(movementData, movement[movement_order])
              )}
              sectionType={props.sectionData[section_type]}
              errors={!!movementErrors[movement[movement_order]]?movementErrors[movement[movement_order]]:{}}
            />
          )
        }
        <Row className='m-1'>
          <Col>
            <Button
              className='btn btn-dark col-12'
              onClick={()=>props.setForm({
                ...props.sectionData,
                [movement_set]:[
                  ...props.sectionData[movement_set],
                  createNewDefaultMovement(
                    props.sectionData[movement_set]
                  )
                ]
              })}
            >
              Add New Movement
            </Button>
          </Col>
        </Row>
        {props.sectionData[section_type]==='S'?null:
          <Row className='m-1'>
            <Col>
              {sectionScoreInput}
            </Col>
          </Row>
        }
    </Card>
  )
}

export default SectionPlanner
