import { useNavigate } from 'react-router-dom';
import MDToHtml from './MDToHtml'
import { Button } from 'react-bootstrap';
import DownloadHtml from './DownloadHtml';
import { usePDF } from 'react-to-pdf';

interface ConvertedMdProps {
  markdownContent: string
}

export default function ConvertedMd({ markdownContent }: ConvertedMdProps) {
  const { targetRef } = usePDF({ filename: 'page.pdf' });

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/'); // Navigate to the "About" page
  };

  return (
    <div className='mx-auto p-4' style={{ maxWidth: '90rem' }}>

      <div ref={targetRef}>
        <MDToHtml>
          {markdownContent}
        </MDToHtml>
      </div>
      <div className='d-flex justify-content-between m-4'>
        <Button variant="outline-primary" onClick={handleClick} className="text-bold">
          Back
        </Button>
        <DownloadHtml variant="outline-primary" className="text-bold" />
        {/* Button to trigger print */}

        {/* <Button onClick={() => toPDF()}>Print to PDF</Button> */}

      </div>
    </div >
  )
}
