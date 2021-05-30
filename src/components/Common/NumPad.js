import React from 'react'
import Form from 'react-bootstrap/Form'

function NumPad(props) {

  return (
    <Form onSubmit={(e) => props.handleSubmit(e)}>
      <Form.Control
        type='number'
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e)=>props.onChange(e.target.value)}
      />
    </Form>
  )
}

export default NumPad
