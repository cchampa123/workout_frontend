import React, { useContext, useState, useCallback } from 'react';
import SuperSetModal from './SuperSetModal';
import MovementMetricPicker from './MovementMetricPicker';
import MovementClassAdder from './MovementClassAdder';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './styles.css'

import { movement_id as instance_class_id } from 'constants/movement';
import { name as class_id } from 'constants/movement_class'

import { createMovementWithRemovedData } from 'utils/createDefaults'
import { getFilteredMovementClasses } from 'utils/apiCalls'

import { MovementClassContext } from 'contexts/MovementClassContext'
import { AuthContext } from 'contexts/AuthContext'

function MovementItem(props) {

  const [newMovement, setNewMovement] = useState({})
  const [loading, setLoading] = useState(false)
  const {user} = useContext(AuthContext)
  const { movementClassData, setMovementClassData } = useContext(MovementClassContext)
  const selectedMovement=movementClassData.filter(x =>
    x[class_id]===props.movement[instance_class_id]
  )

  function updateMovement(selected) {

    if (selected.length>0 && selected[0]['customOption']) {
      setNewMovement(selected)
    } else {
      props.setForm(
        createMovementWithRemovedData(props.movement, selected)
      )
    }
  }

  const handleSearch = useCallback(async (query) => {
    setLoading(true)
    const searchedMovement = await getFilteredMovementClasses(user.token, query)
    const newMovements = searchedMovement.filter(x=>
      !movementClassData.map(
        y=>y.name.toLowerCase()
      ).includes(x.name.toLowerCase())
    )
    setMovementClassData([...newMovements, ...movementClassData])
    setLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return(
      <div>
      {Object.keys(newMovement).length>0?
        <MovementClassAdder
          movementData={props.movementData}
          updateMovement={updateMovement}
          movementClassData={movementClassData}
          setMovementClassData={setMovementClassData}
          newMovement={newMovement}
          setNewMovement={setNewMovement}
        /> :
        <div/>
      }
      <Row className='m-1'>
        <Col className='col-3'>
          <SuperSetModal
            movement={props.movement}
            selected={selectedMovement}
            setMovementData={props.setForm}
          />
        </Col>
        <Col className='col-9'>
          <Form.Group>
            <AsyncTypeahead
              onChange={(selected) => updateMovement(selected)}
              selected={ selectedMovement }
              isLoading={loading}
              onSearch={handleSearch}
              className='col-12'
              allowNew
              isInvalid={!!props.errors[instance_class_id]}
              id='typeahead'
              labelKey='name'
              placeholder='Movement'
              options={movementClassData}
            />
            <Form.Control.Feedback type='invalid'>{props.errors[instance_class_id]}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className='m-1'>
        <Col>
          <MovementMetricPicker
            count
            sectionType={props.sectionType}
            movementClass={selectedMovement}
            movementData={props.movement}
            setMovementData={props.setForm}
          />
        </Col>
        <Col>
          <MovementMetricPicker
            sectionType={props.sectionType}
            movementClass={selectedMovement}
            movementData={props.movement}
            setMovementData={props.setForm}
          />
        </Col>
      </Row>
      </div>
    )
}

export default MovementItem
