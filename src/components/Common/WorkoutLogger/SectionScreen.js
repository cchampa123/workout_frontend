import React from 'react'
import Card from 'react-bootstrap/Card'
import { movementFormatting } from 'utils/sectionStringFormatting'
import { extra_instructions, score_number, score_time, round_type, section_type } from 'constants/section'
import { id } from 'constants/movement'
import SectionDetail from 'components/Common/SectionPlanner/SectionDetail'
import TimePicker from 'components/Common/TimePicker'
import Form from 'react-bootstrap/Form'

function SectionScreen(props) {

  const sectionScoreInput = props.sectionData[round_type]!=='F'?
    <Form>
      <Form.Label>Score</Form.Label>
      <Form.Control
        type='input'
        value={props.sectionData[score_number]}
        onChange={e=>props.setSectionData({...props.sectionData, [score_number]:e.target.value})}
        placeholder='Score'
      />
    </Form>
    :
    <TimePicker
      scoreTime={props.sectionData[score_time]}
      onSelect={e=>props.setSectionData({...props.sectionData, [score_time]:e})}
    />

  return (
    <div className='mb-3'>
      <Card>
        <Card.Header>
          <SectionDetail
            sectionData={props.sectionData}
            setSectionData={props.setSectionData}
            noDelete
          />
        </Card.Header>
        <Card.Body>
          {
            props.movementData.map(
              x=><div key={x[id]}><i>{movementFormatting(x)}</i></div>
            )
          }
        </Card.Body>
        {props.sectionData[extra_instructions]!==''?
        <Card.Footer>
          {props.sectionData[extra_instructions]}
        </Card.Footer>:
        <div/>
        }
      </Card>
      {props.sectionData[section_type]!=='S'?sectionScoreInput:null}
    </div>
  )
}

export default SectionScreen
