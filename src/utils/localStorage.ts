const STORAGE_KEY = 'markdown-content';

/**
 * Gets the markdown content from localStorage
 * @returns The stored markdown content or empty string if not found
 */
export function getMarkdownContent(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return '';
  }
}

/**
 * Saves the markdown content to localStorage
 * @param content - The markdown content to save
 */
export function setMarkdownContent(content: string): void {
  try {
    if (content) {
      localStorage.setItem(STORAGE_KEY, content);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

/**
 * Removes the markdown content from localStorage
 */
export function removeMarkdownContent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}
