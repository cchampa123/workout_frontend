import React, { useContext } from 'react'
import Modal from 'react-bootstrap/modal'
import Button from 'react-bootstrap/button'
import { PageContext } from 'contexts/PageContext'
import {
  workoutPlannerSubmissionSuccess,
  workoutPlannerSubmissionFailure,
  workoutPlannerSubmissionFailureNoSections,
  workoutPlannerSubmissionFailureNoMovements,
  workoutPlannerSubmissionFailureEmptyMovements
} from 'constants/strings'

function SubmissionConfirmation(props) {

  const { page, setPage } = useContext(PageContext)

  return (
    <Modal
      show={props.submitted}
      onHide={()=>props.setSubmitted(false)}
    >
      <Modal.Header className='bg-dark text-white'>
        {Object.keys(props.errors).length>0?
          <strong className='text-center col-12'>Errors Detected</strong>:
          <strong className='text-center col-12'>Submission Successful</strong>
        }
      </Modal.Header>
      <Modal.Body>
        {Object.keys(props.errors).length>0?
          workoutPlannerSubmissionFailure + ' '+(props.errors['noSections']?
            workoutPlannerSubmissionFailureNoSections : (
              props.errors['noMovements'] ?
              workoutPlannerSubmissionFailureNoMovements :
              workoutPlannerSubmissionFailureEmptyMovements
            )
          )
          :
          workoutPlannerSubmissionSuccess
        }
      </Modal.Body>
      <Modal.Footer>
        {Object.keys(props.errors).length>0?
          <Button
            className='btn btn-danger col-12'
            onClick={()=>props.setSubmitted(false)}
          >
          Fix Errors
          </Button>:
          <Button
            className='btn btn-success col-12'
            onClick={()=>setPage('Home')}
          >
            OK
          </Button>
        }
      </Modal.Footer>
    </Modal>
  )
}

export default SubmissionConfirmation
