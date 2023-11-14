import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './colors.css';
import './helper.css';
import './fonts.css';
import "@fontsource/nunito";

import Landing from './components/landing/Landing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
