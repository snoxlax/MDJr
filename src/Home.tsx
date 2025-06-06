import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { useState } from "react";
// import MarkdownEditor from "./MDXEditor";



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

  // const [xmarkdownContent, setMXarkdownContent] = useState<string>('');

  // const handleMarkdownChange = (newContent: string) => {
  //   setMXarkdownContent(newContent);
  // };

  return (
    <>
      <Container fluid className=" min-vh-100 d-flex justify-content-center align-items-center">
  <Row className="w-100 justify-content-center">
    <Col xs={12} md={10} lg={8}>
      <Card className="shadow-lg border-0">
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <h1 className="display-4 text-primary fw-bold">Markdown to Text Converter</h1>
            <p className="text-muted">
              Paste or type your <strong>Markdown</strong> content below and click <strong>Convert</strong> to get the translated plain text.
            </p>
            <hr />
          </div>

          <Form.Group controlId="markdownInput">
            {/* <Form.Label className="fw-semibold">Markdown Input</Form.Label> */}
            <Form.Control
            as="textarea"
            rows={15}
            placeholder="## Example:\n\n- This is a list\n- **Bold Text**\n- [Link](https://example.com)"
            className="p-3 fs-5 border-0 bg-secondary p-4"
            value={markdownContent}
            onChange={handleTextareaChange}
            style={{ resize: 'vertical' }}
                  />
                </Form.Group>
                <div className="text-center mt-4">
                  <Button
                  variant="primary"
                  size="lg"
                  onClick={handleClick}
                  className="px-5 py-2 fw-semibold"
                >
                    Convert
                  </Button>
                </div>
                <Popup show={isConditionMet} handleClose={() => setIsConditionMet(false)} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
