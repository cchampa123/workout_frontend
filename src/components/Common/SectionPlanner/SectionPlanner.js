import React from 'react'
import Card from 'react-bootstrap/Card'
import SectionDetail from './SectionDetail'
import Button from 'react-bootstrap/Button'
import MovementItem from 'components/Common/MovementPlanner/MovementItem'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { section_type } from 'constants/section'
import { createNewDefaultMovement } from 'utils/createDefaults'

import {
  id as movement_id,
  section_id as movement_section_id
} from 'constants/movement'

import {
  id as section_section_id
} from 'constants/section'

function SectionPlanner(props) {

  return(
    <Card className='my-1 bg-light'>
        <Row className='m-1'>
          <SectionDetail
            sectionData={props.sectionData}
            setSectionData={props.setSectionData}
          />
        </Row>
        {
          props.movementData.filter(movement=>movement!==null).filter(
            x=>x[movement_section_id]===props.sectionData[section_section_id]
          ).map(movement =>
            <MovementItem
              key={movement[movement_id]}
              movement={movement}
              setMovementData={props.setMovementData}
              sectionType={props.sectionData[section_type]}
            />
          )
        }
        <Row className='m-1'>
          <Col>
            <Button
              className='btn btn-dark col-12'
              onClick={()=>props.setMovementData(
                createNewDefaultMovement(
                  props.workoutId,
                  props.sectionData[section_section_id],
                  props.movementData
                )
              )}
            >
              Add New Movement
            </Button>
          </Col>
        </Row>
    </Card>
  )
}

export default SectionPlanner
