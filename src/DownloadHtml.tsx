import { Button } from 'react-bootstrap';

interface DownloadHtmlProps {
  variant: string,
  className: string,
}

export default function DownloadHtml({ variant, className }: DownloadHtmlProps) {
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

  const downloadPageHtml = async () => {
    // Hide all buttons
    hideButtons();

    // Get the entire HTML content of the page, including head and body
    const htmlContent = document.documentElement.outerHTML;

    // Get all stylesheets
    const stylesheets = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'));
    let cssContent = '';

    // Fetch all external CSS files
    for (const sheet of stylesheets) {
      try {
        const response = await fetch(sheet.href);
        const cssText = await response.text();
        cssContent += cssText + '\n';
      } catch (error) {
        console.error('Failed to fetch CSS:', sheet.href, error);
      }
    }

    // Get inline styles too
    const inlineStyles = Array.from(document.querySelectorAll('style'))
      .map(style => style.innerHTML)
      .join('\n');

    // Combine all CSS
    const fullCSS = cssContent + inlineStyles;

    // Insert CSS into head
    const modifiedHTML = htmlContent.replace(
      '</head>',
      `<style>${fullCSS}</style></head>`
    );

    // Create a Blob from the HTML content
    const blob = new Blob([modifiedHTML], { type: 'text/html' });

    const currentDate = new Date();

    // Format as "DD-MM-YYYY HH:MM:SS"
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;

    console.log(formattedDate); // Output: "15-11-2023 14:25:30" (example)

    // Create a link element for downloading
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = formattedDate + '.html'; // Name of the downloaded file

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
