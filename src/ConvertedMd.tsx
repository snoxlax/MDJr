import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MDToHtml from './MDToHtml';
import { Button } from 'react-bootstrap';
import DownloadHtml from './DownloadHtml';

interface ConvertedMdProps {
  markdownContent: string;
}

const STORAGE_KEY = 'markdown-content';

export default function ConvertedMd({ markdownContent }: ConvertedMdProps) {
  const navigate = useNavigate();
  const content = localStorage.getItem(STORAGE_KEY) || markdownContent || '';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to top
    navigate('/');
  };

  return (
    <div
      className="mx-auto py-4"
      style={{ maxWidth: '90rem' }}
    >
      <MDToHtml>{content}</MDToHtml>
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
