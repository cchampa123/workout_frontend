import {useState, useEffect, useContext} from 'react'
import useSWR from 'swr'
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
  const {data:pbs, error:pbsError} = useSWR(
    [`movement_class/${props.movement[name]}/max_score/`, user.token],
    (key, token) => getData(key, token)
  )

  if (pbsError) return (
    <Card>
      <Card.Header><h5>Personal Bests</h5></Card.Header>
      <Card.Body>Something went wrong...</Card.Body>
    </Card>
  )

  if (!pbs) return (
    <Card>
      <Card.Header><h5>Personal Bests</h5></Card.Header>
      <Card.Body><div className='text-center'><Spinner animation='border'/></div></Card.Body>
    </Card>
  )

  const pbTablePounds = () => {
    const poundStats = pbs.lbs
    if (poundStats.length === 0) return null
    poundStats.sort((a,b) => a[count]>b[count]?1:-1)
    return (
      <>
      <Row>
        <Col className='text-center'><strong>Count</strong></Col>
        <Col className='text-center'><strong>Weight</strong></Col>
      </Row>
      {
        poundStats.map(x=>
          <Row>
            <Col className='text-center border'>
              {x[count]} {x[count_type]}
            </Col>
            <Col className='text-center border'>
              {x[score_number]} lbs
            </Col>
          </Row>
        )
      }
      </>
    )
  }

  const pbTableTime = () => {
    const timeStats = pbs.time
    if (timeStats.length===0) return null
    timeStats.sort((a,b) => a[count]>b[count]?1:-1)
    return (
      <>
      <Row>
        <Col className='text-center'><strong>Count</strong></Col>
        <Col className='text-center'><strong>Time</strong></Col>
      </Row>
      {timeStats.map(x=>
          <Row>
            <Col className='text-center border'>
              {x[count]} {x[count_type]}
            </Col>
            <Col className='text-center border'>
              {new Date(x[score_time]*1000).toISOString().substr(12,7)}
            </Col>
          </Row>
        )
      }
      </>
    )
  }

  const table1 = pbTablePounds()
  const table2 = pbTableTime()

  return (
    <Card className='my-2'>
      <Card.Header>
        <h5>Personal Bests</h5>
      </Card.Header>
      <Card.Body>
        {!table1 && !table2? null : <div><div>{table1}</div><div>{table2}</div></div>}
      </Card.Body>
    </Card>
  )
}

export default MovementPbs
