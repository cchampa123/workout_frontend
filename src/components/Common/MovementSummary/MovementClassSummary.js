import {useState, useContext, useEffect, useMemo} from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {score_types, count_types, name, possible_count_types, possible_score_types} from 'constants/movement_class'
import {formatDataStrings} from 'utils/sectionStringFormatting'
import {updateData} from 'utils/apiCalls'
import {AuthContext} from 'contexts/AuthContext'

function MovementClassSummary(props) {

  const movementName = props.movement[name]
  //eslint-disable-next-line
  const movement = useMemo(() => props.movement, [movementName])

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({})
  useEffect(() => setForm(movement), [movement])
  const {user} = useContext(AuthContext)

  const handleSubmit = async () => {
    props.mutate(form, false)
    setOpen(false)
    const newData = await updateData(`movement_class/${movement[name]}/`, user.token, form)
    props.mutate(newData, false)
  }

  return (
    <>
      <Card className='my-2'>
        <Card.Body className='p-1'>
          <Row>
            <Col className='text-center'>
              Counted on:<br/>{props.movement[count_types].map(x=>formatDataStrings(x)).join()}
            </Col>
            <Col className='text-center'>
              Scored on:<br/>{props.movement[score_types].map(x=>formatDataStrings(x)).join()}
            </Col>
          </Row>
        </Card.Body>
        <Button as={Card.Footer} onClick={()=>setOpen(true)}>
          <i>Edit</i>
        </Button>
      </Card>
      <Modal show={open} onHide={()=>setOpen(false)}>
        <Modal.Header><h3 className='text-center col-12'>{movement[name]}</h3></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Add ways to count this</Form.Label>
              <Form.Control
                multiple
                value={form[count_types]}
                as='select'
                onChange={e=>{
                  const selected = [].slice.call(e.target.selectedOptions).map(x=>x.value)
                  setForm({...form, [count_types]:[...movement[count_types], ...selected]})
                }}
              >
                {possible_count_types.filter(x=>!movement[count_types].includes(x)).map(y=>
                  <option key={y}>{y}</option>
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group>
            <Form.Label>Add ways to score this</Form.Label>
            <Form.Control
              multiple
              value={form[score_types]}
              as='select'
              onChange={e=>{
                const selected = [].slice.call(e.target.selectedOptions).map(x=>x.value)
                setForm({...form, [score_types]:[...movement[score_types], ...selected]})
              }}
            >
              {possible_score_types.filter(x=>!movement[score_types].includes(x)).map(y=>
                <option key={y}>{y}</option>
              )}
            </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Button
          as={Modal.Footer}
          onClick={()=>handleSubmit()}
        >
          <h5 className='text-center col-12'>Submit</h5>
        </Button>
      </Modal>
    </>
  )
}

export default MovementClassSummary
