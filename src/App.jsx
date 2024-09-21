import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import DogCatalog from './components/Catalog';
import DogDetails from './components/DogDetails';

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