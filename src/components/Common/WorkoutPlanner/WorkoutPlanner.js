import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DateCard from './DateCard'
import SubmissionConfirmation from 'components/Common/SubmissionConfirmation'
import SectionPlanner from 'components/Common/SectionPlanner/SectionPlanner'
import { MovementClassContext } from 'contexts/MovementClassContext'
import { AuthContext } from 'contexts/AuthContext'
import { createNewDefaultSection } from 'utils/createDefaults'
import { validateWorkout } from 'utils/dataValidators'
import { sendData } from 'utils/apiCalls'
import {
  order as section_order
} from 'constants/section'
import {
  date as planned_date,
  section_set
} from 'constants/workout'

function WorkoutPlanner(props) {

  const user = useContext(AuthContext)
  const [form, setForm] = useState(props.workout)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formErrors, setFormErrors] = useState({})

  const [movementClassData, setMovementClassData] = useState([])
  const value = { movementClassData, setMovementClassData }

  const sortedSectionData = (newData, sectionToUpdate) => {
    const newSectionSet = newData ?
      [...form[section_set].filter(
        x=>x[section_order]!==sectionToUpdate
      ), newData]
      :
      [...form[section_set].filter(
        x=>x[section_order]!==sectionToUpdate
      )]
    newSectionSet.sort((a,b) => (a[section_order] > b[section_order]) ? 1 : -1)

    const newFormData = {...form, [section_set]:newSectionSet}
    return newFormData
  }

  const handleSubmit = async () => {
    setLoading(true)
    setShowConfirmation(true)
    const newErrors = validateWorkout(form)
    if (Object.keys(newErrors).length === 0) {
      await sendData('workout/', user.token, form)
      props.mutate()
    }
    setFormErrors(newErrors)
    setLoading(false)
  }

  const sectionErrors = !!formErrors[section_set]?formErrors[section_set]:{}

  return(
    <MovementClassContext.Provider value={value}>
      <Form>
        <DateCard
          plannedDate={form[planned_date]}
          setPlannedDate={(date) => setForm({...form, [planned_date]:date})}
        />
        {form[section_set].map(section =>
          <SectionPlanner
            key={section[section_order]}
            setForm={thisSection => setForm(
              sortedSectionData(thisSection, section[section_order])
            )}
            sectionData={section}
            errors={!!sectionErrors[section[section_order]]?sectionErrors[section[section_order]]:{}}
          />
        )}
        <Button
          className='btn btn-dark col-12'
          onClick={() => setForm({
            ...form,
            [section_set]:[
              ...form[section_set], createNewDefaultSection(form[section_set])
            ]
          })}
        >
          Add New Section
        </Button>
        <Button
          className='col-12 btn btn-secondary mt-2'
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
        <SubmissionConfirmation
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          loading={loading}
          setLoading={setLoading}
          errors={Object.keys(formErrors).length > 0}
          successString={'All done'}
          successHeader='Nice Work'
          errorString='Something went wrong. Correct the errors and try again'
          errorHeader='Uh oh...'
        />
      </Form>
    </MovementClassContext.Provider>
  )
}

export default WorkoutPlanner
