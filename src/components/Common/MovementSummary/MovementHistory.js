import useSWR from 'swr'
import {useState, useContext, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'
import {name} from 'constants/movement_class'
import {getData} from 'utils/apiCalls'
import {formatDataStrings} from 'utils/sectionStringFormatting'
import {count, count_type, score_number, score_time, score_type} from 'constants/movement'
import {AuthContext} from 'contexts/AuthContext'
import DateChart from 'components/Common/DateChart'

function MovementHistory(props) {

  const [selectedCount, setSelectedCount] = useState({})
  const movementName = props.movement[name]
  useEffect(()=>{setSelectedCount({})}, [movementName])

  const user = useContext(AuthContext)
  const {data:countOptions, error:countOptionsError} = useSWR(
    [`movement_class/${props.movement[name]}/unique_counts/`, user.token],
    (key, token) => getData(key, token, {})
  )

  const {data:progressionData, error:progressionDataError} = useSWR(
    [`movement_class/${props.movement[name]}/progression/`, user.token],
    (key, token) => getData(key, token, {})
  )

  if (progressionDataError||countOptionsError) return (
    <Card>
      <Card.Header>Progression</Card.Header>
      <Card.Body><h5>Something went wrong...</h5></Card.Body>
    </Card>
  )

  if (!progressionData||!countOptions) return (
    <Card>
      <Card.Header><h5>Progression</h5></Card.Header>
      <Card.Body><div className='text-center'><Spinner animation='border'/></div></Card.Body>
    </Card>
  )

  const optionMap = countOptions.length===0 ? <div>No results yet</div> :
    <>
    {countOptions.map(x=>
      <Dropdown.Item
        key={x[count]+x[count_type]}
        className='text-center'
        onClick={()=>setSelectedCount(x)}
      >
        {x[count]} {formatDataStrings(x[count_type])}
      </Dropdown.Item>
    )}
    </>

  return(
    <Card className='my-2'>
      <Card.Header>
        <h5>Progression</h5>
      </Card.Header>
      <Card.Body>
      <Dropdown>
        <Dropdown.Toggle className='col-12'>
          {!!selectedCount[count]?`${selectedCount[count]} ${formatDataStrings(selectedCount[count_type])}` :'Select a result'}
        </Dropdown.Toggle>
        <Dropdown.Menu className='col-12'>
          {optionMap}
        </Dropdown.Menu>
      </Dropdown>
        <div className='my-3'>
        {!!selectedCount[count]?
          <DateChart selectedData={progressionData.filter(x=>
            x[count]===selectedCount[count] && x[count_type]===selectedCount[count_type]
            )}
            xAxis={'date'}
            yAxis={selectedCount[score_type]!=='time'?score_number:score_time}
          />
          : null
        }
        </div>
      </Card.Body>

    </Card>
  )
}

export default MovementHistory
