import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/button'
import DateCard from './DateCard'
import SubmissionConfirmation from './SubmissionConfirmation'
import SectionPlanner from 'components/Common/SectionPlanner/SectionPlanner'

import { MovementClassContext } from 'contexts/MovementClassContext'

import { createNewDefaultSection } from 'utils/createDefaults'

import { section_id as movement_section_id, id as movement_movement_id, movement_id as movement_class_name } from 'constants/movement'
import { id as section_section_id } from 'constants/section'
import { id as workout_workout_id, user as workout_user_id, date as planned_date } from 'constants/workout'
import { movement_class_data } from 'constants/.data'

function WorkoutPlanner(props) {

  const [sectionData, setSectionData] = useState(props.sections)
  const [movementData, setMovementData] = useState(props.movements)
  const [workoutData, setWorkoutData] = useState(props.workout)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  //const [workout, setWorkout] = useState(props.workout)

  //TODO: turn class data into live API call
  const [movementClassData, setMovementClassData] = useState([])
  useEffect(() => {
    setMovementClassData(movement_class_data)
  }, [])
  const value = { movementClassData, setMovementClassData }

  const checkErrors = () => {
    const newErrors = {}
    const emptyMovements = movementData.filter(x=>x[movement_class_name]==='')
    if (emptyMovements.length > 0) {
      newErrors['emptyMovements'] = true
    }
    if (movementData.length === 0) {
      newErrors['noMovements'] = true
    }
    if (sectionData.length === 0) {
      newErrors['noSections'] = true
    }
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = checkErrors()
    if (Object.keys(newErrors).length===0){
      setErrors(newErrors)
      const newWorkoutData = {
        'workouts':[...props.workoutData['workouts'], workoutData],
        'sections':[...props.workoutData['sections'], ...sectionData],
        'movements':[...props.workoutData['movements'], ...movementData]
      }
      props.setWorkoutData(newWorkoutData)
      setSubmitted(true)
    } else {
      setErrors(newErrors)
      setSubmitted(true)
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
    const relevantID = id!==null?id:newMovement[movement_movement_id]
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
    <MovementClassContext.Provider value={value}>
      <DateCard
        plannedDate={workoutData[planned_date]}
        setPlannedDate={(date) => setWorkoutData({...workoutData, [planned_date]:date})}
      />
      {
        sectionData.map(section=>
        <SectionPlanner
          errors={errors[section_section_id]}
          key={section[section_section_id]}
          workoutId={props.workout[workout_workout_id]}
          sectionData={section}
          setSectionData={setSectionDataWrapper}
          movementData={movementData}
          setMovementData={setMovementDataWrapper}
        />
        )
      }
      <Button
        className='btn btn-dark col-12'
        onClick={()=>setSectionData([
          ...sectionData,
          createNewDefaultSection(
            workoutData[workout_user_id],
            workoutData[workout_workout_id],
            sectionData
          )
        ])}
      >
        Add New Section
      </Button>
      <Button
        className='col-12 btn btn-secondary mt-2'
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <SubmissionConfirmation
        submitted={submitted}
        errors={errors}
        setSubmitted={setSubmitted}
      />
    </MovementClassContext.Provider>
  )
}

export default WorkoutPlanner
