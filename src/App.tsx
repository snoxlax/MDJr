import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ConvertedMd from './ConvertedMd';
import Home from './Home';
import Footer from './Footer';
import {
  getMarkdownContent,
  setMarkdownContent as saveMarkdownContent,
} from './utils/localStorage';

function App() {
  const [markdownContent, setMarkdownContent] = useState(() => {
    return getMarkdownContent();
  });

  useEffect(() => {
    saveMarkdownContent(markdownContent);
  }, [markdownContent]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          {/* <div
            className="app-logo"
            aria-hidden
          >
            <span className="app-logo-icon">◆</span>
          </div> */}
          <h1 className="app-title">MDJR</h1>
        </div>
      </header>
      <main className="app-main">
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
