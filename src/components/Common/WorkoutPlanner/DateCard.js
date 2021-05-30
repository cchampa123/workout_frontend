import React from 'react'
import Datepicker from 'react-datepicker'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import "react-datepicker/dist/react-datepicker.css";

function DateCard(props) {

  const CustomInput = React.forwardRef(
    ({ value, onClick }, ref) => (
      <Button
        className="btn btn-light dropdown-toggle col-12 text-center text-dark"
        onClick={onClick}
        ref={ref}
      >
        {value}
      </Button>
    ),
  );

  return(
    <Card className='bg-light my-1'>
      <Card.Body>
        <Datepicker
          wrapperClassName='col-12'
          dateFormat="MMMM d, yyyy"
          selected={props.plannedDate}
          onChange={date => props.setPlannedDate(date)}
          customInput={<CustomInput/>}
          popperPlacement='auto'
        />
      </Card.Body>
    </Card>
  )

}

export default DateCard;
