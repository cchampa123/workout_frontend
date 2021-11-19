import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import SectionScreen from './SectionScreen'
import Form from 'react-bootstrap/Form'
import MovementLogForm from './MovementLogForm'
import {
  movement_set,
  order as section_order
} from 'constants/section'
import {
  order as movement_order
} from 'constants/movement'
import {
  complete as workout_complete,
  section_set
} from 'constants/workout'
import SubmissionConfirmation from 'components/Common/SubmissionConfirmation'
import { validateWorkout } from 'utils/dataValidators'
import { sendData } from 'utils/apiCalls'
import { AuthContext } from 'contexts/AuthContext'

function WorkoutLogger(props) {

  const {user} = useContext(AuthContext)
  const [form, setForm] = useState(props.workoutData)
  const [activeSection, setActiveSection] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const incrementActiveSection = async () => {
    const newSection = activeSection + 1
    if (newSection === form[section_set].length) {
      setLoading(true)
      setSubmitted(true)
      const newErrors = validateWorkout(form, true)
      if (Object.keys(newErrors).length === 0) {
        await sendData('workout/', user.token, {...form, [workout_complete]:true})
        props.mutate()
      }
      setErrors(newErrors)
      setLoading(false)
    } else {
      setActiveSection(newSection)
    }
  }

  const updatedSectionData = (newData) => {
    const newSectionData = []
    let iterator = 0
    for (const section of form[section_set]) {
      if (iterator === activeSection) {
        newSectionData.push(newData)
      } else {
        newSectionData.push(section)
      }
      iterator++
    }
    return newSectionData
  }

  const updatedMovementData = (newData, movementOrder) => {
    const newMovementData = []
    for (const movement of form[section_set][activeSection][movement_set]) {
      if (movement[movement_order] === movementOrder) {
        newMovementData.push(newData)
      } else {
        newMovementData.push(movement)
      }
    }
    return newMovementData
  }

  const sectionErrors = !!errors[section_set] ? errors[section_set] : {}
  const relevantSection = form[section_set][activeSection][section_order]

  return(
    <div>
      <Form onSubmit={e=>e.preventDefault()}>
        <SectionScreen
          sectionData={form[section_set][activeSection]}
          setSectionData={newSectionData=>setForm({
            ...form,
            [section_set]: updatedSectionData(newSectionData)
          })}
          errors={sectionErrors}
        />
        {
          form[section_set][activeSection][movement_set].map(y=>
            <MovementLogForm
              key={y[movement_order]}
              errors={!!sectionErrors[relevantSection]?sectionErrors[relevantSection]:{}}
              movementData={y}
              setMovementData={movementData => setForm({
                ...form,
                [section_set]: updatedSectionData({
                    ...form[section_set][activeSection],
                    [movement_set]:updatedMovementData(movementData, y[movement_order])
                })
              })}
            />
          )
        }
      </Form>
      <Button className='btn-secondary col-12 mt-3' onClick={incrementActiveSection}>
        {activeSection+1===form[section_set].length?'Complete Workout':'Done with This Section'}
      </Button>
      {activeSection===0?<div/>:
        <Button className='btn-light col-12 mt-1' onClick={()=>setActiveSection(activeSection-1)}>
          Back to Previous Section
        </Button>
      }
      <SubmissionConfirmation
        showConfirmation={submitted}
        setShowConfirmation={setSubmitted}
        loading={loading}
        setLoading={setLoading}
        errors={Object.keys(errors).length > 0}
        successString={'All done'}
        successHeader='Nice Work'
        errorString='Something went wrong. Correct the errors and try again'
        errorHeader='Uh oh...'
      />

    </div>
  )
}

export default WorkoutLogger
