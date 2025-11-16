import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Homepage } from './homepage/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
