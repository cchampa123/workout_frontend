import { createContext } from 'react'

export const WorkoutDataContext = createContext({
  workoutData: [],
  error: null,
  mutate: () => {}
})
