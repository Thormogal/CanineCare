import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_KEY } from '../config/config.js';
import '../CSS/DogDetails.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function DogDetails() {
  const { chipNumber } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dogPlaceholder = '/CanineCare/images/DogPlaceholder.webp';

  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/66ef402ae41b4d34e434958e', {
      headers: {
        'X-Master-Key': API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const selectedDog = data.record.find(dog => dog.chipNumber === chipNumber);
        setDog(selectedDog);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [chipNumber]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!dog) return <p>Dog not found.</p>;

  return (
    <div className="dog-details-wrapper">
      <div className="dog-details-container">
        <h1 className="dog-name">{dog.name}</h1>
        
        <div className="dog-image-info-wrapper">
          <img
            src={dog.img || dogPlaceholder}
            alt={dog.breed || 'Unknown breed'}
            className="dog-detail-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = dogPlaceholder;
              e.target.style.opacity = "0.3";
            }}
          />
          
          <div className="dog-name-section">
            <div className="dog-attributes">
              <p><strong>Breed:</strong> {capitalizeFirstLetter(dog.breed || 'Unknown')}</p>
              <p><strong>Age:</strong> {dog.age !== undefined ? dog.age : 'Unknown'}</p>
              <p><strong>Sex:</strong> {capitalizeFirstLetter(dog.sex || 'Unknown')}</p>
              <p><strong>Chipnumber:</strong> Contact the doggy care for information</p>
              <p><strong>Present:</strong> {dog.present ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>

        <div className="owner-info-section">
          <h3>Owner Information</h3>
          <div className="owner-info-card">
            <p><strong>Name:</strong> {dog.owner ? `${dog.owner.name} ${dog.owner.lastName}` : 'No information'}</p>
            <p><strong>Phone:</strong> {dog.owner ? dog.owner.phoneNumber : 'No information'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogDetails;