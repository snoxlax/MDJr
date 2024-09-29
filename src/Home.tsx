interface HomeProps {
  setMarkdownContent: (markdownContent: string) => void,
  markdownContent: string
}

export default function Home({ setMarkdownContent, markdownContent }: HomeProps) {
  // Step 1: Create state to store textarea value

  // Step 2: Handle change in textarea and update state
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(event.target.value);
  };
  return (
    <>
      <textarea rows={10} cols={100}
        placeholder="Enter Markdown here..."
        value={markdownContent}
        onChange={handleTextareaChange}>

      </textarea>
    </>

  )
}
