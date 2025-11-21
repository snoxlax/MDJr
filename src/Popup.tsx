import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PopupProps {
  show: boolean;
  handleClose: () => void;
}

export default function Popup({ show, handleClose }: PopupProps) {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Body>The text to convert is empty</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
