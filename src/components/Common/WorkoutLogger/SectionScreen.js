import React from 'react'
import Card from 'react-bootstrap/Card'
import { createSectionDetail, formatDataStrings, movementFormatting } from 'utils/sectionStringFormatting'
import { section_type, extra_instructions } from 'constants/section'
import { id } from 'constants/movement'
import SectionDetail from 'components/Common/SectionPlanner/SectionDetail'

function SectionScreen(props) {

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
    </div>
  )
}

export default SectionScreen
