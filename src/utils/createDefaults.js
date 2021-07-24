import {
  section_type as section_section_type,
  rounds as section_rounds,
  round_duration as section_round_duration,
  round_type as section_round_type,
  score_number as section_score_number,
  score_time as section_score_time,
  extra_instructions as section_extra_instructions,
  order as section_order,
  buyout_number, buyin_number, movement_set
} from 'constants/section'

import {
  movement_id as movement_movement_class_id,
  count_type as movement_count_type,
  score_type as movement_score_type,
  count as movement_count,
  score_number as movement_score_number,
  score_time as movement_score_time,
  superset as movement_superset,
  order as movement_order
} from 'constants/movement'

import {
  date as workout_date,
  complete as workout_complete,
  section_set
} from 'constants/workout'

import {
  name as movement_class_id,
  count_types as movement_class_count_type,
  score_types as movement_class_score_type
} from 'constants/movement_class'

export function createNewDefaultWorkout(complete=false) {

  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()+1
  const day = date.getDate()

  const newWorkout = {
    [workout_date]:`${year}-${month>10?month:'0'+month}-${day>10?day:'0'+day}`,
    [workout_complete]:complete,
    [section_set]:[]
  }

  return(newWorkout)
}

export function createNewDefaultSection(sectionData) {

  const order = sectionData.length+1

  return ({
    [section_section_type]:'S',
    [section_rounds]:1,
    [section_round_duration]:'00:00:00',
    [section_round_type]:'F',
    [section_score_number]:null,
    [section_score_time]:'00:00:00',
    [section_extra_instructions]:'',
    [section_order]:order,
    [movement_set]: []
  })
}

export function createNewDefaultMovement(movementData) {
  const superSets = [
    ...new Set(movementData.map(x=>x[movement_superset]))
  ]
  const new_movement_superset = superSets.length>0?Math.max(...superSets.filter(x=>x!==buyout_number)):buyin_number+1
  const order = movementData.length+1

  const newMovement = {
    [movement_movement_class_id]:'',
    [movement_count_type]:'',
    [movement_score_type]:'',
    [movement_count]:null,
    [movement_score_number]:null,
    [movement_score_time]:'00:00:00',
    [movement_superset]:new_movement_superset,
    [movement_order]:order
  }

  return newMovement
}

export function createMovementWithRemovedData(oldMovementData, selected) {

  return ({
    [movement_movement_class_id]:selected.length>0?selected[0][movement_class_id]:'',
    [movement_count_type]:selected.length>0?selected[0][movement_class_count_type][0]:'',
    [movement_score_type]:selected.length>0?selected[0][movement_class_score_type][0]:'',
    [movement_count]:null,
    [movement_score_number]:null,
    [movement_score_time]:'00:00:00',
    [movement_superset]:oldMovementData[movement_superset],
    [movement_order]:oldMovementData[movement_order]
  })
}
