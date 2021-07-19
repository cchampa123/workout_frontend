import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { useState } from 'react'
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs'
import Button from 'react-bootstrap/Button'

import StrengthExplorer from './StrengthExplorer'
import MetConExplorer from './MetConExplorer'

function Explorer(props) {

  const [open, setOpen] = useState(false)
  const [typeOfResult, setTypeOfResult] = useState('strength')

  const resultExplorer = typeOfResult==='strength'? <StrengthExplorer/> : <MetConExplorer/>

  return (
    <>
      {resultExplorer}
      <Accordion className='fixed-bottom'>
        <Card>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <div className='text-center mb-1'>What sort of results do you want to view?</div>
              <Button className='col-12 mb-1' active={typeOfResult==='strength'} onClick={()=>setTypeOfResult('strength')}>Strength</Button>
              <Button className='col-12' active={typeOfResult==='metcon'} onClick={()=>setTypeOfResult('metcon')}>MetCon</Button>
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Toggle as={Card.Footer} eventKey='0' onClick={()=>setOpen(!open)}>
            {open?<BsFillCaretDownFill className='col-12 text-center'/>:<BsFillCaretUpFill className='col-12 text-center'/>}
          </Accordion.Toggle>
        </Card>
      </Accordion>
    </>
  )
}

export default Explorer
