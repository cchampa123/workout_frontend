import {
  id as section_section_id,
  workout_id as section_workout_id,
  section_type as section_section_type,
  rounds as section_rounds,
  round_duration as section_round_duration,
  round_type as section_round_type,
  score_number as section_score_number,
  score_time as section_score_time,
  extra_instructions as section_extra_instructions,
  user as section_user,
  buyout_number, buyin_number
} from 'constants/section'

import {
  id as movement_movement_id,
  movement_id as movement_movement_class_id,
  section_id as movement_section_id,
  workout_id as movement_workout_id,
  count_type as movement_count_type,
  score_type as movement_score_type,
  count as movement_count,
  score_number as movement_score_number,
  score_time as movement_score_time,
  superset as movement_superset,
  user as movement_user
} from 'constants/movement'

import {
  id as workout_workout_id,
  user as workout_user,
  date as workout_date,
  complete as workout_complete
} from 'constants/workout'

import {
  name as movement_class_id,
  count_types as movement_class_count_type,
  score_types as movement_class_score_type
} from 'constants/movement_class'

export function createNewDefaultWorkout(userid, workoutData) {

  const workout_ids = workoutData.map(x=>x[workout_workout_id])
  const max_workout_number = workout_ids.filter(x=>typeof x==='number').length>0
    ?
      Math.max(...workout_ids.filter(x=>typeof x==='number'))
    :
      0
  const num_new_workouts = workout_ids.filter(x=>typeof x === 'string').length
  const new_workout_id = 'new_'+String(max_workout_number+num_new_workouts)

  const newWorkout = {
    [workout_workout_id]:new_workout_id,
    [workout_user]:userid,
    [workout_date]:new Date(),
    [workout_complete]:false
  }

  return(newWorkout)
}

export function createNewDefaultSection(userid, workout_id, sectionData) {

  const section_ids = sectionData.map(x=>x[section_section_id])
  const max_section_number = section_ids.filter(x=>typeof x==='number').length>0
    ?
      Math.max(...section_ids.filter(x=>typeof x==='number'))
    :
      0
  const num_new_sections = section_ids.filter(x=>typeof x === 'string').length
  const new_section_id = 'new_'+String(max_section_number+num_new_sections)

  return ({
    [section_user]:userid,
    [section_section_id]:new_section_id,
    [section_workout_id]:workout_id,
    [section_section_type]:'strength',
    [section_rounds]:1,
    [section_round_duration]:'00:00:00',
    [section_round_type]:'fortime',
    [section_score_number]:'',
    [section_score_time]:'',
    [section_extra_instructions]:''
  })
}

export function createNewDefaultMovement(userid, workout_id, section_id, movementData) {
  const movement_ids = movementData.map(x=>x[movement_movement_id])
  //debugger
  const num_new_movements = movement_ids.filter(x=>typeof x === 'string').length>0
    ?
      Math.max(
        ...movement_ids.filter(
          x=>typeof x === 'string'
        ).map(
          x=>Number(x.slice(4))
        )
      )
    :
      1
  const new_movement_id = 'new_'+String(num_new_movements+1)
  const superSets = [
    ...new Set(movementData.filter(
        x=>x[movement_section_id]===section_id
      ).map(
        x=>x[movement_superset]
      )
    )
  ]
  const new_movement_superset = superSets.length>0?Math.max(...superSets.filter(x=>x!==buyout_number)):buyin_number+1

  const newMovement = {
    [movement_user]:userid,
    [movement_movement_id]:new_movement_id,
    [movement_movement_class_id]:'',
    [movement_workout_id]:workout_id,
    [movement_count_type]:'',
    [movement_score_type]:'',
    [movement_count]:'',
    [movement_score_number]:'',
    [movement_score_time]:'00:00:00',
    [movement_superset]:new_movement_superset,
    [movement_section_id]:section_id,
  }

  return newMovement
}

export function createMovementWithRemovedData(oldMovementData, selected) {

  return ({
    [movement_movement_id]:oldMovementData[movement_movement_id],
    [movement_movement_class_id]:selected.length>0?selected[0][movement_class_id]:'',
    [movement_workout_id]:oldMovementData[movement_workout_id],
    [movement_count_type]:selected.length>0?selected[0][movement_class_count_type][0]:'',
    [movement_score_type]:selected.length>0?selected[0][movement_class_score_type][0]:'',
    [movement_count]:'',
    [movement_score_number]:'',
    [movement_score_time]:'00:00:00',
    [movement_superset]:oldMovementData[movement_superset],
    [movement_section_id]:oldMovementData[movement_section_id],
  })
}
