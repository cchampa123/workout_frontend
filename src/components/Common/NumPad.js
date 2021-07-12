import React from 'react'
import Form from 'react-bootstrap/Form'

function NumPad(props) {

  return (
    <Form onSubmit={(e) => props.handleSubmit(e)}>
      
    </Form>
  )
}

export default NumPad
