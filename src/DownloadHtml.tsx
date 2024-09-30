import { Button } from 'react-bootstrap';

interface DownloadHtmlProps {
  variant: string,
  className: string,
  elementRef: React.RefObject<HTMLDivElement>
}

export default function DownloadHtml({ variant, className, elementRef }: DownloadHtmlProps) {
  // Function to hide all buttons before download
  const hideButtons = () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      (button as HTMLElement).style.display = 'none';
    });
  };

  // Function to show all buttons after download
  const showButtons = () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      (button as HTMLElement).style.display = '';
    });
  };

  const downloadPageHtml = () => {
    // Hide all buttons
    hideButtons();

    // Get the entire HTML content of the page, including head and body
    const htmlContent = document.documentElement.outerHTML;

    // Create a Blob from the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Create a link element for downloading
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'page.html'; // Name of the downloaded file

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(link.href);

    // Show buttons again after the download is triggered
    setTimeout(() => {
      showButtons();
    }, 100); // Delay to ensure download link is clicked first
  };
  return (
    <Button onClick={downloadPageHtml} variant={variant} className={className}>
      Download
    </Button>
  )
}
