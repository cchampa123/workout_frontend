import React from 'react'
import Button from 'react-bootstrap/Button'
import { formatDataStrings } from 'utils/sectionStringFormatting'

function FakeForm(props) {

  let word
  let number

  if(props.movementData[props.relevant_number_variable]!=='') {
    if (props.movementData[props.relevant_type_variable] === 'time') {
      if(props.movementData[props.relevant_number_variable]==='00:00:00') {
        word=props.movementClass[props.relevant_defaults][0]
        number=''
      } else {
        word = ''
        const [hours, minutes, seconds] = props.movementData[props.relevant_number_variable].split(':')
        if (hours==='00') {
          number = String(Number(minutes))+':'+seconds
        } else {
          number = String(Number(hours))+':'+minutes+':'+seconds
        }
      }
    } else {
      word = props.movementData[props.relevant_type_variable]
      number = String(props.movementData[props.relevant_number_variable])
    }
  } else {
    word = props.movementClass[props.relevant_defaults][0]
    number = ''
  }

  return (
    <Button
      className='btn btn-info col-12 text-dark'
      style={{textTransform:'capitalize'}}
      onClick={()=>props.setShow(true)}>
        {number.concat(" ", word!==''?formatDataStrings(word):'')}
      </Button>
  )
}

export default FakeForm
