import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { section_type, section_types } from 'constants/section'

import { formatSectionTypes } from 'utils/sectionStringFormatting'

function SectionTypeDropdown(props) {

  return(
    <Dropdown>
      <Dropdown.Toggle className='col-12 btn btn-info text-dark'>
        {formatSectionTypes(props.sectionData[section_type])}
      </Dropdown.Toggle>
      <Dropdown.Menu className='col-12'>
        {section_types.map(type =>
          <Dropdown.Item
            onClick={() => props.setSectionData({...props.sectionData, [section_type]:type})}
            key={type}
            className='text-center text-dark'
          >
            {formatSectionTypes(type)}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
    )
}

export default SectionTypeDropdown
