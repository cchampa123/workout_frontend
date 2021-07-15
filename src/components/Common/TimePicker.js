import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { formatTwoDigitsTime } from 'utils/stringfunctions'

function TimePicker(props) {

  const numbers = [...Array(60).keys()]
  const [hours, minutes, seconds] = props.scoreTime.split(':')

  return (

    <Form onSubmit={(e)=>e.preventDefault()}>
      <Row>
        <Col>
          <Form.Label className='m-0'>Hours</Form.Label>
          <Form.Control
            as='select'
            value={Number(hours)}
            onChange={(e) => props.onSelect(
              formatTwoDigitsTime(e.target.value)+":"+minutes+":"+seconds
            )}
          >
            {
              numbers.map(x=> <option key={x} value={x}>{x}</option>)
            }
          </Form.Control>
        </Col>
        <Col>
          <Form.Label className='m-0'>Minutes</Form.Label>
          <Form.Control
            as='select'
            value={Number(minutes)}
            onChange={(e) => props.onSelect(
              hours+":"+formatTwoDigitsTime(e.target.value)+":"+seconds
            )}
          >
            {
              numbers.map(x=> <option key={x} value={x}>{x}</option>)
            }
          </Form.Control>
        </Col>
        <Col>
          <Form.Label className='m-0'>Seconds</Form.Label>
          <Form.Control
            as='select'
            value={Number(seconds)}
            onChange={(e) => props.onSelect(
              hours+":"+minutes+":"+formatTwoDigitsTime(e.target.value)
            )}
          >
            {
              numbers.map(x=> <option key={x} value={x}>{x}</option>)
            }
          </Form.Control>
        </Col>
      </Row>
    </Form>
  )
}

export default TimePicker
