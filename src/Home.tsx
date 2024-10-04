import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { useState } from "react";

interface HomeProps {
  setMarkdownContent: (markdownContent: string) => void,
  markdownContent: string
}

export default function Home({ setMarkdownContent, markdownContent }: HomeProps) {

  const [isConditionMet, setIsConditionMet] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(event.target.value);
  };

  const handleClick = () => {
    if (markdownContent.length !== 0) {
      navigate('/converted');
    } else {
      setIsConditionMet(prev => !prev)// Navigate to the "About" page
    }
  };
  return (
    <>
      <Container fluid style={{ height: '96vh' }} className="d-flex justify-content-center align-items-center">
        <Row className="text-center">
          <Col>
            <h1 className="m-4">MDJR</h1>
            <Form.Control cols={80} rows={20} as="textarea" className="bg-secondary p-4"
              placeholder="Enter your Markdown here..."
              value={markdownContent}
              onChange={handleTextareaChange}
            />
            <Button style={{ padding: '15px 40px', fontSize: '20px' }} size="lg" variant="outline-primary" onClick={handleClick} className="text-bold m-4 p-2">
              Convert
            </Button>
            <Popup show={isConditionMet} handleClose={() => setIsConditionMet(false)} />
          </Col>
        </Row>
      </Container>

    </>

  )
}
