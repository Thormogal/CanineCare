import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY } from '../config/config.js';
import '../CSS/Catalog.css';

function Catalog() {
  const [dogs, setDogs] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    breed: '',
    age: '',
    size: ''
  });
  const [presentFilter, setPresentFilter] = useState(false);
  const [breeds, setBreeds] = useState([]);
  const [ages, setAges] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/66ef402ae41b4d34e434958e', {
      headers: {
        'X-Master-Key': API_KEY,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const sortedDogs = data.record.sort((a, b) => a.name.localeCompare(b.name));
        setDogs(sortedDogs);
        setFilteredDogs(sortedDogs);
        extractFilters(sortedDogs);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const extractFilters = (data) => {
    const breedSet = new Set();
    const ageSet = new Set();
    const sizeSet = new Set();

    data.forEach((dog) => {
      breedSet.add(dog.breed);
      ageSet.add(dog.age);
      sizeSet.add(dog.size);
    });

    setBreeds([...breedSet].sort());
    setAges([...ageSet].sort((a, b) => a - b)); 
    setSizes([...sizeSet]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterDogs(e.target.value, filter, presentFilter);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: newValue
    }));
    filterDogs(searchTerm, { ...filter, [name]: newValue });
  };

  const handlePresentChange = (e) => {
    const checked = e.target.checked;
    setPresentFilter(checked);
    filterDogs(searchTerm, filter, checked);
  };

  const filterDogs = (search, filters) => {
    const filtered = dogs.filter(dog => {
      const searchTerm = search.toLowerCase();
  
      const matchesSearch =
        dog.name.toLowerCase().includes(searchTerm) ||
        dog.breed.toLowerCase().includes(searchTerm) ||
        (dog.age && dog.age.toString() === searchTerm);
  
      return (
        matchesSearch &&
        (filters.breed ? dog.breed.toLowerCase().includes(filters.breed.toLowerCase()) : true) &&
        (filters.age ? dog.age === Number(filters.age) : true) &&
        (filters.size ? dog.size === filters.size : true) &&
        (filters.present ? dog.present === filters.present : true)
      );
    });
    setFilteredDogs(filtered);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const dogPlaceholder = '/CanineCare/images/DogPlaceholder.webp';

  return (
    <div className="catalog-container">
      <h1>Dog Catalog</h1>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />

        <div className="select-wrapper">
          <select name="breed" value={filter.breed} onChange={handleFilterChange}>
            <option value="">All Breeds</option>
            {breeds.map(breed => (
              <option key={breed} value={breed}>
                {capitalizeFirstLetter(breed)}
              </option>
            ))}
          </select>
          <span className="dropdown-icon">⬇️</span>
        </div>

        <div className="select-wrapper">
          <select name="age" value={filter.age} onChange={handleFilterChange}>
            <option value="">All Ages</option>
            {ages.map(age => (
              <option key={age} value={age}>
                {age} years
              </option>
            ))}
          </select>
          <span className="dropdown-icon">⬇️</span>
        </div>

        <div className="select-wrapper">
          <select name="size" value={filter.size} onChange={handleFilterChange}>
            <option value="">All Sizes</option>
            <option value="Rat">Rat</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Extra Large">Extra Large</option>
          </select>
          <span className="dropdown-icon">⬇️</span>
        </div>
        <label className="present-filter">
          <input
            type="checkbox"
            name="present"
            checked={filter.present}
            onChange={handleFilterChange}
          />
          Present
        </label>
      </div>
      <div className="dog-list">
        {filteredDogs.map((dog) => (
          <div key={dog.chipNumber} className="dog-card">
            <Link to={`/dog/${dog.chipNumber}`} className="dog-link">
              <h2>{dog.name}</h2>
              <img
                src={dog.img}
                alt={dog.breed}
                className="dog-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = dogPlaceholder;
                  e.target.style.opacity = "0.3";
                }}
              />
              <p className="dog-breed"><strong>{capitalizeFirstLetter(dog.breed)}</strong></p>
              <p className="dog-info"><span className="label">Age:</span> {dog.age}</p>
              <p className="dog-info"><span className="label">Size:</span> {dog.size}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
