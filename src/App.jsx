import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Catalog from './components/Catalog';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import DogDetails from './components/DogDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/dog/:chipNumber" element={<DogDetails />} />
      </Routes>
    </Router>
  );
}

export default App;