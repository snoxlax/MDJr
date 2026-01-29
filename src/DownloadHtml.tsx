import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import type { ComponentProps } from 'react';
import { formatDateForFilename } from './utils/dateFormat';

interface DownloadHtmlProps {
  variant: ComponentProps<typeof Button>['variant'];
  className: string;
}

export default function DownloadHtml({
  variant,
  className,
}: DownloadHtmlProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    return () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      buttons.forEach((button) => {
        button.style.display = '';
      });
    };
  }, []);

  const downloadPageHtml = async () => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const originalDisplays = buttons.map((button) => ({
      element: button,
      display: (button as HTMLElement).style.display || '',
    }));

    const restoreButtons = () => {
      originalDisplays.forEach(({ element, display }) => {
        (element as HTMLElement).style.display = display;
      });
    };

    try {
      setIsDownloading(true);

      buttons.forEach((button) => {
        (button as HTMLElement).style.display = 'none';
      });

      const htmlContent = document.documentElement.outerHTML;

      const stylesheets = Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
      );
      let cssContent = '';

      for (const sheet of stylesheets) {
        try {
          const response = await fetch(sheet.href);
          if (!response.ok) {
            throw new Error(`Failed to fetch CSS: ${response.statusText}`);
          }
          const cssText = await response.text();
          cssContent += cssText + '\n';
        } catch (error) {
          console.error('Failed to fetch CSS:', sheet.href, error);
        }
      }

      const inlineStyles = Array.from(document.querySelectorAll('style'))
        .map((style) => style.innerHTML)
        .join('\n');

      const fullCSS = cssContent + inlineStyles;

      const modifiedHTML = htmlContent.replace(
        '</head>',
        `<style>${fullCSS}</style></head>`
      );

      const blob = new Blob([modifiedHTML], { type: 'text/html' });

      const formattedDate = formatDateForFilename();

      // Create a link element for downloading
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${formattedDate}.html`;

      link.click();

      URL.revokeObjectURL(link.href);

      setTimeout(() => {
        restoreButtons();
        setIsDownloading(false);
      }, 100);
    } catch (error) {
      console.error('Error downloading HTML:', error);
      restoreButtons();
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={downloadPageHtml}
      variant={variant}
      className={className}
      disabled={isDownloading}
      aria-label="Download page as HTML"
    >
      {isDownloading ? 'Downloading...' : 'Download'}
    </Button>
  );
}
