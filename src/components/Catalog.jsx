import { useEffect, useState } from 'react';
import { API_KEY } from '../config/config.js';

function Catalog() {
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      console.log(import.meta.env);
      console.log(import.meta.env.VITE_APP_JSONBIN_KEY);
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
                console.log(data.record);
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
        
          return (
            <div>
              <h1>Dog Catalog</h1>
              <div className="dog-list">
                {dogs.map((dog) => (
                  <div key={dog.chipNumber} className="dog-card">
                    <img src={dog.img} alt={dog.breed} className="dog-image" />
                    <h2>{dog.name}</h2>
                    <p><strong>Breed:</strong> {dog.breed}</p>
                    <p><strong>Age:</strong> {dog.age}</p>
                    <p><strong>Sex:</strong> {dog.sex}</p>
                    <p><strong>Present:</strong> {dog.present ? "Yes" : "No"}</p>
                    <h3>Owner Information</h3>
                    <p><strong>Name:</strong> {dog.owner.name} {dog.owner.lastName}</p>
                    <p><strong>Phone:</strong> {dog.owner.phoneNumber}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        
        export default Catalog;