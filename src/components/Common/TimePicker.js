import React from 'react'
import Form from 'react-bootstrap/Form'
import { formatTwoDigitsTime, formatTwoDigitTimeToString } from 'utils/stringfunctions'

function TimePicker(props) {

  let [hours, minutes, seconds] = props.value.split(':').map(x=>formatTwoDigitTimeToString(x))
  // if (hours==="00") hours = ""
  // if (minutes==="00") minutes = ""
  // if (seconds==="00") seconds = ""


  const clicked = (type, value) => {
    if (type==='hours') {
      props.onChange(formatTwoDigitsTime(value)+':'+formatTwoDigitsTime(minutes)+':'+formatTwoDigitsTime(seconds))
    } else if (type==='minutes') {
      props.onChange(formatTwoDigitsTime(hours)+':'+formatTwoDigitsTime(value)+':'+formatTwoDigitsTime(seconds))
    } else {
      props.onChange(formatTwoDigitsTime(hours)+':'+formatTwoDigitsTime(minutes)+':'+formatTwoDigitsTime(value))
    }
  }

  return (
    <Form onSubmit={(e)=>props.handleSubmit(e)}>
      <Form.Label>Hours</Form.Label>
      <Form.Control
        type='number'
        pattern='[0-9]*'
        placeholder='Hrs'
        value={hours}
        onChange={(e)=>clicked('hours', e.target.value)}
      />
      <Form.Label>Minutes</Form.Label>
      <Form.Control
        type='number'
        placeholder='Min'
        value={minutes}
        onChange={(e)=>clicked('minutes', e.target.value)}
      />
      <Form.Label>Seconds</Form.Label>
      <Form.Control
        type='number'
        pattern='[0-9]*'
        placeholder='Sec'
        value={seconds}
        onChange={(e)=>clicked('seconds', e.target.value)}
      />
    </Form>
  )
}

export default TimePicker
