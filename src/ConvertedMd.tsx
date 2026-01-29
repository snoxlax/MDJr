import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MDToHtml from './MDToHtml';
import { Button } from 'react-bootstrap';
import DownloadHtml from './DownloadHtml';
import { getMarkdownContent } from './utils/localStorage';

interface ConvertedMdProps {
  markdownContent: string;
}

export default function ConvertedMd({ markdownContent }: ConvertedMdProps) {
  const navigate = useNavigate();
  const content = getMarkdownContent() || markdownContent || '';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = () => {
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
