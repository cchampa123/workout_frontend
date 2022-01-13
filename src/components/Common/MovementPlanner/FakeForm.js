import React, {useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { formatDataStrings } from 'utils/sectionStringFormatting'

function FakeForm(props) {

  const [word, setWord] = useState('')
  const [number, setNumber] = useState('')

  useEffect(() => {
    if(props.movementData[props.relevant_number_variable]!==null) {
      if (props.movementData[props.relevant_type_variable] === 'time') {
        if(props.movementData[props.relevant_number_variable]==='00:00:00') {
          setWord(props.movementClass[props.relevant_defaults][0])
          setNumber('')
        } else {
          setWord('')
          const [hours, minutes, seconds] = props.movementData[props.relevant_number_variable].split(':')
          if (hours==='00') {
            setNumber(Number(minutes).toString()+':'+seconds)
          } else {
            setNumber(Number(hours).toString()+':'+minutes+':'+seconds)
          }
        }
      } else {
        setWord(props.movementData[props.relevant_type_variable])
        setNumber(String(props.movementData[props.relevant_number_variable]))
      }
    } else {
      setWord(props.movementData[props.relevant_type_variable])
      setNumber('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    props.movementData[props.relevant_number_variable],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    props.movementData[props.relevant_type_variable],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    props.relevant_type_variable,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    props.relevant_number_variable,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    props.movementData['count_type'],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    props.movementData['score_type']
  ])

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
