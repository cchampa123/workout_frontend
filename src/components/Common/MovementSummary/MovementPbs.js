import {useState, useEffect, useContext} from 'react'
import {AuthContext} from 'contexts/AuthContext'
import {getData} from 'utils/apiCalls'
import {movement_id, score_type, score_number, score_time, count, count_type} from 'constants/movement'
import {name} from 'constants/movement_class'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function MovementPbs(props) {

  const user = useContext(AuthContext)
  const [pbs, setPbs] = useState([])
  const [pbLoading, setPbLoading] = useState(true)
  useEffect(() => {
    async function fetchPbs() {
      setPbLoading(true)
      const data = await getData(
        'movement_instance/',
        user.token,
        {[movement_id]:props.movement[name],
         'max_score':true}
      )
      setPbs(data)
      setPbLoading(false)
    }
    fetchPbs()
  }, [props.movement[name]])

  const pbTable = () => {
    if (pbLoading) {
      return <div className='text-center'><Spinner animation='border'/></div>
    } else {
      const nonTime = pbs.filter(x=>x[score_type]!=='time')
      nonTime.sort((a,b) => a[count]>b[count]?1:-1)
      const time = pbs.filter(x=>x[score_type]==='time')
      return (
        <>
        {!nonTime?null:
          <>
          <Row>
            <Col className='text-center'><strong>Count</strong></Col>
            <Col className='text-center'><strong>Weight</strong></Col>
            <Col className='text-center'><strong>Measurement</strong></Col>
          </Row>
          {
            nonTime.map(x=>
              <Row>
                <Col className='text-center border'>
                  {x[count]} {x[count_type]}
                </Col>
                <Col className='text-center border'>
                  {x[score_number]}
                </Col>
                <Col className='text-center border'>
                  {x[score_type]}
                </Col>
              </Row>
            )
          }
          </>
        }
        </>
      )
    }
  }

  return (
    <Card className='my-2'>
      <Card.Header>
        <h5>Personal Bests</h5>
      </Card.Header>
      <Card.Body>
        {pbTable()}
      </Card.Body>
    </Card>
  )
}

export default MovementPbs
