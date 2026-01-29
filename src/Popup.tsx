import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PopupProps {
  show: boolean;
  handleClose: () => void;
}

export default function Popup({ show, handleClose }: PopupProps) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="empty-input-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="empty-input-modal-title">Empty Input</Modal.Title>
      </Modal.Header>
      <Modal.Body>The text to convert is empty</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          aria-label="Close modal"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
