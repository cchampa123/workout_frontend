import {
  movement_id,
  count_type,
  score_type as movement_score_type,
  count,
  score_number as movement_score_number,
  score_time as movement_score_time,
  superset,
  order as movement_order
} from 'constants/movement'

import {
  section_type,
  score_number as section_score_number,
  score_time as section_score_time,
  rounds,
  round_duration,
  round_type,
  extra_instructions,
  buyin_number,
  buyout_number,
  order as section_order,
  movement_set
} from 'constants/section'

import {
  section_set
} from 'constants/workout'

export function validateWorkout(workoutData, completed=false) {
  const errors = {}
  const sectionErrors = {}
  for (const section of workoutData[section_set]) {
    const sectionError = validateSection(section, completed)
    if (sectionError) {
      sectionErrors[sectionError[0]] = sectionError[1]
    }
  }
  if (Object.keys(sectionErrors).length > 0) {
    errors[section_set] = sectionErrors
  }
  return errors
}

function validateSection(sectionData, completed=false) {
  const errors = {}
  const movementErrors = {}
  for (const movement of sectionData[movement_set]) {
    const movementError = validateMovement(movement, completed)
    if (movementError) {
      movementErrors[movementError[0]] = movementError[1]
    }
  }
  if (Object.keys(movementErrors).length > 0) {
    errors[movement_set] = movementErrors
  }
  if (sectionData[round_type]==='A' && sectionData[round_duration] === '00:00:00') {
    errors[round_type] = 'AMRAP-type workouts must have an associated duration for each round.'
  }
  if (sectionData[round_type]==='E' && sectionData[round_duration] === '00:00:00') {
    errors[round_type] = 'EMOM-type workouts must have an associated duration for each round.'
  }
  if (sectionData[section_type] !== 'S' && sectionData[rounds]==='') {
    errors[rounds] = 'Please enter a number of rounds'
  }

  if (Object.keys(errors).length > 0) {
    return [sectionData[section_order],errors]
  }
  return null
}

function validateMovement(movementData, completed=false) {
  const errors = {}
  if (movementData[movement_id] === '') {
    errors[movement_id] = 'Please select a movement'
  }
  if (completed) {
    if (movementData[count]===null) {
      errors[count] = 'Please complete this field'
    }
    if (movementData[movement_score_number]==='' && movementData[movement_score_type]!=='time') {
      errors[movement_score_number] = 'Please complete this field'
    }
  }
  if (Object.keys(errors).length > 0) {
    return [movementData[movement_order], errors]
  }
  return null
}
