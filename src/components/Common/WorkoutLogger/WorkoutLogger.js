import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/button'
import Modal from 'react-bootstrap/modal'
import SectionScreen from './SectionScreen'
import Form from 'react-bootstrap/form'
import MovementLogForm from './MovementLogForm'
import { PageContext } from 'contexts/PageContext'
import {
  id as section_section_id,
  workout_id as section_workout_id
} from 'constants/section'
import {
  section_id as movement_section_id,
  workout_id as movement_workout_id,
  score_number,
  score_type,
  id as movement_movement_id,
  count as movement_count
} from 'constants/movement'
import {
  id as workout_workout_id
} from 'constants/workout'

function WorkoutLogger(props) {

  const { setPage } = useContext(PageContext)

  const [workoutData, setWorkoutData] = useState(props.workoutData['workouts'].filter(workout=>
    workout[workout_workout_id]===props.activeWorkout
  )[0])
  const [sectionData, setSectionData] = useState(props.workoutData['sections'].filter(section=>
    section[section_workout_id]===props.activeWorkout
  ))
  const [movementData, setMovementData] = useState(props.workoutData['movements'].filter(movement=>
    movement[movement_workout_id]===props.activeWorkout
  ))

  const [activeSection, setActiveSection] = useState(0)
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({})

  const checkErrors = () => {
    const newErrors={}
    for (const movement of movementData) {
      if (movement[movement_count]===''){
        newErrors[movement[movement_movement_id]] = 'Missing'
      }
      if (movement[score_number]===''&&movement[score_type]!=='time') {
        newErrors[movement[movement_movement_id]] = 'Missing'
      }
    }
    return newErrors
  }

  const incrementActiveSection = () => {
    const newSection = activeSection + 1
    if (newSection === sectionData.length) {
      setErrors(checkErrors())
      setShow(true)
    } else {
      setActiveSection(newSection)
    }
  }

  const handleSubmit = () => {
    if (Object.keys(errors).length>0) {
      setShow(false)
    } else {
      props.setWorkoutData({
        'workouts':{...workoutData, complete:true},
        'sections':sectionData,
        'movements':movementData
      })
      setShow(false)
      setPage('Home')
    }
  }

  function setSectionDataWrapper(newSection, id=null) {
    const newSectionData = []
    const relevantID = id!==null?id:newSection[section_section_id]
    if (sectionData.map(x=>x[section_section_id]).includes(relevantID)) {
      for (const section of sectionData) {
        if (section[section_section_id]===relevantID) {
          if (newSection !== null) {
            newSectionData.push(newSection)
          }
        } else {
          newSectionData.push(section)
        }
      }
    } else {
      newSectionData.push(...sectionData, newSection)
    }
    setSectionData(newSectionData)
  }


  function setMovementDataWrapper(newMovement, id=null) {
    const newMovementData = []
    const relevantID = id!==null?id:newMovement.id
    if (movementData.map(x=>x[movement_movement_id]).includes(relevantID)) {
      for (const movement of movementData) {
        if (movement[movement_movement_id]===relevantID) {
          if (newMovement !== null) {
            newMovementData.push(newMovement)
          }
        } else {
          newMovementData.push(movement)
        }
      }
    } else {
      newMovementData.push(...movementData, newMovement)
    }
    newMovementData.sort((a,b)=>a['superset']>b['superset']?1:(a['superset']===b['superset']?0:-1))
    setMovementData(newMovementData)
  }

  return(
    <div>
      <SectionScreen
        sectionData={sectionData[activeSection]}
        setSectionData={setSectionDataWrapper}
        movementData={movementData.filter(
          x=>x[movement_section_id]===sectionData[activeSection][section_section_id]
        )}
      />
      <Form onSubmit={e=>e.preventDefault()}>
        {
          movementData.filter(
            x=>x[movement_section_id]===sectionData[activeSection][section_section_id]
          ).map(y=>
            <MovementLogForm
              key={y[movement_movement_id]}
              errors={errors}
              movementData={y}
              setMovementData={setMovementDataWrapper}
            />
          )
        }
      </Form>
      <Button className='btn-secondary col-12 mt-3' onClick={incrementActiveSection}>
        {activeSection+1===sectionData.length?'Complete Workout':'Done with This Section'}
      </Button>
      {activeSection===0?<div/>:
        <Button className='btn-light col-12 mt-1' onClick={()=>setActiveSection(activeSection-1)}>
          Back to Previous Section
        </Button>
      }
      <Modal
        show={show}
        onHide={()=>setShow(false)}
      >
        <Modal.Header className='bg-dark text-white'>
          <strong className='text-center col-12'>
          {
            Object.keys(errors).length>0?"Errors detected":"Workout Submitted"
          }
          </strong>
        </Modal.Header>
        <Modal.Body>
          {
            Object.keys(errors).length>0?"Looks like you forgot to fill out some movements.":"Nice work! All set."
          }
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={()=>handleSubmit()}
            className={Object.keys(errors).length>0?'col-12 btn-danger':'col-12 btn-success'}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default WorkoutLogger
