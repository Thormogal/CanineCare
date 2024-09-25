import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY } from '../config/config.js';
import '../CSS/Catalog.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Catalog() {
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
              setDogs(data.record);
              setLoading(false);
            })
            .catch((err) => {
              setError(err.message);
              setLoading(false);
            });
        }, []);
      
        if (loading) {
          return <p>Loading...</p>;
        }
      
        if (error) {
          return <p>Error: {error}</p>;
        }

        const placeholderImage = '/images/DogPlaceholder.webp'
      
        return (
          <div className="catalog-container">
            <div className="dog-list">
              {dogs.map((dog) => (
                <Link to={`/dog/${dog.chipNumber}`} className="dog-link" key={dog.chipNumber}>
                  <div className="dog-card">
                    <h2>{dog.name}</h2>
                    <img 
                      src={dog.img} 
                      alt={dog.breed} 
                      className="dog-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImage;
                        e.target.style.opacity = "0.3";
                      }}
                    />
                    <p><strong>{capitalizeFirstLetter(dog.breed)}</strong></p>
                    <p>Age: {dog.age}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      }

export default Catalog;