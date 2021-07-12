import React, { useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { PageContext } from 'contexts/PageContext'
import Spinner from 'react-bootstrap/Spinner'


function SubmissionConfirmation(props) {

  const { setPage } = useContext(PageContext)

  const nonLoadingBody = (
    <>
    <Modal.Header className='bg-dark text-white'>
    {props.errors?props.errorHeader:props.successHeader}
    </Modal.Header>
    <Modal.Body>
      {props.errors?props.errorString:props.successString}
    </Modal.Body>
    <Modal.Footer>
      <Button
        className={props.errors?'col-12 btn-danger':'col-12 btn-success'}
        onClick={props.errors ?
          () => props.setShowConfirmation(false):
          () => setPage({pageTitle:'Home', pageProps:{}})
        }
      >
        OK
      </Button>
    </Modal.Footer>
    </>
  )

  const loadingBody = (
    <>
    <Modal.Header className='bg-dark text-white'>Loading...</Modal.Header>
    <Modal.Body>
      <div className='text-center'><Spinner animation='border'/></div>
    </Modal.Body>
    </>
  )

  return (
    <Modal
      show={props.showConfirmation}
      onHide={()=>props.setShowConfirmation(false)}
    >
      {props.loading?loadingBody:nonLoadingBody}
    </Modal>
  )
}

export default SubmissionConfirmation
