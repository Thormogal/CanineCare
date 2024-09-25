import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Catalog from './components/Catalog.jsx';
import DogDetails from './components/DogDetails.jsx';
import Contact from './components/Contact.jsx';
import AboutUs from './components/AboutUs.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <Router basename="/CanineCare">
      <Navbar />
      <Routes>
        <Route path="/CanineCare" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/dog/:chipNumber" element={<DogDetails />} />
      </Routes>
    </Router>
  );
}

export default App;