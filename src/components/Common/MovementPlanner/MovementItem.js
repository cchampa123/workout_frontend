import React, { useContext, useState } from 'react';
import SuperSetModal from './SuperSetModal';
import MovementMetricPicker from './MovementMetricPicker';
import MovementClassAdder from './MovementClassAdder';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { movement_id as instance_class_id } from 'constants/movement';
import { name as class_id } from 'constants/movement_class'

import { createMovementWithRemovedData } from 'utils/createDefaults'

import { MovementClassContext } from 'contexts/MovementClassContext'

function MovementItem(props) {

  const [newMovement, setNewMovement] = useState({})
  const { movementClassData, setMovementClassData } = useContext(MovementClassContext)
  const selectedMovement=movementClassData.filter(x =>
    x[class_id]===props.movement[instance_class_id]
  )

  function updateMovement(selected) {

    if (selected.length>0 && selected[0]['customOption']) {
      setNewMovement(selected)
    } else {
      props.setMovementData(
        createMovementWithRemovedData(props.movement, selected)
      )
    }
  }

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
            setMovementData={props.setMovementData}
          />
        </Col>
        <Col className='col-9'>
          <Typeahead
            onChange={(selected) => updateMovement(selected)}
            selected={ selectedMovement }
            className='col-12'
            allowNew
            id='typeahead'
            labelKey='name'
            placeholder='Movement'
            options={movementClassData}
          />
        </Col>
      </Row>
      <Row className='m-1'>
        <Col>
          <MovementMetricPicker
            count
            movementClass={selectedMovement}
            movementData={props.movement}
            setMovementData={props.setMovementData}
          />
        </Col>
        <Col>
          <MovementMetricPicker
            movementClass={selectedMovement}
            movementData={props.movement}
            setMovementData={props.setMovementData}
          />
        </Col>
      </Row>
      </div>
    )
}

export default MovementItem
