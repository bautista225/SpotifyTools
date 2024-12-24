import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';

const useProgressModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          {description}
          <ProgressBar variant='dark' now={progressValue} label={progressLabel} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default useProgressModal;