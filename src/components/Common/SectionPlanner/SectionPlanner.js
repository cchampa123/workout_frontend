import {useState} from 'react'
import Card from 'react-bootstrap/Card'
import SectionDetail from './SectionDetail'
import Button from 'react-bootstrap/Button'
import MovementItem from 'components/Common/MovementPlanner/MovementItem'
import TimePicker from 'components/Common/TimePicker'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import {
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

  const [addScore, setAddScore] = useState(props.sectionData[score_number]||(props.sectionData[score_time]!=='00:00:00'))
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
      <Form.Control
        type='input'
        value={props.sectionData[score_number]}
        onChange={e=>props.setForm({...props.sectionData, [score_number]:e.target.value})}
        placeholder='Score'
      />
    </Form.Group>
    :
    <>
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
              key={movement[movement_order]}
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
                  props.sectionData[movement_set].length===0?
                  createNewDefaultMovement(
                    props.sectionData[movement_set]
                  ):{...props.sectionData[movement_set].slice(-1)[0], [movement_order]:props.sectionData[movement_set].slice(-1)[0][movement_order]+1}
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
              <Button
                onClick={()=>setAddScore(!addScore)}
                className='col-12'
              >
                {!addScore?'Add Section Score':'Hide Score'}
              </Button>
              {addScore?sectionScoreInput:null}
            </Col>
          </Row>
        }
    </Card>
  )
}

export default SectionPlanner
