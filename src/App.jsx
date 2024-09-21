import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Catalog from './components/Catalog.jsx';
import DogDetails from './components/DogDetails.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/dog/:id" element={<DogDetails />} />
      </Routes>
    </Router>
  );
}

export default App;