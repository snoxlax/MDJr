import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import ConvertedMd from './ConvertedMd';
import Home from './Home';
import Footer from './Footer';

function App() {
  const [markdownContent, setMarkdownContent] = useState('');
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
