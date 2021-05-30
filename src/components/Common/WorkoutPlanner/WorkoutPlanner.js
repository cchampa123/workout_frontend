import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import { PageContext } from 'contexts/PageContext'
import DateCard from './DateCard'
import SubmissionConfirmation from 'components/Common/SubmissionConfirmation'
import SectionPlanner from 'components/Common/SectionPlanner/SectionPlanner'

import { MovementClassContext } from 'contexts/MovementClassContext'

import { createNewDefaultSection } from 'utils/createDefaults'

import { id as movement_movement_id, movement_id as movement_class_name } from 'constants/movement'
import { id as section_section_id } from 'constants/section'
import { id as workout_workout_id, date as planned_date, complete as workout_complete } from 'constants/workout'

import {
  workoutPlannerSubmissionSuccess,
  workoutPlannerSubmissionFailureNoMovements,
  workoutPlannerSubmissionFailureEmptyMovements
} from 'constants/strings'

function WorkoutPlanner(props) {

  const {setPage} = useContext(PageContext)

  const [sectionData, setSectionData] = useState(props.sections)
  const [movementData, setMovementData] = useState(props.movements)
  const [workoutData, setWorkoutData] = useState(props.workout)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  //TODO: turn class data into live API call
  const [movementClassData, setMovementClassData] = useState([])
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

  const handleSubmit = async () => {
    setLoading(true)
    const newErrors = checkErrors()
    if (Object.keys(newErrors).length===0){
      setErrors(newErrors)
      const newWorkoutData = {
        'workouts':[{...workoutData, [workout_complete]:!!props.finishWorkout?true:workoutData[workout_complete]}],
        'sections':sectionData,
        'movements':movementData
      }
      setSubmitted(true)
      props.setWorkoutData(newWorkoutData).then(res => {
        setErrors(res)
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
    debugger
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

  const successFooter = (
      <Button
        className='btn-success col-12'
        onClick={()=>setPage({pageTitle:'Home', pageProps:{}})}
      >
        OK
      </Button>
    )

  const errorMessage = errors['noMovements']?workoutPlannerSubmissionFailureNoMovements:workoutPlannerSubmissionFailureEmptyMovements

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
          workoutId={workoutData[workout_workout_id]}
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
        {!!props.finishWorkout?'Complete Workout':'Submit'}
      </Button>
      <SubmissionConfirmation
        submitted={submitted}
        successFooter={successFooter}
        errorString={errorMessage}
        successString={workoutPlannerSubmissionSuccess}
        error={Object.keys(errors).length>0}
        loading={loading}
        setSubmitted={setSubmitted}
      />
    </MovementClassContext.Provider>
  )
}

export default WorkoutPlanner
