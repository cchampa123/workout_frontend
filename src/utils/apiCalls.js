import axios from 'axios'
import { API_URL } from 'constants/configs'
import { id as workout_workout_id, date as date_planned } from 'constants/workout'
import { id as section_section_id, workout_id as section_workout_id } from 'constants/section'
import { workout_id as movement_workout_id, section_id as movement_section_id, id as movement_movement_id } from 'constants/movement'
import moment from 'moment'

export async function getData(key, token, parameters) {

  const workouts = await axios.get(API_URL+key,
    {
      headers: {
        'Authorization': `Token ${token}`
      },
      params: parameters
    }
  )
  return (workouts.data)
}

export function sendData(key, token, data) {
  if (workout_workout_id in data) {
    return(
      axios.put(
        API_URL + key + data[workout_workout_id] + '/',
        {...data, [date_planned]:moment(data[date_planned]).format('YYYY-MM-DD')},
        {headers:{'Authorization':`Token ${token}`}}
      )
    )
  } else {
    return (
      axios.post(
        API_URL + key,
        {...data, [date_planned]:moment(data[date_planned]).format('YYYY-MM-DD')},
        {headers:{'Authorization':`Token ${token}`}}
      )
    )
  }
}

export async function updateData(key, token, data) {
  const response = await axios.put(API_URL+key, data, {headers:{'Authorization':`Token ${token}`}})
  return response.data
}

export async function getMovementClasses(key, token) {
  const movementClasses = await axios.get(API_URL+key, {headers:{'Authorization':`Token ${token}`}})
  return movementClasses.data
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
