import { useNavigate } from 'react-router-dom';
import MDToHtml from './MDToHtml';
import { Button } from 'react-bootstrap';
import DownloadHtml from './DownloadHtml';

interface ConvertedMdProps {
  markdownContent: string;
}

export default function ConvertedMd({ markdownContent }: ConvertedMdProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <div
      className="mx-auto py-4"
      style={{ maxWidth: '90rem' }}
    >
      <MDToHtml>{markdownContent}</MDToHtml>
      <div className="d-flex justify-content-between p-4">
        <Button
          variant="outline-primary"
          onClick={handleClick}
          className="text-bold"
        >
          Back
        </Button>
        <DownloadHtml
          variant="outline-primary"
          className="text-bold"
        />
      </div>
    </div>
  );
}
