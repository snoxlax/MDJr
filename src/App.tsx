import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ConvertedMd from './ConvertedMd';
import Home from './Home';
import Footer from './Footer';

const STORAGE_KEY = 'markdown-content';

function App() {
  const [markdownContent, setMarkdownContent] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || '';
  });

  useEffect(() => {
    if (markdownContent) {
      localStorage.setItem(STORAGE_KEY, markdownContent);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [markdownContent]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                markdownContent={markdownContent}
                setMarkdownContent={setMarkdownContent}
              />
            }
          />
          <Route
            path="/converted"
            element={<ConvertedMd markdownContent={markdownContent} />}
          />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
