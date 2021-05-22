import { createContext } from 'react'

export const WorkoutDataContext = createContext({
  workouts:[],
  setWorkouts:()=>{},
  sections:[],
  setSections:()=>{},
  movements:[],
  setMovements:()=>{}
})
