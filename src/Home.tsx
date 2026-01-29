import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { useState } from 'react';

interface HomeProps {
  setMarkdownContent: (markdownContent: string) => void;
  markdownContent: string;
}

const RULES = [
  { label: 'Headers', syntax: '# Big Header\n## Medium Header' },
  { label: 'Emphasis', syntax: '**Bold** *Italic*' },
  {
    label: 'Bullet lists',
    syntax: '* Item one\n* Item two\n* Item three\n\n- Item 1\n- Item 2',
  },
  {
    label: 'Task List',
    syntax: '* [ ] Unchecked\n* [x] Checked',
  },
  { label: 'Horizontal rule', syntax: '---\n***\n___' },
  {
    label: 'Links',
    syntax: '[Link text](https://example.com)\nhttps://example.com',
  },
  { label: 'Image links', syntax: '![Alt text](image.png)' },
  { label: 'Code Block', syntax: '```js\nconst x = 1;\n```' },
  { label: 'Inline Code', syntax: 'Use `code` in text' },
];

export default function Home({
  setMarkdownContent,
  markdownContent,
}: HomeProps) {
  const [isConditionMet, setIsConditionMet] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMarkdownContent(event.target.value);
  };

  const handleClick = () => {
    if (markdownContent.length !== 0) {
      navigate('/converted');
    } else {
      setIsConditionMet(true);
    }
  };

  return (
    <>
      <div className="home-content">
        <section className="home-hero">
          <h2 className="home-hero-title">
            Write. <span className="home-hero-accent">Convert.</span>
          </h2>
          <p className="home-hero-subtitle">
            A distraction-free zone to write your Markdown. Paste your
            documentation, notes, or code snippets below. We&apos;ll convert it
            to a clean HTML file ready for download.
          </p>
        </section>
        <section className="home-input-section">
          <div className="home-input-header">
            <label
              className="home-input-label"
              htmlFor="markdownInput"
            >
              Input Markdown
            </label>
            <span className="home-input-count">
              {markdownContent.length} characters
            </span>
          </div>
          <div className="home-textarea-wrap">
            <textarea
              id="markdownInput"
              className="home-textarea"
              value={markdownContent}
              onChange={handleTextareaChange}
              placeholder="Paste your markdown or start typing here..."
              style={{ resize: 'vertical' }}
              aria-label="Markdown input"
            />
            {/* <div className="home-textarea-badge"></div> */}
          </div>
          <div className="home-actions">
            <button
              type="button"
              className="home-convert-btn"
              onClick={handleClick}
              aria-label="Convert markdown to HTML"
            >
              Convert
              <span
                className="home-convert-arrow"
                aria-hidden
              >
                →
              </span>
            </button>
          </div>
        </section>
        <div className="home-info-and-rules">
          <section className="home-rules">
            <h3 className="home-rules-title">Supported Syntax &amp; Rules</h3>
            <div className="home-rules-table-wrap">
              <table className="home-rules-table">
                <thead>
                  <tr>
                    <th>Syntax</th>
                    <th>Example</th>
                  </tr>
                </thead>
                <tbody>
                  {RULES.map((rule, idx) => (
                    <tr key={idx}>
                      <td>{rule.label}</td>
                      <td>
                        <pre className="home-rules-syntax">{rule.syntax}</pre>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="home-info-cards">
            <div className="home-info-card">
              <h3 className="home-info-card-title">Paste Markdown</h3>
              <p className="home-info-card-text">
                Simply paste your markdown text or write it from scratch in the
                box below.
              </p>
            </div>
            <div className="home-info-card">
              <h3 className="home-info-card-title">Code Support</h3>
              <p className="home-info-card-text">
                You can include code blocks! Use triple backticks to format your
                code snippets.
              </p>
            </div>
            <div className="home-info-card">
              <h3 className="home-info-card-title">Convert &amp; Download</h3>
              <p className="home-info-card-text">
                Press convert to generate a clean HTML file that you can
                download and use immediately.
              </p>
            </div>
          </section>
        </div>
      </div>

      <Popup
        show={isConditionMet}
        handleClose={() => setIsConditionMet(false)}
      />
    </>
  );
}
