import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import ConvertedMd from './ConvertedMd';
import Home from './Home';

function App() {
  // Step 1: Create state to store textarea value
  const [markdownContent, setMarkdownContent] = useState('');


  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/converted">Converted Markdown</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={
              <Home
                markdownContent={markdownContent}
                setMarkdownContent={setMarkdownContent} />}
            />
            <Route path="/converted" element={<ConvertedMd markdownContent={markdownContent} />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
