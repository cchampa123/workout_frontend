import useSWR from 'swr'
import {useState, useContext, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'
import {name} from 'constants/movement_class'
import {getData} from 'utils/apiCalls'
import {formatDataStrings} from 'utils/sectionStringFormatting'
import {movement_id, count, count_type, score_number, score_time, id} from 'constants/movement'
import {AuthContext} from 'contexts/AuthContext'
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'
import moment from 'moment'

function MovementHistory(props) {

  const user = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [countOptions, setCountOptions] = useState([])
  useEffect(() => {
    async function fetchOptions() {
      setLoading(true)
      const data = await getData(
        'movement_instance/',
        user.token,
        {[movement_id]:props.movement[name], 'unique_counts':true}
      )
      setCountOptions(data)
      setLoading(false)
    }
    fetchOptions()
  }, [props.movement[name]])

  const [selectedCount, setSelectedCount] = useState({})
  const [countLoading, setCountLoading] = useState(false)
  const [selectedData, setSelectedData] = useState([])
  useEffect(() => {
    async function fetchSelectedData() {
      setCountLoading(true)
      const data = await getData(
        'movement_instance/',
        user.token,
        {[movement_id]:props.movement[name],
         [count]:selectedCount[count],
         [count_type]:selectedCount[count_type]}
      )
      setSelectedData(data)
      setCountLoading(false)
    }
    fetchSelectedData()
  }, [props.movement[name], selectedCount[count], selectedCount[count_type]])

  const optionMap = countOptions.length === 0 ? <div>No results yet</div> :
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

  const customTooltip = (e) => {
     if (e.active && e.payload != null && e.payload[0]!=null){
       console.log(e.payload)
       return (
         <div className='card'>
           <p>{moment(e.payload[0].payload['date']).format('MMM DD, YYYY')}</p>
           <p>{e.payload[0].payload[score_number]}</p>
         </div>
       )
     } else {
       return ""
     }
   }

  return(
    <Card className='my-2'>
      <Card.Header>
        Results over time
      </Card.Header>
      <Card.Body>
      <Dropdown>
        <Dropdown.Toggle className='col-12'>
          {!!selectedCount[count]?<div>{selectedCount[count]} {formatDataStrings(selectedCount[count_type])}</div> :'Select a result'}
        </Dropdown.Toggle>
        <Dropdown.Menu className='col-12'>
          {loading?
            <div className='text-center'><Spinner animation='border'/></div>:
            optionMap
          }
        </Dropdown.Menu>
      </Dropdown>
        {countLoading?<div className='text-center'><Spinner animation='border'/></div>:
        <ResponsiveContainer width={'99%'} aspect={1.5}>
          <LineChart data={selectedData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid stroke='#eee'/>
            <XAxis
              dataKey='date'
              tickCount={5}
              tickFormatter={number => moment(number).format('M/D')}
            />
            <YAxis />
            <Tooltip content={customTooltip}/>
            <Line dataKey={score_number} type="monotone" stroke="#8884d8"/>
          </LineChart>
        </ResponsiveContainer>
        }
      </Card.Body>

    </Card>
  )
}

export default MovementHistory
