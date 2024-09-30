import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  setMarkdownContent: (markdownContent: string) => void,
  markdownContent: string
}

export default function Home({ setMarkdownContent, markdownContent }: HomeProps) {

  const navigate = useNavigate();
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(event.target.value);
  };

  const handleClick = () => {
    navigate('/converted'); // Navigate to the "About" page
  };
  return (
    <>
      <Container fluid className="vh-100 d-flex justify-content-center align-items-center m-auto container">
        <Row className="text-center">
          <Col className="">
            <h1 className="m-4">MDJR</h1>
            <textarea rows={10} cols={100} className="m-4 p-4 bg-secondary"
              placeholder="Enter your Markdown here..."
              value={markdownContent}
              onChange={handleTextareaChange} />
            <Button variant="outline-primary" onClick={handleClick} className="text-bold m-4 p-2">
              Convert
            </Button>
          </Col>
        </Row>
      </Container>

    </>

  )
}
