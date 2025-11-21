import { useEffect } from 'react';

export function useCodeCopyButtons(dependency?: unknown) {
  useEffect(() => {
    // Clean up any existing wrappers first (in case of re-render)
    const existingWrappers = document.querySelectorAll('.code-block-wrapper');
    existingWrappers.forEach((wrapper) => {
      const pre = wrapper.querySelector('pre[class*="language-"]');
      if (pre) {
        // Unwrap: move pre back to where wrapper was
        wrapper.parentNode?.insertBefore(pre, wrapper);
        wrapper.remove();
      }
    });

    // Add header with language and copy button to all code blocks
    const codeBlocks = document.querySelectorAll('pre[class*="language-"]');

    codeBlocks.forEach((pre) => {
      // Skip if already wrapped
      if (pre.parentElement?.classList.contains('code-block-wrapper')) {
        return;
      }

      // Clean up any existing headers, buttons, or clutter inside pre
      // Remove all headers and buttons that might be inside pre
      const existingHeaders = pre.querySelectorAll('.code-block-header');
      existingHeaders.forEach((header) => header.remove());

      const existingButtons = pre.querySelectorAll('.code-copy-button');
      existingButtons.forEach((button) => button.remove());

      // Keep only the code element and its content
      const codeElement = pre.querySelector('code');
      if (!codeElement) return;

      // Remove any other direct children of pre that aren't code
      Array.from(pre.children).forEach((child) => {
        if (child !== codeElement && child.tagName !== 'CODE') {
          child.remove();
        }
      });

      // Extract language from code element's class
      const codeClasses = codeElement.className || '';
      const languageMatch = codeClasses.match(/language-(\w+)/);
      const languageDisplay = languageMatch
        ? languageMatch[1].toUpperCase()
        : 'CODE';
      const languageForMarkdown = languageMatch
        ? languageMatch[1].toLowerCase()
        : '';

      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';

      // Create header
      const header = document.createElement('div');
      header.className = 'code-block-header';

      // Create language label
      const languageLabel = document.createElement('span');
      languageLabel.className = 'code-language-label';
      languageLabel.textContent = languageDisplay;

      // Create copy button
      const button = document.createElement('button');
      button.className = 'code-copy-button';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');

      button.addEventListener('click', async () => {
        const codeText = codeElement.textContent || '';
        // Wrap with markdown code block syntax
        const wrappedText = languageForMarkdown
          ? `\`\`\`${languageForMarkdown}\n${codeText}\n\`\`\``
          : `\`\`\`\n${codeText}\n\`\`\``;

        try {
          await navigator.clipboard.writeText(wrappedText);
          button.textContent = 'Copied!';
          button.classList.add('copied');

          setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
          }, 2000);
        } catch {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = wrappedText;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            button.textContent = 'Copied!';
            button.classList.add('copied');
            setTimeout(() => {
              button.textContent = 'Copy';
              button.classList.remove('copied');
            }, 2000);
          } catch {
            button.textContent = 'Failed';
          }
          document.body.removeChild(textArea);
        }
      });

      // Assemble header
      header.appendChild(languageLabel);
      header.appendChild(button);

      // Wrap pre element: insert wrapper before pre, move pre inside wrapper, add header
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
    });
  }, [dependency]);
}
