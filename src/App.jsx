import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router basename="/CanineCare">
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