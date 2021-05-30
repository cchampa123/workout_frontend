import React, { useState, useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { AuthContext } from 'contexts/AuthContext'
import { addNewMovementClass } from 'utils/apiCalls'

import {
  name,
  count_types,
  score_types,
  possible_count_types,
  possible_score_types
} from 'constants/movement_class'

function MovementClassAdder(props) {

  const [form, setForm] = useState(props.newMovement[0])
  const [error, setError] = useState({})

  const {token} = useContext(AuthContext)

  const updateForm = (field, value) => {
    setForm({
      ...form,
      [field]:value})
  }

  const checkErrors = () => {
    const newErrors = {}
    if (!(!!form[score_types])) {
      newErrors[score_types]='You must choose at least one way to score this movement'
    } else if (form[score_types].length === 0) {
      newErrors[score_types]='You must choose at least one way to score this movement'
    }
    if (!(!!form[count_types])) {
      newErrors[count_types]='You must choose at least one way to count for this movement'
    } else if (form[count_types].length === 0) {
      newErrors[count_types]='You must choose at least one way to count for this movement'
    }
    return newErrors
  }

  const handleSubmit = async () => {
    const errors = checkErrors()
    if (Object.keys(errors).length>0) {
      setError(errors)
    } else {
      setError(errors)
      const { customOption, ...rest } = form
      const newMovement = await addNewMovementClass(token, rest)
      props.setMovementClassData([newMovement].concat(props.movementClassData))
      props.updateMovement([newMovement])
      props.setNewMovement({})
    }
  }

  return (
    <Modal
      show={true}
      onHide={()=>props.setNewMovement({})}
    >
      <Modal.Header>
        Add New Movement
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Movement Name</Form.Label>
            <Form.Control
              type='text'
              value={form[name]}
              onChange={(e)=>updateForm(name, e.target.value)}
              isInvalid={!!error.name}
            />
            <Form.Control.Feedback type='invalid'>
              {error.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>How can you measure this?</Form.Label>
            <Form.Control
              isInvalid={!!error.count_types}
              value={form[count_types]}
              onChange={(e)=>updateForm(
                count_types, [].slice.call(e.target.selectedOptions).map(item => item.value))
              }
              as='select'
              multiple
            >
            {
              possible_count_types.map(x=>
                <option key={x}>{x}</option>
              )
            }
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
              {error.count_types}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>How can you score this?</Form.Label>
            <Form.Control
              isInvalid={!!error.score_types}
              value={form[score_types]}
              onChange={(e)=>updateForm(
                score_types, [].slice.call(e.target.selectedOptions).map(item => item.value))
              }
              as='select'
              multiple
            >
              {
                possible_score_types.map(x=>
                  <option key={x}>{x}</option>
                )
              }
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
              {error.score_types}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button
            className='col-12'
            onClick={handleSubmit}
          >
            Confirm
          </Button>
          <Button
            className='col-12'
          >
            Cancel
          </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MovementClassAdder
