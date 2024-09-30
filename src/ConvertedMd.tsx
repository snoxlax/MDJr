import { useNavigate } from 'react-router-dom';
import MDToHtml from './MDToHtml'
import { Button } from 'react-bootstrap';
import DownloadHtml from './DownloadHtml';
import { useRef } from 'react';

interface ConvertedMdProps {
  markdownContent: string
}

export default function ConvertedMd({ markdownContent }: ConvertedMdProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/'); // Navigate to the "About" page
  };
  return (
    <div className='m-4' >
      <div ref={elementRef}>
        <MDToHtml>
          {markdownContent}
        </MDToHtml>
      </div>
      <Button variant="outline-primary" onClick={handleClick} className="text-bold p-2 m-2">
        Back
      </Button>
      <DownloadHtml variant="outline-primary" className="text-bold m-2 p-2" elementRef={elementRef} />
    </div >
  )
}
