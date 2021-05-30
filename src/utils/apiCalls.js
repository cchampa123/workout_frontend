import axios from 'axios'
import { API_URL, LOCAL_DATE_RANGE } from 'constants/configs'
import { id as workout_workout_id, date as date_planned } from 'constants/workout'
import { id as section_section_id, workout_id as section_workout_id } from 'constants/section'
import { workout_id as movement_workout_id, section_id as movement_section_id, id as movement_movement_id } from 'constants/movement'
import moment from 'moment'

export async function getRecentWorkouts(token) {

  try {
    const workouts = await axios.get(API_URL+'workout/',
      {
        headers: {
          'Authorization': `Token ${token}`
        },
        params: {
          'date__lte':moment().add(LOCAL_DATE_RANGE, 'd').format('YYYY-MM-DD'),
          'date__gte':moment().subtract(LOCAL_DATE_RANGE, 'd').format('YYYY-MM-DD')
        }
      }
    )
    const sections = await Promise.all(
      workouts.data.map(async workout=>{
        const response = await axios.get(API_URL+'section/',
          {
            headers:{
              'Authorization': `Token ${token}`
            },
            params: {
              [section_workout_id]:workout[workout_workout_id]
            }
          }
        )
        return response.data
        }
      )
    )
    const movements = await Promise.all(
      workouts.data.map(async workout =>{
        const response = await axios.get(API_URL+'movement_instance/',
          {
            headers:{
              'Authorization':`Token ${token}`
            },
            params:{
              [movement_workout_id]:workout[workout_workout_id]
            }
          }
        )
        return response.data
        }
      )
    )
    return ({
      'workouts':workouts.data,
      'sections':[].concat(sections.flat()),
      'movements':[].concat(movements.flat())
    })
  } catch (error) {
    return (error)
  }
}

function add_or_update(token, id, data, endpoint) {
  if (data === null && typeof id !== 'string') {
    axios.delete(
      API_URL+endpoint+id+'/', {headers:{'Authorization':`Token ${token}`}}
    )
  } else if (typeof id === 'string') {
    return (
      axios.post(
        API_URL+endpoint, data, {headers:{'Authorization':`Token ${token}`}}
      )
    )
  } else {
    return (
      axios.put(
        API_URL+endpoint+id+'/', data, {headers:{'Authorization':`Token ${token}`}}
      )
    )
  }
}

export async function submitNewData(token, workoutData, newWorkoutData, noUpdate) {
  const errors = []

  const newWorkoutIds = newWorkoutData['workouts'].map(x=>x[workout_workout_id])
  const untouchedWorkouts = workoutData['workouts'].filter(workout =>
    !newWorkoutIds.includes(workout[workout_workout_id])
  )

  const newSectionIds = newWorkoutData['sections'].map(x=>x[section_section_id])
  const untouchedSections = workoutData['sections'].filter(section =>
    !newSectionIds.includes(section[section_section_id])
  )

  const newMovementIds = newWorkoutData['movements'].map(x=>x[movement_movement_id])
  const untouchedMovements = workoutData['movements'].filter(movement =>
    !newMovementIds.includes(movement[movement_movement_id])
  )

  if (noUpdate) {
    return ([
      errors,
      {
      'workouts':[...untouchedWorkouts, ...newWorkoutData['workouts']],
      'sections':[...untouchedSections, ...newWorkoutData['sections']],
      'movements':[...untouchedMovements, ...newWorkoutData['movements']]
    }])
  }

  const newWorkouts = await Promise.all(
    newWorkoutData['workouts'].map(
      async x => {
        const {id} = x
        const submit_package = {
          ...x,
          [date_planned]:moment(x[date_planned]).format('YYYY-MM-DD')
        }
        try {
          let response = await add_or_update(token, id, submit_package, 'workout/')
          return response.data
        } catch (error) {
          errors.push(error.response.data)
          return x
        }
      }
    )
  )
  const workoutIdMap = newWorkouts.reduce((acc, current, index) => {
    acc[newWorkoutData['workouts'][index][workout_workout_id]] = current[workout_workout_id]
    return acc
  }, {})

  const newSections = await Promise.all(
    newWorkoutData['sections'].map(
      async x=>{
        const {id} = x
        const submit_package = {
          ...x,
          [section_workout_id]:workoutIdMap[x[section_workout_id]]
        }
        try {
          let response = await add_or_update(token, id, submit_package, 'section/')
          return response.data
        } catch (error) {
          errors.push(error.response.data)
          return x
        }
      }
    )
  )
  const sectionIdMap = newSections.reduce((acc, current, index) => {
    acc[newWorkoutData['sections'][index][section_section_id]] = current[section_section_id]
    return acc
  }, {})

  const newMovements = await Promise.all(
    newWorkoutData['movements'].map(
      async x=>{
        const {id} = x
        console.log('section map')
        console.log(sectionIdMap)
        console.log('workout map')
        console.log(workoutIdMap)
        debugger
        const submit_package = {
          ...x,
          [movement_section_id]:sectionIdMap[x[movement_section_id]],
          [movement_workout_id]:workoutIdMap[x[movement_workout_id]]
        }
        console.log('submit package')
        console.log(submit_package)
        try {
          let response = await add_or_update(token, id, submit_package, 'movement_instance/')
          return response.data
        } catch (error) {
          errors.push(error.response.data)
          return x
        }
      }
    )
  )
  return ([
    errors,
    {
    'workouts':[...untouchedWorkouts, ...newWorkouts],
    'sections':[...untouchedSections, ...newSections],
    'movements':[...untouchedMovements, ...newMovements]
  }])
}

export async function getFilteredMovementClasses(token, query) {
  try {
    const options = await axios.get(API_URL+'movement_class/', {
      headers:{
        'Authorization':`Token ${token}`
      },
      params:{
        'name__icontains':query
      }
    })
    return options.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function addNewMovementClass(token, data) {
  try {
    const newMovementClass = await axios.post(API_URL+'movement_class/', data,
    {headers:{
        'Authorization': `Token ${token}`
      }
    })
    return newMovementClass.data
  } catch (error) {
    console.error(error)
    return data
  }
}
