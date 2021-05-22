import React, { useState } from 'react'
import Modal from 'react-bootstrap/modal'
import Button from 'react-bootstrap/button'
import Row from 'react-bootstrap/row'

import { buyin_number, buyout_number } from 'constants/section'
import { convertSuperSetToLetter } from 'utils/stringfunctions'
import { superset as movement_superset, id as movement_id } from 'constants/movement'
import { name } from 'constants/movement_class'

function SuperSetModal(props) {

  const superSetDefaults=[2,3,4,5]

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function updateAndClose(updateValue) {
    props.setMovementData({...props.movement, [movement_superset]:updateValue})
    setShow(false)
  }

  function deleteMovement() {
    props.setMovementData(null, props.movement[movement_id])
    setShow(false)
  }

  return(
    <div>
      <Button
        variant='primary'
        className='col-12'
        onClick={handleShow}
      >
        {convertSuperSetToLetter(props.movement[movement_superset])}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <strong className='text-center col-12'>
          {
            props.selected.length > 0 ? props.selected[0][name] : "No Movement Chosen"
          }
          </strong>
        </Modal.Header>
        <Modal.Body>
        <Row className='mx-1 mb-3'>
          <Button
            className='btn btn-secondary'
            onClick={()=>updateAndClose(buyin_number)}
          >
            Buy In
          </Button>
        </Row>
          {superSetDefaults.map(superSet =>
            <Row className='m-1' key={superSet}>
              <Button onClick={() => updateAndClose(superSet)}>
                {convertSuperSetToLetter(superSet)}
              </Button>
            </Row>
          )}
          <Row className='mx-1 mt-3'>
            <Button
              className='btn btn-secondary'
              onClick={()=>updateAndClose(buyout_number)}
            >
              {convertSuperSetToLetter(buyout_number)}
            </Button>
          </Row>
          <Row className='m-1'>
            <Button
              className='btn btn-danger'
              onClick={()=>deleteMovement()}
            >
              Delete Movement
            </Button>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default SuperSetModal
