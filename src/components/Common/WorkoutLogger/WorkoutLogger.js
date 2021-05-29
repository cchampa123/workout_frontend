import React, { useState } from 'react'
import Button from 'react-bootstrap/button'
import SectionScreen from './SectionScreen'
import Form from 'react-bootstrap/form'
import MovementLogForm from './MovementLogForm'
import {
  id as section_section_id
} from 'constants/section'
import {
  section_id as movement_section_id,
  score_number,
  score_type,
  id as movement_movement_id,
  count as movement_count
} from 'constants/movement'
import {
  complete as workout_complete
} from 'constants/workout'
import {
  workoutLoggerUnfinishedMovements,
  workoutLoggerNetworkError,
  workoutLoggerSubmissionSuccess
} from 'constants/strings'
import SubmissionConfirmation from 'components/Common/SubmissionConfirmation'

function WorkoutLogger(props) {

  const [sectionData, setSectionData] = useState(props.workoutData['sections'])
  const [movementData, setMovementData] = useState(props.workoutData['movements'])

  const [activeSection, setActiveSection] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const checkErrors = () => {
    const newErrors={}
    for (const movement of movementData) {
      if (movement[movement_count]===null){
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
      handleSubmit()
    } else {
      setActiveSection(newSection)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    const newErrors = checkErrors()
    if (Object.keys(newErrors).length===0){
      setErrors(newErrors)
      const newWorkoutData = {
        'workouts':[{...props.workoutData['workouts'], [workout_complete]:true}],
        'sections':sectionData,
        'movements':movementData
      }
      setSubmitted(true)
      props.setWorkoutData(newWorkoutData).then(res => {
        if (res.length > 0) {
          setErrors({submissionErrors:res})
        }
        setLoading(false)
      })
    } else {
      setErrors(newErrors)
      setSubmitted(true)
      setLoading(false)
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

  const errorString = !!errors.submissionErrors ? workoutLoggerNetworkError : workoutLoggerUnfinishedMovements

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
      <SubmissionConfirmation
        submitted={submitted}
        successString={workoutLoggerSubmissionSuccess}
        errorString={errorString}
        error={Object.keys(errors).length>0}
        loading={loading}
        setSubmitted={setSubmitted}
      />
    </div>
  )
}

export default WorkoutLogger
