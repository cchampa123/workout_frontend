import React, { useContext } from 'react'
import Modal from 'react-bootstrap/modal'
import Button from 'react-bootstrap/button'
import { PageContext } from 'contexts/PageContext'
import Spinner from 'react-bootstrap/spinner'


function SubmissionConfirmation(props) {

  const { setPage } = useContext(PageContext)

  const loadingHeader = 'Loading...'
  const loadingBody = <div className='text-center'><Spinner animation='border'/></div>
  const loadingFooter = <div/>

  const successHeader = <strong className='text-center col-12'>All Set</strong>
  const successBody = props.successString
  const successFooter = props.successFooter?props.successFooter:(
    <Button
      className='btn btn-success col-12'
      onClick={()=>setPage({pageTitle:'Home', pageProps:{}})}
    >
      OK
    </Button>
  )

  const failureHeader = <strong className='text-center col-12'>Something's not right...</strong>
  const failureBody = props.errorString
  const failureFooter = props.failureFooter?props.failureFooter:(
    <Button
      className='btn btn-danger col-12'
      onClick={()=>props.setSubmitted(false)}
    >
    Fix Errors
    </Button>
  )

  const relevantHeader = props.error ? failureHeader : successHeader
  const relevantBody = props.error ? failureBody : successBody
  const relevantFooter = props.error ? failureFooter : successFooter

  return (
    <Modal
      show={props.submitted}
      onHide={()=>props.setSubmitted(false)}
    >
      <Modal.Header className='bg-dark text-white'>
        {props.loading?loadingHeader:relevantHeader}
      </Modal.Header>
      <Modal.Body>
        {props.loading?loadingBody:relevantBody}
      </Modal.Body>
      <Modal.Footer>
        {props.loading?loadingFooter:relevantFooter}
      </Modal.Footer>
    </Modal>
  )
}

export default SubmissionConfirmation
