import axios from 'axios'
import { API_URL } from 'constants/configs'
import { id as workout_workout_id, date as date_planned } from 'constants/workout'
import moment from 'moment'

export async function getData(key, token, parameters) {

  const workouts = await axios.get(API_URL+key,
    {
      headers: {
        'Authorization': `Bearer ${token}`
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
        {headers:{'Authorization':`Bearer ${token}`}}
      )
    )
  } else {
    return (
      axios.post(
        API_URL + key,
        {...data, [date_planned]:moment(data[date_planned]).format('YYYY-MM-DD')},
        {headers:{'Authorization':`Bearer ${token}`}}
      )
    )
  }
}

export async function updateData(key, token, data) {
  const response = await axios.put(API_URL+key, data, {headers:{'Authorization':`Bearer ${token}`}})
  return response.data
}

export async function getMovementClasses(key, token) {
  const movementClasses = await axios.get(API_URL+key, {headers:{'Authorization':`Bearer ${token}`}})
  return movementClasses.data
}

export async function getFilteredMovementClasses(token, query) {
  try {
    const options = await axios.get(API_URL+'movement_class/', {
      headers:{
        'Authorization':`Bearer ${token}`
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
        'Authorization': `Bearer ${token}`
      }
    })
    return newMovementClass.data
  } catch (error) {
    console.error(error)
    return data
  }
}
