import MovementClassSummary from './MovementClassSummary'
import MovementHistory from './MovementHistory'
import MovementPbs from './MovementPbs'

function MovementSummary(props) {

  const { movement, mutate } = props

  return (
    <>
      <MovementPbs movement={movement}/>
      <MovementHistory movement={movement}/>
      <MovementClassSummary
        mutate={mutate}
        movement={movement}
      />
    </>
  )
}

export default MovementSummary
