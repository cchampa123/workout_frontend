import useSWR from 'swr'
import { useContext, useState } from 'react'
import { getData } from 'utils/apiCalls'
import { AuthContext } from 'contexts/AuthContext'
import Dropdown from 'react-bootstrap/dropdown'
import Spinner from 'react-bootstrap/Spinner'
import { name } from 'constants/movement_class'
import MovementSummary from 'components/Common/MovementSummary/MovementSummary'

function StrengthExplorer(props) {

  const user = useContext(AuthContext)
  const token = user.token
  const { data:movementClassData,
          error:movementClassDataError,
          mutate:movementClassDataMutate } = useSWR(
            ['movement_class/', token],
            (url, token) => getData(url, token, {})
          )
  const [selectedMovementName, setSelectedMovementName] = useState(null)

  if (!!movementClassDataError) return <h3>Something went wrong...</h3>

  if (!movementClassData) return (
    <Dropdown>
      <Dropdown.Toggle className='col-12 btn-info text-dark'>Loading...</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item><div className='text-center'><Spinner animation='border'/></div></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )

  const selectedMovement = selectedMovementName===null?null:movementClassData.filter(x=>x[name]===selectedMovementName)[0]
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className='col-12 btn-info text-dark'>
          <h5>{selectedMovementName?selectedMovementName:'Select a movement'}</h5>
        </Dropdown.Toggle>
        <Dropdown.Menu className='col-12'>
          {movementClassData.map(x=>
            <Dropdown.Item
              key={x[name]}
              className='text-center'
              onClick={()=>setSelectedMovementName(x[name])}
            >
              {x[name]}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      {selectedMovement?
        <MovementSummary
          mutate={(movement, revalidate=true) => {
            movementClassDataMutate(
            [...movementClassData.filter(x=>x[name]!==movement[name]), movement],
            revalidate
          )}}
          movement={selectedMovement}
        />
        :
        null
      }
    </>
  )
}

export default StrengthExplorer
