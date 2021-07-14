import useSWR from 'swr'
import {name} from 'constants/movement_class'
import MovementClassSummary from './MovementClassSummary'
import MovementHistory from './MovementHistory'

function MovementSummary(props) {

  const { movement, mutate } = props

  return (
    <>
      <MovementHistory movement={movement}/>
      <MovementClassSummary
        mutate={mutate}
        movement={movement}
      />
    </>
  )
}

export default MovementSummary
